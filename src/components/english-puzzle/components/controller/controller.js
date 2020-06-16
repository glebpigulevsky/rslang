import model from '../model/model';
import view from '../view/view';

import menuController from './menu.controller';
import dragAndDropController from './drag-and-drop.controller';

// import { shuffleArray } from '../data/utils';

import {
  initIntroButton,
  toggleDocumentScroll,
  getClosestLink,
  // loadCardsJSON,
  isButtonClicked,
  togglePageState,
  hideSpinner,
  showSpinner,
} from '../data/utils';

import {
  LANGUAGE,
  MAX_WORDS_COUNT,
  // ELEMENTS,
  EVENTS,
  DATA_PATH,
  CLASS_NAMES,
} from '../data/helper';

class Controller {
  constructor() {
    // this.difficult = 0;
    // this.recognition = null;
    // this.isGameStarts = false;
    // this.guessedList = null;

    // this.currentSentence = null;

    this.ELEMENTS = null;

    this.onIntroButtonClickBinded = this.onIntroButtonClick.bind(this);
    this.beforeUnloadHandlerBinded = this.beforeUnloadHandler.bind(this);

    // this.onPageCardClick = this.onPageCardClick.bind(this);
    // this.onGameButtonClick = this.onGameButtonClick.bind(this);
    // this.onStopButtonClick = this.onStopButtonClick.bind(this);
    // this.onDifficultChange = this.onDifficultChange.bind(this);
    // this.onNewButtonClick = this.onNewButtonClick.bind(this);
    // this.onResultButtonClick = this.onResultButtonClick.bind(this);
    // this.onResultCardClick = this.onResultCardClick.bind(this);
    // this.onResultsNewGameButtonClick = this.onResultsNewGameButtonClick.bind(this);
    // this.onResultsResumeGameButtonClick = this.onResultsResumeGameButtonClick.bind(this);
  }

  // loadPage(data) {
  //   model.loadPage(data);
  // }

  // setPage(difficult) {
  //   model.setPage(difficult);
  // }

  // setDifficult(difficult) {
  //   this.difficult = difficult;
  // }

  // addPageList() {
  //   view.renderPageList(model.pageData, [{
  //     event: EVENTS.CLICK,
  //     handler: this.onPageCardClick,
  //   }]);
  // }

  // newGame(difficult = 0) {
  //   this.onStopButtonClick();
  //   this.guessedList = [];
  //   this.setDifficult(difficult);
  //   // this.newPage();
  //   view.clearStatusBar();
  //   view.renderPicture();
  //   view.renderTranslation();
  //   view.renderSpeechInput();
  // }

  // newPage() {
  // loadCardsJSON(this.difficult, (cardsData) => {
  //   if (view.currentList) view.removeCurrentList();
  //   model.loadPage(cardsData);
  //   this.addPageList();
  //   hideSpinner();
  // });
  // }

  // onPageCardClick(event) {
  //   const selectedCard = getClosestLink(event);
  //   if (!selectedCard) return;
  //   event.preventDefault();

  //   if (this.isGameStarts) return;
  //   view.resetLinksStates(selectedCard);

  //   const { word } = selectedCard.dataset;
  //   const translation = model.translationsMap.get(word);
  //   view.renderTranslation(translation);

  //   const imageSrc = selectedCard.dataset.image;
  //   view.renderPicture(`${DATA_PATH}${imageSrc}`);

  //   const audioSrc = selectedCard.dataset.audio;
  //   const audio = new Audio(`${DATA_PATH}${audioSrc}`);
  //   audio.play();
  // }

  // onGameButtonClick() {
  //   if (this.isGameStarts) return;
  //   this.isGameStarts = true;
  //   if (!this.guessedList.length) view.removeActiveStates();
  //   view.toggleGameButtonState();
  //   view.renderPicture();
  //   view.renderTranslation();
  // }

  // onStopButtonClick() {
  //   if (!this.isGameStarts) return;

  //   model.saveResults(this.guessedList);

  //   this.isGameStarts = false;
  //   view.toggleGameButtonState();

  //   view.clearStatusBar();
  //   view.renderPicture();
  //   this.guessedList = [];
  //   view.renderSpeechInput();
  //   view.removeActiveStates();
  // }

  // onDifficultChange(event) {
  //   const button = event.target;
  //   if (!isButtonClicked(event)) return;

