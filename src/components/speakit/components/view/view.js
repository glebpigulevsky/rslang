import correctSound from './assets/audio/correct.mp3';
import successSound from './assets/audio/success.mp3';
import starWin from './assets/img/star-win.svg';
import logo from './assets/img/logo.jpg';

import {
  CLASS_NAMES,
  EVENTS,
  DATA_PATH,
} from '../../common/speakit.constants';

import { setActiveState, createStar } from '../../common/speakit.utils';

import PageList from './components/pageList/pageList';
import ResultsList from './components/resultsList/resultsList';
import Slider from './components/slider/slider';
import Menu from './components/menu/menu';

class View {
  constructor() {
    this.container = null;
    this.resultsContainer = null;
    this.picture = null;
    this.currentList = null;
    this.resultList = null;
    this.translation = null;
    this.newButton = null;
    this.gameButton = null;
    this.stopButton = null;
    this.resultButton = null;
    this.resultsNewGameButton = null;
    this.resultsResumeGameButton = null;
    this.speechInput = null;
    this.difficultiesContainer = null;
    this.statusBar = null;
    this.slider = null;

    this.correctSound = new Audio(correctSound);
    this.successSound = new Audio(successSound);

    this.renderTranslation = this.renderTranslation.bind(this);
    this.renderSpeechInput = this.renderSpeechInput.bind(this);
  }

  renderPageList(pageData, listenersList) {
    this.currentList = new PageList(this.container, pageData, listenersList);
    this.currentList.render();
  }

  renderResultsList(pageData, listenersList, translationData, guessedList, results) {
    this.resultList = new ResultsList(
      this.resultsContainer,
      pageData,
      listenersList,
      // Array.from(translationData),
      guessedList,
      new Date().toLocaleString(),
      CLASS_NAMES.SLIDER.ACTIVE,
    );
    this.resultList.render();

    results.forEach((result) => {
      new ResultsList(
        this.resultsContainer,
        result.pageData,
        listenersList,
        // result.translations,
        result.guessedList,
        result.time,
      ).render();
    });

    this.slider = new Slider();
    this.slider.init();
  }

  removeActiveStates(container = this.container) {
    container.querySelectorAll(`.${CLASS_NAMES.ACTIVE}`)
      .forEach((item) => item.classList.remove(CLASS_NAMES.ACTIVE));
  }

  setLinkActiveStateByWord(speechInputValue) {
    const card = Array.from(this.container.querySelectorAll(`.${CLASS_NAMES.LINK}`))
      .find((link) => link.dataset.word === speechInputValue);
    card.classList.add(CLASS_NAMES.ACTIVE);

    this.renderPicture(card.dataset.image); // todo
  }

  resetLinksStates(target) {
    this.removeActiveStates();
    setActiveState(target);
  }

  resetResultsLinksStates(target) {
    this.removeActiveStates(this.resultsContainer);
    setActiveState(target);
  }

  removeCurrentList() {
    this.currentList.remove();
  }

  renderPicture(imageSrc = logo) {
    this.picture.src = imageSrc;
  }

  renderTranslation(translation = '') {
    this.translation.innerText = translation;
  }

  renderSpeechInput(speechInput = '') {
    this.speechInput.value = speechInput;

    if (!speechInput) return;
    const changeEvent = new Event(EVENTS.CHANGE);
    this.speechInput.dispatchEvent(changeEvent);
  }

  initGameButton(onGameButtonClick) {
    this.gameButton.addEventListener(EVENTS.CLICK, onGameButtonClick);
  }

  toggleGameButtonState() {
    this.gameButton.classList.toggle(CLASS_NAMES.DISABLED);
  }

  initSpeechInput(onChangeSpeechInput) {
    this.speechInput.addEventListener(EVENTS.CHANGE, onChangeSpeechInput);
  }

  initStopButton(onStopButtonClick) {
    this.stopButton.addEventListener(EVENTS.CLICK, onStopButtonClick);
  }

  initNewButton(onNewButtonClick) {
    this.newButton.addEventListener(EVENTS.CLICK, onNewButtonClick);
  }

  initDifficulties(onDifficultChange) {
    this.difficultiesContainer.addEventListener(EVENTS.CLICK, onDifficultChange);
  }

  initResultButton(onResultButtonClick) {
    this.resultButton.addEventListener(EVENTS.CLICK, onResultButtonClick);
  }

  initResultsNewGameButton(onResultsNewGameButtonClick) {
    this.resultsNewGameButton.addEventListener(EVENTS.CLICK, onResultsNewGameButtonClick);
  }

  initResultsResumeGameButton(onResultsResumeGameButtonClick) {
    this.resultsResumeGameButton.addEventListener(EVENTS.CLICK, onResultsResumeGameButtonClick);
  }

  addStar() {
    const star = createStar(starWin);
    this.statusBar.append(star);
  }

  playCorrectSound() {
    this.correctSound.play();
  }

  playSuccessSound() {
    this.successSound.play();
  }

  clearStatusBar() {
    this.statusBar.innerHTML = '';
  }

  initMenu(onLevelChangeHandler, onRoundChangeHandler) {
    this.menu = new Menu(onLevelChangeHandler, onRoundChangeHandler);
  }

  init() {
    this.container = document.querySelector('.cards__container');
    this.picture = document.querySelector('.main-card__picture');
    this.translation = document.querySelector('.main-card__translation');
    this.gameButton = document.querySelector('.game__button-start');
    this.speechInput = document.querySelector('.main-card__speech-input');
    this.stopButton = document.querySelector('.game__button-stop');
    this.difficultiesContainer = document.querySelector('.difficulties');
    this.newButton = document.querySelector('.game__button-new');
    this.resultButton = document.querySelector('.game__button-results');
    this.resultsContainer = document.body.querySelector('.gallery');
    this.resultsNewGameButton = document.querySelector('.game__button-results_new');
    this.resultsResumeGameButton = document.querySelector('.game__button-results_return');
    this.statusBar = document.querySelector('.status-bar');

    this.introduction = document.querySelector('.introduction');
    this.spinner = document.querySelector('.spinner');
    this.centralizer = document.querySelector('.speakit-centralizer');

    // export const ELEMENTS = {
    //   CENTRALIZER: document.querySelector('.centralizer'),
    //   INTRODUCTION: document.querySelector('.introduction'),
    //   SPINNER: document.querySelector('.spinner'),
    //   CARDS_CONTAINER: document.querySelector('.cards__container'),
    //   PICTURE: document.querySelector('.main-card__picture'),
    //   TRANSLATION: document.querySelector('.main-card__translation'),
    //   SPEECH_INPUT: document.querySelector('.main-card__speech-input'),
    //   STATUS_BAR: document.querySelector('.status-bar'),
    //   RESULT: {
    //     TEMPLATE: document.body.querySelector('.slider__item-template'),
    //     CONTAINER: document.body.querySelector('.gallery'),
    //   },
    //   BUTTONS: {
    //     INTRODUCTION: document.querySelector('.introduction__button'),
    //     NEW: document.querySelector('.game__button-new'),
    //     GAME: document.querySelector('.game__button-start'),
    //     STOP: document.querySelector('.game__button-stop'),
    //     RESULTS: document.querySelector('.game__button-results'),
    //     DIFFICULTIES: document.querySelector('.difficulties'),
    //     RESULTS_NEW_GAME: document.querySelector('.game__button-results_new'),
    //     RESULTS_RESUME_GAME: document.querySelector('.game__button-results_return'),
    //   },
  }
}

export default new View();
