import { ErrorPopup } from '../../../error/error.error_popup';
import { WordsApi } from '../../../../services/services.methods';
import { getPreloadedImage } from '../../common/english-puzzle.utils';
import levels from '../../data/levelsData';

import picture from '../../assets/img/9th_wave.jpg'; // todo заглушка без Интернета

const PICTURE_URL = 'https://raw.githubusercontent.com/caspercarver/rslang_data_paintings/master/'; // todo

const wordsAPI = new WordsApi();

class Model {
  constructor() {
    this.errorsList = null;
    this.results = null;
    this.settings = null;
  }

  fetchCardsPage(difficult, page) {
    try {
      return wordsAPI.getWordsCollection({
        group: difficult,
        page,
        wordsPerExampleSentence: 10,
        wordsPerPage: 10,
      });
    } catch (error) {
      new ErrorPopup().openPopup(error);
      return null;
    }
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
    // return getPreloadedImage(picture); // !!! todo заглушка без Интернета
    return getPreloadedImage(`${PICTURE_URL}${levels[difficult][page].imageSrc}`); // cut // image // !!! todo заглушка без Интернета
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

  // saveSettings({
  //   isBgImage,
  //   isTranslationEnabled,
  //   isSpellingEnabled,
  //   isAutoSpellingEnabled,
  // }) {
  //   localStorage.setItem(
  //     'english-puzzle-settings',
  //     JSON.stringify({
  //       isBgImage,
  //       isTranslationEnabled,
  //       isSpellingEnabled,
  //       isAutoSpellingEnabled,
  //     }),
  //   );
  // }

  init() {
    this.loadResults();
  }
}

export default new Model();
