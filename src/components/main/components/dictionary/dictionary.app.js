import { UserWordsApi } from '../../../../services/services.methods';
import { LocalStorageService } from '../../../../common/common.helper';
import ApiService from '../../../../services/common/services.common.api_service';
import { MAIN_API_URL } from '../../../../services/common/services.common.constants';

const userWords = new UserWordsApi();
const service = new LocalStorageService();

export default class Dictionary {
  constructor() {
    this.buttons = null;
    this.difficultWordsClickHandlerBinded = this.difficultWordsClickHandler.bind(this);
    this.learnedWordsClickHandlerBinded = this.learnedWordsClickHandler.bind(this);
    this.deletedWordsClickHandlerBinded = this.deletedWordsClickHandler.bind(this);
    this.dictionaryArea = null;
  }

  init() {
    this.buttons = {
      learnedWords: document.querySelector('.dictionary__learned-btn'),
      difficultWords: document.querySelector('.dictionary__difficult-btn'),
      deletedWords: document.querySelector('.dictionary__deleted-btn'),
    };
    this.dictionaryArea = document.querySelector('.dictionary__table');
    this.buttons.difficultWords.addEventListener('click', this.difficultWordsClickHandlerBinded);
    this.buttons.learnedWords.addEventListener('click', this.learnedWordsClickHandlerBinded);
    this.buttons.deletedWords.addEventListener('click', this.deletedWordsClickHandlerBinded);
    console.info('init');
  }

  async getUnitedWords() {
    service.keyUserInfo = 'userInfo_TEST';
    const res = service.getUserInfo();
    userWords._apiService = new ApiService(MAIN_API_URL, res.token);
    const words = await userWords.getAllUserWords({ userId: res.userId });
    // const aggregatedService = new ApiService();
    // aggregatedWords = await aggregatedService.getResource({
    //   url: `/users/${res.userId}/settings`,
    //   hasToken: true,
    //   params: { userId: res.userId,
    //     group: 0,
    //     wordsPerPage: 3,
    //     filter: {
    //       "$or": [
    //       {"userWord.difficulty":"strong"},
    //       {"userWord":null}
    //       ]
    //     }
    //   }, });
    return words;
  }

  async learnedWordsClickHandler() {
    const wordsCollection = this.getUnitedWords();
    console.info(wordsCollection);
    // отсортировать слова юзера по
    // /users/{id}/aggregatedWords !!!!
    // добавить в таблицу !!!
    // или в методе getUitedWords сделать запрос к /users/{id}/aggregatedWords
  }

  async difficultWordsClickHandler() {
    const wordsCollection = this.getUnitedWords();
    console.info(wordsCollection);
    // отсортировать слова юзера по
    // /users/{id}/aggregatedWords !!!!
    // добавить в таблицу !!!
  }

  async deletedWordsClickHandler() {
    const wordsCollection = this.getUnitedWords();
    console.info(wordsCollection);
    // отсортировать слова юзера по
    // /users/{id}/aggregatedWords !!!!
    // добавить в таблицу !!!
  }
}
