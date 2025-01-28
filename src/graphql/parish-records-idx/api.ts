import { fetchDataWithRetry } from '../apollo';
import { getParishRecordsIdxMetaText, findbyNameParishRecordsIdx } from './queries'
import {
  MetaTextType,
  ParishrecordsidxQuery,
  ParishrecordsidxQueryVariables,
  Query
} from './OperationsTypes';

const fetchParishRecordsIdxMetaText = async (): Promise<string> => 
  fetchDataWithRetry<Query, MetaTextType>(getParishRecordsIdxMetaText, result => result.ParishRecordsIdxMetaText.databaseName);

const fetchParishRecordsIdxByName = async (variables: ParishrecordsidxQueryVariables): Promise<any> => 
  fetchDataWithRetry<ParishrecordsidxQuery, ParishrecordsidxQueryVariables>(findbyNameParishRecordsIdx, result => result.ParishRecordsIdxFind, variables);

export {
  fetchParishRecordsIdxMetaText,
  fetchParishRecordsIdxByName,
};
