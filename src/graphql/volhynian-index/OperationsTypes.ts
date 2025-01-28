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

export type VolhynianBirths = {
  __typename?: "VolhynianBirths";
  surname?: Maybe<Scalars["String"]["output"]>;
  givenname?: Maybe<Scalars["String"]["output"]>;
  birth_date?: Maybe<Scalars["String"]["output"]>;
  birth_year?: Maybe<Scalars["String"]["output"]>;
  birth_place?: Maybe<Scalars["String"]["output"]>;
  bap_date?: Maybe<Scalars["String"]["output"]>;
  bap_year?: Maybe<Scalars["String"]["output"]>;
  bap_place?: Maybe<Scalars["String"]["output"]>;
  parish?: Maybe<Scalars["String"]["output"]>;
  father?: Maybe<Scalars["String"]["output"]>;
  mother_givenname?: Maybe<Scalars["String"]["output"]>;
  mother_surname?: Maybe<Scalars["String"]["output"]>;
  godfather?: Maybe<Scalars["String"]["output"]>;
  godmother?: Maybe<Scalars["String"]["output"]>;
  churchbook?: Maybe<Scalars["String"]["output"]>;
  pagenum?: Maybe<Scalars["String"]["output"]>;
  regnum?: Maybe<Scalars["String"]["output"]>;
  remarks?: Maybe<Scalars["String"]["output"]>;
};

export type VolhynianBirthsEdge = {
  __typename?: "VolhynianBirthsEdge";
  cursor: Scalars["String"]["output"];
  node: VolhynianBirths;
};

export type PaginatedVolhynianBirths = {
  __typename?: "PaginatedVolhynianBirths";
  edges: Array<VolhynianBirthsEdge>;
  pageInfo: PageInfo;
  volhynianbirths?: Maybe<Array<VolhynianBirths>>;
};

export type VolhynianDeaths = {
  __typename?: "VolhynianDeaths";
  surname?: Maybe<Scalars["String"]["output"]>;
  given_name?: Maybe<Scalars["String"]["output"]>;
  death_daymonth?: Maybe<Scalars["String"]["output"]>;
  year?: Maybe<Scalars["String"]["output"]>;
  place_buried?: Maybe<Scalars["String"]["output"]>;
  age?: Maybe<Scalars["String"]["output"]>;
  place_of_birth?: Maybe<Scalars["String"]["output"]>;
  status?: Maybe<Scalars["String"]["output"]>;
  parish?: Maybe<Scalars["String"]["output"]>;
  father?: Maybe<Scalars["String"]["output"]>;
  mothers_givenname?: Maybe<Scalars["String"]["output"]>;
  mothers_surname?: Maybe<Scalars["String"]["output"]>;
  spouse?: Maybe<Scalars["String"]["output"]>;
  cause_of_death?: Maybe<Scalars["String"]["output"]>;
  church_book?: Maybe<Scalars["String"]["output"]>;
  pagenum?: Maybe<Scalars["String"]["output"]>;
  regnum?: Maybe<Scalars["String"]["output"]>;
  remarks?: Maybe<Scalars["String"]["output"]>;
};

export type VolhynianDeathsEdge = {
  __typename?: "VolhynianDeathsEdge";
  cursor: Scalars["String"]["output"];
  node: VolhynianDeaths;
};

export type PaginatedVolhynianDeaths = {
  __typename?: "PaginatedVolhynianDeaths";
  edges: Array<VolhynianDeathsEdge>;
  pageInfo: PageInfo;
  volhyniandeaths?: Maybe<Array<VolhynianDeaths>>;
};

export type VolhynianMarriages = {
  __typename?: "VolhynianMarriages";
  groom_surname?: Maybe<Scalars["String"]["output"]>;
  groom_givenname?: Maybe<Scalars["String"]["output"]>;
  daymonth?: Maybe<Scalars["String"]["output"]>;
  year?: Maybe<Scalars["String"]["output"]>;
  parish?: Maybe<Scalars["String"]["output"]>;
  bride_surname?: Maybe<Scalars["String"]["output"]>;
  bride_givenname?: Maybe<Scalars["String"]["output"]>;
  churchbook?: Maybe<Scalars["String"]["output"]>;
  pagenum?: Maybe<Scalars["String"]["output"]>;
  regnum?: Maybe<Scalars["String"]["output"]>;
  remarks?: Maybe<Scalars["String"]["output"]>;
};

export type VolhynianMarriagesEdge = {
  __typename?: "VolhynianMarriagesEdge";
  cursor: Scalars["String"]["output"];
  node: VolhynianMarriages;
};

