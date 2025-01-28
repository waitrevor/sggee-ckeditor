import { gql } from '@apollo/client/core';

export const getUkraineMetaText = gql`
  query FetchUkraineMetaText {
    UkraineMetaText {
      databaseName
    }
  }
`;

export const findByNameUkraineMap = gql`
  query UkraineFind($version: String!, $criteria: UkraineFindByNameOptions!, $pagination: PaginationInput) { 
    UkraineFind(version: $version, criteria: $criteria, pagination: $pagination) {
      ukraine {
        place
        mapcoord
      }
      pageInfo {
        totalCount
      }
    }
  }
`;