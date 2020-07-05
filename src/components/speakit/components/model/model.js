import { MINI_GAMES_NAMES, mainStorage } from '../../../main/components/mainStorage/mainStorage';
import { WordsApi } from '../../../../services/services.methods';

import { shuffleArray } from '../../common/speakit.utils';
import {
  MAX_WORDS_IN_ROUND,
  MAX_WORDS_PER_EXAMPLE,
  LOCAL_STORAGE,
  EMPTY,
} from '../../common/speakit.constants';

class Model {
  constructor() {
    this.pageData = EMPTY;

    this.currentResults = EMPTY;
    this.longResults = EMPTY;

    this.getGuessedWord = this.getGuessedWord.bind(this);
  }

  fetchCardsPage(difficult, page) {
    return this.wordsAPI.getWordsCollection({
      group: difficult,
      page,
      wordsPerExampleSentence: MAX_WORDS_PER_EXAMPLE,
      wordsPerPage: MAX_WORDS_IN_ROUND,
    });
  }

  parseCardsPage(response) {
    this.pageData = shuffleArray(response)
      .map((wordData) => {
        const newWordData = wordData;
        newWordData.word = newWordData.word.toLowerCase().trim();
        return newWordData;
      });
  }

  getGuessedWord(word) {
    return this.pageData.find((wordData) => wordData.word === word);
  }

  getTranslationByWord(word) {
    return this.pageData.find((wordData) => wordData.word === word).wordTranslate;
  }

  saveCurrentResults(guessedList) {
    const currentResult = {
      pageData: this.pageData,
      guessedList,
      time: new Date().toLocaleString(),
    };

    this.currentResults.push(currentResult);
    localStorage.setItem(LOCAL_STORAGE.CURRENT_RESULTS, JSON.stringify(this.currentResults));

    this.saveLongResults(guessedList, currentResult.time);

    this.pageData.forEach((wordData) => {
      if (!guessedList.includes(wordData.word)) {
        mainStorage.addMiniGameResult({
          miniGameName: MINI_GAMES_NAMES.SPEAK_IT,
          isCorrect: false,
          wordData,
        });
      }
    });
  }

  loadCurrentResults() {
    this.currentResults = JSON.parse(localStorage.getItem(LOCAL_STORAGE.CURRENT_RESULTS)) || [];
  }

  saveLongResults(guessedList, finalTime) {
    const currentResult = {
      guessedList,
      finalTime,
    };

    this.longResults.push(currentResult);

    localStorage.setItem(LOCAL_STORAGE.LONG_RESULTS, JSON.stringify(this.longResults));
  }

  loadLongResults() {
    this.longResults = JSON.parse(localStorage.getItem(LOCAL_STORAGE.LONG_RESULTS)) || [];
  }

  saveCompletedRounds(completedRoundsData) {
    localStorage.setItem(LOCAL_STORAGE.COMPLETED_ROUNDS_DATA, JSON.stringify(completedRoundsData));
  }

  loadCompletedRounds() {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE.COMPLETED_ROUNDS_DATA));
  }

  init() {
    this.loadCurrentResults();
    this.loadLongResults();
    this.wordsAPI = new WordsApi();
  }
}

export default new Model();
