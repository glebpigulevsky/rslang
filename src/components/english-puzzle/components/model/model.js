import { WordsApi } from '../../../../services/services.methods';
import levels from '../../data/levelsData';
import { shuffleArray, CARDS_API, getPreloadedImage } from '../data/utils';
import { CLASS_NAMES, MAX_WORDS_COUNT } from '../data/helper';

const PICTURE_URL = 'https://raw.githubusercontent.com/caspercarver/rslang_data_paintings/master/';

const wordsAPI = new WordsApi();

class Model {
  constructor() {
    this.cardsData = null;

    this.pageData = null;
    this.translationsMap = null;
    this.isWordGuessed = this.isWordGuessed.bind(this);
  }

  // loadPage(response) {
  //   this.translationsMap = new Map();

  //   const shuffledResponse = shuffleArray(response).slice(0, MAX_WORDS_COUNT).map((wordData) => {
  //     const {
  //       word,
  //       transcription,
  //       audio,
  //       image,
  //     } = wordData;
  //     return {
  //       word: word.toLowerCase(),
  //       transcription,
  //       audio,
  //       image,
  //     };
  //   });
  //   this.pageData = shuffledResponse;

  //   shuffledResponse.forEach((cardData) => {
  //     translateWord(cardData.word, (responseData) => {
  //       this.translationsMap.set(cardData.word, responseData.text);
  //     });
  //   });
  // }

  fetchCardsPage(difficult, page) {
    // try {
    //   return CARDS_API.fetchCardsPageWithMaxTenWordsSentences(difficult, page);
    // } catch (err) {
    //   throw new Error(err);
    // }
    return wordsAPI.getWordsCollection({
      group: difficult,
      page,
      wordsPerExampleSentence: 10,
      wordsPerPage: 10,
    });
  }

  fetchMaxPagesInDifficultCategory(difficult) {
    // try {
    //   return CARDS_API.fetchMaxPagesCountInDifficultCategory(difficult);
    // } catch (err) {
    //   throw new Error(err);
    // }
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

  isWordGuessed(word) {
    return (this.pageData.find((wordData) => wordData.word === word));
  }

  loadResults() {
    this.results = JSON.parse(localStorage.getItem(CLASS_NAMES.RESULT.PAGE)) || [];
  }

  saveResults(guessedList) {
    const currentResult = {
      pageData: this.pageData,
      translations: Array.from(this.translationsMap),
      guessedList,
      time: new Date().toLocaleString(),
    };

    this.results.push(currentResult);

    localStorage.setItem(CLASS_NAMES.RESULT.PAGE, JSON.stringify(this.results));
  }

  init() {
    this.loadResults();
  }
}

export default new Model();
