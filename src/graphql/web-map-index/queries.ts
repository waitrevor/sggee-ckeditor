import { gql } from '@apollo/client/core';

export const getRussiaPolandMetaText = gql`
  query FetchRussiaPolandMetaText {
    RussiaPolandMetaText {
      databaseName
    }
  }
`;

export const findRussiaPolandMap = gql`
  query RussiaPolandFind($version: String!, $criteria: RussiaPolandFindByNameOptions!, $pagination: PaginationInput) { 
    RussiaPolandFind(version: $version, criteria: $criteria, pagination: $pagination) {
      russiapoland {
        place
        mapcoord
        originalspelling
      }
      pageInfo {
        totalCount
      }
    }
  }
`;