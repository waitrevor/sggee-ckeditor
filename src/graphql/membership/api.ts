import { fetchDataWithRetry } from '../apollo';
import { getMembershipMetaText, findMembership } from './queries'
import {
  MetaTextType,
  MembershipFindQuery,
  MembershipFindQueryVariables,
  Query
} from './OperationsTypes';

const fetchMembershipMetaText = async (): Promise<string> => 
  fetchDataWithRetry<Query, MetaTextType>(getMembershipMetaText, result => result.MembershipMetaText.databaseName);

const fetchMembership = async (variables: MembershipFindQueryVariables): Promise<any> => 
  fetchDataWithRetry<MembershipFindQuery, MembershipFindQueryVariables>(findMembership, result => result.MembershipFind, variables);

export {
  fetchMembershipMetaText,
  fetchMembership,
};
