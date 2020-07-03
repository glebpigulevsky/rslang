import { WordsApi } from '../../../../services/services.methods';
import { getPreloadedImage } from '../../common/english-puzzle.utils';
import { MAX_WORDS_IN_SENTENCE } from '../../common/english-puzzle.constants';
import levels from '../../data/levelsData';

const PICTURE_URL = 'https://raw.githubusercontent.com/caspercarver/rslang_data_paintings/master/';

class Model {
  constructor() {
    this.errorsList = null;
    this.results = null;
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
    return this.wordsAPI.getWordsCount({
      group: difficult,
      wordsPerExampleSentence: MAX_WORDS_IN_SENTENCE,
      wordsPerPage: MAX_WORDS_IN_SENTENCE,
    }).then((response) => response.count);
  }

  getCurrentPictureDescription(difficult, page) {
    return levels[difficult][page];
  }

  getPreloadedCurrentPicture(difficult, page) {
    return getPreloadedImage(`${PICTURE_URL}${levels[difficult][page].imageSrc}`);
  }

  loadResults() {
    this.results = JSON.parse(localStorage.getItem('english-puzzle-results')) || [];
  }

  saveResults(errorsList, finalTime) {
    const currentResult = {
      errorsList,
      finalTime,
    };

    this.results.push(currentResult);

    localStorage.setItem('english-puzzle-results', JSON.stringify(this.results));
  }

  loadSettings() {
    return JSON.parse(localStorage.getItem('english-puzzle-settings'));
  }

  saveSettings(settings) {
    localStorage.setItem(
      'english-puzzle-settings',
      JSON.stringify(settings),
    );
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