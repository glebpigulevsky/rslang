import mainController from '../controller/main.controller';
import spacedRepetitions from '../spacedRepetitions/spacedRepetitions';

import { checkUserInfo } from '../../../../services/common/services.common.api_service.helper';

import { EMPTY } from '../../../../common/common.constants';
import { MINI_GAMES_NAMES } from '../../common/main.constants';
import { WORD_CATEGORY_TO_INDEX } from '../spacedRepetitions/common/constants';

class MainStorage {
  constructor() {
    this.wordsToLearn = EMPTY;

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
      this.miniGamesResults = JSON.parse(localStorage.getItem(`miniGamesResults-${userId}`)) || this.miniGamesResults;
    } catch (error) {
      console.info(error.message);
    }
  }

  beforeUnloadHandler() {
    this.saveMiniGameResults();
    window.removeEventListener('beforeunload', this.beforeUnloadHandler);
  }

  getUserEnglishLevel() {
    return mainController.englishLevel;
  }

  getWordsToLearn() {
    spacedRepetitions.userWordsCollection.sort(
      (wordDataA, wordDataB) => WORD_CATEGORY_TO_INDEX[wordDataA.userWord.difficulty]
        - WORD_CATEGORY_TO_INDEX[wordDataB.userWord.difficulty],
    );

    spacedRepetitions.userWordsCollection.sort(
      (wordDataA, wordDataB) => {
        if (wordDataA.userWord.difficulty === wordDataB.userWord.difficulty) {
          return wordDataA.userWord.optional.repeatDate
            - wordDataB.userWord.optional.repeatDate;
        }
        return false;
      },
    );

    return spacedRepetitions.userWordsCollection;
  }

  init() {
    this.loadMiniGamesResults();
    window.addEventListener('beforeunload', this.beforeUnloadHandler);
  }
}

const mainStorage = new MainStorage();
export {
  MINI_GAMES_NAMES,
  mainStorage,
  mainController,
  checkUserInfo,
};
