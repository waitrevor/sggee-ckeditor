import { gql } from '@apollo/client/core';

export const getVolhynianMetaText = gql`
  query FetchStPeteBirthsMetaText {
    VolhynianBirthsMetaText {
      databaseName
    }
    VolhynianDeathsMetaText {
      databaseName
    }
    VolhynianMarriagesMetaText {
      databaseName
    }
  }
`;

export const findVolhynianBirth = gql`
  query VolhynianBirthFind($version: String!, $criteria: VolhynianBirthsFindByNameOptions!, $pagination: PaginationInput) {
    VolhynianBirthFind(version: $version, criteria: $criteria, pagination: $pagination) {
      volhynianbirths {
        surname
        givenname
        birth_date
        birth_year
        birth_place
        bap_date
        bap_year
        bap_place
        parish
        father
        mother_givenname
        mother_surname
        godfather
        godmother
        churchbook
        pagenum
        regnum
        remarks
      }
      pageInfo {
        totalCount
      }
    }
  }
`;

export const findVolhynianMarriage = gql`
  query VolhynianMarriageFind($version: String!, $criteria: VolhynianMarriagesFindByNameOptions!, $pagination: PaginationInput) {
    VolhynianMarriageFind(version: $version, criteria: $criteria, pagination: $pagination) {
      volhynianmarriages {
        groom_surname
        groom_givenname
        daymonth
        year
        parish
        bride_surname
        bride_givenname
        churchbook
        pagenum
        regnum
        remarks
      }
      pageInfo {
        totalCount
      }
    }
  }
`;


export const findVolhynianDeath = gql`
  query VolhynianDeathFind($version: String!, $criteria: VolhynianDeathsFindByNameOptions!, $pagination: PaginationInput) {
    VolhynianDeathFind(version: $version, criteria: $criteria, pagination: $pagination) {
      volhyniandeaths {
        surname
        given_name
        death_daymonth
        year
        place_buried
        age
        place_of_birth
        status
        parish
        father
        mothers_givenname
        mothers_surname
        spouse
        cause_of_death
        church_book
        pagenum
        regnum
        remarks
      }
      pageInfo {
        totalCount
      }
    }
  }
`;