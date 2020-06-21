import './scss/some_component.scss';
import { GAME_BLOCK, TEMPLATE_MAIN_GAME, INPUT_AREA } from '../../common/main.constants';
import {
  SettingsApi, StatisticsApi, UsersApi, UserWordsApi, WordsApi,
} from '../../../../services/services.methods';

const wordsApi = new WordsApi();
const game = {

  gameButtons: {
    next: null,
    prev: null,
  },
  settings: null,

  currentCard: {},
  previousCard: {},
  collection: [],
  indexCard: 0,
  inputArea: null,
  url: 'https://raw.githubusercontent.com/caspercarver/rslang-data/master/',

  async addMdGameScreen() {
    GAME_BLOCK.innerHTML = '';
    GAME_BLOCK.append(TEMPLATE_MAIN_GAME.content.cloneNode(true));
    await this.fetchWords();
    console.log(this.settings);
    this.playMode(this.indexCard);
  },

  async fetchWords() {
    this.collection = await wordsApi.getWordsCollection({ group: 5, page: 1 });
    this.currentCard = this.collection[this.indexCard];
    console.log(this.currentCard.textExample);
  },

  init(settings) {
    this.settings = settings;
    this.addMdGameScreen();
  },

  async playMode(queryIndex) {
    this.gameButtons.next = document.querySelector('.next');
    this.gameButtons.next.addEventListener('click', inputModeArrowBinded);
    this.gameButtons.prev = document.querySelector('.prev');
    if (this.indexCard > 0) {
      this.gameButtons.prev.classList.remove('hidden');
    }
    this.gameButtons.prev.addEventListener('click', inputModeArrowPrevBinded);
    //this.addSettingsButton(this.settings);
    this.currentCard = await this.collection[queryIndex];
    this.currentCard.textExample = this.currentCard.textExample.replace(/<\/?[a-zA-Z]+>/gi, '');
    this.currentCard.textExample = this.currentCard.textExample.replace(',', ' ,').toLowerCase();
    const wordsArr = await this.currentCard.textExample.split(' ');
    if (wordsArr.indexOf(this.currentCard.word) === -1) {
      this.indexCard += 1;
      game.playMode(this.indexCard);
    }
    wordsArr[wordsArr.length - 1] = wordsArr[wordsArr.length - 1].slice(0, -1);
    wordsArr.find((element, index) => {
      if (element === this.currentCard.word) {
        wordsArr[index] = '';
        if (index === 0) {
          this.currentCard.word = this.currentCard.word[0]
            .toUpperCase() + this.currentCard.word.slice(1);
        }
      }
    });
    document.querySelector('.learn-content__container').innerHTML = '';
    wordsArr.map((element, index) => {
      if (index === 0 && element !== '') {
        element = element[0].toUpperCase() + element.slice(1);
      }
      if (element !== '') {
        const divWord = document.createElement('div');
        divWord.classList.add('word');
        divWord.innerHTML = element;
        document.querySelector('.learn-content__container').append(divWord);
      } else {
        const inputDiv = document.createElement('span');
        const spanBg = document.createElement('span');
        const wordContainer = document.createElement('span');
        spanBg.classList.add('background');
        inputDiv.classList.add('input-container');
        wordContainer.classList.add('word-container');
        const wordLetter = this.currentCard.word.split('');
        inputDiv.innerHTML = '';
        console.log(this.collection);
        wordLetter.map((element, index) => {
          console.log(element);
          spanBg.innerHTML += `<span index=${index} class="opacityhidden">${element}</span>`;
          wordContainer.innerHTML += `<span index=${index} class="opacityhidden">${element}</span>`;
        });
        const inputWord = document.createElement('input');
        if (this.settings.optional.isTranscription === 'true') {
          document.querySelector('.transcription').innerHTML = '';
          document.querySelector('.transcription').innerHTML = this.currentCard.transcription;
        }
        if (this.settings.optional.isTranslation === 'true') {
          document.querySelector('.learn-content__meaning').innerHTML = '';
          document.querySelector('.learn-content__meaning').innerHTML = this.currentCard.textMeaning;
        }
        if (this.settings.optional.isPicture === 'true') {
          document.querySelector('.card-image').innerHTML = '';
          document.querySelector('.card-image').innerHTML = `<img src="${this.currentCard.image}"></img>`;
        }
        inputWord.classList.add('answer-input');
        inputDiv.append(spanBg);
        inputDiv.append(wordContainer);
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
    document.querySelector('.translate').innerHTML = this.currentCard.wordTranslate;
    document.addEventListener('keypress', inputModeEnterBinded);
  },

  addSettingsButton(settings) {
    
  },

};

function inputModeEnter(e) {
  this.inputArea = document.querySelector('.answer-input');

  if (e.key === 'Enter') {
    if (this.inputArea.value === this.currentCard.word) {
      document.removeEventListener('keypress', () => {});
      playAudioBinded(this.currentCard.audioExample);
    }
  }
}

function inputModeArrow() {
  this.inputArea = document.querySelector('.answer-input');
  if (this.inputArea.value === this.currentCard.word) {
    playAudioBinded(this.currentCard.audioExample);
  } else {
    const audio = new Audio();
    audio.src = this.currentCard.audio;
    audio.autoplay = true;
  }
}

function inputModeArrowPrev() {
  this.indexCard -= 1;
  game.playMode(this.indexCard);
  if (this.indexCard === 0) {
    game.gameButtons.prev.classList.add('hidden');
  }
}

function playAudio(path) {
  const audio = new Audio();
  audio.src = path;
  audio.autoplay = true;
  audio.addEventListener('ended', () => {
    this.indexCard += 1;
    game.playMode(this.indexCard);
  });
}

let inputModeEnterBinded = inputModeEnter.bind(game);
let inputModeArrowBinded = inputModeArrow.bind(game);
let inputModeArrowPrevBinded = inputModeArrowPrev.bind(game);
let playAudioBinded = playAudio.bind(game);

export default game;
