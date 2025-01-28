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

export type OdessaStPete = {
    __typename?: 'OdessaStPete';
    film_or_item?: Maybe<Scalars['String']['output']>;
    register?: Maybe<Scalars['String']['output']>;
    pagenum?: Maybe<Scalars['String']['output']>;
    last_name?: Maybe<Scalars['String']['output']>;
    first_name?: Maybe<Scalars['String']['output']>;
    remarks?: Maybe<Scalars['String']['output']>;
    source?: Maybe<Scalars['String']['output']>;
    place?: Maybe<Scalars['String']['output']>;
};

export type MetaTextType = {
    __typename?: 'MetaTextType';
    databaseName: Scalars['String']['output'];
};

export type OdessaStPeteEdge = {
    __typename?: 'OdessaStPeteEdge';
    cursor: Scalars['String']['output'];
    node: OdessaStPete;
};

export type PaginatedOdessaStPete = {
    __typename?: 'PaginatedOdessaStPete';
    edges: Array<OdessaStPeteEdge>;
    pageInfo: PageInfo;
    odessastpete?: Maybe<Array<OdessaStPete>>;
};

export type Query = {
    __typename?: 'Query';
    OdessaStPeteMetaText: MetaTextType;
    OdessaStPeteFind: PaginatedOdessaStPete;
    _service: _Service;
};


export type QueryOdessaStPeteFindArgs = {
    version: Scalars['String']['input'];
    criteria: OdessaStPeteFindByNameOptions;
    pagination?: InputMaybe<PaginationInput>;
};

export type OdessaStPeteFindByNameOptions = {
    film_or_item?: InputMaybe<FindOptions>;
    register?: InputMaybe<FindOptions>;
    pagenum?: InputMaybe<FindOptions>;
    last_name?: InputMaybe<FindOptions>;
    first_name?: InputMaybe<FindOptions>;
    remarks?: InputMaybe<FindOptions>;
    source?: InputMaybe<FindOptions>;
    place?: InputMaybe<FindOptions>;
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

export type OdessaStPeteFindQueryVariables = Exact<{
    version: Scalars['String']['input'];
    criteria: OdessaStPeteFindByNameOptions;
    pagination?: InputMaybe<PaginationInput>;
}>;


export type OdessaStPeteFindQuery = {
    __typename?: 'Query',
    OdessaStPeteFind: {
        __typename?: 'PaginatedOdessaStPete',
        odessastpete?: Array<{
            __typename?: 'OdessaStPete',
            film_or_item?: string | null,
            register?: string | null,
            pagenum?: string | null,
            last_name?: string | null,
            first_name?: string | null,
            remarks?: string | null,
            source?: string | null,
            place?: string | null
        }> | null,
        pageInfo: { __typename?: 'PageInfo', totalCount: number }
    }
};


export const OdessaStPeteFindDocument = {
    "kind": "Document", "definitions": [{
        "kind": "OperationDefinition",
        "operation": "query",
        "name": {"kind": "Name", "value": "OdessaStPeteFind"},
        "variableDefinitions": [{
            "kind": "VariableDefinition",
            "variable": {"kind": "Variable", "name": {"kind": "Name", "value": "version"}},
            "type": {"kind": "NonNullType", "type": {"kind": "NamedType", "name": {"kind": "Name", "value": "String"}}}
        }, {
            "kind": "VariableDefinition",
            "variable": {"kind": "Variable", "name": {"kind": "Name", "value": "criteria"}},
            "type": {
                "kind": "NonNullType",
                "type": {"kind": "NamedType", "name": {"kind": "Name", "value": "OdessaStPeteFindByNameOptions"}}
            }
        }, {
            "kind": "VariableDefinition",
            "variable": {"kind": "Variable", "name": {"kind": "Name", "value": "pagination"}},
            "type": {"kind": "NamedType", "name": {"kind": "Name", "value": "PaginationInput"}}
        }],
        "selectionSet": {
            "kind": "SelectionSet", "selections": [{
                "kind": "Field",
                "name": {"kind": "Name", "value": "OdessaStPeteFind"},
                "arguments": [{
                    "kind": "Argument",
                    "name": {"kind": "Name", "value": "version"},
                    "value": {"kind": "Variable", "name": {"kind": "Name", "value": "version"}}
                }, {
                    "kind": "Argument",
                    "name": {"kind": "Name", "value": "criteria"},
                    "value": {"kind": "Variable", "name": {"kind": "Name", "value": "criteria"}}
                }, {
                    "kind": "Argument",
                    "name": {"kind": "Name", "value": "pagination"},
                    "value": {"kind": "Variable", "name": {"kind": "Name", "value": "pagination"}}
                }],
                "selectionSet": {
                    "kind": "SelectionSet",
                    "selections": [{
                        "kind": "Field",
                        "name": {"kind": "Name", "value": "odessastpete"},
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [{
                                "kind": "Field",
                                "name": {"kind": "Name", "value": "film_or_item"}
                            }, {"kind": "Field", "name": {"kind": "Name", "value": "register"}}, {
                                "kind": "Field",
                                "name": {"kind": "Name", "value": "pagenum"}
                            }, {"kind": "Field", "name": {"kind": "Name", "value": "last_name"}}, {
                                "kind": "Field",
                                "name": {"kind": "Name", "value": "first_name"}
                            }, {"kind": "Field", "name": {"kind": "Name", "value": "remarks"}}, {
                                "kind": "Field",
                                "name": {"kind": "Name", "value": "source"}
                            }, {"kind": "Field", "name": {"kind": "Name", "value": "place"}}]
                        }
                    }, {
                        "kind": "Field",
                        "name": {"kind": "Name", "value": "pageInfo"},
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [{"kind": "Field", "name": {"kind": "Name", "value": "totalCount"}}]
                        }
                    }]
                }
            }]
        }
    }]
} as unknown as DocumentNode<OdessaStPeteFindQuery, OdessaStPeteFindQueryVariables>;