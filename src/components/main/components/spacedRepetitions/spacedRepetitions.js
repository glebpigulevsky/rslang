import mainController from '../controller/main.controller';

import { EMPTY } from '../../../../common/common.constants';
import { WORD_CATEGORY_TO_INDEX, INDEX_TO_CATEGORY } from './common/constants';
import { DEFAULT_USER_WORD_OPTIONS } from '../../../../services/common/services.common.constants';

class SpacedRepetitions {
  constructor() {
    this.userWordsCollection = [];
    this.newWords = [];

    this.cardsCount = EMPTY;
    this.newWordsCount = EMPTY;
  }

  parseMiniGamesResults(miniGamesResults) {
    Object.values(miniGamesResults).forEach((miniGamesResult) => {
      miniGamesResult.wrong.forEach((wrongWordData) => {
        const currentUserWord = this.userWordsCollection
          .find((userWord) => userWord.id === wrongWordData.id);
        if (currentUserWord) {
          currentUserWord.userWord.optional.repeatTimes += 1;
          currentUserWord.userWord.optional.lastRepeat = new Date().toLocaleString();
          this.updateWrongWord(currentUserWord, true);
        }
      });
      miniGamesResult.wrong = [];

      miniGamesResult.correct.forEach((correctWordData) => {
        const currentUserWord = this.userWordsCollection
          .find((userWord) => userWord.id === correctWordData.id);
        if (currentUserWord) {
          currentUserWord.userWord.optional.repeatTimes += 1;
          currentUserWord.userWord.optional.lastRepeat = new Date().toLocaleString();
          this.updateCorrectWord(currentUserWord);
        }
      });
      miniGamesResult.correct = [];
    });
  }

  async updateUserWords() {
    return Promise.all(
      this.userWordsCollection.map((wordData) => {
        if (!wordData.userWord.optional.changed) return null;
        wordData.userWord.optional.changed = false;
        wordData.userWord.optional.isWrong = false;
        if (wordData.userWord.optional.isNew) {
          wordData.userWord.optional.isNew = false;
          return mainController.setUserWord(
            wordData.id,
            wordData.userWord.difficulty,
            wordData.userWord.optional,
          );
        }
        return mainController.updateUserWord(
          wordData.id,
          wordData.userWord.difficulty,
          wordData.userWord.optional,
        );
      }),
    );
  }

  async loadTodayNewWords() {
    let todayNewWords;
    if ((mainController.userSettings.optional
      .newWordsFetchedData !== new Date().toISOString().slice(0, 10)
      && mainController.userSettings.wordsPerDay - this.newWords.length > 0)
      || mainController.userSettings.optional.cardsPerDay - this.userWordsCollection.length > 0) {
      todayNewWords = await mainController.getNotUserNewWords(
        mainController.englishLevel,
        Math.max(
          mainController.userSettings.wordsPerDay - this.newWords.length,
          mainController.userSettings.optional.cardsPerDay - this.userWordsCollection.length,
        ),
      );
      if (!todayNewWords) return [];
      todayNewWords = todayNewWords.map((wordData) => {
        const newWordData = wordData;
        newWordData.userWord = {
          difficulty: DEFAULT_USER_WORD_OPTIONS.difficulty,
          optional: {
            repeatTimes: DEFAULT_USER_WORD_OPTIONS.optional.repeatTimes,
            lastRepeat: DEFAULT_USER_WORD_OPTIONS.optional.lastRepeat,
            toRepeat: DEFAULT_USER_WORD_OPTIONS.optional.toRepeat,
            isDifficult: DEFAULT_USER_WORD_OPTIONS.optional.isDifficult,
            isDeleted: DEFAULT_USER_WORD_OPTIONS.optional.isDeleted,
            isNew: DEFAULT_USER_WORD_OPTIONS.optional.isNew,
            changed: DEFAULT_USER_WORD_OPTIONS.optional.changed,
            repeatDate: Date.now(),
          },
        };
        return newWordData;
      });
      mainController.userSettings.optional.newWordsFetchedData = new Date()
        .toISOString().slice(0, 10);
      await mainController.updateUserSettings();
      return todayNewWords;
    }
    return [];
  }

