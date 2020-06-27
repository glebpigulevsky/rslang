import { CLASS_NAMES, MAX_WORDS_COUNT } from '../../common/speakit.constants';
import { shuffleArray, translateWord } from '../../common/speakit.utils';

class Model {
  constructor() {
    this.cardsData = null;

    this.pageData = null;
    this.translationsMap = null;
    this.isWordGuessed = this.isWordGuessed.bind(this);
  }

  loadPage(response) {
    this.translationsMap = new Map();

    const shuffledResponse = shuffleArray(response).slice(0, MAX_WORDS_COUNT).map((wordData) => {
      const {
        word,
        transcription,
        audio,
        image,
      } = wordData;
      return {
        word: word.toLowerCase(),
        transcription,
        audio,
        image,
      };
    });
    this.pageData = shuffledResponse;

    shuffledResponse.forEach((cardData) => {
      translateWord(cardData.word, (responseData) => {
        this.translationsMap.set(cardData.word, responseData.text);
      });
    });
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
