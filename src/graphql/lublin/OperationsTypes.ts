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

export type LublinBirths = {
  __typename?: "LublinBirths";
  surname_polish?: Maybe<Scalars["String"]["output"]>;
  given_name_polish?: Maybe<Scalars["String"]["output"]>;
  surname?: Maybe<Scalars["String"]["output"]>;
  given_name?: Maybe<Scalars["String"]["output"]>;
  event_year?: Maybe<Scalars["String"]["output"]>;
  event_month?: Maybe<Scalars["String"]["output"]>;
  father_or_spouse?: Maybe<Scalars["String"]["output"]>;
  mother_or_spouse_polish?: Maybe<Scalars["String"]["output"]>;
  mother_or_spouse?: Maybe<Scalars["String"]["output"]>;
  village?: Maybe<Scalars["String"]["output"]>;
  on_disk?: Maybe<Scalars["String"]["output"]>;
  in_file?: Maybe<Scalars["String"]["output"]>;
  reg?: Maybe<Scalars["String"]["output"]>;
  grooms_parents?: Maybe<Scalars["String"]["output"]>;
  brides_parents?: Maybe<Scalars["String"]["output"]>;
  special_notes?: Maybe<Scalars["String"]["output"]>;
  folder?: Maybe<Scalars["String"]["output"]>;
};

export type LublinBirthsEdge = {
  __typename?: "LublinBirthsEdge";
  cursor: Scalars["String"]["output"];
  node: LublinBirths;
};

export type PaginatedLublinBirths = {
  __typename?: "PaginatedLublinBirths";
  edges: Array<LublinBirthsEdge>;
  pageInfo: PageInfo;
  lublinbirths?: Maybe<Array<LublinBirths>>;
};

export type LublinDeaths = {
  __typename?: "LublinDeaths";
  surname_polish?: Maybe<Scalars["String"]["output"]>;
  given_name_polish?: Maybe<Scalars["String"]["output"]>;
  surname?: Maybe<Scalars["String"]["output"]>;
  given_name?: Maybe<Scalars["String"]["output"]>;
  event_year?: Maybe<Scalars["String"]["output"]>;
  event_month?: Maybe<Scalars["String"]["output"]>;
  father_or_spouse?: Maybe<Scalars["String"]["output"]>;
  mother_or_spouse_polish?: Maybe<Scalars["String"]["output"]>;
  mother_or_spouse?: Maybe<Scalars["String"]["output"]>;
  village?: Maybe<Scalars["String"]["output"]>;
  on_disk?: Maybe<Scalars["String"]["output"]>;
  in_file?: Maybe<Scalars["String"]["output"]>;
  reg?: Maybe<Scalars["String"]["output"]>;
  grooms_parents?: Maybe<Scalars["String"]["output"]>;
  brides_parents?: Maybe<Scalars["String"]["output"]>;
  spouses?: Maybe<Scalars["String"]["output"]>;
  special_notes?: Maybe<Scalars["String"]["output"]>;
  folder?: Maybe<Scalars["String"]["output"]>;
};

export type LublinDeathsEdge = {
  __typename?: "LublinDeathsEdge";
  cursor: Scalars["String"]["output"];
  node: LublinDeaths;
};

export type PaginatedLublinDeaths = {
  __typename?: "PaginatedLublinDeaths";
  edges: Array<LublinDeathsEdge>;
  pageInfo: PageInfo;
  lublindeaths?: Maybe<Array<LublinDeaths>>;
};

export type LublinMarriages = {
  __typename?: "LublinMarriages";
  surname_polish?: Maybe<Scalars["String"]["output"]>;
  given_name_polish?: Maybe<Scalars["String"]["output"]>;
  surname?: Maybe<Scalars["String"]["output"]>;
  given_name?: Maybe<Scalars["String"]["output"]>;
  event_year?: Maybe<Scalars["String"]["output"]>;
  event_month?: Maybe<Scalars["String"]["output"]>;
  father_or_spouse?: Maybe<Scalars["String"]["output"]>;
  mother_or_spouse_polish?: Maybe<Scalars["String"]["output"]>;
  mother_or_spouse?: Maybe<Scalars["String"]["output"]>;
  village?: Maybe<Scalars["String"]["output"]>;
  on_disk?: Maybe<Scalars["String"]["output"]>;
  in_file?: Maybe<Scalars["String"]["output"]>;
  reg?: Maybe<Scalars["String"]["output"]>;
  grooms_parents?: Maybe<Scalars["String"]["output"]>;
  brides_parents?: Maybe<Scalars["String"]["output"]>;
  special_notes?: Maybe<Scalars["String"]["output"]>;
  folder?: Maybe<Scalars["String"]["output"]>;
  spouses?: Maybe<Scalars["String"]["output"]>;
};

export type LublinMarriagesEdge = {
  __typename?: "LublinMarriagesEdge";
  cursor: Scalars["String"]["output"];
  node: LublinMarriages;
};

export type PaginatedLublinMarriages = {
  __typename?: "PaginatedLublinMarriages";
  edges: Array<LublinMarriagesEdge>;
  pageInfo: PageInfo;
  lublinmarriages?: Maybe<Array<LublinMarriages>>;
};

