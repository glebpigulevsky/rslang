import { Spinner } from '../../../spinner/spinner';
import { ErrorPopup } from '../../../error/error.error_popup';

import SettingsApi from '../../../../services/main/endpoints/services.main.endpoints.settings';
import UserWordsApi from '../../../../services/main/endpoints/services.main.endpoints.user_words';
import UserAggregatedWordsApi from '../../../../services/main/endpoints/services.main.endpoints.user_aggregated_words';
import StatisticsApi from '../../../../services/main/endpoints/services.main.endpoints.statistics';

import { EMPTY } from '../../../../common/common.constants';
import { DEFAULT_ENGLISH_LEVEL } from '../../common/main.constants';
import {
  DEFAULT_SETTINGS,
  DEFAULT_USER_WORD_OPTIONS,
  DEFAULT_STATISTICS,
  USER_AGGREGATED_WORDS_FILTER,
} from '../../../../services/common/services.common.constants';

class MainController {
  constructor() {
    this.userSettings = EMPTY;
    this.englishLevel = DEFAULT_ENGLISH_LEVEL;
    this.isNewUser = false;
    this.userWords = EMPTY;

    this.settingsAPI = new SettingsApi();
    this.userWordsApi = new UserWordsApi();
    this.userAggregatedWordsApi = new UserAggregatedWordsApi();
    this.statisticsApi = new StatisticsApi();

    this.spinner = EMPTY;

    this.getUserSettings = this.getUserSettings.bind(this);
    this.onChangeEnglishLevelHandler = this.onChangeEnglishLevelHandler.bind(this);

    this.init();
    this.showErrorPopup = this.showErrorPopup.bind(this);
  }

  showErrorPopup(error) {
    this.spinner.hide();
    new ErrorPopup().openPopup({ text: error.message });
    return null;
  }

  async getUserSettings() {
    this.userSettings = await this.settingsAPI.getSettings()
      .catch(this.showErrorPopup);
    if (!this.userSettings) {
      this.isNewUser = true;
      this.userSettings = {
        wordsPerDay: DEFAULT_SETTINGS.wordsPerDay,
        optional: DEFAULT_SETTINGS.optional,
      };
    }
    return this.userSettings;
  }

  async updateUserSettings(userSettings = this.userSettings) {
    const response = await this.settingsAPI.updateSettings({
      wordsPerDay: userSettings.wordsPerDay,
      optional: userSettings.optional,
    }).catch(this.showErrorPopup);
    if (response) this.userSettings = response;
  }

  async getAllUserWords() {
    const response = await this.userWordsApi.getAllUserWords()
      .catch(this.showErrorPopup);
    return response;
  }

  async setUserWord(
    wordId,
    difficulty = DEFAULT_USER_WORD_OPTIONS.difficulty,
    optional = DEFAULT_USER_WORD_OPTIONS.optional,
  ) {
    const response = await this.userWordsApi.createUserWord({
      wordId,
      difficulty,
      optional,
    }).catch(this.showErrorPopup);
    return response;
  }

  async updateUserWord(
    wordId,
    difficulty = DEFAULT_USER_WORD_OPTIONS.difficulty,
    optional = DEFAULT_USER_WORD_OPTIONS.optional,
  ) {
    const response = await this.userWordsApi.updateUserWord({
      wordId,
      difficulty,
      optional,
    }).catch(this.showErrorPopup);
    return response;
  }

  async getAllUserAggregatedWords({ group = '', wordsPerPage = null, filter = null }) {
    const response = await this.userAggregatedWordsApi.getAllUserAggregatedWords({
      group,
      wordsPerPage,
      filter,
    })
      .then((res) => {
        if (res) return res.paginatedResults;
        return EMPTY;
      })
      .catch(this.showErrorPopup);
    return response;
  }

  async getAllUserWordsInLearning(wordsPerPage = 6000) { // todo
    const response = this.getAllUserAggregatedWords({
      wordsPerPage,
      filter: USER_AGGREGATED_WORDS_FILTER.allUserWords,
    });
    if (response) this.userWords = response;
    return response;
  }

  async getAllUserNewWords(wordsPerPage = 6000) { // todo надо ли нам этот метод?
    return this.getAllUserAggregatedWords({
      wordsPerPage,
      filter: USER_AGGREGATED_WORDS_FILTER.allUserNewWords,
    });
  }

  async getNotUserNewWords(group = this.englishLevel, wordsPerPage = 6000) {
    return this.getAllUserAggregatedWords({
      group,
      wordsPerPage,
      filter: USER_AGGREGATED_WORDS_FILTER.notUserWords,
    });
  }

  // async getNewWordsToLearn(wordsPerPage = 6000) { // todo
  //   const response = this.getAllUserAggregatedWords({
  //     filter: USER_AGGREGATED_WORDS_FILTER.allUserWords,
  //     wordsPerPage,
  //   });
  //   if (response) this.userWords = response;
  //   return response;
  // }

  async getUserStatistics() {
    this.userStatistics = await this.statisticsApi.getStatictics()
      .catch(this.showErrorPopup);
    if (!this.userStatistics) {
      const userStatistics = {
        learnedWords: DEFAULT_STATISTICS.learnedWords,
        optional: DEFAULT_STATISTICS.optional,
      };
      this.userStatistics = await this.updateUserStatistics(userStatistics)
        .catch(this.showErrorPopup);
    }

    return this.userStatistics;
  }

  async updateUserStatistics(userStatistics = this.userStatistics) {
    const response = await this.statisticsApi.updateStatistics({
      learnedWords: userStatistics.learnedWords || 0,
      optional: userStatistics.optional,
    }).catch(this.showErrorPopup);
    if (response) this.userStatistics = response;
    return response;
  }

  onChangeEnglishLevelHandler(event) {
    this.englishLevel = event.target.value;
  }

  init() {
    this.spinner = new Spinner(document.body);
    this.spinner.init();
  }
}

export default new MainController();
