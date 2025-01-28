import { fetchDataWithRetry } from '../apollo';
import { getOdessaStPeteMetaText, findbyNameOdessaStPete } from './queries'
import {
  MetaTextType,
  OdessaStPeteFindQuery,
  OdessaStPeteFindQueryVariables,
  Query
} from './OperationsTypes';

const fetchOdessaStPeteMetaText = async (): Promise<string> => 
  fetchDataWithRetry<Query, MetaTextType>(getOdessaStPeteMetaText, result => result.OdessaStPeteMetaText.databaseName);

const fetchOdessaStPeteByName = async (variables: OdessaStPeteFindQueryVariables): Promise<any> => 
  fetchDataWithRetry<OdessaStPeteFindQuery, OdessaStPeteFindQueryVariables>(findbyNameOdessaStPete, result => result.OdessaStPeteFind, variables);

export {
  fetchOdessaStPeteMetaText,
  fetchOdessaStPeteByName,
};
