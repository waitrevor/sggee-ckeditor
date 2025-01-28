import { gql } from '@apollo/client/core';

export const getMpdMetaText = gql`
  query GetMpdMetaText {
    MpdMetaText {
      databaseName
    }
  }
`;

const childrenFragment = gql`
  fragment Children on Individual {
    children {
      id
      givenname
      surname
    }
  }
`;

const parentsFragment = gql`
  fragment Parents on Individual {
    parents {
      id
      givenname
      surname
      sex
    }
  }
`;

const individualInfoFragment = gql`
  fragment IndividualInfo on Individual {
    id
    givenname
    surname
    birthdt
    birthpl
    deathdt
    deathpl
    sex
    spousefamilyid
    siblings {
      givenname
      surname
      id
    }
    sources {
      sourceinfo
    }
  }
`;

export const findByNameMpd = gql`
  query SearchMpdByName($version: String!, $criteria: MpdFindByNameOptions!, $pagination: PaginationInput) {
    MpdIndividualByName(version: $version, criteria: $criteria, pagination: $pagination) {
      pageInfo {
        totalCount
      }
      individual {
        ...IndividualInfo
        ...Parents
      }
    }
  }
  ${individualInfoFragment}
  ${parentsFragment}
`;

export const findByIdMpd = gql`
  query SearchMpdById($version: String!, $individualId: String!) {
    MpdIndividualById(version: $version, id: $individualId) {
      ...IndividualInfo
      ...Parents
    }
  }
  ${individualInfoFragment}
  ${parentsFragment}
`;

export const findByIdAdditionalMpd = gql`
  query SearchMpdByIdAdditional($version: String!, $individualId: String!) {
    MpdIndividualById(version: $version, id: $individualId) {
      ...Children
      spouses {
        id
        givenname
        surname
        ...Children
        marriageinfo {
          marriageplace
          marriagedate
          relationshipid
        }
      }
    }
  }
  ${childrenFragment}
`;
