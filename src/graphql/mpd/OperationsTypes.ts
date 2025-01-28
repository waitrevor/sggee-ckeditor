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

export type Individual = {
  __typename?: 'Individual';
  birthdt?: Maybe<Scalars['String']['output']>;
  birthfamilyid?: Maybe<Scalars['String']['output']>;
  birthpl?: Maybe<Scalars['String']['output']>;
  children?: Maybe<Array<Individual>>;
  deathdt?: Maybe<Scalars['String']['output']>;
  deathpl?: Maybe<Scalars['String']['output']>;
  givenname?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  marriageinfo?: Maybe<Array<RelationshipDetails>>;
  parents?: Maybe<Array<Individual>>;
  sex?: Maybe<Scalars['String']['output']>;
  siblings?: Maybe<Array<Individual>>;
  sources?: Maybe<Array<SourceInfo>>;
  spousefamilyid?: Maybe<Array<Scalars['String']['output']>>;
  spouses?: Maybe<Array<Individual>>;
  surname?: Maybe<Scalars['String']['output']>;
};

export type IndividualEdge = {
  __typename?: 'IndividualEdge';
  cursor: Scalars['String']['output'];
  node: Individual;
};

export type MetaTextType = {
  __typename?: 'MetaTextType';
  databaseName: Scalars['String']['output'];
};

