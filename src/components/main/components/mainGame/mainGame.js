import './scss/some_component.scss';
import { GAME_BLOCK, TEMPLATE_MAIN_GAME } from '../../common/main.constants';
import {
  MAIN_API_URL,
} from '../../../../services/common/services.common.constants';
import {
  UserWordsApi, WordsApi,
} from '../../../../services/services.methods';
import ErrorInput from '../errorInput/errorInput';
import introMainGame from '../introMainGame/introMainGame';
import { LocalStorageService } from '../../../../common/common.helper';
import ApiService from '../../../../services/common/services.common.api_service';

const userWords = new UserWordsApi();
const service = new LocalStorageService();
const errorInput = new ErrorInput();
const wordsApi = new WordsApi();

async function inputModeEnter(e) {
  this.inputArea = document.querySelector('.answer-input');
  if (e.key === 'Enter') {
    if (this.settings.optional.isAudio === 'true') {
      if (this.inputArea.value === this.currentCard.word) {
        document.removeEventListener('keypress', () => {});
        const audio = new Audio();
        audio.src = this.currentCard.audio;
        audio.autoplay = true;
        audio.addEventListener('ended', () => {
          playAudioBinded(this.currentCard.audioExample);
        });
      } else {
        const audio = new Audio();
        audio.src = this.currentCard.audio;
        audio.autoplay = true;
        await errorInput.init();
      }
    } else if (this.inputArea.value === this.currentCard.word) {
      document.removeEventListener('keypress', () => {});
      playAudioBinded(this.currentCard.audio);
    } else {
      const audio = new Audio();
      audio.src = this.currentCard.audio;
      audio.autoplay = true;
      await errorInput.init();
    }
  }
}

async function inputModeArrow() {
  this.inputArea = document.querySelector('.answer-input');
  if (this.settings.optional.isAudio === 'true') {
    if (this.inputArea.value === this.currentCard.word) {
      playAudioBinded(this.currentCard.audioExample);
    } else {
      const audio = new Audio();
      audio.src = this.currentCard.audio;
      audio.autoplay = true;
      await errorInput.init();
    }
  } else if (this.inputArea.value === this.currentCard.word) {
    playAudioBinded(this.currentCard.audio);
  } else {
    const audio = new Audio();
    audio.src = this.currentCard.audio;
    audio.autoplay = true;
    await errorInput.init();
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
    if (this.indexCard === (this.collection.length - 1)) {
      document.querySelector('.learn-content__meaning').innerHTML = '';
      this.page += 1;
      this.indexCard = 0;
      this.addMdGameScreen();
    } else {
      document.querySelector('.learn-content__meaning').innerHTML = '';
      this.indexCard += 1;
      game.playMode(this.indexCard);
    }
  });
}

