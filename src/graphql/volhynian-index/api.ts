import { fetchDataWithRetry } from '../apollo';
import { findVolhynianBirth, findVolhynianMarriage, findVolhynianDeath, getVolhynianMetaText } from './queries';
import {
  VolhynianBirthFindQuery,
  VolhynianBirthFindQueryVariables,
  VolhynianMarriageFindQuery,
  VolhynianMarriageFindQueryVariables,
  VolhynianDeathFindQuery,
  VolhynianDeathFindQueryVariables,
  Query,
  MetaTextType
} from './OperationsTypes';

const fetchVolhynianBirthMetaText = async (): Promise<string> => 
  fetchDataWithRetry<Query, MetaTextType>(getVolhynianMetaText, result => result.VolhynianBirthsMetaText.databaseName);

const fetchVolhynianMarriageMetaText = async (): Promise<string> => 
  fetchDataWithRetry<Query, MetaTextType>(getVolhynianMetaText, result => result.VolhynianMarriagesMetaText.databaseName);

const fetchVolhynianDeathMetaText = async (): Promise<string> => 
  fetchDataWithRetry<Query, MetaTextType>(getVolhynianMetaText, result => result.VolhynianDeathsMetaText.databaseName);

const fetchVolhynianBirths = async (variables: VolhynianBirthFindQueryVariables): Promise<any> => 
  fetchDataWithRetry<VolhynianBirthFindQuery, VolhynianBirthFindQueryVariables>(findVolhynianBirth, result => result.VolhynianBirthFind, variables);

const fetchVolhynianMarriages = async (variables: VolhynianMarriageFindQueryVariables): Promise<any> => 
  fetchDataWithRetry<VolhynianMarriageFindQuery, VolhynianMarriageFindQueryVariables>(findVolhynianMarriage, result => result.VolhynianMarriageFind, variables);

const fetchVolhynianDeaths = async (variables: VolhynianDeathFindQueryVariables): Promise<any> => 
  fetchDataWithRetry<VolhynianDeathFindQuery, VolhynianDeathFindQueryVariables>(findVolhynianDeath, result => result.VolhynianDeathFind, variables);

export {
  fetchVolhynianBirthMetaText,
  fetchVolhynianMarriageMetaText,
  fetchVolhynianDeathMetaText,
  fetchVolhynianBirths,
  fetchVolhynianMarriages,
  fetchVolhynianDeaths
};
