import { fetchDataWithRetry } from '../apollo';
import { getLodzTrinityMetaText, findByNameLodzTrinity, findAdditionalLodzTrinity } from './queries';
import { Query, MetaTextType, LodzTrinityIndividualFindQueryVariables, LodzTrinityIndividualFindQuery } from './OperationsTypes';

const fetchLodzTrinityMetaText = async (): Promise<string> => 
  fetchDataWithRetry<Query, MetaTextType>(getLodzTrinityMetaText, result => result.LodzTrinityIndividualMetaText.databaseName);


const fetchLodzTrinityByName = async (variables: LodzTrinityIndividualFindQueryVariables): Promise<any> => 
  fetchDataWithRetry<LodzTrinityIndividualFindQuery, LodzTrinityIndividualFindQueryVariables>(findByNameLodzTrinity, result => result.LodzTrinityIndividualFind, variables);

const fetchLodzTrinityAdditional = async (variables: LodzTrinityIndividualFindQueryVariables): Promise<any> => 
  fetchDataWithRetry<LodzTrinityIndividualFindQuery, LodzTrinityIndividualFindQueryVariables>(findAdditionalLodzTrinity, result => result.LodzTrinityIndividualFind, variables);

export {
  fetchLodzTrinityMetaText,
  fetchLodzTrinityByName,
  fetchLodzTrinityAdditional
};
