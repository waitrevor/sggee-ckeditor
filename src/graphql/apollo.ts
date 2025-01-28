/* Apollo Client and GraphQL Documentation References:
    Caching: https://www.apollographql.com/docs/react/caching/overview/
    Boolean Operators: https://dgraph.io/docs/graphql/queries/and-or-not/
*/
import { ApolloClient, InMemoryCache, OperationVariables, TypedDocumentNode, createHttpLink, concat } from '@apollo/client/core';
import { provideApolloClient, useQuery } from '@vue/apollo-composable';
import { setContext } from '@apollo/client/link/context';
import { TimeoutError } from './errors';
import { AccessTokenManager, AccessToken } from '../utilities/auth';
import { redirectToLoginPage } from '../errorInterceptor';

const accessTokenManager = AccessTokenManager.getInstance();

// Handler to listen for access token changes and set auth headers
function handleAccessTokenChange(token: AccessToken): void {
  apolloClient.setLink(concat(getAuthLink(token), httpLink));
}

accessTokenManager.subscribe(handleAccessTokenChange);

// Function to create the authentication link that adds the authentication headers to requests
const getAuthLink = (token: AccessToken) => {
  return setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`
      },
    };
  });
};

// In-memory cache for Apollo Client
const cache = new InMemoryCache();

// HTTP link to connect to the GraphQL server
const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_ENDPOINT
});

// Apollo Client instance with authentication link and caching
const apolloClient = new ApolloClient({
  link: concat(getAuthLink(accessTokenManager.getAccessToken()), httpLink),
  cache: cache,
  connectToDevTools: false, // Disable the Apollo DevTools warning
});

/**
 * Executes a GraphQL query using Apollo Client and retrieves the response data.
 *
 * @param query - The GraphQL query document.
 * @param variables - The variables required by the query.
 * @param timeout - The maximum duration (in milliseconds) to wait for the query to complete.
 * @returns The query result or rejects if the timeout is exceeded or an error occurs.
 *
 * @throws {ApolloError | TimeoutError | Error} Throws an error if the query execution encounters an error.
 */
const fetchData = async <TData, TVars extends OperationVariables>(query: TypedDocumentNode<TData, TVars>, variables: TVars, timeout: number = 15000): Promise<TData> => {
  const { result, loading, error, onResult, onError } = provideApolloClient(apolloClient)(() => useQuery(query, variables));

  await Promise.race([
    new Promise<void>((resolve) => {
      onResult(() => !loading.value && resolve()); // resolve is called when loading is finished
    }),
    new Promise<void>((_, reject) => {
      onError(async () => {
        await accessTokenManager.updateAccessToken();
        reject(error.value);
      }
    ); 
    }),
    new Promise<void>((_, reject) => {
      setTimeout(() => reject(new TimeoutError()), timeout);
    })
  ]);

  return result.value as TData;
};

/**
 * Executes a provided asynchronous function with retry logic.
 *
 * @param fn - The asynchronous function to execute.
 * @param retries - The number of times to retry the function in case of failure. Default is 1.
 * @returns The result of the function if it succeeds within the allowed retries.
 * @throws {Error} Throws the last encountered error if all retries are exhausted.
 */
const withRetry = async <T>(fn: () => Promise<T>, retries = 1): Promise<T | undefined> => {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0) {
      console.log(`Error occurred: ${error}. Retrying...`);
      return withRetry(fn, retries - 1);
    } else {
      // Bounce to login page if retries exhausted
      redirectToLoginPage();
    }
  }
};

/**
 * Fetches data using a provided GraphQL query with retry logic and processes the result using an extract function.
 *
 * @template T - The type of the response data expected from the GraphQL query.
 * @template V - The type of the variables expected by the GraphQL query.
 * 
 * @param fetchFunction - The GraphQL query to be executed, represented as a `TypedDocumentNode<T, V>`.
 * @param extractFunction - A function to process the fetched result. This function should take the result of type `T` and return any desired value.
 * @param variables - Optional variables to be passed into the GraphQL query.
 *
 * @returns A promise that resolves with the processed result from `extractFunction`.
 * @throws {Error} Throws the last encountered error if all retries are exhausted.
 */
const fetchDataWithRetry = async <T, V extends OperationVariables>(
  fetchFunction: TypedDocumentNode<T, V>, 
  extractFunction: (result: T) => any, 
  variables?: V
): Promise<any> => {
  return await withRetry(async () => {
    const result: T = await fetchData<T, V>(fetchFunction,  variables || ({} as V));
    return extractFunction(result);
  });
};


export {
  fetchDataWithRetry
};
