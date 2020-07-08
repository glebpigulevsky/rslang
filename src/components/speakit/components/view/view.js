import Swiper from 'swiper';

import PageList from './components/pageList/pageList';
import ResultsList from './components/resultsList/resultsList';
import Menu from './components/menu/menu';
import { Spinner } from '../../../spinner/spinner';

import { setActiveState, createStar, getPreloadedImage } from '../../common/speakit.utils';
import {
  CLASS_NAMES, EVENTS, SWIPER_CONFIG, EMPTY,
} from '../../common/speakit.constants';

import correctSound from '../../assets/audio/correct.mp3';
import successSound from '../../assets/audio/success.mp3';
import errorAudio from '../../assets/audio/server-error.mp3';
import starWin from '../../assets/img/star-win.svg';
import logo from '../../assets/img/logo.png';

import 'swiper/css/swiper.min.css';

class View {
  constructor() {
    this.container = EMPTY;
    this.resultsContainer = EMPTY;
    this.picture = EMPTY;
    this.currentList = EMPTY;
    this.resultList = EMPTY;
    this.translation = EMPTY;
    this.newButton = EMPTY;
    this.gameButton = EMPTY;
    this.stopButton = EMPTY;
    this.resultButton = EMPTY;
    this.resultsNewGameButton = EMPTY;
    this.resultsResumeGameButton = EMPTY;
    this.speechInput = EMPTY;
    this.statusBar = EMPTY;

    this.swiper = EMPTY;
    this.menu = EMPTY;
    this.spinner = EMPTY;

    this.listenersList = EMPTY;

    this.correctSound = new Audio(correctSound);
    this.successSound = new Audio(successSound);
    this.errorAudio = new Audio(errorAudio);

    this.renderTranslation = this.renderTranslation.bind(this);
    this.renderSpeechInput = this.renderSpeechInput.bind(this);
    this.renderPicture = this.renderPicture.bind(this);
    this.onErrorSpellingHandler = this.onErrorSpellingHandler.bind(this);
    this.beforeUnloadHandler = this.beforeUnloadHandler.bind(this);
  }

  renderPageList(pageData, listenersList) {
    this.currentList = new PageList(this.container, pageData, listenersList);
    this.currentList.render();
  }

  renderResultsList(pageData, listenersList, guessedList, currentResults,
    longResults, hasTranslation = true) {
    if (this.swiper.slides && this.swiper.slides.length) this.swiper.removeAllSlides();

    this.resultList = new ResultsList(
      this.resultsContainer,
      pageData,
      listenersList,
      guessedList,
      new Date().toLocaleString(),
      hasTranslation,
      longResults,
      CLASS_NAMES.SLIDER.ACTIVE,
    );
    this.resultList.render();

    currentResults.forEach((result) => {
      new ResultsList(
        this.resultsContainer,
        result.pageData,
        listenersList,
        result.guessedList,
        result.time,
        hasTranslation,
      ).render();
    });

    this.swiper.update();
  }

  removeActiveStates(container = this.container) {
    container.querySelectorAll(`.${CLASS_NAMES.ACTIVE}`).forEach((item) => item.classList.remove(CLASS_NAMES.ACTIVE));
  }

  setLinkActiveStateByWord(speechInputValue) {
    const card = Array.from(this.container.querySelectorAll(`.${CLASS_NAMES.LINK}`)).find(
      (link) => link.dataset.word === speechInputValue,
    );
    card.classList.add(CLASS_NAMES.ACTIVE);

    this.renderPicture(card.dataset.image);
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

  async renderPicture(imageSrc = logo) {
    const img = await getPreloadedImage(imageSrc);
    this.picture.style.backgroundImage = `url(${img.src})`;
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

  onErrorSpellingHandler({ target }) {
    target.removeEventListener(EVENTS.ERROR, this.onErrorSpellingHandler);
    this.errorAudio.play();
  }

  addListener(element, event, listener) {
    element.addEventListener(event, listener);
    this.listenersList.push({ element, event, listener });
  }

  removeListeners() {
    this.listenersList.forEach(({ element, event, listener }) => {
      element.removeEventListener(event, listener);
    });
  }

  initIntroButton(onIntroButtonClick) {
    this.addListener(this.introButton, EVENTS.CLICK, onIntroButtonClick);
  }

  initGameButton(onGameButtonClick) {
    this.addListener(this.gameButton, EVENTS.CLICK, onGameButtonClick);
  }

  toggleGameButtonState() {
    this.gameButton.classList.toggle(CLASS_NAMES.DISABLED);
  }

  initSpeechInput(onChangeSpeechInput) {
    this.addListener(this.speechInput, EVENTS.CHANGE, onChangeSpeechInput);
  }

  initStopButton(onStopButtonClick) {
    this.addListener(this.stopButton, EVENTS.CLICK, onStopButtonClick);
  }

  initNewButton(onNewButtonClick) {
    this.addListener(this.newButton, EVENTS.CLICK, onNewButtonClick);
  }

  initResultButton(onResultButtonClick) {
    this.addListener(this.resultButton, EVENTS.CLICK, onResultButtonClick);
  }

  initResultsNewGameButton(onResultsNewGameButtonClick) {
    this.addListener(this.resultsNewGameButton, EVENTS.CLICK, onResultsNewGameButtonClick);
  }

  initResultsResumeGameButton(onResultsResumeGameButtonClick) {
    this.addListener(this.resultsResumeGameButton, EVENTS.CLICK, onResultsResumeGameButtonClick);
  }

  initResultsLongStatisticButton(onResultsLongStatisticClick) {
    this.addListener(this.resultsLongStatisticButton, EVENTS.CLICK, onResultsLongStatisticClick);
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

  beforeUnloadHandler() {
    this.removeListeners();
    if (this.correctSound) this.correctSound.pause();
    if (this.successSound) this.successSound.pause();
    if (this.errorAudio) this.errorAudio.pause();

    window.removeEventListener(EVENTS.BEFORE_UNLOAD, this.beforeUnloadHandler);
  }

  init() {
    this.listenersList = [];

    this.spinner = new Spinner(document.body.querySelector('.main'));
    this.spinner.init();

    this.container = document.querySelector('.cards__container');
    this.picture = document.querySelector('.main-card__picture');
    this.translation = document.querySelector('.main-card__translation');
    this.introButton = document.querySelector('.introduction__button');
    this.gameButton = document.querySelector('.game__button-start');
    this.speechInput = document.querySelector('.main-card__speech-input');
    this.stopButton = document.querySelector('.game__button-stop');
    this.newButton = document.querySelector('.game__button-new');
    this.resultButton = document.querySelector('.game__button-results');
    this.resultsContainer = document.body.querySelector('.statistics__container');
    this.resultsNewGameButton = document.querySelector('.game__button-results_new');
    this.resultsResumeGameButton = document.querySelector('.game__button-results_return');
    this.resultsLongStatisticButton = document.querySelector('.game__button_results-statistic');
    this.statusBar = document.querySelector('.status-bar');

    this.introduction = document.querySelector('.introduction');
    this.centralizer = document.querySelector('.speakit-centralizer');
    this.swiper = new Swiper('.swiper-container', SWIPER_CONFIG);
  }
}

export default new View();
