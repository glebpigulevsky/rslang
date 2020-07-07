import mainController from '../controller/main.controller';
// import mainStorage from '../mainStorage/mainStorage';

import { EMPTY, EMPTY_ARRAY } from '../../../../common/common.constants';
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
    this.wordsCategories = EMPTY_ARRAY;
    this.difficultWords = EMPTY_ARRAY;
    this.deletedWords = EMPTY_ARRAY;
    this.newWords = EMPTY_ARRAY;

    this.count = 0;
    this.wordsCollectionToLearn = EMPTY_ARRAY;
  }

  parseUserWordsByCategories(userWords = mainController.userWords) {
    userWords.forEach((wordData) => {
      if (wordData.userWord.optional.toRepeat
        && !wordData.userWord.optional.isDeleted
        && !wordData.userWord.optional.isNew) {
        this.wordsCategories[WORD_CATEGORY_TO_INDEX[wordData.userWord.difficulty]].push(wordData);
      }
      if (wordData.userWord.optional.isDifficult) {
        this.difficultWords.push(wordData);
      }
      if (wordData.userWord.optional.isDeleted) {
        this.deletedWords.push(wordData);
      }
      if (wordData.userWord.optional.isNew) {
        this.newWords.push(wordData);
      }
    });
  }

  async updateUserWordsByCategories() {
    return Promise.all(
      this.wordsCategories.map((categoryCollection, categoryIndex) => Promise.all(
        categoryCollection.map((wordData) => {
          if (!wordData.changed) return null;
          delete wordData.changed;
          console.log(wordData.word); // todo
          wordData.userWord.optional.repeatTimes = +wordData.userWord.optional.repeatTimes + 1; // todo
          if (wordData.userWord) {
            return mainController.updateUserWord(
              wordData.id,
              INDEX_TO_CATEGORY[categoryIndex],
              wordData.userWord.optional,
            );
          }
          return mainController.setUserWord(
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
        if (wordData.userWord) {
          return mainController.updateUserWord(
            wordData.id,
            wordData.difficulty,
            wordData.userWord.optional,
          );
        }
        return mainController.setUserWord(
          wordData.id,
          wordData.difficulty,
          wordData.userWord.optional,
        );
      }),
    );
  }

  async updateDeletedUserWords() {
    return Promise.all(
      this.deletedWords.forEach((wordData) => {
        if (!wordData.changed) return null;
        delete wordData.changed;
        if (wordData.userWord) {
          return mainController.updateUserWord(
            wordData.id,
            wordData.difficulty,
            wordData.userWord.optional,
          );
        }
        return mainController.setUserWord(
          wordData.id,
          wordData.difficulty,
          wordData.userWord.optional,
        );
      }),
    );
  }

  async updateNewUserWords() {
    return Promise.all(
      this.newWords.forEach((wordData) => {
        // if (!wordData.changed) return null;
        // delete wordData.changed;
        if (!wordData.userWord.optional.isNew) {
          return mainController.updateUserWord(
            wordData.id,
            wordData.difficulty,
            wordData.userWord.optional,
          );
        }
        wordData.userWord.optional.isNew = false;
        return mainController.setUserWord(
          wordData.id,
          wordData.difficulty,
          wordData.userWord.optional,
        );
      }),
    );
  }

  async updateUserWords() {
    return Promise.all(
      this.updateUserWordsByCategories(),
      this.updateDifficultUserWords(),
      this.updateDeletedUserWords(),
      this.updateNewUserWords(),
    );
  }

  async loadTodayNewWords() {
    if (mainController.userSettings.optional.newWordsFetchedData !== Date.now() && mainController.userSettings.wordsPerDay - this.newWords.length > 0) {
      let todayNewWords = await mainController.getNotUserNewWords(mainController.englishLevel, mainController.userSettings.wordsPerDay - this.newWords.length);
      // todayNewWords = todayNewWords.map((wordData) => {
      //   const newWordData = wordData;
      //   newWordData.difficulty = DEFAULT_USER_WORD_OPTIONS.difficulty;
      //   newWordData.optional = DEFAULT_USER_WORD_OPTIONS.optional;
      //   return newWordData;
      // });
      this.newWords.concat(todayNewWords);

      mainController.userSettings.optional.newWordsFetchedData = Date.now(); // todo
      const newSettings = await mainController.updateUserSettings();
      return newSettings;
    }
    return null;
  }

  // getWordsCollectionToLearn() {
  //   for (let i = 0; i < mainController.userSettings.optional.cardsPerDay; i += 1) {
  //     if (i % 2) { 
  //       this.wordsCollectionToLearn.push(this.newWords.);
  //     } else 
  //   }
  // }
  updateCorrectWord(correctWord) {  // 
    // this.wordsCategories[4].shift();
    // nextWord.userWord.optional.repeatTimes += 1;
    // nextWord.userWord.optional.lastRepeat = Date.now();
    // return nextWord;
  }

  getNextWord() {
    let nextWord;
    if (this.count % 720 === 0) {
      nextWord = this.wordsCategories[4].shift();
      nextWord.userWord.optional.repeatTimes += 1;
      nextWord.userWord.optional.lastRepeat = Date.now();
      return nextWord;
    }
    if (this.count % 120 === 0) {
      nextWord = this.wordsCategories[3].shift();
      nextWord.userWord.optional.repeatTimes += 1;
      nextWord.userWord.optional.lastRepeat = Date.now();
      return nextWord;
    }
    if (this.count % 25 === 0) {
      nextWord = this.wordsCategories[2].shift();
      nextWord.userWord.optional.repeatTimes += 1;
      nextWord.userWord.optional.lastRepeat = Date.now();
      return nextWord;
    }
    if (this.count % 5 === 0) {
      nextWord = this.wordsCategories[1].shift();
      nextWord.userWord.optional.repeatTimes += 1;
      nextWord.userWord.optional.lastRepeat = Date.now();
      return nextWord;
    }
    if (this.count % 2 === 0) {
      nextWord = this.newWords.shift();
      nextWord.difficulty = 'new';
      nextWord.userWord = {
        optional: {
          repeatTimes: 1,
          lastRepeat: Date.now(),
          toRepeat: true,
          isDifficult: false,
          isDeleted: false,
          isNew: true,
        },
      };

      return nextWord;
    }
    nextWord = this.wordsCategories[0].shift();
    nextWord.userWord.optional.repeatTimes += 1;
    nextWord.userWord.optional.lastRepeat = Date.now();
    return nextWord;
  }

  async init() {
    mainController.spinner.show();

    this.wordsCategories = new Array(6).fill(EMPTY).map(() => []);
    this.difficultWords = EMPTY_ARRAY;
    this.deletedWords = EMPTY_ARRAY;
    this.newWords = EMPTY_ARRAY;
    this.wordsCollectionToLearn = EMPTY_ARRAY;
    this.count = 0;

    // скачать 20 слов или все слова пользователя в изучении, если убрать 20 скачает все возможные
    const allUserWords = await mainController.getAllUserWordsInLearning();
    this.parseUserWordsByCategories(allUserWords);
    this.loadTodayNewWords();

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
    // debugger;
    // await Promise.all(
    //   result.map((wordData) => mainController.setUserWord(wordData.id)),
    // );
    // const result2 = await mainController.getAllUserWordsInLearning();
    // console.log(result2);
    // debugger;
    // ------------------------------------------------------------------
    // const result = await mainController.getAllUserWordsInLearning(); // скачать 20 слов или все слова пользователя в изучении, если убрать 20 скачает все возможные
    // console.log(result);
    // debugger;

    // this.parseUserWordsByCategories(result3);
    // console.log(this.wordsCategories);
    // debugger;

    // this.wordsCategories[0][10].changed = true; // изменить

    // await this.updateUserWordsByCategories();

    // const result4 = await mainController.getAllUserWordsInLearning(); // скачать 20 слов пользователя в изучении, если убрать 20 скачает все возможные
    // console.log(result4);
    // debugger;

        mainController.spinner.hide();
  }
}

// mainController.userSettings.wordsPerDay
// mainController.userSettings.optional.cardsPerDay

export default new SpacedRepetitions();
