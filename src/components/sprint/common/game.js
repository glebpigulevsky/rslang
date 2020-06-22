import { WordsApi } from '../../../services/services.methods';

const wordsAPI = new WordsApi();

export default class GameSprint {
  constructor() {
    this.currentPage = [];
  }

  getWords() {
    wordsAPI.getWordsCollection({ group: 0, page: 1 })
      .then((res) => {
        this.createArrayWords(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async createArrayWords(words) {
    const arrayRandomEnWords = [];
    const arrayRandomRusWords = [];

    const arrayWords = await words.map((el) => {
      arrayRandomEnWords.push(el.word);
      arrayRandomRusWords.push(el.wordTranslate);
    });

   const en = await this.currentPage(arrayRandomEnWords);
    // this.randomSortArray(arrayRandomRusWords);
  }

  randomSortArray(arr) {
    console.log(arr);
    return arr.sort(() => Math.random() - 0.5);
  }

  currentPage(arr) {
    const url = arr;
    console.log(url);
    return url;
  }

  init() {
    this.getWords();
    this.createArrayWords();
    this.currentPage();
  }
}
