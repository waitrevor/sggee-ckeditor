import {gql} from '@apollo/client/core';

export const getStPeteMetaText = gql`
    query FetchStPeteBirthsMetaText {
        StPetersburgBirthsMetaText {
        databaseName
        }
        StPetersburgMarriagesMetaText {
            databaseName
        }
        StPetersburgDeathsMetaText {
            databaseName
        }
    }
`;

export const findBirth = gql`
  query StPeteBirthFind($version: String!, $criteria: StPetersburgBirthsFindByNameOptions!, $pagination: PaginationInput) { 
      StPeteBirthFind(version: $version, criteria: $criteria, pagination: $pagination) {
          stpetersburgbirths {
              father
              film_or_item
              first_name
              hyperlink
              last_name
              mother_givenname
              mother_surname
              pagenum
              parish
              place
              register
              remarks
              day_month
              year
          }
          pageInfo {
              totalCount
          }
      }
  }
`;

export const findDeath = gql`
  query StPeteDeathFind($version: String!, $criteria: StPetersburgDeathsFindByNameOptions!, $pagination: PaginationInput) {
      StPeteDeathFind(version: $version, criteria: $criteria, pagination: $pagination) {
          stpetersburgdeaths {
              father
              film_or_item
              first_name
              hyperlink
              last_name
              mother_givenname
              mother_surname
              pagenum
              parish
              place
              register
              remarks
              day_month
              year
          }
          pageInfo {
              totalCount
          }
      }
  }
`;

export const findMarriage = gql`
  query StPeteMarriageFind($version: String!, $criteria: StPetersburgMarriagesFindByNameOptions!, $pagination: PaginationInput) {
      StPeteMarriageFind(version: $version, criteria: $criteria, pagination: $pagination) {
          stpetersburgmarriages {
              groom_last
              groom_first
              day_month
              year
              place
              bride_last
              bride_first
              film_or_item
              pagenum
              register
              remarks
              parish
              hyperlink
              prev_wife_or_groom_parent
              prev_husb_or_bride_parent
          }
          pageInfo {
              totalCount
          }
      }
  }
`;