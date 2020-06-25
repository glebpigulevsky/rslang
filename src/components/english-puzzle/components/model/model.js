import { ErrorPopup } from '../../../error/error.error_popup';
import { WordsApi } from '../../../../services/services.methods';
import { getPreloadedImage } from '../../common/english-puzzle.utils';
import { MAX_WORDS_IN_SENTENCE } from '../../common/english-puzzle.constants';
import levels from '../../data/levelsData';

const PICTURE_URL = 'https://raw.githubusercontent.com/caspercarver/rslang_data_paintings/master/';

const wordsAPI = new WordsApi();

class Model {
  constructor() {
    this.errorsList = null;
    this.results = null;
  }

  fetchCardsPage(difficult, page) {
    try {
      return wordsAPI.getWordsCollection({
        group: difficult,
        page,
        wordsPerExampleSentence: MAX_WORDS_IN_SENTENCE,
        wordsPerPage: MAX_WORDS_IN_SENTENCE,
      });
    } catch (error) {
      new ErrorPopup().openPopup(error);
      return null;
    }
  }

  fetchMaxPagesInDifficultCategory(difficult) {
    return wordsAPI.getWordsCount({
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
    localStorage.setItem('completedRoundsData', JSON.stringify(completedRoundsData));
  }

  loadCompletedRounds() {
    return JSON.parse(localStorage.getItem('completedRoundsData'));
  }

  init() {
    this.loadResults();
  }
}

export default new Model();
