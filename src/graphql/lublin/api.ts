import { fetchDataWithRetry } from '../apollo';
import { getLublinMetaText, findLublinBirth, findLublinMarriage, findLublinDeath } from './queries';
import {
  MetaTextType,
  LublinBirthFindQuery,
  LublinBirthFindQueryVariables,
  LublinMarriageFindQuery,
  LublinMarriageFindQueryVariables,
  LublinDeathFindQuery,
  LublinDeathFindQueryVariables,
  Query
} from './OperationsTypes';

const fetchLublinBirthMetaText = async (): Promise<string> => 
  fetchDataWithRetry<Query, MetaTextType>(getLublinMetaText, result => result.LublinBirthsMetaText.databaseName);

const fetchLublinMarriageMetaText = async (): Promise<string> => 
  fetchDataWithRetry<Query, MetaTextType>(getLublinMetaText, result => result.LublinMarriagesMetaText.databaseName);

const fetchLublinDeathMetaText = async (): Promise<string> => 
  fetchDataWithRetry<Query, MetaTextType>(getLublinMetaText, result => result.LublinDeathsMetaText.databaseName);

const fetchLublinBirths = async (variables: LublinBirthFindQueryVariables): Promise<any> => 
  fetchDataWithRetry<LublinBirthFindQuery, LublinBirthFindQueryVariables>(findLublinBirth, result => result.LublinBirthFind, variables);

const fetchLublinMarriages = async (variables: LublinMarriageFindQueryVariables): Promise<any> => 
  fetchDataWithRetry<LublinMarriageFindQuery, LublinMarriageFindQueryVariables>(findLublinMarriage, result => result.LublinMarriageFind, variables);

const fetchLublinDeaths = async (variables: LublinDeathFindQueryVariables): Promise<any> => 
  fetchDataWithRetry<LublinDeathFindQuery, LublinDeathFindQueryVariables>(findLublinDeath, result => result.LublinDeathFind, variables);

export {
  fetchLublinBirthMetaText,
  fetchLublinMarriageMetaText,
  fetchLublinDeathMetaText,
  fetchLublinBirths,
  fetchLublinMarriages,
  fetchLublinDeaths
};
