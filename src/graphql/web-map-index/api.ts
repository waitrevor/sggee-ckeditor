import { fetchDataWithRetry } from '../apollo';
import { getRussiaPolandMetaText, findRussiaPolandMap } from './queries';
import {
    RussiaPolandFindQuery,
    RussiaPolandFindQueryVariables,
    MetaTextType,
    Query
  } from './OperationsTypes';

const fetchRussiaPolandMetaText = async (): Promise<string> => 
  fetchDataWithRetry<Query, MetaTextType>(getRussiaPolandMetaText, result => result.RussiaPolandMetaText.databaseName);

const fetchRussiaPolandMapByName = async (variables: RussiaPolandFindQueryVariables): Promise<any> => 
  fetchDataWithRetry<RussiaPolandFindQuery, RussiaPolandFindQueryVariables>(findRussiaPolandMap, result => result.RussiaPolandFind, variables);

export {
	fetchRussiaPolandMetaText,
	fetchRussiaPolandMapByName
};
