import { WordsApi } from '../../../../services/services.methods';
import { CLASS_NAMES, MAX_WORDS_IN_ROUND } from '../../common/speakit.constants';
import { shuffleArray, translateWord } from '../../common/speakit.utils';

class Model {
  constructor() {
    this.cardsData = null;

    this.pageData = null;
    this.translationsMap = null;
    this.isWordGuessed = this.isWordGuessed.bind(this);

    this.currentResults = null;
    this.longResults = null;
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

  loadCurrentResults() {
    this.currentResults = JSON.parse(localStorage.getItem('speakit-currentResults')) || [];
  }

  saveCurrentResults(guessedList) {
    const currentResult = {
      pageData: this.pageData,
      // translations: Array.from(this.translationsMap),
      guessedList,
      time: new Date().toLocaleString(),
    };

    this.currentResults.push(currentResult);
    localStorage.setItem('speakit-currentResults', JSON.stringify(this.currentResults));

    this.saveLongResults(guessedList, currentResult.time);
  }

  loadLongResults() {
    this.longResults = JSON.parse(localStorage.getItem('speakit-longResults')) || [];
  }

  saveLongResults(guessedList, finalTime) {
    const currentResult = {
      guessedList,
      finalTime,
    };

    this.longResults.push(currentResult);

    localStorage.setItem('speakit-longResults', JSON.stringify(this.longResults));
  }

  getTranslationByWord(word) {
    return this.pageData.find((wordData) => wordData.word === word).wordTranslate;
  }

  saveCompletedRounds(completedRoundsData) {
    localStorage.setItem('speakit-completedRoundsData', JSON.stringify(completedRoundsData));
  }

  loadCompletedRounds() {
    return JSON.parse(localStorage.getItem('speakit-completedRoundsData'));
  }

  init() {
    this.loadCurrentResults();
    this.loadLongResults();
    this.wordsAPI = new WordsApi();
  }
}

export default new Model();
