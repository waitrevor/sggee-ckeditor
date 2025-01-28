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

export type MetaTextType = {
  __typename?: 'MetaTextType';
  databaseName: Scalars['String']['output'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  returnMetaText?: Maybe<Scalars['String']['output']>;
  startCursor?: Maybe<Scalars['String']['output']>;
  totalCount: Scalars['Int']['output'];
};

export type PaginatedStPetersburgBirths = {
  __typename?: 'PaginatedStPetersburgBirths';
  edges: Array<StPetersburgBirthsEdge>;
  pageInfo: PageInfo;
  stpetersburgbirths?: Maybe<Array<StPetersburgBirths>>;
};

export type PaginatedStPetersburgDeaths = {
  __typename?: 'PaginatedStPetersburgDeaths';
  edges: Array<StPetersburgDeathsEdge>;
  pageInfo: PageInfo;
  stpetersburgdeaths?: Maybe<Array<StPetersburgDeaths>>;
};

export type PaginatedStPetersburgMarriages = {
  __typename?: 'PaginatedStPetersburgMarriages';
  edges: Array<StPetersburgMarriagesEdge>;
  pageInfo: PageInfo;
  stpetersburgmarriages?: Maybe<Array<StPetersburgMarriages>>;
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
  StPeteBirthFind: PaginatedStPetersburgBirths;
  StPeteDeathFind: PaginatedStPetersburgDeaths;
  StPeteMarriageFind: PaginatedStPetersburgMarriages;
  StPetersburgBirthsMetaText: MetaTextType;
  StPetersburgDeathsMetaText: MetaTextType;
  StPetersburgMarriagesMetaText: MetaTextType;
  _service: _Service;
};


export type QueryStPeteBirthFindArgs = {
  criteria: StPetersburgBirthsFindByNameOptions;
  pagination?: InputMaybe<PaginationInput>;
  version: Scalars['String']['input'];
};


export type QueryStPeteDeathFindArgs = {
  criteria: StPetersburgDeathsFindByNameOptions;
  pagination?: InputMaybe<PaginationInput>;
  version: Scalars['String']['input'];
};


export type QueryStPeteMarriageFindArgs = {
  criteria: StPetersburgMarriagesFindByNameOptions;
  pagination?: InputMaybe<PaginationInput>;
  version: Scalars['String']['input'];
};

export enum SearchType {
  Dm = 'dm',
  Exact = 'exact',
  Ilike = 'ilike',
  Substring = 'substring'
}

export type StPetersburgBirths = {
  __typename?: 'StPetersburgBirths';
  day_month?: Maybe<Scalars['String']['output']>;
  father?: Maybe<Scalars['String']['output']>;
  film_or_item?: Maybe<Scalars['String']['output']>;
  first_name?: Maybe<Scalars['String']['output']>;
  hyperlink?: Maybe<Scalars['String']['output']>;
  last_name?: Maybe<Scalars['String']['output']>;
  mother_givenname?: Maybe<Scalars['String']['output']>;
  mother_surname?: Maybe<Scalars['String']['output']>;
  pagenum?: Maybe<Scalars['String']['output']>;
  parish?: Maybe<Scalars['String']['output']>;
  place?: Maybe<Scalars['String']['output']>;
  register?: Maybe<Scalars['String']['output']>;
  remarks?: Maybe<Scalars['String']['output']>;
  year?: Maybe<Scalars['String']['output']>;
};

export type StPetersburgBirthsEdge = {
  __typename?: 'StPetersburgBirthsEdge';
  cursor: Scalars['String']['output'];
  node: StPetersburgBirths;
};

export type StPetersburgBirthsFindByNameOptions = {
  day_month?: InputMaybe<FindOptions>;
  father?: InputMaybe<FindOptions>;
  film_or_item?: InputMaybe<FindOptions>;
  first_name?: InputMaybe<FindOptions>;
  hyperlink?: InputMaybe<FindOptions>;
  last_name?: InputMaybe<FindOptions>;
  mother_givenname?: InputMaybe<FindOptions>;
  mother_surname?: InputMaybe<FindOptions>;
  pagenum?: InputMaybe<FindOptions>;
  parish?: InputMaybe<FindOptions>;
  place?: InputMaybe<FindOptions>;
  register?: InputMaybe<FindOptions>;
  remarks?: InputMaybe<FindOptions>;
  year?: InputMaybe<FindOptions>;
};

export type StPetersburgDeaths = {
  __typename?: 'StPetersburgDeaths';
  day_month?: Maybe<Scalars['String']['output']>;
  father?: Maybe<Scalars['String']['output']>;
  film_or_item?: Maybe<Scalars['String']['output']>;
  first_name?: Maybe<Scalars['String']['output']>;
  hyperlink?: Maybe<Scalars['String']['output']>;
  last_name?: Maybe<Scalars['String']['output']>;
  mother_givenname?: Maybe<Scalars['String']['output']>;
  mother_surname?: Maybe<Scalars['String']['output']>;
  pagenum?: Maybe<Scalars['String']['output']>;
  parish?: Maybe<Scalars['String']['output']>;
  place?: Maybe<Scalars['String']['output']>;
  register?: Maybe<Scalars['String']['output']>;
  remarks?: Maybe<Scalars['String']['output']>;
  year?: Maybe<Scalars['String']['output']>;
};

export type StPetersburgDeathsEdge = {
  __typename?: 'StPetersburgDeathsEdge';
  cursor: Scalars['String']['output'];
  node: StPetersburgDeaths;
};

export type StPetersburgDeathsFindByNameOptions = {
  day_month?: InputMaybe<FindOptions>;
  father?: InputMaybe<FindOptions>;
  film_or_item?: InputMaybe<FindOptions>;
  first_name?: InputMaybe<FindOptions>;
  last_name?: InputMaybe<FindOptions>;
  mother_givenname?: InputMaybe<FindOptions>;
  mother_surname?: InputMaybe<FindOptions>;
  pagenum?: InputMaybe<FindOptions>;
  parish?: InputMaybe<FindOptions>;
  place?: InputMaybe<FindOptions>;
  register?: InputMaybe<FindOptions>;
  remarks?: InputMaybe<FindOptions>;
  year?: InputMaybe<FindOptions>;
};

export type StPetersburgMarriages = {
  __typename?: 'StPetersburgMarriages';
  bride_first?: Maybe<Scalars['String']['output']>;
  bride_last?: Maybe<Scalars['String']['output']>;
  day_month?: Maybe<Scalars['String']['output']>;
  film_or_item?: Maybe<Scalars['String']['output']>;
  groom_first?: Maybe<Scalars['String']['output']>;
  groom_last?: Maybe<Scalars['String']['output']>;
  hyperlink?: Maybe<Scalars['String']['output']>;
  pagenum?: Maybe<Scalars['String']['output']>;
  parish?: Maybe<Scalars['String']['output']>;
  place?: Maybe<Scalars['String']['output']>;
  prev_husb_or_bride_parent?: Maybe<Scalars['String']['output']>;
  prev_wife_or_groom_parent?: Maybe<Scalars['String']['output']>;
  register?: Maybe<Scalars['String']['output']>;
  remarks?: Maybe<Scalars['String']['output']>;
  year?: Maybe<Scalars['String']['output']>;
};

export type StPetersburgMarriagesEdge = {
  __typename?: 'StPetersburgMarriagesEdge';
  cursor: Scalars['String']['output'];
  node: StPetersburgMarriages;
};

export type StPetersburgMarriagesFindByNameOptions = {
  bride_first?: InputMaybe<FindOptions>;
  bride_last?: InputMaybe<FindOptions>;
  day_month?: InputMaybe<FindOptions>;
  film_or_item?: InputMaybe<FindOptions>;
  groom_first?: InputMaybe<FindOptions>;
  groom_last?: InputMaybe<FindOptions>;
  pagenum?: InputMaybe<FindOptions>;
  parish?: InputMaybe<FindOptions>;
  place?: InputMaybe<FindOptions>;
  prev_husb_or_bride_parent?: InputMaybe<FindOptions>;
  prev_wife_or_groom_parent?: InputMaybe<FindOptions>;
  register?: InputMaybe<FindOptions>;
  remarks?: InputMaybe<FindOptions>;
  year?: InputMaybe<FindOptions>;
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

export type StPeteBirthFindQueryVariables = Exact<{
  version: Scalars['String']['input'];
  criteria: StPetersburgBirthsFindByNameOptions;
}>;


export type StPeteBirthFindQuery = { __typename?: 'Query', StPeteBirthFind: { __typename?: 'PaginatedStPetersburgBirths', stpetersburgbirths?: Array<{ __typename?: 'StPetersburgBirths', father?: string | null, film_or_item?: string | null, first_name?: string | null, hyperlink?: string | null, last_name?: string | null, mother_givenname?: string | null, mother_surname?: string | null, pagenum?: string | null, parish?: string | null, place?: string | null, register?: string | null, remarks?: string | null, day_month?: string | null, year?: string | null }> | null, pageInfo: { __typename?: 'PageInfo', totalCount: number } } };

export type StPeteDeathFindQueryVariables = Exact<{
  version: Scalars['String']['input'];
  criteria: StPetersburgDeathsFindByNameOptions;
}>;


export type StPeteDeathFindQuery = { __typename?: 'Query', StPeteDeathFind: { __typename?: 'PaginatedStPetersburgDeaths', stpetersburgdeaths?: Array<{ __typename?: 'StPetersburgDeaths', father?: string | null, film_or_item?: string | null, first_name?: string | null, hyperlink?: string | null, last_name?: string | null, mother_surname?: string | null, mother_givenname?: string | null, pagenum?: string | null, parish?: string | null, place?: string | null, register?: string | null, remarks?: string | null, day_month?: string | null, year?: string | null }> | null, pageInfo: { __typename?: 'PageInfo', totalCount: number } } };

export type StPeteMarriageFindQueryVariables = Exact<{
  version: Scalars['String']['input'];
  criteria: StPetersburgMarriagesFindByNameOptions;
  pagination?: InputMaybe<PaginationInput>;
}>;


export type StPeteMarriageFindQuery = { __typename?: 'Query', StPeteMarriageFind: { __typename?: 'PaginatedStPetersburgMarriages', stpetersburgmarriages?: Array<{ __typename?: 'StPetersburgMarriages', groom_last?: string | null, groom_first?: string | null, day_month?: string | null, year?: string | null, place?: string | null, bride_last?: string | null, bride_first?: string | null, film_or_item?: string | null, pagenum?: string | null, register?: string | null, remarks?: string | null, parish?: string | null, hyperlink?: string | null, prev_wife_or_groom_parent?: string | null, prev_husb_or_bride_parent?: string | null }> | null, pageInfo: { __typename?: 'PageInfo', totalCount: number } } };


export const StPeteBirthFindDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"StPeteBirthFind"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"version"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"criteria"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StPetersburgBirthsFindByNameOptions"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"StPeteBirthFind"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"version"},"value":{"kind":"Variable","name":{"kind":"Name","value":"version"}}},{"kind":"Argument","name":{"kind":"Name","value":"criteria"},"value":{"kind":"Variable","name":{"kind":"Name","value":"criteria"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stpetersburgbirths"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"father"}},{"kind":"Field","name":{"kind":"Name","value":"film_or_item"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"hyperlink"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"mother_givenname"}},{"kind":"Field","name":{"kind":"Name","value":"mother_surname"}},{"kind":"Field","name":{"kind":"Name","value":"pagenum"}},{"kind":"Field","name":{"kind":"Name","value":"parish"}},{"kind":"Field","name":{"kind":"Name","value":"place"}},{"kind":"Field","name":{"kind":"Name","value":"register"}},{"kind":"Field","name":{"kind":"Name","value":"remarks"}},{"kind":"Field","name":{"kind":"Name","value":"day_month"}},{"kind":"Field","name":{"kind":"Name","value":"year"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]}}]} as unknown as DocumentNode<StPeteBirthFindQuery, StPeteBirthFindQueryVariables>;
export const StPeteDeathFindDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"StPeteDeathFind"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"version"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"criteria"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StPetersburgDeathsFindByNameOptions"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"StPeteDeathFind"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"version"},"value":{"kind":"Variable","name":{"kind":"Name","value":"version"}}},{"kind":"Argument","name":{"kind":"Name","value":"criteria"},"value":{"kind":"Variable","name":{"kind":"Name","value":"criteria"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stpetersburgdeaths"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"father"}},{"kind":"Field","name":{"kind":"Name","value":"film_or_item"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"hyperlink"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"mother_surname"}},{"kind":"Field","name":{"kind":"Name","value":"mother_givenname"}},{"kind":"Field","name":{"kind":"Name","value":"pagenum"}},{"kind":"Field","name":{"kind":"Name","value":"parish"}},{"kind":"Field","name":{"kind":"Name","value":"place"}},{"kind":"Field","name":{"kind":"Name","value":"register"}},{"kind":"Field","name":{"kind":"Name","value":"remarks"}},{"kind":"Field","name":{"kind":"Name","value":"day_month"}},{"kind":"Field","name":{"kind":"Name","value":"year"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]}}]} as unknown as DocumentNode<StPeteDeathFindQuery, StPeteDeathFindQueryVariables>;
export const StPeteMarriageFindDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"StPeteMarriageFind"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"version"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"criteria"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StPetersburgMarriagesFindByNameOptions"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"StPeteMarriageFind"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"version"},"value":{"kind":"Variable","name":{"kind":"Name","value":"version"}}},{"kind":"Argument","name":{"kind":"Name","value":"criteria"},"value":{"kind":"Variable","name":{"kind":"Name","value":"criteria"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stpetersburgmarriages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"groom_last"}},{"kind":"Field","name":{"kind":"Name","value":"groom_first"}},{"kind":"Field","name":{"kind":"Name","value":"day_month"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"place"}},{"kind":"Field","name":{"kind":"Name","value":"bride_last"}},{"kind":"Field","name":{"kind":"Name","value":"bride_first"}},{"kind":"Field","name":{"kind":"Name","value":"film_or_item"}},{"kind":"Field","name":{"kind":"Name","value":"pagenum"}},{"kind":"Field","name":{"kind":"Name","value":"register"}},{"kind":"Field","name":{"kind":"Name","value":"remarks"}},{"kind":"Field","name":{"kind":"Name","value":"parish"}},{"kind":"Field","name":{"kind":"Name","value":"hyperlink"}},{"kind":"Field","name":{"kind":"Name","value":"prev_wife_or_groom_parent"}},{"kind":"Field","name":{"kind":"Name","value":"prev_husb_or_bride_parent"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]}}]} as unknown as DocumentNode<StPeteMarriageFindQuery, StPeteMarriageFindQueryVariables>;