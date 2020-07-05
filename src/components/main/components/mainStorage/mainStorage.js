import mainController from '../controller/main.controller';
import { checkUserInfo } from '../../../../services/common/services.common.api_service.helper';

import { EMPTY, EMPTY_ARRAY } from '../../../../common/common.constants';
import { MINI_GAMES_NAMES } from '../../common/main.constants';

class MainStorage {
  constructor() {
    this.wordsToLearn = EMPTY;

    this.miniGamesResults = {
      englishPuzzle: {
        wrong: EMPTY_ARRAY,
        correct: EMPTY_ARRAY,
      },
      speakIt: {
        wrong: EMPTY_ARRAY,
        correct: EMPTY_ARRAY,
      },
      savanna: {
        wrong: EMPTY_ARRAY,
        correct: EMPTY_ARRAY,
      },
      audioCall: {
        wrong: EMPTY_ARRAY,
        correct: EMPTY_ARRAY,
      },
      sprint: {
        wrong: EMPTY_ARRAY,
        correct: EMPTY_ARRAY,
      },
      drop: {
        wrong: EMPTY_ARRAY,
        correct: EMPTY_ARRAY,
      },
    };

    this.beforeUnloadHandler = this.beforeUnloadHandler.bind(this);
  }

  addMiniGameResult({
    miniGameName,
    isCorrect,
    wordData,
  }) {
    if (isCorrect) {
      this.miniGamesResults[miniGameName].correct.push(wordData);
    } else {
      this.miniGamesResults[miniGameName].wrong.push(wordData);
    }
  }

  addMiniGameResults({
    miniGameName,
    isCorrect,
    wordsDataArray,
  }) {
    if (isCorrect) {
      this.miniGamesResults[miniGameName].correct.concat(wordsDataArray);
    } else {
      this.miniGamesResults[miniGameName].wrong.concat(wordsDataArray);
    }
  }

  saveMiniGameResults() {
    try {
      const { userId } = checkUserInfo();
      localStorage.setItem(`miniGamesResults-${userId}`, JSON.stringify(this.miniGamesResults));
    } catch (error) {
      console.info(error.message);
    }
  }

  loadMiniGamesResults() {
    try {
      const { userId } = checkUserInfo();
      const loadedMiniGamesResults = JSON.parse(localStorage.getItem(`miniGamesResults-${userId}`));
      if (loadedMiniGamesResults) this.miniGamesResults = loadedMiniGamesResults;
    } catch (error) {
      console.info(error.message);
    }
  }

  beforeUnloadHandler() {
    this.saveMiniGameResults();
    window.removeEventListener('beforeunload', this.beforeUnloadHandler);
  }

  async getWordsToLearn() {
    mainController.spinner.show();
    this.wordsToLearn = await mainController.getAllUserAggregatedWords({ group: '3', wordsPerPage: '27' });
    mainController.spinner.hide();
    return this.wordsToLearn;
  }

  async init() {
    this.loadMiniGamesResults();
    window.addEventListener('beforeunload', this.beforeUnloadHandler);
    return this.wordsToLearn;
  }
}

const mainStorage = new MainStorage();
export {
  MINI_GAMES_NAMES,
  mainStorage,
  mainController,
  checkUserInfo,
};
