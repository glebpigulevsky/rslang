import model from '../model/model';
import view from '../view/view';

import gameController from './game.controller';
import dragAndDropController from './drag-and-drop.controller';

import {
  toggleDocumentScroll,
  getClosestLink,
  togglePageState,
} from '../../common/english-puzzle.utils';

import {
  EVENTS,
  CLASS_NAMES,
} from '../../common/english-puzzle.helper';

class Controller {
  constructor() {
    this.ELEMENTS = null;
    this.sentenceGuessSuccess = null;
    this.statisticAudio = null;

    this.onIntroButtonClickBinded = this.onIntroButtonClick.bind(this);
    this.onCheckButtonClickBinded = this.onCheckButtonClick.bind(this);
    this.onIDontKnowButtonClickHandlerBinded = this.onIDontKnowButtonClickHandler.bind(this);
    this.onContinueButtonClickHandlerBinded = this.onContinueButtonClickHandler.bind(this);

    this.onHintBgButtonClickHandlerBinded = this.onHintBgButtonClickHandler.bind(this);
    this.onHintTranslationButtonClickHandlerBinded = this.onHintTranslationButtonClickHandler.bind(this);
    this.onHintSpellingButtonClickHandlerBinded = this.onHintSpellingButtonClickHandler.bind(this);
    this.onHintAutoSpellingButtonClickHandlerBinded = this.onHintAutoSpellingButtonClickHandler.bind(this);
    this.onRepeatSpellingButtonClickBinded = this.onRepeatSpellingButtonClick.bind(this);

    this.onResultsButtonClickBinded = this.onResultsButtonClick.bind(this);
    this.onStatisticContinueButtonClickBinded = this.onStatisticContinueButtonClick.bind(this);
    this.onStatisticLongStatisticButtonClickBinded = this.onStatisticLongStatisticButtonClick.bind(this);

    this.beforeUnloadHandlerBinded = this.beforeUnloadHandler.bind(this);
  }

  onStatisticLongStatisticButtonClick() {
    view.ELEMENTS.CONTAINERS.STATISTIC.classList.toggle('long-statistic');
  }

  onStatisticContinueButtonClick() {
    togglePageState(CLASS_NAMES.STATISTIC.PAGE);
    view.statisticList.remove();

    this.onContinueButtonClickHandler();
  }

  onResultsButtonClick() {
    togglePageState(CLASS_NAMES.STATISTIC.PAGE);

    view.renderStatisticList(
      gameController.fetchedRoundData,
      [{
        event: EVENTS.CLICK,
        handler: this.onStatisticCardClick,
      }],
      model.errorsList,
      gameController.lastGameFinalTime,
      gameController.fetchedPictureData,
      model.results,
    );
  }

  onStatisticCardClick(event) {
    const selectedCard = getClosestLink(event);
    if (!selectedCard) return;
    event.preventDefault();
    view.resetStatisticLinksStates(selectedCard);

    if (this.statisticAudio) this.statisticAudio.pause();
    this.statisticAudio = new Audio(selectedCard.dataset.audio);
    this.statisticAudio.play();
  }

  onIDontKnowButtonClickHandler() {
    // model.errorsList.push(gameController.fetchedRoundData[gameController.currentSentence]); // todo заглушка без интернета

    view.hideIDontKnowButton();
    view.hideCheckButton();
    view.showContinueButton();

    Array.from(document.querySelectorAll(`.canvas-row-${gameController.currentSentence + 1}`)).forEach((puzzle) => {
      puzzle.remove();
    });

    gameController.getCanvasElement({
      currentSentence: gameController.currentSentence,
      isImage: true,
      isRegular: true,
    }).forEach((puzzle) => {
      const clonePuzzle = puzzle.cloneNode(true);
      clonePuzzle.getContext('2d').drawImage(puzzle, 0, 0);
      view.resultDropZone.append(clonePuzzle);
    });

    view.showTranslation(gameController.fetchedRoundData[gameController.currentSentence].textExampleTranslate);
    if (!gameController.hints.isSpellingEnabled) {
      view.playSentenceSpelling(gameController.fetchedRoundData[gameController.currentSentence].audioExample);
    }
    this.sentenceGuessSuccess = true;
  }

  onCheckButtonClick() {
    this.sentenceGuessSuccess = true;

    Array.from(document.querySelectorAll(`.canvas-row-${gameController.currentSentence + 1}`)).forEach((puzzle, index) => {
      if (+puzzle.dataset.item.slice(-2).replace('-', '') === index + 1) {
        const correctPuzzle = gameController.getCanvasElement({
          currentSentence: gameController.currentSentence,
          isImage: gameController.hints.isBgImage,
          isRegular: false,
          isCorrect: true,
        })[index];

        puzzle.getContext('2d').drawImage(correctPuzzle, 0, 0);
      } else {
        this.sentenceGuessSuccess = false;

        const wrongPuzzle = gameController.getCanvasElement({
          currentSentence: gameController.currentSentence,
          isImage: gameController.hints.isBgImage,
          isRegular: false,
          isCorrect: false,
        })[+puzzle.dataset.item.slice(-2).replace('-', '') - 1];

        puzzle.getContext('2d').drawImage(wrongPuzzle, 0, 0);
      }
    });

    if (!this.sentenceGuessSuccess) {
      view.showIDontKnowButton();
      view.hideContinueButton();
    } else {
      view.hideCheckButton();
      view.showContinueButton();

      Array.from(document.querySelectorAll(`.canvas-row-${gameController.currentSentence + 1}`)).forEach((puzzle, index) => {
        const correctPuzzle = gameController.getCanvasElement({
          currentSentence: gameController.currentSentence,
          isImage: true,
          isRegular: false,
          isCorrect: true,
        })[index];

        puzzle.getContext('2d').drawImage(correctPuzzle, 0, 0);
      });

      view.showTranslation(gameController.fetchedRoundData[gameController.currentSentence].textExampleTranslate);

      if (!gameController.hints.isSpellingEnabled) {
        view.playSentenceSpelling(gameController.fetchedRoundData[gameController.currentSentence].audioExample);
      }
    }
  }

