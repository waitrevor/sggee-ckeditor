import { gql } from '@apollo/client/core';

export const getParishRecordsIdxMetaText = gql`
  query FetchParishRecordsIdxMetaText {
    ParishRecordsIdxMetaText {
      databaseName
    }
  }
`;

export const findbyNameParishRecordsIdx = gql`
  query ParishRecordsIdxFind($version: String!, $criteria: ParishRecordsIdxFindByNameOptions!, $pagination: PaginationInput) {
    ParishRecordsIdxFind(version: $version, criteria: $criteria, pagination: $pagination) {
      parishrecordsidx {
        surname
        name
        recordtype
        eventyear
        spouse
        parish
        reg
        filmnum
        extractor
        page
      }
      pageInfo {
        totalCount
      }
    }
  }
`;
