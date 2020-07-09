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

class SpacedRepetitions {
  constructor() {
    this.wordsCategories = [];
    this.difficultWords = [];
    this.deletedWords = [];
    this.newWords = [];

    this.count = 0;
    this.wordsCollectionToLearn = [];
  }

  parseUserWordsByCategories(userWords = mainController.userWords) {
    userWords.forEach((wordData) => {
      if (wordData.userWord.optional.toRepeat
        && !wordData.userWord.optional.isDeleted
        && wordData.userWord.difficulty !== 'fetched') {
        this.wordsCategories[WORD_CATEGORY_TO_INDEX[wordData.userWord.difficulty]].push(wordData);
      }
      if (wordData.userWord.optional.isDifficult) {
        this.difficultWords.push(wordData);
      }
      if (wordData.userWord.optional.isDeleted) {
        this.deletedWords.push(wordData);
      }
      if (wordData.userWord.difficulty === 'fetched') {
        this.newWords.push(wordData);
      }
    });
  }

  parseMiniGamesResults(miniGamesResults = mainStorage.miniGamesResults) {
    Object.values(miniGamesResults).forEach((miniGamesResult) => {
      miniGamesResult.wrong.forEach((wrongWordData) => {
        this.updateWrongWord(wrongWordData);
      });
      miniGamesResult.wrong = [];

      miniGamesResult.correct.forEach((correctWordData) => {
        this.updateCorrectWord(correctWordData);
      });
      miniGamesResult.correct = [];
    });
  }

  async updateUserWordsByCategories() {
    return Promise.all(
      this.wordsCategories.map((categoryCollection, categoryIndex) => Promise.all(
        categoryCollection.map((wordData) => {
          if (!wordData.changed) return null;
          delete wordData.changed;
          if (wordData.userWord.optional.isNew) {
            return mainController.setUserWord(
              wordData.id,
              INDEX_TO_CATEGORY[categoryIndex],
              wordData.userWord.optional,
            );
          }
          return mainController.updateUserWord(
            wordData.id,
            INDEX_TO_CATEGORY[categoryIndex],
            wordData.userWord.optional,
          );
        }),
      )),
    );
  }