export type PaginatedVolhynianMarriages = {
  __typename?: "PaginatedVolhynianMarriages";
  edges: Array<VolhynianMarriagesEdge>;
  pageInfo: PageInfo;
  volhynianmarriages?: Maybe<Array<VolhynianMarriages>>;
};

export type Query = {
  __typename?: "Query";
  VolhynianBirthsMetaText: MetaTextType;
  VolhynianBirthFind: PaginatedVolhynianBirths;
  VolhynianDeathsMetaText: MetaTextType;
  VolhynianDeathFind: PaginatedVolhynianDeaths;
  VolhynianMarriagesMetaText: MetaTextType;
  VolhynianMarriageFind: PaginatedVolhynianMarriages;
  _service: _Service;
};

export type QueryVolhynianBirthFindArgs = {
  version: Scalars["String"]["input"];
  criteria: VolhynianBirthsFindByNameOptions;
  pagination?: InputMaybe<PaginationInput>;
};

export type QueryVolhynianDeathFindArgs = {
  version: Scalars["String"]["input"];
  criteria: VolhynianDeathsFindByNameOptions;
  pagination?: InputMaybe<PaginationInput>;
};

export type QueryVolhynianMarriageFindArgs = {
  version: Scalars["String"]["input"];
  criteria: VolhynianMarriagesFindByNameOptions;
  pagination?: InputMaybe<PaginationInput>;
};

