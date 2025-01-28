import {TypedDocumentNode as DocumentNode} from '@graphql-typed-document-node/core';

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
    link__Import: { input: any; output: any; }
    federation__FieldSet: { input: any; output: any; }
    _Any: { input: any; output: any; }
};

export type PageInfo = {
    __typename?: 'PageInfo';
    totalCount: Scalars['Int']['output'];
    hasNextPage: Scalars['Boolean']['output'];
    hasPreviousPage: Scalars['Boolean']['output'];
    startCursor?: Maybe<Scalars['String']['output']>;
    endCursor?: Maybe<Scalars['String']['output']>;
    returnMetaText?: Maybe<Scalars['String']['output']>;
};

export type MetaTextType = {
    __typename?: 'MetaTextType';
    databaseName: Scalars['String']['output'];
};

export type BreyerMap = {
    __typename?: 'BreyerMap';
    id: Scalars['String']['output'];
    citytownvillagefeature?: Maybe<Scalars['String']['output']>;
    province?: Maybe<Scalars['String']['output']>;
    mapgrid?: Maybe<Scalars['String']['output']>;
};

export type BreyerMapEdge = {
    __typename?: 'BreyerMapEdge';
    cursor: Scalars['String']['output'];
    node: BreyerMap;
};

export type PaginatedBreyerMap = {
    __typename?: 'PaginatedBreyerMap';
    edges: Array<BreyerMapEdge>;
    pageInfo: PageInfo;
    breyermap?: Maybe<Array<BreyerMap>>;
};

export type Query = {
    __typename?: 'Query';
    BreyerMapMetaText: MetaTextType;
    BreyerMapFind: PaginatedBreyerMap;
    _service: _Service;
};


export type QueryBreyerMapFindArgs = {
    version: Scalars['String']['input'];
    criteria: BreyerMapFindByNameOptions;
    pagination?: InputMaybe<PaginationInput>;
};

export type BreyerMapFindByNameOptions = {
    citytownvillagefeature?: InputMaybe<FindOptions>;
    province?: InputMaybe<FindOptions>;
    mapgrid?: InputMaybe<FindOptions>;
};

export type FindOptions = {
    value?: InputMaybe<Scalars['String']['input']>;
    searchType?: InputMaybe<SearchType>;
};

export enum SearchType {
    Ilike = 'ilike',
    Substring = 'substring',
    Exact = 'exact',
    Dm = 'dm'
}

export type PaginationInput = {
    /** returns the first n elements from the list. */
    first?: InputMaybe<Scalars['Int']['input']>;
    /** returns the last n elements from the list. */
    last?: InputMaybe<Scalars['Int']['input']>;
    /** ignore the first n elements from the list. */
    skip?: InputMaybe<Scalars['Int']['input']>;
    /** returns the elements in the list that come after the specified cursor. */
    after?: InputMaybe<Scalars['String']['input']>;
    /** returns the elements in the list that come before the specified cursor. */
    before?: InputMaybe<Scalars['String']['input']>;
};

export enum Link__Purpose {
    /** `SECURITY` features provide metadata necessary to securely resolve fields. */
    Security = 'SECURITY',
    /** `EXECUTION` features provide metadata necessary for operation execution. */
    Execution = 'EXECUTION'
}

export type _Service = {
    __typename?: '_Service';
    sdl?: Maybe<Scalars['String']['output']>;
};

export type BreyerMapFindQueryVariables = Exact<{
    criteria: BreyerMapFindByNameOptions;
    version: Scalars['String']['input'];
}>;


export type BreyerMapFindQuery = {
    __typename?: 'Query',
    BreyerMapFind: {
        __typename?: 'PaginatedBreyerMap',
        pageInfo: { __typename?: 'PageInfo', totalCount: number },
        breyermap?: Array<{
            __typename?: 'BreyerMap',
            id: string,
            citytownvillagefeature?: string | null,
            province?: string | null,
            mapgrid?: string | null
        }> | null
    }
};


export const BreyerMapFindDocument = {
    "kind": "Document", "definitions": [{
        "kind": "OperationDefinition",
        "operation": "query",
        "name": {"kind": "Name", "value": "BreyerMapFind"},
        "variableDefinitions": [{
            "kind": "VariableDefinition",
            "variable": {"kind": "Variable", "name": {"kind": "Name", "value": "criteria"}},
            "type": {
                "kind": "NonNullType",
                "type": {"kind": "NamedType", "name": {"kind": "Name", "value": "BreyerMapFindByNameOptions"}}
            }
        }, {
            "kind": "VariableDefinition",
            "variable": {"kind": "Variable", "name": {"kind": "Name", "value": "version"}},
            "type": {"kind": "NonNullType", "type": {"kind": "NamedType", "name": {"kind": "Name", "value": "String"}}}
        }],
        "selectionSet": {
            "kind": "SelectionSet",
            "selections": [{
                "kind": "Field",
                "name": {"kind": "Name", "value": "BreyerMapFind"},
                "arguments": [{
                    "kind": "Argument",
                    "name": {"kind": "Name", "value": "criteria"},
                    "value": {"kind": "Variable", "name": {"kind": "Name", "value": "criteria"}}
                }, {
                    "kind": "Argument",
                    "name": {"kind": "Name", "value": "version"},
                    "value": {"kind": "Variable", "name": {"kind": "Name", "value": "version"}}
                }],
                "selectionSet": {
                    "kind": "SelectionSet",
                    "selections": [{
                        "kind": "Field",
                        "name": {"kind": "Name", "value": "pageInfo"},
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [{"kind": "Field", "name": {"kind": "Name", "value": "totalCount"}}]
                        }
                    }, {
                        "kind": "Field",
                        "name": {"kind": "Name", "value": "breyermap"},
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [{"kind": "Field", "name": {"kind": "Name", "value": "id"}}, {
                                "kind": "Field",
                                "name": {"kind": "Name", "value": "citytownvillagefeature"}
                            }, {"kind": "Field", "name": {"kind": "Name", "value": "province"}}, {
                                "kind": "Field",
                                "name": {"kind": "Name", "value": "mapgrid"}
                            }]
                        }
                    }]
                }
            }]
        }
    }]
} as unknown as DocumentNode<BreyerMapFindQuery, BreyerMapFindQueryVariables>;