export type MpdFindByNameOptions = {
  birthpl?: InputMaybe<FindOptions>;
  deathpl?: InputMaybe<FindOptions>;
  givenname?: InputMaybe<FindOptions>;
  orderByFields?: InputMaybe<Array<OrderOptions>>;
  surname?: InputMaybe<FindOptions>;
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

export type PaginatedIndividuals = {
  __typename?: 'PaginatedIndividuals';
  edges: Array<IndividualEdge>;
  individual?: Maybe<Array<Individual>>;
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
  MpdIndividualAllMatchingSurnames?: Maybe<Array<Scalars['String']['output']>>;
  MpdIndividualById?: Maybe<Individual>;
  MpdIndividualByName: PaginatedIndividuals;
  MpdMetaText: MetaTextType;
  _service: _Service;
};


export type QueryMpdIndividualAllMatchingSurnamesArgs = {
  criteria: MpdFindByNameOptions;
  version: Scalars['String']['input'];
};


export type QueryMpdIndividualByIdArgs = {
  id: Scalars['String']['input'];
  version: Scalars['String']['input'];
};


export type QueryMpdIndividualByNameArgs = {
  criteria: MpdFindByNameOptions;
  pagination?: InputMaybe<PaginationInput>;
  version: Scalars['String']['input'];
};

export type RelationshipDetails = {
  __typename?: 'RelationshipDetails';
  marriagedate?: Maybe<Scalars['String']['output']>;
  marriageplace?: Maybe<Scalars['String']['output']>;
  relationshipid: Scalars['String']['output'];
  spouses: Array<Individual>;
};

export enum SearchType {
  Dm = 'dm',
  Exact = 'exact',
  Ilike = 'ilike',
  Substring = 'substring'
}

export type SourceInfo = {
  __typename?: 'SourceInfo';
  sourceinfo: Scalars['String']['output'];
};

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

export type ChildrenFragment = { __typename?: 'Individual', children?: Array<{ __typename?: 'Individual', id: string, givenname?: string | null, surname?: string | null, birthfamilyid?: string | null }> | null };

export type ParentsFragment = { __typename?: 'Individual', parents?: Array<{ __typename?: 'Individual', id: string, givenname?: string | null, surname?: string | null, sex?: string | null }> | null };

export type IndividualInfoFragment = { __typename?: 'Individual', id: string, givenname?: string | null, surname?: string | null, birthdt?: string | null, birthpl?: string | null, deathdt?: string | null, deathpl?: string | null, sex?: string | null };

export type SearchMpdByNameQueryVariables = Exact<{
  version: Scalars['String']['input'];
  criteria: MpdFindByNameOptions;
  pagination?: InputMaybe<PaginationInput>;
}>;


export type SearchMpdByNameQuery = { __typename?: 'Query', MpdIndividualByName: { __typename?: 'PaginatedIndividuals', pageInfo: { __typename?: 'PageInfo', totalCount: number, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null }, individual?: Array<{ __typename?: 'Individual', id: string, givenname?: string | null, surname?: string | null, birthdt?: string | null, birthpl?: string | null, deathdt?: string | null, deathpl?: string | null, sex?: string | null, parents?: Array<{ __typename?: 'Individual', id: string, givenname?: string | null, surname?: string | null, sex?: string | null }> | null }> | null, edges: Array<{ __typename?: 'IndividualEdge', cursor: string, node: { __typename?: 'Individual', id: string, surname?: string | null, givenname?: string | null } }> } };

export type SearchMpdByIdQueryVariables = Exact<{
  version: Scalars['String']['input'];
  individualId: Scalars['String']['input'];
  includingSpousesAndChildren?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type SearchMpdByIdQuery = { __typename?: 'Query', MpdIndividualById?: { __typename?: 'Individual', id: string, givenname?: string | null, surname?: string | null, birthdt?: string | null, birthpl?: string | null, deathdt?: string | null, deathpl?: string | null, sex?: string | null, spouses?: Array<{ __typename?: 'Individual', id: string, givenname?: string | null, surname?: string | null, marriageinfo?: Array<{ __typename?: 'RelationshipDetails', marriageplace?: string | null, marriagedate?: string | null }> | null, children?: Array<{ __typename?: 'Individual', id: string, givenname?: string | null, surname?: string | null, birthfamilyid?: string | null }> | null }> | null, parents?: Array<{ __typename?: 'Individual', id: string, givenname?: string | null, surname?: string | null, sex?: string | null }> | null } | null };

export const ChildrenFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Children"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Individual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"children"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"givenname"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"birthfamilyid"}}]}}]}}]} as unknown as DocumentNode<ChildrenFragment, unknown>;
export const ParentsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Parents"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Individual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"parents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"givenname"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"sex"}}]}}]}}]} as unknown as DocumentNode<ParentsFragment, unknown>;
export const IndividualInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"IndividualInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Individual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"givenname"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"birthdt"}},{"kind":"Field","name":{"kind":"Name","value":"birthpl"}},{"kind":"Field","name":{"kind":"Name","value":"deathdt"}},{"kind":"Field","name":{"kind":"Name","value":"deathpl"}},{"kind":"Field","name":{"kind":"Name","value":"sex"}}]}}]} as unknown as DocumentNode<IndividualInfoFragment, unknown>;
export const SearchMpdByNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchMpdByName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"version"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"criteria"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MpdFindByNameOptions"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"MpdIndividualByName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"version"},"value":{"kind":"Variable","name":{"kind":"Name","value":"version"}}},{"kind":"Argument","name":{"kind":"Name","value":"criteria"},"value":{"kind":"Variable","name":{"kind":"Name","value":"criteria"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"individual"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"IndividualInfo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Parents"}}]}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"givenname"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"IndividualInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Individual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"givenname"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"birthdt"}},{"kind":"Field","name":{"kind":"Name","value":"birthpl"}},{"kind":"Field","name":{"kind":"Name","value":"deathdt"}},{"kind":"Field","name":{"kind":"Name","value":"deathpl"}},{"kind":"Field","name":{"kind":"Name","value":"sex"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Parents"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Individual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"parents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"givenname"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"sex"}}]}}]}}]} as unknown as DocumentNode<SearchMpdByNameQuery, SearchMpdByNameQueryVariables>;
export const SearchMpdByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchMpdById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"version"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"individualId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"includingSpousesAndChildren"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"defaultValue":{"kind":"BooleanValue","value":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"MpdIndividualById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"version"},"value":{"kind":"Variable","name":{"kind":"Name","value":"version"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"individualId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"IndividualInfo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Parents"}},{"kind":"Field","name":{"kind":"Name","value":"spouses"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"includingSpousesAndChildren"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"givenname"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"marriageinfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"marriageplace"}},{"kind":"Field","name":{"kind":"Name","value":"marriagedate"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Children"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"IndividualInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Individual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"givenname"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"birthdt"}},{"kind":"Field","name":{"kind":"Name","value":"birthpl"}},{"kind":"Field","name":{"kind":"Name","value":"deathdt"}},{"kind":"Field","name":{"kind":"Name","value":"deathpl"}},{"kind":"Field","name":{"kind":"Name","value":"sex"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Parents"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Individual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"parents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"givenname"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"sex"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Children"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Individual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"children"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"givenname"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"birthfamilyid"}}]}}]}}]} as unknown as DocumentNode<SearchMpdByIdQuery, SearchMpdByIdQueryVariables>;