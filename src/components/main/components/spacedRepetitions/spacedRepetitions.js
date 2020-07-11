import mainController from '../controller/main.controller';
import { mainStorage } from '../mainStorage/mainStorage';

import { EMPTY } from '../../../../common/common.constants';
import { MINI_GAMES_NAMES } from '../../common/main.constants';
import {
  DEFAULT_SETTINGS,
  DEFAULT_USER_WORD_OPTIONS,
  DEFAULT_STATISTICS,
  USER_AGGREGATED_WORDS_FILTER,
} from '../../../../services/common/services.common.constants';

import UserWordsApi from '../../../../services/main/endpoints/services.main.endpoints.user_words';

const userWordsApi = new UserWordsApi();

const WORD_CATEGORY_TO_INDEX = {
  new: 0,
  hard: 1,
  normal: 2,
  good: 3,
  excellent: 4,
  learned: 5,
};

const INDEX_TO_CATEGORY = {
  0: 'new',
  1: 'hard',
  2: 'normal',
  3: 'good',
  4: 'excellent',
  5: 'learned',
};

const CATEGORY_INDEX_TO_TIME_DELAY = {
  0: 5 * 1000,
  // 0: 1,
  1: 25 * 1000,
  // 1: 5 * 1000,
  2: 2 * 60 * 1000,
  // 2: 25 * 1000,
  3: 10 * 60 * 1000,
  // 3: 2 * 60 * 1000,
  4: 60 * 60 * 1000,
  // 4: 10 * 60 * 1000,
};

class SpacedRepetitions {
  constructor() {
    this.userWordsCollection = [];
    this.newWords = [];

    this.cardsCount = 0;
    this.newWordsCount = 0;
  }

  // parseUserWordsByCategories(userWords = mainController.userWords) {
  //   userWords.forEach((wordData) => {
  // if (wordData.userWord.optional.toRepeat
  //   && !wordData.userWord.optional.isDeleted
  //   && wordData.userWord.difficulty !== 'fetched') {
  //   this.wordsCategories[WORD_CATEGORY_TO_INDEX[wordData.userWord.difficulty]].push(wordData);
  // }
  // if (wordData.userWord.optional.isDifficult) {
  //   this.difficultWords.push(wordData);
  // }
  // if (wordData.userWord.optional.isDeleted) {
  //   this.deletedWords.push(wordData);
  // }
  // if (wordData.userWord.difficulty === 'fetched') {
  //   this.newWords.push(wordData);
  // }
  //   });
  // }

  parseMiniGamesResults(miniGamesResults = mainStorage.miniGamesResults) {
    Object.values(miniGamesResults).forEach((miniGamesResult) => {
      miniGamesResult.wrong.forEach((wrongWordData) => {
        const currentUserWord = this.userWordsCollection
          .find((userWord) => userWord.id === wrongWordData.id);
        if (currentUserWord) this.updateWrongWord(currentUserWord);
      });
      miniGamesResult.wrong = [];

      miniGamesResult.correct.forEach((correctWordData) => {
        const currentUserWord = this.userWordsCollection
          .find((userWord) => userWord.id === correctWordData.id);
        debugger;
        if (currentUserWord) this.updateCorrectWord(currentUserWord);
      });
      miniGamesResult.correct = [];
    });
  }