  onContinueButtonClickHandler() {
    view.hideResultButton();
    this.sentenceGuessSuccess = false;
    gameController.nextRound();
  }

  onHintBgButtonClickHandler({ target }) {
    gameController.hints.isBgImage = !gameController.hints.isBgImage;
    target.classList.toggle(CLASS_NAMES.ACTIVE);

    Array.from(document.querySelectorAll(`.canvas-row-${gameController.currentSentence + 1}.dragable`)).forEach((puzzle) => {
      const newPuzzle = gameController.getCanvasElement({
        currentSentence: gameController.currentSentence,
        isImage: gameController.hints.isBgImage,
        isRegular: true,
      })[+puzzle.dataset.item.slice(-2).replace('-', '') - 1];

      puzzle.getContext('2d').drawImage(newPuzzle, 0, 0);
    });
  }

  onHintTranslationButtonClickHandler({ target }) {
    gameController.hints.isTranslationEnabled = !gameController.hints.isTranslationEnabled;
    target.classList.toggle(CLASS_NAMES.ACTIVE);

    if (gameController.isPictureShown || this.sentenceGuessSuccess) return;

    if (gameController.hints.isTranslationEnabled) {
      view.showTranslation(gameController.fetchedRoundData[gameController.currentSentence].textExampleTranslate);
    } else {
      view.hideTranslation();
    }
  }

  onHintSpellingButtonClickHandler({ target }) {
    gameController.hints.isSpellingEnabled = !gameController.hints.isSpellingEnabled;
    target.classList.toggle(CLASS_NAMES.ACTIVE);
  }

  onHintAutoSpellingButtonClickHandler({ target }) {
    gameController.hints.isAutoSpellingEnabled = !gameController.hints.isAutoSpellingEnabled;
    target.classList.toggle(CLASS_NAMES.ACTIVE);
  }

  onRepeatSpellingButtonClick() {
    if (!gameController.hints.isSpellingEnabled) return;

    view.playSentenceSpelling(gameController.fetchedRoundData[gameController.currentSentence].audioExample);
  }

  beforeUnloadHandler() {
    if (this.isGameStarts) model.saveResults(this.guessedList);
    window.removeEventListener(EVENTS.BEFORE_UNLOAD, this.beforeUnloadHandlerBinded);
  }

  onIntroButtonClick({ target }) {
    // model.loadResults(); // todo тут мы возьмем прошлые результаты игры, отрисуем их правильно

    gameController.init(0, 0); // startLevel = 0, startRound = 0
    dragAndDropController.init();

    view.initHintBgButton(this.onHintBgButtonClickHandlerBinded, gameController.hints.isBgImage);
    view.initHintTranslationButton(this.onHintTranslationButtonClickHandlerBinded, gameController.hints.isTranslationEnabled);
    view.initHintSpellingButton(this.onHintSpellingButtonClickHandlerBinded, gameController.hints.isSpellingEnabled);
    view.initHintAutoSpellingButton(this.onHintAutoSpellingButtonClickHandlerBinded, gameController.hints.isAutoSpellingEnabled);
    view.initRepeatSpellingButton(this.onRepeatSpellingButtonClickBinded);

    this.ELEMENTS.INTRODUCTION.classList.add(CLASS_NAMES.DISPLAY_NONE);
    this.ELEMENTS.WRAPPER.classList.remove(CLASS_NAMES.DISPLAY_NONE);
    toggleDocumentScroll();
    target.removeEventListener(EVENTS.CLICK, this.onIntroButtonClickBinded);
  }

  init() {
    this.ELEMENTS = {
      WRAPPER: document.querySelector('.wrapper'),
      INTRODUCTION: document.querySelector('.introduction'),
      SPINNER: document.querySelector('.spinner'),
    };

    view.initIntroButton(this.onIntroButtonClickBinded);
    view.initCheckButton(this.onCheckButtonClickBinded);
    view.initIDontKnowButton(this.onIDontKnowButtonClickHandlerBinded);
    view.initContinueButton(this.onContinueButtonClickHandlerBinded);

    view.initResultsButton(this.onResultsButtonClickBinded);
    view.initStatisticContinueButton(this.onStatisticContinueButtonClickBinded);
    view.initStatisticLongStatisticButton(this.onStatisticLongStatisticButtonClickBinded);

    window.addEventListener(EVENTS.BEFORE_UNLOAD, this.beforeUnloadHandlerBinded);
  }
}

export default new Controller();
