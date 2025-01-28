import { gql } from '@apollo/client/core';

export const getLublinMetaText = gql`
  query FetchLublinMetaText {
    LublinBirthsMetaText {
      databaseName
    }
    LublinDeathsMetaText {
      databaseName
    }
    LublinMarriagesMetaText {
      databaseName
    }
  }
`;

export const findLublinBirth = gql`
  query LublinBirthFind($version: String!, $criteria: LublinBirthsFindByNameOptions!, $pagination: PaginationInput) {
    LublinBirthFind(version: $version, criteria: $criteria, pagination: $pagination) {
      lublinbirths {
        surname_polish
        given_name_polish
        surname
        given_name
        event_year
        event_month
        father_or_spouse
        mother_or_spouse
        village
        on_disk
        in_file
        reg
        grooms_parents
        brides_parents
        special_notes
        folder
      }
      pageInfo {
        totalCount
      }
    }
  }
`;

export const findLublinMarriage = gql`
  query LublinMarriageFind($version: String!, $criteria: LublinMarriagesFindByNameOptions!, $pagination: PaginationInput) {
    LublinMarriageFind(version: $version, criteria: $criteria, pagination: $pagination) {
      lublinmarriages {
        surname_polish
        given_name_polish
        surname
        given_name
        event_year
        event_month
        father_or_spouse
        mother_or_spouse
        mother_or_spouse_polish
        village
        on_disk
        in_file
        reg
        grooms_parents
        brides_parents
        special_notes
        folder
        spouses
      }
      pageInfo {
        totalCount
      }
    }
  }
`;

export const findLublinDeath = gql`
  query LublinDeathFind($version: String!, $criteria: LublinDeathsFindByNameOptions!, $pagination: PaginationInput) {
    LublinDeathFind(version: $version, criteria: $criteria, pagination: $pagination) {
      lublindeaths {
        surname_polish
        given_name_polish
        surname
        given_name
        event_year
        event_month
        father_or_spouse
        mother_or_spouse
        village
        on_disk
        in_file
        reg
        grooms_parents
        brides_parents
        spouses
        special_notes
        folder
      }
      pageInfo {
        totalCount
      }
    }
  }
`;
