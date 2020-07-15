import SettingsApi from './main/endpoints/services.main.endpoints.settings';
import StatisticsApi from './main/endpoints/services.main.endpoints.statistics';
import UsersApi from './main/endpoints/services.main.endpoints.users';
import UserWordsApi from './main/endpoints/services.main.endpoints.user_words';
import WordsApi from './main/endpoints/services.main.endpoints.words';
import UserAggregatedWords from './main/endpoints/services.main.endpoints.user_aggregated_words';
import { ERRORS_DESCRIPTION, USER_AGGREGATED_WORDS_FILTER, GET_RANDOM } from './common/services.common.constants';

export {
  SettingsApi,
  StatisticsApi,
  UsersApi,
  UserWordsApi,
  WordsApi,
  UserAggregatedWords,
  ERRORS_DESCRIPTION,
  USER_AGGREGATED_WORDS_FILTER,
  GET_RANDOM,
};
