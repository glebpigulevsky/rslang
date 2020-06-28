import { WordsApi } from '../../../../services/services.methods';
import { CLASS_NAMES, MAX_WORDS_IN_ROUND } from '../../common/speakit.constants';
import { shuffleArray, translateWord } from '../../common/speakit.utils';

class Model {
  constructor() {
    this.cardsData = null;

    this.pageData = null;
    this.translationsMap = null;
    this.isWordGuessed = this.isWordGuessed.bind(this);
  }

  loadPage(response) {
    const shuffledResponse = shuffleArray(response)
      .map((wordData) => {
        const {
          word,
          transcription,
          audio,
          image,
          wordTranslate,
        } = wordData;
        return {
          word: word.toLowerCase().trim(),
          transcription,
          audio,
          image,
          wordTranslate,
        };
      });
    this.pageData = shuffledResponse;
  }

  fetchCardsPage(difficult, page) {
    return this.wordsAPI.getWordsCollection({
      group: difficult,
      page,
      wordsPerExampleSentence: 100, // todo
      wordsPerPage: MAX_WORDS_IN_ROUND,
    });
  }

  isWordGuessed(word) {
    return this.pageData.find((wordData) => wordData.word === word);
  }

  loadResults() {
    this.results = JSON.parse(localStorage.getItem(CLASS_NAMES.RESULT.PAGE)) || [];
  }

  getTranslationByWord(word) {
    return this.pageData.find((wordData) => wordData.word === word).wordTranslate;
  }

  saveResults(guessedList) {
    const currentResult = {
      pageData: this.pageData,
      // translations: Array.from(this.translationsMap),
      guessedList,
      time: new Date().toLocaleString(),
    };

    this.results.push(currentResult);

    localStorage.setItem(CLASS_NAMES.RESULT.PAGE, JSON.stringify(this.results));
  }

  saveCompletedRounds(completedRoundsData) {
    localStorage.setItem('completedRoundsData', JSON.stringify(completedRoundsData));
  }

  loadCompletedRounds() {
    return JSON.parse(localStorage.getItem('completedRoundsData'));
  }

  init() {
    this.loadResults();
    this.wordsAPI = new WordsApi();
  }
}

export default new Model();
