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

    this.isBgImage = null;
    // this.sentenceGuessFail = null;
    this.sentenceGuessSuccess = null;
    this.isTranslationEnabled = null;
    this.isSpellingEnabled = null;

    this.ELEMENTS = null;

    this.onIntroButtonClickBinded = this.onIntroButtonClick.bind(this);
    this.onCheckButtonClickBinded = this.onCheckButtonClick.bind(this);
    this.onHintBgButtonClickHandlerBinded = this.onHintBgButtonClickHandler.bind(this);
    this.onHintTranslationButtonClickHandlerBinded = this.onHintTranslationButtonClickHandler.bind(this);
    this.onHintSpellingButtonClickHandlerBinded = this.onHintSpellingButtonClickHandler.bind(this);
    this.onHintAutoSpellingButtonClickHandlerBinded = this.onHintAutoSpellingButtonClickHandler.bind(this);
    this.onIDontKnowButtonClickHandlerBinded = this.onIDontKnowButtonClickHandler.bind(this);
    this.onContinueButtonClickHandlerBinded = this.onContinueButtonClickHandler.bind(this);
    this.onRepeatSpellingButtonClickBinded = this.onRepeatSpellingButtonClick.bind(this);

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

  onIDontKnowButtonClickHandler() {
    view.hideIDontKnowButton();
    view.hideCheckButton();
    view.showContinueButton();

    Array.from(document.querySelectorAll(`.canvas-row-${menuController.currentSentence + 1}`)).forEach((puzzle) => {
      puzzle.remove();
    });

    menuController.getCanvasElement({
      currentSentence: menuController.currentSentence,
      isImage: true,
      isRegular: true,
    }).forEach((puzzle) => {
      const clonePuzzle = puzzle.cloneNode(true);
      clonePuzzle.getContext('2d').drawImage(puzzle, 0, 0);
      view.resultDropZone.append(clonePuzzle);
    });

    view.showTranslation(menuController.fetchedRoundData[menuController.currentSentence].textExampleTranslate);
    if (!this.isSpellingEnabled) {
      view.playSentenceSpelling(menuController.fetchedRoundData[menuController.currentSentence].audioExample);
    }
    this.sentenceGuessSuccess = true;
  }

  onCheckButtonClick() {
    // debugger;
    // this.sentenceGuessFail = false;
    this.sentenceGuessSuccess = true;

    Array.from(document.querySelectorAll(`.canvas-row-${menuController.currentSentence + 1}`)).forEach((puzzle, index) => {
      // puzzle.classList.remove(CLASS_NAMES.DRAGABLE);
      if (+puzzle.dataset.item.slice(-2).replace('-', '') === index + 1) { // todo -2
        // puzzle.classList.add(CLASS_NAMES.PUZZLE.CORRECT);
        // puzzle.remove();

        const correctPuzzle = menuController.getCanvasElement({
          currentSentence: menuController.currentSentence,
          isImage: this.isBgImage,
          isRegular: false,
          isCorrect: true,
        })[index];

        puzzle.getContext('2d').drawImage(correctPuzzle, 0, 0);
      } else {
        // puzzle.classList.add(CLASS_NAMES.PUZZLE.WRONG);
        // this.sentenceGuessFail = true;
        this.sentenceGuessSuccess = false;

        const wrongPuzzle = menuController.getCanvasElement({
          currentSentence: menuController.currentSentence,
          isImage: this.isBgImage,
          isRegular: false,
          isCorrect: false,
        })[+puzzle.dataset.item.slice(-2).replace('-', '') - 1];

        puzzle.getContext('2d').drawImage(wrongPuzzle, 0, 0);
      }
    });

    // if (this.sentenceGuessFail) {
    if (!this.sentenceGuessSuccess) {
      view.showIDontKnowButton();
      view.hideContinueButton();
    } else {
      view.hideCheckButton();
      view.showContinueButton();

      Array.from(document.querySelectorAll(`.canvas-row-${menuController.currentSentence + 1}`)).forEach((puzzle, index) => {
        const correctPuzzle = menuController.getCanvasElement({
          currentSentence: menuController.currentSentence,
          isImage: true,
          isRegular: false,
          isCorrect: true,
        })[index];

        puzzle.getContext('2d').drawImage(correctPuzzle, 0, 0);
      });

      view.showTranslation(menuController.fetchedRoundData[menuController.currentSentence].textExampleTranslate);
      
      if (!this.isSpellingEnabled) {
        view.playSentenceSpelling(menuController.fetchedRoundData[menuController.currentSentence].audioExample);
      }
    }

    // Array.from(document.querySelectorAll(`.canvas-row-${menuController.currentSentence + 1}`)).forEach((puzzle) => {
    //   puzzle.remove();
    // });

    // menuController.getCanvasElement({
    //   currentSentence: menuController.currentSentence,
    //   isImage: true,
    //   isRegular: false,
    //   isCorrect: true,
    // }).forEach((puzzle) => {
    //   const clonePuzzle = puzzle.cloneNode(true);
    //   clonePuzzle.getContext('2d').drawImage(puzzle, 0, 0);
    //   view.resultDropZone.append(clonePuzzle);
    // });
  // }
  }

  onContinueButtonClickHandler() {
    this.sentenceGuessSuccess = false;
    menuController.nextRound();
  }

  onHintBgButtonClickHandler({ target }) {
    this.isBgImage = !this.isBgImage;
    target.classList.toggle(CLASS_NAMES.ACTIVE);

    Array.from(document.querySelectorAll(`.canvas-row-${menuController.currentSentence + 1}.dragable`)).forEach((puzzle) => {
      const newPuzzle = menuController.getCanvasElement({
        currentSentence: menuController.currentSentence,
        isImage: this.isBgImage,
        isRegular: true,
      })[+puzzle.dataset.item.slice(-2).replace('-', '') - 1];

      puzzle.getContext('2d').drawImage(newPuzzle, 0, 0);
    });
  }

  onHintTranslationButtonClickHandler({ target }) {
    this.isTranslationEnabled = !this.isTranslationEnabled;
    target.classList.toggle(CLASS_NAMES.ACTIVE);

    if (menuController.isPictureShown || this.sentenceGuessSuccess) return;

    if (this.isTranslationEnabled) {
      view.showTranslation(menuController.fetchedRoundData[menuController.currentSentence].textExampleTranslate);
    } else {
      view.hideTranslation();
    }
  }

  onHintSpellingButtonClickHandler({ target }) {
    this.isSpellingEnabled = !this.isSpellingEnabled;
    target.classList.toggle(CLASS_NAMES.ACTIVE);

    // if (menuController.isPictureShown || this.sentenceGuessSuccess) return;

    // if (this.isTranslationEnabled) {
    //   view.showTranslation(menuController.fetchedRoundData[menuController.currentSentence].textExampleTranslate);
    // } else {
    //   view.hideTranslation();
    // }
  }

  onHintAutoSpellingButtonClickHandler({ target }) {
    this.isAutoSpellingEnabled = !this.isAutoSpellingEnabled;
    target.classList.toggle(CLASS_NAMES.ACTIVE);

    // if (menuController.isPictureShown || this.sentenceGuessSuccess) return;

    // if (this.isTranslationEnabled) {
    //   view.showTranslation(menuController.fetchedRoundData[menuController.currentSentence].textExampleTranslate);
    // } else {
    //   view.hideTranslation();
    // }
  }

  onRepeatSpellingButtonClick() {
    if (!this.isSpellingEnabled) return;

    view.playSentenceSpelling(menuController.fetchedRoundData[menuController.currentSentence].audioExample);
  }

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
    this.isBgImage = false; // todo берем из бека или локал сторейдж
    this.isTranslationEnabled = true;
    this.isSpellingEnabled = true;
    this.isAutoSpellingEnabled = true;

    view.initIntroButton(this.onIntroButtonClickBinded);
    view.initCheckButton(this.onCheckButtonClickBinded);
    view.initIDontKnowButton(this.onIDontKnowButtonClickHandlerBinded);
    view.initContinueButton(this.onContinueButtonClickHandlerBinded);

    view.initHintBgButton(this.onHintBgButtonClickHandlerBinded, this.isBgImage);
    view.initHintTranslationButton(this.onHintTranslationButtonClickHandlerBinded, this.isTranslationEnabled);
    view.initHintSpellingButton(this.onHintSpellingButtonClickHandlerBinded, this.isSpellingEnabled);
    view.initHintAutoSpellingButton(this.onHintAutoSpellingButtonClickHandlerBinded, this.isAutoSpellingEnabled);
    view.initRepeatSpellingButton(this.onRepeatSpellingButtonClickBinded);

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
