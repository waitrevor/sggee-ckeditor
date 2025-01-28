import { gql } from '@apollo/client/core';

export const getOdessaStPeteMetaText = gql`
  query FetchOdessaStPeteMetaText {
    OdessaStPeteMetaText {
      databaseName
    }
  }
`;

export const findbyNameOdessaStPete = gql`
  query OdessaStPeteFind($version: String!, $criteria: OdessaStPeteFindByNameOptions!, $pagination: PaginationInput) {
    OdessaStPeteFind(version: $version, criteria: $criteria, pagination: $pagination) {
      odessastpete {
        film_or_item
        register
        pagenum
        last_name
        first_name
        remarks
        source
        place
      }
      pageInfo {
        totalCount
      }
    }
  }
`;
