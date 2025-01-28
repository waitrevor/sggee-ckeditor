import { gql } from '@apollo/client/core';

export const getMembershipMetaText = gql`
  query FetchMembershipMetaText {
    MembershipMetaText {
      databaseName
    }
  }
`;

export const findMembership = gql`
  query MembershipFind($version: String!, $criteria: MembershipFindByNameOptions!, $pagination: PaginationInput) {
    MembershipFind(version: $version, criteria: $criteria, pagination: $pagination) {
      membership {
        memnum
        givenname
        surname
        email
      }
      pageInfo {
        totalCount
      }
    }
  }
`;
