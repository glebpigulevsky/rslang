import { WordsApi } from '../../../../services/services.methods';
import { getPreloadedImage } from '../data/utils';
import levels from '../../data/levelsData';

const PICTURE_URL = 'https://raw.githubusercontent.com/caspercarver/rslang_data_paintings/master/'; // todo

const wordsAPI = new WordsApi();

class Model {
  constructor() {
    this.errorsList = null;
  }

  fetchCardsPage(difficult, page) {
    return wordsAPI.getWordsCollection({
      group: difficult,
      page,
      wordsPerExampleSentence: 10,
      wordsPerPage: 10,
    });
  }

  fetchMaxPagesInDifficultCategory(difficult) {
    return wordsAPI.getWordsCount({
      group: difficult,
      wordsPerExampleSentence: 10,
      wordsPerPage: 10,
    }).then((response) => response.count);
  }

  getCurrentPictureDescription(difficult, page) {
    return levels[difficult][page];
  }

  getPreloadedCurrentPicture(difficult, page) {
    return getPreloadedImage(`${PICTURE_URL}${levels[difficult][page].imageSrc}`);
  }

  loadResults() {
    this.results = JSON.parse(localStorage.getItem('results')) || [];
  }

  saveResults(errorsList, finalTime) {
    const currentResult = {
      errorsList,
      finalTime,
    };

    this.results.push(currentResult);

    localStorage.setItem('results', JSON.stringify(this.results));
  }

  init() {
    this.loadResults();
  }
}

export default new Model();
