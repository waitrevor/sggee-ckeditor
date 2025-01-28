import { gql } from '@apollo/client/core';

export const getBreyerMetaText = gql`
  query FetchBreyerMetaText {
    BreyerMapMetaText {
      databaseName
    }
  }
`;

export const findByNameBreyerMap = gql`
  query BreyerMapFind($version: String!, $criteria: BreyerMapFindByNameOptions!, $pagination: PaginationInput) { 
    BreyerMapFind(version: $version, criteria: $criteria, pagination: $pagination) {
      breyermap {
        id
        citytownvillagefeature
        province
        mapgrid
      }
      pageInfo {
        totalCount
      }
    }
  }
`;