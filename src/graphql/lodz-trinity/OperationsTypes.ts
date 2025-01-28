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

export type LodzTrinityRelationshipDetails = {
    __typename?: 'LodzTrinityRelationshipDetails';
    relationshipid: Scalars['String']['output'];
    marriagedate?: Maybe<Scalars['String']['output']>;
    marriageplace?: Maybe<Scalars['String']['output']>;
    spouses: Array<LodzTrinityIndividual>;
};

export type LodzTrinitySourceInfo = {
    __typename?: 'LodzTrinitySourceInfo';
    sourceinfo: Scalars['String']['output'];
};

export type LodzTrinityIndividual = {
    __typename?: 'LodzTrinityIndividual';
    id: Scalars['String']['output'];
    surname?: Maybe<Scalars['String']['output']>;
    givenname?: Maybe<Scalars['String']['output']>;
    sex?: Maybe<Scalars['String']['output']>;
    deathpl?: Maybe<Scalars['String']['output']>;
    deathdt?: Maybe<Scalars['String']['output']>;
    birthpl?: Maybe<Scalars['String']['output']>;
    birthdt?: Maybe<Scalars['String']['output']>;
    birthfamilyid?: Maybe<Scalars['String']['output']>;
    parents?: Maybe<Array<LodzTrinityIndividual>>;
    siblings?: Maybe<Array<LodzTrinityIndividual>>;
    spousefamilyid?: Maybe<Array<Scalars['String']['output']>>;
    spouses?: Maybe<Array<LodzTrinityIndividual>>;
    children?: Maybe<Array<LodzTrinityIndividual>>;
    sources?: Maybe<Array<LodzTrinitySourceInfo>>;
    marriageinfo?: Maybe<Array<LodzTrinityRelationshipDetails>>;
};

export type LodzTrinityIndividualEdge = {
    __typename?: 'LodzTrinityIndividualEdge';
    cursor: Scalars['String']['output'];
    node: LodzTrinityIndividual;
};

export type PaginatedLodzTrinityIndividual = {
    __typename?: 'PaginatedLodzTrinityIndividual';
    edges: Array<LodzTrinityIndividualEdge>;
    pageInfo: PageInfo;
    lodztrinityindividual?: Maybe<Array<LodzTrinityIndividual>>;
};

export type Query = {
    __typename?: 'Query';
    LodzTrinityIndividualMetaText: MetaTextType;
    LodzTrinityIndividualFind: PaginatedLodzTrinityIndividual;
    LodzTrinityIndividualById?: Maybe<LodzTrinityIndividual>;
    _service: _Service;
};


export type QueryLodzTrinityIndividualFindArgs = {
    version: Scalars['String']['input'];
    criteria: LodzTrinityIndividualFindByNameOptions;
    pagination?: InputMaybe<PaginationInput>;
};


export type QueryLodzTrinityIndividualByIdArgs = {
    version: Scalars['String']['input'];
    id: Scalars['String']['input'];
};

