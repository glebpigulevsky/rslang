import correctSound from './assets/audio/correct.mp3';
import successSound from './assets/audio/success.mp3';
import starWin from './assets/img/star-win.svg';
import logo from './assets/img/logo.jpg';

import './scss/introduction.scss';
import './scss/spinner.scss';
import './scss/card.scss';
import './scss/controls.scss';
import './scss/status-bar.scss';
import './scss/drag-and-drop.scss';

import {
  CLASS_NAMES,
  EVENTS,
  DATA_PATH,
} from '../data/helper';

import { setActiveState, createStar, shuffleArray } from '../data/utils';

import PageList from './components/pageList/pageList';
import ResultsList from './components/resultsList/resultsList';
import Slider from './components/slider/slider';
import Menu from './components/menu/menu';

class View {
  constructor() {
    this.ELEMENTS = null;

    this.currentList = null;
    this.resultList = null;
    this.slider = null;
    this.menu = null;
    this.dataDropZone = null;

    this.correctSound = new Audio(correctSound);
    this.successSound = new Audio(successSound);

    this.renderTranslation = this.renderTranslation.bind(this);
    this.renderSpeechInput = this.renderSpeechInput.bind(this);
  }

  renderPageList(pageData, listenersList) {
    this.currentList = new PageList(this.ELEMENTS.CARDS_CONTAINER, pageData, listenersList);
    this.currentList.render();
  }

  renderResultsList(pageData, listenersList, translationData, guessedList, results) {
    this.resultList = new ResultsList(
      this.ELEMENTS.RESULT.CONTAINER,
      pageData,
      listenersList,
      Array.from(translationData),
      guessedList,
      new Date().toLocaleString(),
      CLASS_NAMES.SLIDER.ACTIVE,
    );
    this.resultList.render();

    results.forEach((result) => {
      new ResultsList(
        this.ELEMENTS.RESULT.CONTAINER,
        result.pageData,
        listenersList,
        result.translations,
        result.guessedList,
        result.time,
      ).render();
    });

    this.slider = new Slider();
    this.slider.init();
  }

  removeActiveStates(container = this.ELEMENTS.CARDS_CONTAINER) {
    container.querySelectorAll(`.${CLASS_NAMES.ACTIVE}`)
      .forEach((item) => item.classList.remove(CLASS_NAMES.ACTIVE));
  }

  setLinkActiveStateByWord(speechInputValue) {
    const card = Array.from(this.ELEMENTS.CARDS_CONTAINER.querySelectorAll(`.${CLASS_NAMES.LINK}`))
      .find((link) => link.dataset.word === speechInputValue);
    card.classList.add(CLASS_NAMES.ACTIVE);

    this.renderPicture(`${DATA_PATH}${card.dataset.image}`);
  }

  resetLinksStates(target) {
    this.removeActiveStates();
    setActiveState(target);
  }

  resetResultsLinksStates(target) {
    this.removeActiveStates(this.ELEMENTS.RESULT.CONTAINER);
    setActiveState(target);
  }

  removeCurrentList() {
    this.currentList.remove();
  }

  renderPicture(imageSrc = logo) {
    this.ELEMENTS.PICTURE.src = imageSrc;
  }

  renderTranslation(translation = '') {
    this.ELEMENTS.TRANSLATION.innerText = translation;
  }

  renderSpeechInput(speechInput = '') {
    this.ELEMENTS.SPEECH_INPUT.value = speechInput;

    if (!speechInput) return;
    const changeEvent = new Event(EVENTS.CHANGE);
    this.ELEMENTS.SPEECH_INPUT.dispatchEvent(changeEvent);
  }

  initGameButton(onGameButtonClick) {
    this.ELEMENTS.BUTTONS.GAME.addEventListener(EVENTS.CLICK, onGameButtonClick);
  }

  toggleGameButtonState() {
    this.ELEMENTS.BUTTONS.GAME.classList.toggle(CLASS_NAMES.DISABLED);
  }

