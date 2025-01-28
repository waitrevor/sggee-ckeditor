import { fetchDataWithRetry } from '../apollo';
import { getBreyerMetaText, findByNameBreyerMap } from './queries';
import { BreyerMapFindQuery, BreyerMapFindQueryVariables, MetaTextType, Query } from './OperationsTypes';

const fetchBreyerMetaText = async (): Promise<string> => 
  fetchDataWithRetry<Query, MetaTextType>(getBreyerMetaText, result => result.BreyerMapMetaText.databaseName);

const fetchBreyerMapByName = async (variables: BreyerMapFindQueryVariables): Promise<any> => 
  fetchDataWithRetry<BreyerMapFindQuery, BreyerMapFindQueryVariables>(findByNameBreyerMap, result => result.BreyerMapFind, variables);

export {
  fetchBreyerMetaText,
  fetchBreyerMapByName
};
