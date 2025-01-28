import { fetchDataWithRetry } from '../apollo';
import { findBirth, findMarriage, findDeath, getStPeteMetaText } from './queries';
import {
  StPeteBirthFindQuery,
  StPeteBirthFindQueryVariables,
  StPeteMarriageFindQuery,
  StPeteMarriageFindQueryVariables,
  StPeteDeathFindQuery,
  StPeteDeathFindQueryVariables,
  Query,
  MetaTextType
} from './OperationsTypes';

const fetchStPeteBirthMetaText = async (): Promise<string> => 
  fetchDataWithRetry<Query, MetaTextType>(getStPeteMetaText, result => result.StPetersburgBirthsMetaText.databaseName);

const fetchStPeteMarriageMetaText = async (): Promise<string> => 
  fetchDataWithRetry<Query, MetaTextType>(getStPeteMetaText, result => result.StPetersburgMarriagesMetaText.databaseName);

const fetchStPeteDeathMetaText = async (): Promise<string> => 
  fetchDataWithRetry<Query, MetaTextType>(getStPeteMetaText, result => result.StPetersburgDeathsMetaText.databaseName);

const fetchStPeteBirths = async (variables: StPeteBirthFindQueryVariables): Promise<any> => 
  fetchDataWithRetry<StPeteBirthFindQuery, StPeteBirthFindQueryVariables>(findBirth, result => result.StPeteBirthFind, variables);

const fetchStPeteMarriages = async (variables: StPeteMarriageFindQueryVariables): Promise<any> => 
  fetchDataWithRetry<StPeteMarriageFindQuery, StPeteMarriageFindQueryVariables>(findMarriage, result => result.StPeteMarriageFind, variables);

const fetchStPeteDeaths = async (variables: StPeteDeathFindQueryVariables): Promise<any> => 
  fetchDataWithRetry<StPeteDeathFindQuery, StPeteDeathFindQueryVariables>(findDeath, result => result.StPeteDeathFind, variables);

export {
  fetchStPeteBirthMetaText,
  fetchStPeteMarriageMetaText,
  fetchStPeteDeathMetaText,
  fetchStPeteBirths,
  fetchStPeteMarriages,
  fetchStPeteDeaths
};