  async updateDifficultUserWords() {
    return Promise.all(
      this.difficultWords.map((wordData) => {
        if (!wordData.changed) return null;
        delete wordData.changed;
        if (wordData.userWord.optional.isNew) {
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

  async updateDeletedUserWords() {
    return Promise.all(
      this.deletedWords.map((wordData) => {
        if (!wordData.changed) return null;
        delete wordData.changed;
        if (wordData.userWord.optional.isNew) {
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

  async updateNewUserWords() {
    return Promise.all(
      this.newWords.map((wordData) => {
        if (!wordData.changed) return null;
        delete wordData.changed;
        if (!wordData.userWord.optional.isNew) {
          return mainController.updateUserWord(
            wordData.id,
            wordData.userWord.difficulty,
            wordData.userWord.optional,
          );
        }
        wordData.userWord.optional.isNew = false;
        return mainController.setUserWord(
          wordData.id,
          wordData.userWord.difficulty,
          wordData.userWord.optional,
        );
      }),
    );
  }

  async updateUserWords() {
    return Promise.all([
      this.updateUserWordsByCategories(),
      this.updateDifficultUserWords(),
      this.updateDeletedUserWords(),
      this.updateNewUserWords(),
    ]);
  }

  async loadTodayNewWords() {
    // todo это важно и потом надо вернуть
    let todayNewWords;
    if (mainController.userSettings.optional.newWordsFetchedData !== new Date().toISOString().slice(0, 10) && mainController.userSettings.wordsPerDay - this.newWords.length > 0) {
      todayNewWords = await mainController.getNotUserNewWords(mainController.englishLevel, mainController.userSettings.wordsPerDay - this.newWords.length);
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

  // getWordsCollectionToLearn() {
  //   for (let i = 0; i < mainController.userSettings.optional.cardsPerDay; i += 1) {
  //     if (i % 2) {
  //       this.wordsCollectionToLearn.push(this.newWords.);
  //     } else
  //   }
  // }

  updateCorrectWord(correctWordData) { //
    debugger;
    // correctWordData.userWord.optional.lastRepeat = new Date().toLocaleString();
    const previousDifficultIndex = WORD_CATEGORY_TO_INDEX[correctWordData.userWord.difficulty];
    const currentWordIndex = this.wordsCategories[previousDifficultIndex]
      .findIndex((wordData) => wordData.id === correctWordData.id);

    this.wordsCategories[previousDifficultIndex] = this.wordsCategories[previousDifficultIndex]
      .slice(0, currentWordIndex)
      .concat(
        this.wordsCategories[previousDifficultIndex]
          .slice(currentWordIndex + 1),
      );

    // const previousDifficultIndex = WORD_CATEGORY_TO_INDEX[correctWordData.userWord.difficulty];
    const newDifficultIndex = previousDifficultIndex + 1; // можно ограничить выдачу выученных слов, но они по идее не переходят в игру 

    correctWordData.userWord.difficulty = INDEX_TO_CATEGORY[newDifficultIndex];
    correctWordData.userWord.optional.changed = true;
    this.wordsCategories[newDifficultIndex].push(correctWordData);
    // return correctWordData;
  }

  updateWrongWord(wrongWordData) { //
    // correctWordData.userWord.optional.lastRepeat = new Date().toLocaleString();

    const previousDifficultIndex = WORD_CATEGORY_TO_INDEX[wrongWordData.userWord.difficulty];
    const currentWordIndex = this.wordsCategories[previousDifficultIndex]
      .find((wordData, index) => {
        if (wordData.id === wrongWordData.id) return index;
        return null;
      });

    this.wordsCategories[previousDifficultIndex] = this.wordsCategories[previousDifficultIndex]
      .slice(0, currentWordIndex)
      .concat(
        this.wordsCategories[previousDifficultIndex]
          .slice(currentWordIndex + 1),
      );

    // const previousDifficultIndex = WORD_CATEGORY_TO_INDEX[wrongWordData.userWord.difficulty];
    const newDifficultIndex = (previousDifficultIndex > 0)
      ? previousDifficultIndex - 1
      : previousDifficultIndex;

    wrongWordData.userWord.difficulty = INDEX_TO_CATEGORY[newDifficultIndex];
    wrongWordData.userWord.optional.changed = true;
    this.wordsCategories[newDifficultIndex].unshift(wrongWordData);
    // return wrongWordData;
  }

  getNextWord() {
    this.count += 1;
    let nextWord;
    if (this.count % 720 === 0 && this.wordsCategories[4].length) {
      // nextWord = this.wordsCategories[4].shift();
      [, , , , [nextWord]] = this.wordsCategories;
      nextWord.userWord.optional.repeatTimes += 1;
      nextWord.userWord.optional.lastRepeat = new Date().toLocaleString();
      return nextWord;
    }
    if (this.count % 120 === 0 && this.wordsCategories[3].length) {
      // nextWord = this.wordsCategories[3].shift();
      [, , , [nextWord]] = this.wordsCategories;
      nextWord.userWord.optional.repeatTimes += 1;
      nextWord.userWord.optional.lastRepeat = new Date().toLocaleString();
      return nextWord;
    }
    if (this.count % 25 === 0 && this.wordsCategories[2].length) {
      // nextWord = this.wordsCategories[2].shift();
      [, , [nextWord]] = this.wordsCategories;
      nextWord.userWord.optional.repeatTimes += 1;
      nextWord.userWord.optional.lastRepeat = new Date().toLocaleString();
      return nextWord;
    }
    if (this.count % 5 === 0 && this.wordsCategories[1].length) {
      // nextWord = this.wordsCategories[1].shift();
      [, [nextWord]] = this.wordsCategories;
      nextWord.userWord.optional.repeatTimes += 1;
      nextWord.userWord.optional.lastRepeat = new Date().toLocaleString();
      return nextWord;
    }
    if (this.count % 2 === 0 && this.newWords.length) {
      // nextWord = this.newWords.shift();
      [nextWord] = this.newWords;
      // nextWord.difficulty = 'new';
      nextWord.userWord = {
        difficulty: 'new',
        optional: {
          repeatTimes: DEFAULT_USER_WORD_OPTIONS.optional.repeatTimes,
          lastRepeat: DEFAULT_USER_WORD_OPTIONS.optional.lastRepeat,
          toRepeat: DEFAULT_USER_WORD_OPTIONS.optional.toRepeat,
          isDifficult: DEFAULT_USER_WORD_OPTIONS.optional.isDifficult,
          isDeleted: DEFAULT_USER_WORD_OPTIONS.optional.isDeleted,
          isNew: DEFAULT_USER_WORD_OPTIONS.optional.isNew,
          changed: DEFAULT_USER_WORD_OPTIONS.optional.changed,
        },
      };

      return nextWord;
    }
    if (this.wordsCategories[0].length) {
      // nextWord = this.wordsCategories[0][0];
      [[nextWord]] = this.wordsCategories;
      nextWord.userWord.optional.repeatTimes += 1;
      nextWord.userWord.optional.lastRepeat = new Date().toLocaleString();
      return nextWord;
    }
    alert('На сегодня закончились слова для изучения!'); // todo
    return null;
  }

  async init() {
    mainController.spinner.show();

    this.wordsCategories = new Array(6).fill(EMPTY).map(() => []);
    this.difficultWords = [];
    this.deletedWords = [];
    this.newWords = [];
    // this.wordsCollectionToLearn = [];
    this.count = 0;

    // скачать 20 слов или все слова пользователя в изучении, если убрать 20 скачает все возможные
    const allUserWords = await mainController.getAllUserWordsInLearning();
    this.parseUserWordsByCategories(allUserWords);
    // const todayNewWords = await this.loadTodayNewWords();
    const fetchedNewWords = await this.loadTodayNewWords();
    this.newWords = this.newWords.concat(fetchedNewWords);
    console.log(this.newWords);

    // const result = await mainController.getAllUserWordsInLearning(); // все удалить
    // console.log(result);
    // await Promise.all(
    //   result.map((item) => userWordsApi.deleteUserWord({ wordId: item.id })),
    // );
    // const result2 = await mainController.getAllUserWordsInLearning();
    // console.log(result2);
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

    mainController.spinner.hide();
    return Promise.all([allUserWords, fetchedNewWords]);
  }
}

// mainController.userSettings.wordsPerDay
// mainController.userSettings.optional.cardsPerDay

export default new SpacedRepetitions();
