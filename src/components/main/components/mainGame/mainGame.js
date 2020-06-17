import './scss/some_component.scss';
import { GAME_BLOCK, TEMPLATE_MAIN_GAME, INPUT_AREA } from '../../common/main.constants';
import {
  SettingsApi, StatisticsApi, UsersApi, UserWordsApi, WordsApi,
} from '../../../../services/services.methods';

const wordsApi = new WordsApi();
const game = {
  gameButtons: {
    next: document.querySelector('.next'),
    prev: document.querySelector('.prev'),
  },
  currentCard: {},
  previousCard: {},
  collection: [],
  indexCard: 0,
  inputArea: null,

  async addMdGameScreen() {
    GAME_BLOCK.innerHTML = '';
    GAME_BLOCK.append(TEMPLATE_MAIN_GAME.content.cloneNode(true));
    await this.fetchWords();
    this.playMode();
  },

  async fetchWords() {
    this.collection = await wordsApi.getWordsCollection({ group: 5, page: 1 });
    this.currentCard = this.collection[this.indexCard];
    console.log(this.currentCard.textExample);
  },

  init() {
    this.addMdGameScreen();
  },

   playMode() {
    this.currentCard = this.collection[this.indexCard];
    this.currentCard.textExample = this.currentCard.textExample.replace(/<\/?[a-zA-Z]+>/gi, '');
    let wordsArr = this.currentCard.textExample.split(' ');
    wordsArr[wordsArr.length - 1] = wordsArr[wordsArr.length - 1].slice(0, -1);
    wordsArr.find((element, index) => {
      if (element === this.currentCard.word) {
        wordsArr[index] = '';
      }
    });
    document.querySelector('.learn-content__container').innerHTML = '';
    wordsArr.map((element, index) => {
      if (element !== '') {
        const divWord = document.createElement('div');
        divWord.classList.add('word');
        divWord.innerHTML = element;
        document.querySelector('.learn-content__container').append(divWord);
      } else {
        const inputDiv = document.createElement('div');
        inputDiv.classList.add('input-container');
        const wordLetter = this.currentCard.word.split('');
        inputDiv.innerHTML = '';
        wordLetter.map((element, index) => {
          console.log(element);
          inputDiv.innerHTML += `<span index=${index} class="opacityhidden">${element}</span>`;
        });
        const inputWord = document.createElement('input');
        inputWord.classList.add('answer-input');
        inputDiv.append(inputWord);
        document.querySelector('.learn-content__container').append(inputDiv);
      }
    });
    const dotBlock = document.createElement('span');
    dotBlock.classList.add('dotBlock');
    dotBlock.innerHTML = '.';
    document.querySelector('.learn-content__container').append(dotBlock);
    document.querySelector('.learn-content__translation').innerHTML = '';
    document.querySelector('.learn-content__translation').innerHTML = this.currentCard.textExampleTranslate;
    document.querySelector('.card-helper').innerHTML = this.currentCard.wordTranslate;
    this.inputMode();
  },

  inputMode() {
    this.inputArea = document.querySelector('.answer-input');
    document.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        if (this.inputArea.value === this.currentCard.word) {
          this.indexCard += 1;
          this.playMode();
        }
      }
    });
  },
};

export default game;