  initSpeechInput(onChangeSpeechInput) {
    this.ELEMENTS.SPEECH_INPUT.addEventListener(EVENTS.CHANGE, onChangeSpeechInput);
  }

  initStopButton(onStopButtonClick) {
    this.ELEMENTS.BUTTONS.STOP.addEventListener(EVENTS.CLICK, onStopButtonClick);
  }

  initNewButton(onNewButtonClick) {
    this.ELEMENTS.BUTTONS.NEW.addEventListener(EVENTS.CLICK, onNewButtonClick);
  }

  initDifficulties(onDifficultChange) {
    this.ELEMENTS.BUTTONS.DIFFICULTIES.addEventListener(EVENTS.CLICK, onDifficultChange);
  }

  initResultButton(onResultButtonClick) {
    this.ELEMENTS.BUTTONS.RESULTS.addEventListener(EVENTS.CLICK, onResultButtonClick);
  }

  initResultsNewGameButton(onResultsNewGameButtonClick) {
    this.ELEMENTS.BUTTONS.RESULTS_NEW_GAME
      .addEventListener(EVENTS.CLICK, onResultsNewGameButtonClick);
  }

  initResultsResumeGameButton(onResultsResumeGameButtonClick) {
    this.ELEMENTS.BUTTONS.RESULTS_RESUME_GAME
      .addEventListener(EVENTS.CLICK, onResultsResumeGameButtonClick);
  }

  addStar() {
    const star = createStar(starWin);
    this.ELEMENTS.STATUS_BAR.append(star);
  }

  playCorrectSound() {
    this.correctSound.play();
  }

  playSuccessSound() {
    this.successSound.play();
  }

  clearStatusBar() {
    this.ELEMENTS.STATUS_BAR.innerHTML = '';
  }

  clearDropZones() {
    this.dataDropZone.innerHTML = '';
    this.resultDropZone.innerHTML = '';
  }

  getCountElementsInDataDropZone() {
    return this.dataDropZone.querySelectorAll('*').length;
  }

  renderInputSentence(currentSentense) {
    shuffleArray(currentSentense.split(' ')).forEach((word) => {
      const span = document.createElement('span');
      span.className = 'dragable';
      span.textContent = word.replace('<b>', '').replace('</b>', '');
      document.querySelector('.data__container').querySelector('.drop__place').append(span);
    });
  }

  renderNextResultDropZone() {
    const div = document.createElement('div');
    div.className = 'drop__place sentence';
    this.resultDropZone.classList.toggle('drop__place');
    this.resultDropZone.after(div);
    this.resultDropZone = div;
  }

  clearGameField() {
    document.querySelector('.field__container').innerHTML = '<div class="drop__place sentence"></div>';
    this.resultDropZone = document.querySelector('.field__container > .drop__place');
  }

  initMenu(onLevelChangeHandler, onRoundChangeHandler) {
    this.menu = new Menu(onLevelChangeHandler, onRoundChangeHandler);
  }

  init() {
    this.ELEMENTS = {
      CARDS_CONTAINER: document.querySelector('.cards__container'),
      PICTURE: document.querySelector('.main-card__picture'),
      TRANSLATION: document.querySelector('.main-card__translation'),
      SPEECH_INPUT: document.querySelector('.main-card__speech-input'),
      STATUS_BAR: document.querySelector('.status-bar'),
      RESULT: {
        CONTAINER: document.body.querySelector('.gallery'),
      },
      BUTTONS: {
        NEW: document.querySelector('.game__button-new'),
        GAME: document.querySelector('.game__button-start'),
        STOP: document.querySelector('.game__button-stop'),
        RESULTS: document.querySelector('.game__button-results'),
        DIFFICULTIES: document.querySelector('.difficulties'),
        RESULTS_NEW_GAME: document.querySelector('.game__button-results_new'),
        RESULTS_RESUME_GAME: document.querySelector('.game__button-results_return'),
      },
    };

    this.dataDropZone = document.querySelector('.data__container > .drop__place');
    this.resultDropZone = document.querySelector('.field__container > .drop__place');
  }
}

export default new View();