  async updateUserWords() {
    return Promise.all(
      this.userWordsCollection.map((wordData) => {
        if (!wordData.userWord.optional.changed) return null;
        wordData.userWord.optional.changed = false;
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

  // async updateDifficultUserWords() {
  //   return Promise.all(
  //     this.difficultWords.map((wordData) => {
  //       if (!wordData.changed) return null;
  //       delete wordData.changed;
  //       if (wordData.userWord.optional.isNew) {
  //         return mainController.setUserWord(
  //           wordData.id,
  //           wordData.userWord.difficulty,
  //           wordData.userWord.optional,
  //         );
  //       }
  //       return mainController.updateUserWord(
  //         wordData.id,
  //         wordData.userWord.difficulty,
  //         wordData.userWord.optional,
  //       );
  //     }),
  //   );
  // }

  // async updateDeletedUserWords() {
  //   return Promise.all(
  //     this.deletedWords.map((wordData) => {
  //       if (!wordData.changed) return null;
  //       delete wordData.changed;
  //       if (wordData.userWord.optional.isNew) {
  //         return mainController.setUserWord(
  //           wordData.id,
  //           wordData.userWord.difficulty,
  //           wordData.userWord.optional,
  //         );
  //       }
  //       return mainController.updateUserWord(
  //         wordData.id,
  //         wordData.userWord.difficulty,
  //         wordData.userWord.optional,
  //       );
  //     }),
  //   );
  // }

  // async updateNewUserWords() {
  //   return Promise.all(
  //     this.newWords.map((wordData) => {
  //       if (!wordData.changed) return null;
  //       delete wordData.changed;
  //       if (!wordData.userWord.optional.isNew) {
  //         return mainController.updateUserWord(
  //           wordData.id,
  //           wordData.userWord.difficulty,
  //           wordData.userWord.optional,
  //         );
  //       }
  //       wordData.userWord.optional.isNew = false;
  //       return mainController.setUserWord(
  //         wordData.id,
  //         wordData.userWord.difficulty,
  //         wordData.userWord.optional,
  //       );
  //     }),
  //   );
  // }

  // async updateUserWords() {
  //   return Promise.all([
  //     this.updateUserWordsByCategories(),
  //     this.updateDifficultUserWords(),
  //     this.updateDeletedUserWords(),
  //     this.updateNewUserWords(),
  //   ]);
  // }

  async loadTodayNewWords() {
    let todayNewWords;
    if ((mainController.userSettings.optional
      .newWordsFetchedData !== new Date().toISOString().slice(0, 10)
      && mainController.userSettings.wordsPerDay - this.newWords.length > 0)
      || mainController.userSettings.optional.cardsPerDay - this.userWordsCollection.length > 0) {
      debugger;
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
      mainController.userSettings.optional.newWordsFetchedData = new Date().toISOString().slice(0, 10); // todo
      await mainController.updateUserSettings();
      return todayNewWords;
    }
    return [];
  }

  updateCategory(wordData, category) {
    wordData.userWord.difficulty = category;
    wordData.userWord.optional.repeatDate = Date.now() + CATEGORY_INDEX_TO_TIME_DELAY[WORD_CATEGORY_TO_INDEX[category]] || 0;
    wordData.userWord.optional.changed = true;
  }

  updateCorrectWord(correctWordData) { // дописать установку флага на количество верных ответов
    if (correctWordData.userWord.optional.isWrong) {
      correctWordData.userWord.optional.isWrong = false;
      return;
    }

    const previousDifficultIndex = WORD_CATEGORY_TO_INDEX[correctWordData.userWord.difficulty] || 0;
    const newDifficultIndex = previousDifficultIndex + 1; // можно ограничить выдачу выученных слов, но они по идее не переходят в игру

    if (newDifficultIndex > 4) {
      correctWordData.userWord.optional.toRepeat = false;
      correctWordData.userWord.optional.isDifficult = false;
      correctWordData.userWord.optional.isDeleted = false;
      correctWordData.userWord.optional.repeatDate = Date.now() + 30 * 24 * 60 * 60 * 1000;
    } else correctWordData.userWord.optional.repeatDate = Date.now() + CATEGORY_INDEX_TO_TIME_DELAY[newDifficultIndex] || 0;

    correctWordData.userWord.difficulty = INDEX_TO_CATEGORY[newDifficultIndex];
    correctWordData.userWord.optional.changed = true;
  }

  updateWrongWord(wrongWordData) { // дописать установку флага на количество неверных ответов
    // const previousDifficultIndex = WORD_CATEGORY_TO_INDEX[wrongWordData.userWord.difficulty];
    // const newDifficultIndex = (previousDifficultIndex > 0)
    //   ? previousDifficultIndex - 1
    //   : previousDifficultIndex;
    const newDifficultIndex = 0;
    wrongWordData.userWord.difficulty = INDEX_TO_CATEGORY[newDifficultIndex];

    wrongWordData.userWord.optional.repeatDate = Date.now() + CATEGORY_INDEX_TO_TIME_DELAY[newDifficultIndex];
    wrongWordData.userWord.optional.changed = true;
    wrongWordData.userWord.optional.isWrong = true;
  }

  getNewWords(wordsCollection = this.userWordsCollection) {
    return wordsCollection.filter((wordData) => wordData.userWord.difficulty === 'fetched');
  }

  getNextWord() {
    this.cardsCount += 1;

    this.userWordsCollection.sort(
      (wordDataA, wordDataB) => wordDataA.userWord.optional.repeatDate
        - wordDataB.userWord.optional.repeatDate,
    );

    if (this.newWordsCount >= mainController.userSettings.wordsPerDay) {
      const wordToRepeatIndex = this.userWordsCollection.findIndex((wordData) => wordData.userWord.difficulty !== 'fetched') + 1;
      this.userWordsCollection[wordToRepeatIndex].userWord.optional.repeatTimes += 1;
      this.userWordsCollection[wordToRepeatIndex].userWord.optional.lastRepeat = new Date().toLocaleString();
      return this.userWordsCollection[wordToRepeatIndex];
    }

    if (this.userWordsCollection[0].userWord.difficulty === 'fetched') {
      this.userWordsCollection[0].userWord.difficulty = 'new';
      this.userWordsCollection[0].userWord.optional.changed = true;
      this.newWordsCount += 1;
    }
    this.userWordsCollection[0].userWord.optional.repeatTimes += 1;
    this.userWordsCollection[0].userWord.optional.lastRepeat = new Date().toLocaleString();
    return this.userWordsCollection[0];
  }

  async init(userEnglishLevel) {
    if (userEnglishLevel) mainController.englishLevel = userEnglishLevel;
    this.newWords = [];
    this.userWordsCollection = [];
    this.cardsCount = 0;
    this.newWordsCount = 0;

    mainController.spinner.show();
    this.userWordsCollection = await mainController.getAllUserWordsInLearning() || []; // тут нет deleted words and learned words
    // debugger;
    this.newWords = this.getNewWords(this.userWordsCollection);
    const fetchedNewWords = await this.loadTodayNewWords();
    // debugger;
    this.userWordsCollection = this.userWordsCollection.concat(fetchedNewWords);
    this.newWords = this.newWords.concat(fetchedNewWords);
    console.log(this.newWords);
    console.log(this.userWordsCollection);
    // const resultUpdate = await this.updateUserWords();
    // debugger;
    mainController.spinner.hide();
    return Promise.all([this.userWordsCollection, fetchedNewWords]); // todo а надо ли это?

    // ------------------------------------------------------------
    // const result = await mainController.getAllUserWordsInLearning(); // все удалить
    // console.log(result);
    // debugger;
    // await Promise.all(
    //   result.map((item) => userWordsApi.deleteUserWord({ wordId: item.id })),
    // );
    // const result2 = await mainController.getAllUserWordsInLearning();
    // console.log(result2);
    // debugger;
    // -------------------------------------------------------
    // const result = await mainController.getAllUserAggregatedWords({ // записать 12 слов
    //   group: 1,
    //   wordsPerPage: 12,
    // });
    // console.log(result);
    // await Promise.all(
    //   result.map((wordData) => mainController.setUserWord(wordData.id)),
    // );
    // const result2 = await mainController.getAllUserWordsInLearning();
    // console.log(result2);
    // ------------------------------------------------------------------
    // const result = await mainController.getAllUserWordsInLearning(); // скачать 20 слов или все слова пользователя в изучении, если убрать 20 скачает все возможные
    // console.log(result);

    // this.parseUserWordsByCategories(result3);
    // console.log(this.wordsCategories);

    // this.wordsCategories[0][10].changed = true; // изменить

    // await this.updateUserWordsByCategories();

    // const result4 = await mainController.getAllUserWordsInLearning(); // скачать 20 слов пользователя в изучении, если убрать 20 скачает все возможные
    // console.log(result4);
  }
}

export default new SpacedRepetitions();
