import { WordsApi } from '../../../services/services.methods';

const wordsAPI = new WordsApi();

export default class GameSprint {
  constructor() {
    this.currentPage = 0;
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
        result: el.wordTranslate === this.wordTranslateRUS,
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
    this.playGame(objectEN[0].result);
    console.log(objectEN);
  }

  createWord(object) {
    const field = document.getElementById('word-container');
    const temp = object.map((el) => this.createTemplateWords(el));
    const buttons = document.getElementById('buttons');
    buttons.addEventListener('click', (event) => {
      const target = event.target.className;
      if (target === 'btn true') {
        console.log(this.currentPage += 1);
        field.insertAdjacentHTML('afterbegin', temp[this.currentPage += 1]);
      }
    });
    field.insertAdjacentHTML('afterbegin', temp[this.currentPage]);
    console.log(temp);
  }

  createTemplateWords(word) {
    return `<span class = 'word'>${word.word}</span>
    <span class = 'word'>${word.wordTranslateRUS}</span>`;
  }

  addHandlerEvent() {
    const buttons = document.getElementById('buttons');
    buttons.addEventListener('click', (event) => {
      const target = event.target.className;
      if (target === 'btn true') {
          console.log(this.currentPage += 1);
        // this.currentPage += 1;
      }
    });
  }

  playGame(boolean) {
    const result = boolean;
    console.log(result);
  }

  init() {
    this.getWords();
    this.createObjectWords();
    this.current();
    this.playGame();
  }
}