export type VolhynianBirthsFindByNameOptions = {
  surname?: InputMaybe<FindOptions>;
  givenname?: InputMaybe<FindOptions>;
  birth_date?: InputMaybe<FindOptions>;
  birth_year?: InputMaybe<FindOptions>;
  birth_place?: InputMaybe<FindOptions>;
  bap_date?: InputMaybe<FindOptions>;
  bap_year?: InputMaybe<FindOptions>;
  bap_place?: InputMaybe<FindOptions>;
  parish?: InputMaybe<FindOptions>;
  father?: InputMaybe<FindOptions>;
  mother_givenname?: InputMaybe<FindOptions>;
  mother_surname?: InputMaybe<FindOptions>;
  godfather?: InputMaybe<FindOptions>;
  godmother?: InputMaybe<FindOptions>;
  churchbook?: InputMaybe<FindOptions>;
  pagenum?: InputMaybe<FindOptions>;
  regnum?: InputMaybe<FindOptions>;
  remarks?: InputMaybe<FindOptions>;
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

export type VolhynianDeathsFindByNameOptions = {
  surname?: InputMaybe<FindOptions>;
  given_name?: InputMaybe<FindOptions>;
  death_daymonth?: InputMaybe<FindOptions>;
  year?: InputMaybe<FindOptions>;
  place_buried?: InputMaybe<FindOptions>;
  age?: InputMaybe<FindOptions>;
  place_of_birth?: InputMaybe<FindOptions>;
  status?: InputMaybe<FindOptions>;
  parish?: InputMaybe<FindOptions>;
  father?: InputMaybe<FindOptions>;
  mothers_givenname?: InputMaybe<FindOptions>;
  mothers_surname?: InputMaybe<FindOptions>;
  spouse?: InputMaybe<FindOptions>;
  cause_of_death?: InputMaybe<FindOptions>;
  church_book?: InputMaybe<FindOptions>;
  pagenum?: InputMaybe<FindOptions>;
  regnum?: InputMaybe<FindOptions>;
  remarks?: InputMaybe<FindOptions>;
};

export type VolhynianMarriagesFindByNameOptions = {
  groom_surname?: InputMaybe<FindOptions>;
  groom_givenname?: InputMaybe<FindOptions>;
  daymonth?: InputMaybe<FindOptions>;
  year?: InputMaybe<FindOptions>;
  parish?: InputMaybe<FindOptions>;
  bride_surname?: InputMaybe<FindOptions>;
  bride_givenname?: InputMaybe<FindOptions>;
  churchbook?: InputMaybe<FindOptions>;
  pagenum?: InputMaybe<FindOptions>;
  regnum?: InputMaybe<FindOptions>;
  remarks?: InputMaybe<FindOptions>;
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

export type VolhynianBirthFindQueryVariables = Exact<{
  version: Scalars["String"]["input"];
  criteria: VolhynianBirthsFindByNameOptions;
}>;

export type VolhynianBirthFindQuery = {
  __typename?: "Query";
  VolhynianBirthFind: {
    __typename?: "PaginatedVolhynianBirths";
    volhynianbirths?: Array<{
      __typename?: "VolhynianBirths";
      surname?: string | null;
      givenname?: string | null;
      birth_date?: string | null;
      birth_year?: string | null;
      birth_place?: string | null;
      bap_date?: string | null;
      bap_year?: string | null;
      bap_place?: string | null;
      parish?: string | null;
      father?: string | null;
      mother_givenname?: string | null;
      mother_surname?: string | null;
      godfather?: string | null;
      godmother?: string | null;
      churchbook?: string | null;
      pagenum?: string | null;
      regnum?: string | null;
      remarks?: string | null;
    }> | null;
    pageInfo: { __typename?: "PageInfo"; totalCount: number };
  };
  VolhynianBirthsMetaText: {
    __typename?: "MetaTextType";
    databaseName: string;
  };
};

export type VolhynianDeathFindQueryVariables = Exact<{
  version: Scalars["String"]["input"];
  criteria: VolhynianDeathsFindByNameOptions;
}>;

export type VolhynianDeathFindQuery = {
  __typename?: "Query";
  VolhynianDeathFind: {
    __typename?: "PaginatedVolhynianDeaths";
    volhyniandeaths?: Array<{
      __typename?: "VolhynianDeaths";
      surname?: string | null;
      given_name?: string | null;
      death_daymonth?: string | null;
      year?: string | null;
      place_buried?: string | null;
      age?: string | null;
      place_of_birth?: string | null;
      status?: string | null;
      parish?: string | null;
      father?: string | null;
      mothers_givenname?: string | null;
      mothers_surname?: string | null;
      spouse?: string | null;
      cause_of_death?: string | null;
      church_book?: string | null;
      pagenum?: string | null;
      regnum?: string | null;
      remarks?: string | null;
    }> | null;
    pageInfo: { __typename?: "PageInfo"; totalCount: number };
  };
  VolhynianDeathsMetaText: {
    __typename?: "MetaTextType";
    databaseName: string;
  };
};

export type VolhynianMarriageFindQueryVariables = Exact<{
  version: Scalars["String"]["input"];
  criteria: VolhynianMarriagesFindByNameOptions;
}>;

export type VolhynianMarriageFindQuery = {
  __typename?: "Query";
  VolhynianMarriageFind: {
    __typename?: "PaginatedVolhynianMarriages";
    volhynianmarriages?: Array<{
      __typename?: "VolhynianMarriages";
      groom_surname?: string | null;
      groom_givenname?: string | null;
      daymonth?: string | null;
      year?: string | null;
      parish?: string | null;
      bride_surname?: string | null;
      bride_givenname?: string | null;
      churchbook?: string | null;
      pagenum?: string | null;
      regnum?: string | null;
      remarks?: string | null;
    }> | null;
    pageInfo: { __typename?: "PageInfo"; totalCount: number };
  };
  VolhynianMarriagesMetaText: {
    __typename?: "MetaTextType";
    databaseName: string;
  };
};

export const VolhynianBirthFindDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "VolhynianBirthFind" },
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
              name: { kind: "Name", value: "VolhynianBirthsFindByNameOptions" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "VolhynianBirthFind" },
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
                  name: { kind: "Name", value: "volhynianbirths" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "surname" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "givenname" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "birth_date" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "birth_year" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "birth_place" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "bap_date" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "bap_year" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "bap_place" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "parish" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "father" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "mother_givenname" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "mother_surname" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "godfather" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "godmother" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "churchbook" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "pagenum" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "regnum" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "remarks" },
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
            name: { kind: "Name", value: "VolhynianBirthsMetaText" },
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
  VolhynianBirthFindQuery,
  VolhynianBirthFindQueryVariables
>;
export const VolhynianDeathFindDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "VolhynianDeathFind" },
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
              name: { kind: "Name", value: "VolhynianDeathsFindByNameOptions" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "VolhynianDeathFind" },
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
                  name: { kind: "Name", value: "volhyniandeaths" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
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
                        name: { kind: "Name", value: "death_daymonth" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "year" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "place_buried" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "age" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "place_of_birth" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "status" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "parish" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "father" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "mothers_givenname" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "mothers_surname" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "spouse" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "cause_of_death" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "church_book" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "pagenum" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "regnum" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "remarks" },
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
            name: { kind: "Name", value: "VolhynianDeathsMetaText" },
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
  VolhynianDeathFindQuery,
  VolhynianDeathFindQueryVariables
>;
export const VolhynianMarriageFindDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "VolhynianMarriageFind" },
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
              name: {
                kind: "Name",
                value: "VolhynianMarriagesFindByNameOptions",
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "VolhynianMarriageFind" },
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
                  name: { kind: "Name", value: "volhynianmarriages" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "groom_surname" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "groom_givenname" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "daymonth" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "year" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "parish" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "bride_surname" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "bride_givenname" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "churchbook" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "pagenum" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "regnum" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "remarks" },
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
            name: { kind: "Name", value: "VolhynianMarriagesMetaText" },
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
  VolhynianMarriageFindQuery,
  VolhynianMarriageFindQueryVariables
>;
