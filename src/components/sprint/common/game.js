import { WordsApi } from '../../../services/services.methods';

const wordsAPI = new WordsApi();

export default class GameSprint {
  constructor() {
    this.currentPage = [];
  }

  getWords() {
    wordsAPI.getWordsCollection({ group: 0, page: 1 })
      .then((res) => {
        this.createObjectWords(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async createObjectWords(words) {
    const objectEnglishWords = [];

    const objectWords = await words.map((el, ind, array) => {
      objectEnglishWords.push({
        id: el.id,
        word: el.word,
        translate: el.wordTranslate,
        wordTranslateRUS: this.createShuffledArray(array),
      });
    });
    this.current(objectEnglishWords);
  }

  createShuffledArray(array) {
    const arr = array;
    arr.sort(() => Math.random() - 0.5);
    const wordRandom = arr.map((el) => el.wordTranslate);
    return wordRandom[0];
  }

  shuffledArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  async current(wordsEn) {
    const objectEN = await this.shuffledArray(wordsEn);
    this.createWord(objectEN);
    console.log(objectEN);
  }

  createWord(object) {
    const field = document.getElementById('word-container');
    const temp = object.map((el) => this.createTemplateWords(el));
    field.insertAdjacentHTML('afterbegin', temp[0]);
    console.log(temp);
  }

  createTemplateWords(word) {
    return `<span class = 'word'>${word.word}</span>
    <span class = 'word'>${word.wordTranslateRUS}</span>`;
  }

  init() {
    this.getWords();
    this.createObjectWords();
    this.current();
  }
}
