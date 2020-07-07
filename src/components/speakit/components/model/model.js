import {
  MINI_GAMES_NAMES, mainStorage, mainController, checkUserInfo,
} from '../../../main/components/mainStorage/mainStorage';
import { WordsApi } from '../../../../services/services.methods';

import { shuffleArray } from '../../common/speakit.utils';
import { MAX_LONG_STATISTICS_ITEMS } from '../../../../common/common.constants';
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
    this.allResults = EMPTY;

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
    try {
      const { userId } = checkUserInfo();
      localStorage.setItem(`${LOCAL_STORAGE.CURRENT_RESULTS}-${userId}`, JSON.stringify(this.currentResults));
    } catch (error) {
      console.info(error.message);
    }

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
    try {
      const { userId } = checkUserInfo();
      this.currentResults = JSON.parse(localStorage.getItem(`${LOCAL_STORAGE.CURRENT_RESULTS}-${userId}`)) || [];
    } catch (error) {
      console.info(error.message);
    }
  }

  async saveLongResults(guessedList, finalTime) {
    const currentResult = {
      guessedListLength: guessedList.length,
      finalTime,
    };

    this.longResults.push(currentResult);
    if (this.longResults.length > MAX_LONG_STATISTICS_ITEMS) this.longResults.shift();
    localStorage.setItem(LOCAL_STORAGE.LONG_RESULTS, JSON.stringify(this.longResults));

    mainController.spinner.show();
    this.allResults.optional[MINI_GAMES_NAMES.SPEAK_IT] = JSON.stringify(this.longResults);
    this.allResults = await mainController.updateUserStatistics(this.allResults);
    mainController.spinner.hide();
  }

  async loadLongResults() {
    try {
      mainController.spinner.show();
      this.allResults = await mainController.getUserStatistics()
        .then((res) => {
          mainController.spinner.hide();
          return res;
        });
      this.longResults = JSON.parse(this.allResults.optional[MINI_GAMES_NAMES.SPEAK_IT]);
    } catch (error) {
      this.longResults = JSON.parse(localStorage.getItem(LOCAL_STORAGE.LONG_RESULTS)) || [];
      mainController.spinner.hide();
    }
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