export type Query = {
  __typename?: "Query";
  LublinBirthsMetaText: MetaTextType;
  LublinBirthFind: PaginatedLublinBirths;
  LublinDeathsMetaText: MetaTextType;
  LublinDeathFind: PaginatedLublinDeaths;
  LublinMarriagesMetaText: MetaTextType;
  LublinMarriageFind: PaginatedLublinMarriages;
  _service: _Service;
};

export type QueryLublinBirthFindArgs = {
  version: Scalars["String"]["input"];
  criteria: LublinBirthsFindByNameOptions;
  pagination?: InputMaybe<PaginationInput>;
};

export type QueryLublinDeathFindArgs = {
  version: Scalars["String"]["input"];
  criteria: LublinDeathsFindByNameOptions;
  pagination?: InputMaybe<PaginationInput>;
};

export type QueryLublinMarriageFindArgs = {
  version: Scalars["String"]["input"];
  criteria: LublinMarriagesFindByNameOptions;
  pagination?: InputMaybe<PaginationInput>;
};

export type LublinBirthsFindByNameOptions = {
  surname_polish?: InputMaybe<FindOptions>;
  given_name_polish?: InputMaybe<FindOptions>;
  surname?: InputMaybe<FindOptions>;
  given_name?: InputMaybe<FindOptions>;
  event_year?: InputMaybe<FindOptions>;
  event_month?: InputMaybe<FindOptions>;
  father_or_spouse?: InputMaybe<FindOptions>;
  mother_or_spouse_polish?: InputMaybe<FindOptions>;
  mother_or_spouse?: InputMaybe<FindOptions>;
  village?: InputMaybe<FindOptions>;
  on_disk?: InputMaybe<FindOptions>;
  in_file?: InputMaybe<FindOptions>;
  reg?: InputMaybe<FindOptions>;
  grooms_parents?: InputMaybe<FindOptions>;
  brides_parents?: InputMaybe<FindOptions>;
  special_notes?: InputMaybe<FindOptions>;
  folder?: InputMaybe<FindOptions>;
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

export type LublinDeathsFindByNameOptions = {
  surname_polish?: InputMaybe<FindOptions>;
  given_name_polish?: InputMaybe<FindOptions>;
  surname?: InputMaybe<FindOptions>;
  given_name?: InputMaybe<FindOptions>;
  event_year?: InputMaybe<FindOptions>;
  event_month?: InputMaybe<FindOptions>;
  father_or_spouse?: InputMaybe<FindOptions>;
  mother_or_spouse_polish?: InputMaybe<FindOptions>;
  mother_or_spouse?: InputMaybe<FindOptions>;
  village?: InputMaybe<FindOptions>;
  on_disk?: InputMaybe<FindOptions>;
  in_file?: InputMaybe<FindOptions>;
  reg?: InputMaybe<FindOptions>;
  grooms_parents?: InputMaybe<FindOptions>;
  brides_parents?: InputMaybe<FindOptions>;
  spouses?: InputMaybe<FindOptions>;
  special_notes?: InputMaybe<FindOptions>;
  folder?: InputMaybe<FindOptions>;
};

export type LublinMarriagesFindByNameOptions = {
  surname_polish?: InputMaybe<FindOptions>;
  given_name_polish?: InputMaybe<FindOptions>;
  surname?: InputMaybe<FindOptions>;
  given_name?: InputMaybe<FindOptions>;
  event_year?: InputMaybe<FindOptions>;
  event_month?: InputMaybe<FindOptions>;
  father_or_spouse?: InputMaybe<FindOptions>;
  mother_or_spouse_polish?: InputMaybe<FindOptions>;
  mother_or_spouse?: InputMaybe<FindOptions>;
  village?: InputMaybe<FindOptions>;
  on_disk?: InputMaybe<FindOptions>;
  in_file?: InputMaybe<FindOptions>;
  reg?: InputMaybe<FindOptions>;
  grooms_parents?: InputMaybe<FindOptions>;
  brides_parents?: InputMaybe<FindOptions>;
  special_notes?: InputMaybe<FindOptions>;
  folder?: InputMaybe<FindOptions>;
  spouses?: InputMaybe<FindOptions>;
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

export type LublinBirthFindQueryVariables = Exact<{
  version: Scalars["String"]["input"];
  criteria: LublinBirthsFindByNameOptions;
}>;

export type LublinBirthFindQuery = {
  __typename?: "Query";
  LublinBirthFind: {
    __typename?: "PaginatedLublinBirths";
    lublinbirths?: Array<{
      __typename?: "LublinBirths";
      surname_polish?: string | null;
      given_name_polish?: string | null;
      surname?: string | null;
      given_name?: string | null;
      event_year?: string | null;
      event_month?: string | null;
      father_or_spouse?: string | null;
      mother_or_spouse_polish?: string | null;
      mother_or_spouse?: string | null;
      village?: string | null;
      on_disk?: string | null;
      in_file?: string | null;
      reg?: string | null;
      grooms_parents?: string | null;
      brides_parents?: string | null;
      special_notes?: string | null;
      folder?: string | null;
    }> | null;
    pageInfo: { __typename?: "PageInfo"; totalCount: number };
  };
  LublinBirthsMetaText: { __typename?: "MetaTextType"; databaseName: string };
};

export type LublinDeathFindQueryVariables = Exact<{
  version: Scalars["String"]["input"];
  criteria: LublinDeathsFindByNameOptions;
}>;

export type LublinDeathFindQuery = {
  __typename?: "Query";
  LublinDeathFind: {
    __typename?: "PaginatedLublinDeaths";
    lublindeaths?: Array<{
      __typename?: "LublinDeaths";
      surname_polish?: string | null;
      given_name_polish?: string | null;
      surname?: string | null;
      given_name?: string | null;
      event_year?: string | null;
      event_month?: string | null;
      father_or_spouse?: string | null;
      mother_or_spouse_polish?: string | null;
      mother_or_spouse?: string | null;
      village?: string | null;
      on_disk?: string | null;
      in_file?: string | null;
      reg?: string | null;
      grooms_parents?: string | null;
      brides_parents?: string | null;
      spouses?: string | null;
      special_notes?: string | null;
      folder?: string | null;
    }> | null;
    pageInfo: { __typename?: "PageInfo"; totalCount: number };
  };
  LublinDeathsMetaText: { __typename?: "MetaTextType"; databaseName: string };
};

export type LublinMarriageFindQueryVariables = Exact<{
  version: Scalars["String"]["input"];
  criteria: LublinMarriagesFindByNameOptions;
}>;

export type LublinMarriageFindQuery = {
  __typename?: "Query";
  LublinMarriageFind: {
    __typename?: "PaginatedLublinMarriages";
    lublinmarriages?: Array<{
      __typename?: "LublinMarriages";
      surname_polish?: string | null;
      given_name_polish?: string | null;
      surname?: string | null;
      given_name?: string | null;
      event_year?: string | null;
      event_month?: string | null;
      father_or_spouse?: string | null;
      mother_or_spouse_polish?: string | null;
      mother_or_spouse?: string | null;
      village?: string | null;
      on_disk?: string | null;
      in_file?: string | null;
      reg?: string | null;
      grooms_parents?: string | null;
      brides_parents?: string | null;
      special_notes?: string | null;
      folder?: string | null;
      spouses?: string | null;
    }> | null;
    pageInfo: { __typename?: "PageInfo"; totalCount: number };
  };
  LublinMarriagesMetaText: {
    __typename?: "MetaTextType";
    databaseName: string;
  };
};

export const LublinBirthFindDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "LublinBirthFind" },
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
              name: { kind: "Name", value: "LublinBirthsFindByNameOptions" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "LublinBirthFind" },
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
                  name: { kind: "Name", value: "lublinbirths" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "surname_polish" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "given_name_polish" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "surname" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "given_name" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "event_year" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "event_month" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "father_or_spouse" },
                      },
                      {
                        kind: "Field",
                        name: {
                          kind: "Name",
                          value: "mother_or_spouse_polish",
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "mother_or_spouse" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "village" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "on_disk" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "in_file" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "reg" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "grooms_parents" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "brides_parents" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "special_notes" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "folder" },
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
            name: { kind: "Name", value: "LublinBirthsMetaText" },
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
} as unknown as DocumentNode<
  LublinBirthFindQuery,
  LublinBirthFindQueryVariables