const game = {

  gameButtons: {
    next: null,
    prev: null,
    clicked: null,
  },
  settings: null,
  level: null,
  page: 0,
  difficult: null,

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
    this.playMode(this.indexCard);
  },

  async fetchWords() {
    this.collection = null;
    this.collection = await wordsApi.getWordsCollection({ group: this.level, page: this.page });
    console.info(this.collection);
    this.currentCard = this.collection[this.indexCard];
  },

  init(settingsFetch, englishLevel) {
    this.level = englishLevel;
    this.settings = settingsFetch;
    document.addEventListener('keyup', (e) => {
      if (e.key === 'Escape') {
        introMainGame.init();
      }
    });
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
    this.currentCard = await this.collection[queryIndex];
    this.currentCard.textExample = this.currentCard.textExample.replace(/<\/?[a-zA-Z]+>/gi, '');
    this.currentCard.textExample = this.currentCard.textExample.replace(',', ' ,').toLowerCase();
    const wordsArr = await this.currentCard.textExample.split(' ');
    if (wordsArr.indexOf(this.currentCard.word) === -1) {
      if (this.indexCard === 19) {
        this.page += 1;
        this.indexCard = 0;
        this.addMdGameScreen();
      }
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
      if (element !== '' || element === '.') {
        const divWord = document.createElement('div');
        divWord.classList.add('word');
        divWord.innerHTML = element;
        document.querySelector('.learn-content__container').append(divWord);
      } else {
        const inputDiv = document.createElement('span');
        const spanBg = document.createElement('span');
        spanBg.classList.add('background');
        spanBg.classList.add('hidden-vis');
        inputDiv.classList.add('input-container');
        const wordLetter = this.currentCard.word.split('');
        inputDiv.innerHTML = '';
        wordLetter.map((element, index) => {
          spanBg.innerHTML += `<span index=${index} class="opacityhidden errors">${element}</span>`;
        });
        const inputWord = document.createElement('input');
        this.buildCardSettings(this.settings);
        inputWord.classList.add('answer-input');
        inputDiv.append(spanBg);
        inputDiv.append(inputWord);
        document.querySelector('.learn-content__container').append(inputDiv);
      }
    });
    const dotBlock = document.createElement('span');
    dotBlock.classList.add('dotBlock');
    dotBlock.innerHTML = '.';
    document.querySelector('.answer-input').focus();
    document.querySelector('.learn-content__container').append(dotBlock);
    document.querySelector('.translate').innerHTML = this.currentCard.wordTranslate;
    document.addEventListener('keypress', inputModeEnterBinded);
  },

  buildCardSettings(settings) {
    if (settings.optional.isTranscription === 'true') {
      document.querySelector('.transcription').innerHTML = '';
      document.querySelector('.transcription').innerHTML = this.currentCard.transcription;
    }
    // if (settings.optional.isAddSentExplWord === 'true') {
    //   document.querySelector('.learn-content__meaning').innerHTML = '';
    //   document.querySelector('.learn-content__meaning').innerHTML = this.currentCard.textMeaning;
    // }
    if (this.settings.optional.isPicture === 'true') {
      document.querySelector('.card-image').innerHTML = '';
      document.querySelector('.card-image').innerHTML = `<img src="${this.currentCard.image}"></img>`;
    }
    if (this.settings.optional.isTranslation === 'true') {
      document.querySelector('.learn-content__translation').innerHTML = '';
      document.querySelector('.learn-content__translation').innerHTML = this.currentCard.textExampleTranslate;
    }
    // buttons
    if (this.settings.optional.isShowAnswerButton === 'true') {
      document.querySelector('.card-footer__answer-button').innerHTML = '';
      document.querySelector('.card-footer__answer-button').innerHTML = '<button class="show__answer-button">Ответ</button>';
      document.querySelector('.show__answer-button').addEventListener('click', this.showAnswerButton);
    }
    if (this.settings.optional.isShowDiffMoveButton === 'true') {
      document.querySelector('.card-header__move-diff').innerHTML = '';
      document.querySelector('.card-header__move-diff').innerHTML = '<button>Move D.</button>';
    }
    if (this.settings.optional.isShowDeleteButton === 'true') {
      document.querySelector('.card-header__delete-word').innerHTML = '';
      document.querySelector('.card-header__delete-word').innerHTML = '<button>Delete</button>';
      document.querySelector('.card-header__delete-word').addEventListener('click', this.clickHadnlerDeleteUserWord);
    }
    if (this.settings.optional.isShowAgainButton === 'true') {
      document.querySelector('.card-header__again-word').innerHTML = '';
      document.querySelector('.card-header__again-word').innerHTML = '<button>Again</button>';
    }
    if (this.settings.optional.isShowDiffButton === 'true') {
      document.querySelector('.card-header__diff-diff').innerHTML = '';
      document.querySelector('.card-header__diff-diff').innerHTML = '<button>Difficult</button>';
      document.querySelector('.card-header__diff-diff').addEventListener('click', this.clickHadnlerAddUserWordDiff);
    }
    if (this.settings.optional.isShowEasyButton === 'true') {
      document.querySelector('.card-header__diff-easy').innerHTML = '';
      document.querySelector('.card-header__diff-easy').innerHTML = '<button>Easy</button>';
      document.querySelector('.card-header__diff-easy').addEventListener('click', this.clickHadnlerAddUserWordEasy);
    }
  },

  clickHadnlerDeleteUserWord() {
    game.gameButtons.clicked = document.querySelector('.card-header__diff-easy');
    game.deleteUsWords();
  },

  clickHadnlerAddUserWordEasy() {
    game.gameButtons.clicked = document.querySelector('.card-header__diff-easy');
    game.difficult = 'easy';
    game.addUserWords();
  },

  clickHadnlerAddUserWordDiff() {
    game.gameButtons.clicked = document.querySelector('.card-header__diff-diff');
    game.difficult = 'difficult';
    game.addUserWords();
  },

  showAnswerButton() {
    if (game.settings.optional.isAddSentExplWord === 'true') {
      document.querySelector('.learn-content__meaning').innerHTML = '';
      document.querySelector('.learn-content__meaning').innerHTML = game.currentCard.textMeaning;
    }
  },

  async deleteUsWords() {
    service.keyUserInfo = 'userInfo';
    const res = service.getUserInfo();
    userWords._apiService = new ApiService(MAIN_API_URL, res.token);
    userWords.deleteUserWord({ userId: res.userId, wordId: game.currentCard.id })
      .then()
      .catch((err) => {
        console.log(err);
      });
    game.gameButtons.clicked.removeEventListener('click', game.clickHadnlerDeleteUserWord);
  },

  async addUserWords() {
    service.keyUserInfo = 'userInfo';
    const res = service.getUserInfo();
    userWords._apiService = new ApiService(MAIN_API_URL, res.token);
    userWords.createUserWord({
      userId: res.userId,
      wordId: game.currentCard.id,
      difficulty: this.difficult,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        userWords.updateUserWord({
          userId: res.userId,
          wordId: game.currentCard.id,
          difficulty: this.difficult,
        })
          .then(() => {
          })
          .catch((errr) => {
            console.log(errr);
          });
      });
    game.gameButtons.clicked.removeEventListener('click', game.clickHadnlerAddUserWordEasy);
  },

};

let inputModeEnterBinded = inputModeEnter.bind(game);
let inputModeArrowBinded = inputModeArrow.bind(game);
let inputModeArrowPrevBinded = inputModeArrowPrev.bind(game);
let playAudioBinded = playAudio.bind(game);

export default game;
