import { MINI_GAMES_NAMES, mainController } from '../../../main/components/mainStorage/mainStorage';
import { WordsApi } from '../../../../services/services.methods';
import { getPreloadedImage } from '../../common/english-puzzle.utils';
import { EMPTY, MAX_LONG_STATISTICS_ITEMS } from '../../../../common/common.constants';
import { MAX_WORDS_IN_SENTENCE, MAX_SENTENCES_IN_ROUND } from '../../common/english-puzzle.constants';
import levels from '../../data/levelsData';

const PICTURE_URL = 'https://raw.githubusercontent.com/caspercarver/rslang_data_paintings/master/';

class Model {
  constructor() {
    this.errorsList = EMPTY;
    this.results = EMPTY;
    this.longResults = EMPTY;
    this.allResults = EMPTY;
    this.wordsAPI = new WordsApi();
  }

  fetchCardsPage(difficult, page) {
    return this.wordsAPI.getWordsCollection({
      group: difficult,
      page,
      wordsPerExampleSentence: MAX_WORDS_IN_SENTENCE,
      wordsPerPage: MAX_WORDS_IN_SENTENCE,
    });
  }

  fetchMaxPagesInDifficultCategory(difficult) {
    return this.wordsAPI
      .getWordsCount({
        group: difficult,
        wordsPerExampleSentence: MAX_WORDS_IN_SENTENCE,
        wordsPerPage: MAX_WORDS_IN_SENTENCE,
      })
      .then((response) => response.count);
  }

  getCurrentPictureDescription(difficult, page) {
    return levels[difficult][page];
  }

  getPreloadedCurrentPicture(difficult, page) {
    return getPreloadedImage(`${PICTURE_URL}${levels[difficult][page].imageSrc}`);
  }

  async loadResults() {
    this.results = JSON.parse(localStorage.getItem('english-puzzle-results')) || [];

    try {
      mainController.spinner.show();
      this.allResults = await mainController.getUserStatistics()
        .then((res) => {
          mainController.spinner.hide();
          return res;
        });
      this.longResults = JSON.parse(this.allResults.optional[MINI_GAMES_NAMES.ENGLISH_PUZZLE]);
    } catch (error) {
      this.longResults = JSON.parse(localStorage.getItem('english-puzzle-long-results')) || [];
      mainController.spinner.hide();
    }
  }

  async saveResults(errorsList, finalTime) {
    const currentResult = {
      errorsList,
      finalTime,
    };

    this.results.push(currentResult);
    localStorage.setItem('english-puzzle-results', JSON.stringify(this.results));

    const longResult = {
      guessedListLength: MAX_SENTENCES_IN_ROUND - errorsList.length,
      finalTime,
    };

    this.longResults.push(longResult);
    if (this.longResults.length > MAX_LONG_STATISTICS_ITEMS) this.longResults.shift();
    localStorage.setItem('english-puzzle-long-results', JSON.stringify(this.longResults));

    mainController.spinner.show();
    this.allResults.optional[MINI_GAMES_NAMES.ENGLISH_PUZZLE] = JSON.stringify(this.longResults);
    this.allResults = await mainController.updateUserStatistics(this.allResults);
    mainController.spinner.hide();
  }

  loadSettings() {
    return JSON.parse(localStorage.getItem('english-puzzle-settings'));
  }

  saveSettings(settings) {
    localStorage.setItem('english-puzzle-settings', JSON.stringify(settings));
  }

  saveCompletedRounds(completedRoundsData) {
    localStorage.setItem('english-puzzle-completedRoundsData', JSON.stringify(completedRoundsData));
  }

  loadCompletedRounds() {
    return JSON.parse(localStorage.getItem('english-puzzle-completedRoundsData'));
  }

  init() {
    this.loadResults();
  }
}

export default new Model();