  updateCategory(wordData, category) {
    wordData.userWord.difficulty = category;
    wordData.userWord.optional.repeatDate = Date.now();
    wordData.userWord.optional.changed = true;
  }

  updateCorrectWord(correctWordData) {
    if (correctWordData.userWord.optional.isWrong) {
      correctWordData.userWord.optional.isWrong = false;
      return;
    }

    const previousDifficultIndex = WORD_CATEGORY_TO_INDEX[
      correctWordData.userWord.difficulty
    ] || 0;
    let newDifficultIndex = previousDifficultIndex + 1;

    if (newDifficultIndex > 4) {
      newDifficultIndex = 5;
      correctWordData.userWord.optional.toRepeat = false;
      correctWordData.userWord.optional.repeatDate = Date.now();
    } else correctWordData.userWord.optional.repeatDate = Date.now();

    correctWordData.userWord.difficulty = INDEX_TO_CATEGORY[newDifficultIndex];
    correctWordData.userWord.optional.changed = true;
  }

  updateWrongWord(wrongWordData, isMiniGameResult = false) {
    const newDifficultIndex = 0;
    wrongWordData.userWord.difficulty = INDEX_TO_CATEGORY[newDifficultIndex];
    wrongWordData.userWord.optional.repeatDate = Date.now();
    wrongWordData.userWord.optional.changed = true;
    if (!isMiniGameResult) wrongWordData.userWord.optional.isWrong = true;
  }

  getNewWords(wordsCollection = this.userWordsCollection) {
    return wordsCollection.filter(
      (wordData) => wordData.userWord.difficulty === 'fetched',
    );
  }

  getNextWord() {
    this.cardsCount += 1;

    this.userWordsCollection.sort(
      (wordDataA, wordDataB) => WORD_CATEGORY_TO_INDEX[wordDataA.userWord.difficulty]
        - WORD_CATEGORY_TO_INDEX[wordDataB.userWord.difficulty],
    );

    this.userWordsCollection.sort(
      (wordDataA, wordDataB) => {
        if (wordDataA.userWord.difficulty === wordDataB.userWord.difficulty) {
          return wordDataA.userWord.optional.repeatDate
            - wordDataB.userWord.optional.repeatDate;
        }
        return false;
      },
    );

    if (this.newWordsCount >= mainController.userSettings.wordsPerDay) {
      const wordToRepeatIndex = this.userWordsCollection.findIndex(
        (wordData) => wordData.userWord.difficulty !== 'fetched',
      );
      this.userWordsCollection[wordToRepeatIndex].userWord.optional.repeatTimes += 1;
      this.userWordsCollection[wordToRepeatIndex].userWord.optional.lastRepeat = new Date()
        .toLocaleString();
      return this.userWordsCollection[wordToRepeatIndex];
    }

    if (this.userWordsCollection[0].userWord.difficulty === 'fetched') {
      this.userWordsCollection[0].userWord.difficulty = 'new';
      this.userWordsCollection[0].userWord.optional.changed = true;
      this.newWordsCount += 1;
    }
    this.userWordsCollection[0].userWord.optional.repeatTimes += 1;
    this.userWordsCollection[0].userWord.optional.lastRepeat = new Date()
      .toLocaleString();
    return this.userWordsCollection[0];
  }

  async init(userEnglishLevel) {
    if (userEnglishLevel) mainController.englishLevel = userEnglishLevel;
    this.newWords = [];
    this.userWordsCollection = [];
    this.cardsCount = 0;
    this.newWordsCount = 0;

    mainController.spinner.show();
    this.userWordsCollection = await mainController.getAllUserWordsInLearning()
      || [];
    this.newWords = this.getNewWords(this.userWordsCollection);
    const fetchedNewWords = await this.loadTodayNewWords();
    this.userWordsCollection = this.userWordsCollection.concat(fetchedNewWords);
    this.newWords = this.newWords.concat(fetchedNewWords);
    return Promise.all([this.userWordsCollection, fetchedNewWords])
      .then(() => mainController.spinner.hide());
  }
}

export default new SpacedRepetitions();
