import correctSound from './assets/audio/correct.mp3';
import successSound from './assets/audio/success.mp3';
import starWin from './assets/img/star-win.svg';
import logo from './assets/img/logo.jpg';

import './scss/introduction.scss';
import './scss/spinner.scss';
import './scss/card.scss';
import './scss/controls.scss';
import './scss/status-bar.scss';

import {
  CLASS_NAMES,
  ELEMENTS, EVENTS,
  DATA_PATH,
} from '../data/helper';

import { setActiveState, createStar } from '../data/utils';

import PageList from './components/pageList/pageList';
import ResultsList from './components/resultsList/resultsList';
import Slider from './components/slider/slider';

export default class View {
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
      Array.from(translationData),
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
        result.translations,
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

    this.renderPicture(`${DATA_PATH}${card.dataset.image}`);
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

  init() {
    this.container = ELEMENTS.CARDS_CONTAINER;
    this.picture = ELEMENTS.PICTURE;
    this.translation = ELEMENTS.TRANSLATION;
    this.gameButton = ELEMENTS.BUTTONS.GAME;
    this.speechInput = ELEMENTS.SPEECH_INPUT;
    this.stopButton = ELEMENTS.BUTTONS.STOP;
    this.difficultiesContainer = ELEMENTS.BUTTONS.DIFFICULTIES;
    this.newButton = ELEMENTS.BUTTONS.NEW;
    this.resultButton = ELEMENTS.BUTTONS.RESULTS;
    this.resultsContainer = ELEMENTS.RESULT.CONTAINER;
    this.resultsNewGameButton = ELEMENTS.BUTTONS.RESULTS_NEW_GAME;
    this.resultsResumeGameButton = ELEMENTS.BUTTONS.RESULTS_RESUME_GAME;
    this.statusBar = ELEMENTS.STATUS_BAR;
  }
}