>;
export const LublinDeathFindDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "LublinDeathFind" },
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
              name: { kind: "Name", value: "LublinDeathsFindByNameOptions" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "LublinDeathFind" },
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
                  name: { kind: "Name", value: "lublindeaths" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "surname_polish" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "given_name_polish" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "surname" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "given_name" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "event_year" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "event_month" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "father_or_spouse" },
                      },
                      {
                        kind: "Field",
                        name: {
                          kind: "Name",
                          value: "mother_or_spouse_polish",
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "mother_or_spouse" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "village" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "on_disk" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "in_file" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "reg" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "grooms_parents" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "brides_parents" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "spouses" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "special_notes" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "folder" },
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
            name: { kind: "Name", value: "LublinDeathsMetaText" },
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
} as unknown as DocumentNode<
  LublinDeathFindQuery,
  LublinDeathFindQueryVariables
>;
export const LublinMarriageFindDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "LublinMarriageFind" },
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
              name: { kind: "Name", value: "LublinMarriagesFindByNameOptions" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "LublinMarriageFind" },
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
                  name: { kind: "Name", value: "lublinmarriages" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "surname_polish" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "given_name_polish" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "surname" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "given_name" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "event_year" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "event_month" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "father_or_spouse" },
                      },
                      {
                        kind: "Field",
                        name: {
                          kind: "Name",
                          value: "mother_or_spouse_polish",
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "mother_or_spouse" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "village" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "on_disk" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "in_file" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "reg" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "grooms_parents" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "brides_parents" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "special_notes" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "folder" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "spouses" },
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
            name: { kind: "Name", value: "LublinMarriagesMetaText" },
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
} as unknown as DocumentNode<
  LublinMarriageFindQuery,
  LublinMarriageFindQueryVariables
>;