export type LodzTrinityIndividualFindByNameOptions = {
    id?: InputMaybe<FindOptions>;
    surname?: InputMaybe<FindOptions>;
    givenname?: InputMaybe<FindOptions>;
    source?: InputMaybe<FindOptions>;
    sex?: InputMaybe<FindOptions>;
    deathpl?: InputMaybe<FindOptions>;
    deathdt?: InputMaybe<FindOptions>;
    siblingsid?: InputMaybe<FindOptions>;
    childrenid?: InputMaybe<FindOptions>;
    dadid?: InputMaybe<FindOptions>;
    momid?: InputMaybe<FindOptions>;
    spouseid?: InputMaybe<FindOptions>;
    birthpl?: InputMaybe<FindOptions>;
    bithdt?: InputMaybe<FindOptions>;
    marriageinfo?: InputMaybe<FindOptions>;
    spousename?: InputMaybe<FindOptions>;
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

export type LodzTrinityIndividualFindQueryVariables = Exact<{
    version: Scalars['String']['input'];
    criteria: LodzTrinityIndividualFindByNameOptions;
}>;


export type LodzTrinityIndividualFindQuery = {
    __typename?: 'Query',
    LodzTrinityIndividualFind: {
        __typename?: 'PaginatedLodzTrinityIndividual',
        lodztrinityindividual?: Array<{
            __typename?: 'LodzTrinityIndividual',
            id: string,
            surname?: string | null,
            givenname?: string | null,
            sex?: string | null,
            deathpl?: string | null,
            deathdt?: string | null,
            birthpl?: string | null,
            birthdt?: string | null,
            birthfamilyid?: string | null,
            spousefamilyid?: Array<string> | null,
            children?: Array<{
                __typename?: 'LodzTrinityIndividual',
                id: string,
                surname?: string | null,
                givenname?: string | null
            }> | null
        }> | null,
        pageInfo: { __typename?: 'PageInfo', totalCount: number }
    }
};


export const LodzTrinityIndividualFindDocument = {
    "kind": "Document", "definitions": [{
        "kind": "OperationDefinition",
        "operation": "query",
        "name": {"kind": "Name", "value": "LodzTrinityIndividualFind"},
        "variableDefinitions": [{
            "kind": "VariableDefinition",
            "variable": {"kind": "Variable", "name": {"kind": "Name", "value": "version"}},
            "type": {"kind": "NonNullType", "type": {"kind": "NamedType", "name": {"kind": "Name", "value": "String"}}}
        }, {
            "kind": "VariableDefinition",
            "variable": {"kind": "Variable", "name": {"kind": "Name", "value": "criteria"}},
            "type": {
                "kind": "NonNullType",
                "type": {
                    "kind": "NamedType",
                    "name": {"kind": "Name", "value": "LodzTrinityIndividualFindByNameOptions"}
                }
            }
        }],
        "selectionSet": {
            "kind": "SelectionSet", "selections": [{
                "kind": "Field",
                "name": {"kind": "Name", "value": "LodzTrinityIndividualFind"},
                "arguments": [{
                    "kind": "Argument",
                    "name": {"kind": "Name", "value": "version"},
                    "value": {"kind": "Variable", "name": {"kind": "Name", "value": "version"}}
                }, {
                    "kind": "Argument",
                    "name": {"kind": "Name", "value": "criteria"},
                    "value": {"kind": "Variable", "name": {"kind": "Name", "value": "criteria"}}
                }],
                "selectionSet": {
                    "kind": "SelectionSet",
                    "selections": [{
                        "kind": "Field",
                        "name": {"kind": "Name", "value": "lodztrinityindividual"},
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [{"kind": "Field", "name": {"kind": "Name", "value": "id"}}, {
                                "kind": "Field",
                                "name": {"kind": "Name", "value": "surname"}
                            }, {"kind": "Field", "name": {"kind": "Name", "value": "givenname"}}, {
                                "kind": "Field",
                                "name": {"kind": "Name", "value": "sex"}
                            }, {"kind": "Field", "name": {"kind": "Name", "value": "deathpl"}}, {
                                "kind": "Field",
                                "name": {"kind": "Name", "value": "deathdt"}
                            }, {"kind": "Field", "name": {"kind": "Name", "value": "birthpl"}}, {
                                "kind": "Field",
                                "name": {"kind": "Name", "value": "birthdt"}
                            }, {"kind": "Field", "name": {"kind": "Name", "value": "birthfamilyid"}}, {
                                "kind": "Field",
                                "name": {"kind": "Name", "value": "spousefamilyid"}
                            }, {
                                "kind": "Field",
                                "name": {"kind": "Name", "value": "children"},
                                "selectionSet": {
                                    "kind": "SelectionSet",
                                    "selections": [{
                                        "kind": "Field",
                                        "name": {"kind": "Name", "value": "id"}
                                    }, {
                                        "kind": "Field",
                                        "name": {"kind": "Name", "value": "surname"}
                                    }, {"kind": "Field", "name": {"kind": "Name", "value": "givenname"}}]
                                }
                            }]
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
} as unknown as DocumentNode<LodzTrinityIndividualFindQuery, LodzTrinityIndividualFindQueryVariables>;