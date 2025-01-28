import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  _Any: { input: any; output: any; }
  federation__FieldSet: { input: any; output: any; }
  link__Import: { input: any; output: any; }
};

export type FindOptions = {
  searchType?: InputMaybe<SearchType>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type Membership = {
  __typename?: 'Membership';
  email?: Maybe<Scalars['String']['output']>;
  givenname?: Maybe<Scalars['String']['output']>;
  memnum: Scalars['String']['output'];
  surname?: Maybe<Scalars['String']['output']>;
};

export type MembershipEdge = {
  __typename?: 'MembershipEdge';
  cursor: Scalars['String']['output'];
  node: Membership;
};

export type MembershipFindByNameOptions = {
  email?: InputMaybe<FindOptions>;
  givenname?: InputMaybe<FindOptions>;
  memnum?: InputMaybe<FindOptions>;
  orderByFields?: InputMaybe<Array<OrderOptions>>;
  surname?: InputMaybe<FindOptions>;
};

export type MetaTextType = {
  __typename?: 'MetaTextType';
  databaseName: Scalars['String']['output'];
};

export type OrderOptions = {
  fieldName: Scalars['String']['input'];
  order?: InputMaybe<OrderTypeEnum>;
};

export enum OrderTypeEnum {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  returnMetaText?: Maybe<Scalars['String']['output']>;
  startCursor?: Maybe<Scalars['String']['output']>;
  totalCount: Scalars['Int']['output'];
};

export type PaginatedMembership = {
  __typename?: 'PaginatedMembership';
  edges: Array<MembershipEdge>;
  membership?: Maybe<Array<Membership>>;
  pageInfo: PageInfo;
};

export type PaginationInput = {
  /** returns the elements in the list that come after the specified cursor. */
  after?: InputMaybe<Scalars['String']['input']>;
  /** returns the elements in the list that come before the specified cursor. */
  before?: InputMaybe<Scalars['String']['input']>;
  /** returns the first n elements from the list. */
  first?: InputMaybe<Scalars['Int']['input']>;
  /** returns the last n elements from the list. */
  last?: InputMaybe<Scalars['Int']['input']>;
  /** ignore the first n elements from the list. */
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type Query = {
  __typename?: 'Query';
  MembershipFind: PaginatedMembership;
  MembershipMetaText: MetaTextType;
  _service: _Service;
};


export type QueryMembershipFindArgs = {
  criteria: MembershipFindByNameOptions;
  pagination?: InputMaybe<PaginationInput>;
  version: Scalars['String']['input'];
};

export enum SearchType {
  Dm = 'dm',
  Exact = 'exact',
  Ilike = 'ilike',
  Substring = 'substring'
}

export type _Service = {
  __typename?: '_Service';
  sdl?: Maybe<Scalars['String']['output']>;
};

export enum Link__Purpose {
  /** `EXECUTION` features provide metadata necessary for operation execution. */
  Execution = 'EXECUTION',
  /** `SECURITY` features provide metadata necessary to securely resolve fields. */
  Security = 'SECURITY'
}

export type MembershipFindQueryVariables = Exact<{
  version: Scalars['String']['input'];
  criteria: MembershipFindByNameOptions;
}>;


export type MembershipFindQuery = { __typename?: 'Query', MembershipFind: { __typename?: 'PaginatedMembership', membership?: Array<{ __typename?: 'Membership', memnum: string, givenname?: string | null, surname?: string | null, email?: string | null }> | null, pageInfo: { __typename?: 'PageInfo', totalCount: number } } };


export const MembershipFindDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MembershipFind"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"version"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"criteria"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MembershipFindByNameOptions"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"MembershipFind"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"version"},"value":{"kind":"Variable","name":{"kind":"Name","value":"version"}}},{"kind":"Argument","name":{"kind":"Name","value":"criteria"},"value":{"kind":"Variable","name":{"kind":"Name","value":"criteria"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"membership"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"memnum"}},{"kind":"Field","name":{"kind":"Name","value":"givenname"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]}}]} as unknown as DocumentNode<MembershipFindQuery, MembershipFindQueryVariables>;