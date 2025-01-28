import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  link__Import: { input: any; output: any };
  federation__FieldSet: { input: any; output: any };
  _Any: { input: any; output: any };
};

export type PageInfo = {
  __typename?: "PageInfo";
  totalCount: Scalars["Int"]["output"];
  hasNextPage: Scalars["Boolean"]["output"];
  hasPreviousPage: Scalars["Boolean"]["output"];
  startCursor?: Maybe<Scalars["String"]["output"]>;
  endCursor?: Maybe<Scalars["String"]["output"]>;
  returnMetaText?: Maybe<Scalars["String"]["output"]>;
};

export type MetaTextType = {
  __typename?: "MetaTextType";
  databaseName: Scalars["String"]["output"];
};

export type Ukraine = {
  __typename?: "Ukraine";
  place: Scalars["String"]["output"];
  mapcoord?: Maybe<Scalars["String"]["output"]>;
};

export type UkraineEdge = {
  __typename?: "UkraineEdge";
  cursor: Scalars["String"]["output"];
  node: Ukraine;
};

export type PaginatedUkraine = {
  __typename?: "PaginatedUkraine";
  edges: Array<UkraineEdge>;
  pageInfo: PageInfo;
  ukraine?: Maybe<Array<Ukraine>>;
};

export type Query = {
  __typename?: "Query";
  UkraineMetaText: MetaTextType;
  UkraineFind: PaginatedUkraine;
  _service: _Service;
};

export type QueryUkraineFindArgs = {
  version: Scalars["String"]["input"];
  criteria: UkraineFindByNameOptions;
  pagination?: InputMaybe<PaginationInput>;
};

export type UkraineFindByNameOptions = {
  place?: InputMaybe<FindOptions>;
  mapcoord?: InputMaybe<FindOptions>;
};

export type FindOptions = {
  value?: InputMaybe<Scalars["String"]["input"]>;
  searchType?: InputMaybe<SearchType>;
};

export enum SearchType {
  Ilike = "ilike",
  Substring = "substring",
  Exact = "exact",
  Dm = "dm",
}

export type PaginationInput = {
  /** returns the first n elements from the list. */
  first?: InputMaybe<Scalars["Int"]["input"]>;
  /** returns the last n elements from the list. */
  last?: InputMaybe<Scalars["Int"]["input"]>;
  /** ignore the first n elements from the list. */
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  /** returns the elements in the list that come after the specified cursor. */
  after?: InputMaybe<Scalars["String"]["input"]>;
  /** returns the elements in the list that come before the specified cursor. */
  before?: InputMaybe<Scalars["String"]["input"]>;
};

export enum Link__Purpose {
  /** `SECURITY` features provide metadata necessary to securely resolve fields. */
  Security = "SECURITY",
  /** `EXECUTION` features provide metadata necessary for operation execution. */
  Execution = "EXECUTION",
}

export type _Service = {
  __typename?: "_Service";
  sdl?: Maybe<Scalars["String"]["output"]>;
};

export type UkraineFindQueryVariables = Exact<{
  version: Scalars["String"]["input"];
  criteria: UkraineFindByNameOptions;
}>;

export type UkraineFindQuery = {
  __typename?: "Query";
  UkraineFind: {
    __typename?: "PaginatedUkraine";
    ukraine?: Array<{
      __typename?: "Ukraine";
      place: string;
      mapcoord?: string | null;
    }> | null;
    pageInfo: { __typename?: "PageInfo"; totalCount: number };
  };
  UkraineMetaText: { __typename?: "MetaTextType"; databaseName: string };
};

export const UkraineFindDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "UkraineFind" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "version" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "criteria" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UkraineFindByNameOptions" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "UkraineFind" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "version" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "version" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "criteria" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "criteria" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "ukraine" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "place" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "mapcoord" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "totalCount" },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "UkraineMetaText" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "databaseName" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UkraineFindQuery, UkraineFindQueryVariables>;
