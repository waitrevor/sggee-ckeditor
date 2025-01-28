import { gql } from '@apollo/client/core';

export const getLodzTrinityMetaText = gql`
  query GetLodzTrinityMetaText {
    LodzTrinityIndividualMetaText {
      databaseName
    }
  }
`;

const childrenFragment = gql`
  fragment LodzChildren on LodzTrinityIndividual {
    children {
      id
      birthfamilyid
      givenname
      surname
    }
  }
`;

const parentsFragment = gql`
  fragment LodzParents on LodzTrinityIndividual {
    parents {
      id
      sex
      givenname
      surname
    }
  }
`;

const siblingsFragment = gql`
  fragment Siblings on LodzTrinityIndividual {
    siblings {
      id
      givenname
      surname
    }
  }
`;

const spousesFragment = gql`
  fragment LodzSpouses on LodzTrinityIndividual {
    spouses {
      id
      givenname
      surname
      birthfamilyid
      spousefamilyid
    }
  }
`;

export const findByNameLodzTrinity = gql`
  query LodzTrinityIndividualFind($version: String!, $criteria: LodzTrinityIndividualFindByNameOptions!, $pagination: PaginationInput) {
    LodzTrinityIndividualFind(version: $version, criteria: $criteria, pagination: $pagination) {
      lodztrinityindividual {
        id
        surname
        givenname
        sex
        deathpl
        deathdt
        birthpl
        birthdt
        ...Siblings
        ...LodzParents
        sources {
          sourceinfo
        }
      }
      pageInfo {
        totalCount
      }
    }
  }
  ${siblingsFragment}
  ${parentsFragment}
`;

export const findAdditionalLodzTrinity = gql`
  query LodzTrinityIndividualFind($version: String!, $criteria: LodzTrinityIndividualFindByNameOptions!, $pagination: PaginationInput) {
    LodzTrinityIndividualFind(version: $version, criteria: $criteria, pagination: $pagination) {
      lodztrinityindividual {
        id
        ...LodzChildren
        ...LodzSpouses
        marriageinfo {
          marriagedate
          marriageplace
          relationshipid
        }
      }
    }
  }
  ${childrenFragment}
  ${spousesFragment}
`;