import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core"
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
	[K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
	T extends { [key: string]: unknown },
	K extends keyof T
> = { [_ in K]?: never }
export type Incremental<T> =
	| T
	| {
			[P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never
	  }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: { input: string; output: string }
	String: { input: string; output: string }
	Boolean: { input: boolean; output: boolean }
	Int: { input: number; output: number }
	Float: { input: number; output: number }
	link__Import: { input: any; output: any }
	federation__FieldSet: { input: any; output: any }
	_Any: { input: any; output: any }
}

export type PageInfo = {
	__typename?: "PageInfo"
	totalCount: Scalars["Int"]["output"]
	hasNextPage: Scalars["Boolean"]["output"]
	hasPreviousPage: Scalars["Boolean"]["output"]
	startCursor?: Maybe<Scalars["String"]["output"]>
	endCursor?: Maybe<Scalars["String"]["output"]>
	returnMetaText?: Maybe<Scalars["String"]["output"]>
}

export type MetaTextType = {
	__typename?: "MetaTextType"
	databaseName: Scalars["String"]["output"]
}

export type ParishRecordsIdx = {
	__typename?: "ParishRecordsIdx"
	surname?: Maybe<Scalars["String"]["output"]>
	name?: Maybe<Scalars["String"]["output"]>
	recordtype?: Maybe<Scalars["String"]["output"]>
	eventyear?: Maybe<Scalars["String"]["output"]>
	spouse?: Maybe<Scalars["String"]["output"]>
	parish?: Maybe<Scalars["String"]["output"]>
	reg?: Maybe<Scalars["String"]["output"]>
	filmnum?: Maybe<Scalars["String"]["output"]>
	extractor?: Maybe<Scalars["String"]["output"]>
	page?: Maybe<Scalars["String"]["output"]>
}

export type ParishRecordsIdxEdge = {
	__typename?: "ParishRecordsIdxEdge"
	cursor: Scalars["String"]["output"]
	node: ParishRecordsIdx
}

export type PaginatedParishRecordsIdx = {
	__typename?: "PaginatedParishRecordsIdx"
	edges: Array<ParishRecordsIdxEdge>
	pageInfo: PageInfo
	parishrecordsidx?: Maybe<Array<ParishRecordsIdx>>
}

export type Query = {
	__typename?: "Query"
	ParishRecordsIdxMetaText: MetaTextType
	ParishRecordsIdxFind: PaginatedParishRecordsIdx
	_service: _Service
}

export type QueryParishRecordsIdxFindArgs = {
	version: Scalars["String"]["input"]
	criteria: ParishRecordsIdxFindByNameOptions
	pagination?: InputMaybe<PaginationInput>
}

export type ParishRecordsIdxFindByNameOptions = {
	surname?: InputMaybe<FindOptions>
	name?: InputMaybe<FindOptions>
	recordtype?: InputMaybe<FindOptions>
	eventyear?: InputMaybe<FindOptions>
	spouse?: InputMaybe<FindOptions>
	parish?: InputMaybe<FindOptions>
	reg?: InputMaybe<FindOptions>
	filmnum?: InputMaybe<FindOptions>
	extractor?: InputMaybe<FindOptions>
	page?: InputMaybe<FindOptions>
}

export type FindOptions = {
	value?: InputMaybe<Scalars["String"]["input"]>
	searchType?: InputMaybe<SearchType>
}

export enum SearchType {
	Ilike = "ilike",
	Substring = "substring",
	Exact = "exact",
	Dm = "dm",
}

export type PaginationInput = {
	/** returns the first n elements from the list. */
	first?: InputMaybe<Scalars["Int"]["input"]>
	/** returns the last n elements from the list. */
	last?: InputMaybe<Scalars["Int"]["input"]>
	/** ignore the first n elements from the list. */
	skip?: InputMaybe<Scalars["Int"]["input"]>
	/** returns the elements in the list that come after the specified cursor. */
	after?: InputMaybe<Scalars["String"]["input"]>
	/** returns the elements in the list that come before the specified cursor. */
	before?: InputMaybe<Scalars["String"]["input"]>
}

export enum Link__Purpose {
	/** `SECURITY` features provide metadata necessary to securely resolve fields. */
	Security = "SECURITY",
	/** `EXECUTION` features provide metadata necessary for operation execution. */
	Execution = "EXECUTION",
}

export type _Service = {
	__typename?: "_Service"
	sdl?: Maybe<Scalars["String"]["output"]>
}

export type ParishrecordsidxQueryVariables = Exact<{
	version: Scalars["String"]["input"]
	criteria: ParishRecordsIdxFindByNameOptions
	pagination?: InputMaybe<PaginationInput>
}>

export type ParishrecordsidxQuery = {
	__typename?: "Query"
	ParishRecordsIdxFind: {
		__typename?: "PaginatedParishRecordsIdx"
		parishrecordsidx?: Array<{
			__typename?: "ParishRecordsIdx"
			surname?: string | null
			name?: string | null
			recordtype?: string | null
			eventyear?: string | null
			spouse?: string | null
			parish?: string | null
			reg?: string | null
			filmnum?: string | null
			extractor?: string | null
			page?: string | null
		}> | null
	}
}

export const ParishrecordsidxDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "Parishrecordsidx" },
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
								value: "ParishRecordsIdxFindByNameOptions",
							},
						},
					},
				},
				{
					kind: "VariableDefinition",
					variable: {
						kind: "Variable",
						name: { kind: "Name", value: "pagination" },
					},
					type: {
						kind: "NamedType",
						name: { kind: "Name", value: "PaginationInput" },
					},
				},
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "ParishRecordsIdxFind" },
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
							{
								kind: "Argument",
								name: { kind: "Name", value: "pagination" },
								value: {
									kind: "Variable",
									name: { kind: "Name", value: "pagination" },
								},
							},
						],
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "parishrecordsidx" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "surname" },
											},
											{ kind: "Field", name: { kind: "Name", value: "name" } },
											{
												kind: "Field",
												name: { kind: "Name", value: "recordtype" },
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "eventyear" },
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "spouse" },
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "parish" },
											},
											{ kind: "Field", name: { kind: "Name", value: "reg" } },
											{
												kind: "Field",
												name: { kind: "Name", value: "filmnum" },
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "extractor" },
											},
											{ kind: "Field", name: { kind: "Name", value: "page" } },
										],
									},
								},
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<
	ParishrecordsidxQuery,
	ParishrecordsidxQueryVariables
>