  //   view.removeActiveStates(this.ELEMENTS.BUTTONS.DIFFICULTIES);
  //   button.classList.add(CLASS_NAMES.ACTIVE);

  //   const newDifficult = +button.innerText - 1;
  //   if (newDifficult === this.difficult) return;
  //   showSpinner();
  //   this.newGame(newDifficult);
  // }

  // onNewButtonClick() {
  //   showSpinner();
  //   this.newGame(this.difficult);
  // }

  // onResultsNewGameButtonClick() {
  //   togglePageState(CLASS_NAMES.RESULT.PAGE);
  //   view.resultList.remove();

  //   this.onNewButtonClick();
  // }

  // onResultsResumeGameButtonClick() {
  //   togglePageState(CLASS_NAMES.RESULT.PAGE);
  //   view.resultList.remove();

  //   if (this.recognition) this.recognition.start();
  // }

  // onResultButtonClick() {
  //   togglePageState(CLASS_NAMES.RESULT.PAGE);

  //   view.renderResultsList(
  //     model.pageData,
  //     [{
  //       event: EVENTS.CLICK,
  //       handler: this.onResultCardClick,
  //     }],
  //     model.translationsMap,
  //     this.guessedList,
  //     model.results,
  //   );

  //   if (this.recognition) this.recognition.abort();
  // }

  // onResultCardClick(event) {
  //   const selectedCard = getClosestLink(event);
  //   if (!selectedCard) return;
  //   event.preventDefault();

  //   view.resetResultsLinksStates(selectedCard);

  //   const audioSrc = selectedCard.dataset.audio;
  //   const audio = new Audio(`${DATA_PATH}${audioSrc}`);
  //   audio.play();
  // }

  beforeUnloadHandler() {
    if (this.isGameStarts) model.saveResults(this.guessedList);
    window.removeEventListener(EVENTS.BEFORE_UNLOAD, this.beforeUnloadHandlerBinded);
  }

  onIntroButtonClick({ target }) {
    // model.loadResults(); - тут мы возьмем прошлые результаты игры, отрисуем их правильно.

    menuController.init(0, 0); // startLevel = 0, startRound = 0
    dragAndDropController.init();

    this.ELEMENTS.INTRODUCTION.classList.add(CLASS_NAMES.HIDDEN);
    this.ELEMENTS.CENTRALIZER.classList.remove(CLASS_NAMES.HIDDEN);
    toggleDocumentScroll();

    // this.ELEMENTS.SPINNER.classList.remove(CLASS_NAMES.HIDDEN);
    // showSpinner();

    // this.newGame();
    target.removeEventListener(EVENTS.CLICK, this.onIntroButtonClickBinded);
  }

  init() {
    view.initIntroButton(this.onIntroButtonClickBinded);

    this.ELEMENTS = {
      CENTRALIZER: document.querySelector('.centralizer'),
      INTRODUCTION: document.querySelector('.introduction'),
      SPINNER: document.querySelector('.spinner'),
      BUTTONS: {
        DIFFICULTIES: document.querySelector('.difficulties'),
      },
    };

    window.addEventListener(EVENTS.BEFORE_UNLOAD, this.beforeUnloadHandlerBinded);

    // this.onIntroButtonClick();

    // view.initGameButton(this.onGameButtonClick);
    // view.initSpeechInput(this.onChangeSpeechInput);
    // view.initStopButton(this.onStopButtonClick);
    // view.initDifficulties(this.onDifficultChange);
    // view.initNewButton(this.onNewButtonClick);
    // view.initResultButton(this.onResultButtonClick);
    // view.initResultsNewGameButton(this.onResultsNewGameButtonClick);
    // view.initResultsResumeGameButton(this.onResultsResumeGameButtonClick);

    // TODO Old code to delete
    // document.querySelector('.game__field').addEventListener('mousedown', dragAndDropController.onFieldMouseDownHandlerBinded);

    // view.initMenu(menuController.onLevelChangeHandlerBinded, menuController.onRoundChangeHandlerBinded);
    // menuController.init(0, 0);
    // this.newRound(menuController.currentLevel, menuController.currentRound);
    // debugger;
    // view.menu.elements.select.level.addHandler({ event: 'change', handler: menuController.onChangeLevelHandler });
    // view.menu.elements.select.round.addHandler({ event: 'change', handler: menuController.onChangeRoundHandler });
  }
}

export default new Controller();
