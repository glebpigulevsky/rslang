import mainController from '../controller/main.controller';
import { checkUserInfo } from '../../../../services/common/services.common.api_service.helper';

export const MINI_GAMES_NAMES = {
  ENGLISH_PUZZLE: 'englishPuzzle',
  SPEAK_IT: 'speakIt',
  SAVANNA: 'savanna',
  AUDIO_CALL: 'audioCall',
  SPRINT: 'sprint',
  DROP: 'drop',
};

class MainStorage {
  constructor() {
    this.wordsToLearn = null;

    this.miniGamesResults = {
      englishPuzzle: {
        wrong: [],
        correct: [],
      },
      speakIt: {
        wrong: [],
        correct: [],
      },
      savanna: {
        wrong: [],
        correct: [],
      },
      audioCall: {
        wrong: [],
        correct: [],
      },
      sprint: {
        wrong: [],
        correct: [],
      },
      drop: {
        wrong: [],
        correct: [],
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
    const { userId } = checkUserInfo();
    localStorage.setItem(`miniGamesResults-${userId}`, JSON.stringify(this.miniGamesResults));
  }

  loadMiniGamesResults() {
    const { userId } = checkUserInfo();
    const loadedMiniGamesResults = JSON.parse(localStorage.getItem(`miniGamesResults-${userId}`));
    if (loadedMiniGamesResults) this.miniGamesResults = loadedMiniGamesResults;
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

export const mainStorage = new MainStorage();
