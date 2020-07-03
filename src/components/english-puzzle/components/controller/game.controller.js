import view from '../view/view';
import model from '../model/model';

import { ErrorPopup } from '../../../error/error.error_popup';
import getCanvasElementsCollection from '../../common/english-puzzle.createCanvasElements';
import { showSpinner, hideSpinner } from '../../common/english-puzzle.utils';

import {
  EVENTS,
  CLASS_NAMES,
  MAX_LEVELS_COUNT,
  MAX_ROUNDS_COUNT,
  TABLET_WIDTH,
  IMAGE_GAP,
  MAX_SENTENCES_IN_ROUND,
} from '../../common/english-puzzle.constants';

class GameController {
  constructor() {
    this.currentLevel = null;
    this.currentRound = null;
    this.maxRoundInLevel = null;

    this.fetchedRoundData = null;
    this.fetchedPictureData = null;

    this.currentSentence = null;
    this.isPictureShown = null;
    this.completedRoundsByLevels = [];
    this.windowSize = null;

    this.hints = {
      isBgImage: null,
      isTranslationEnabled: null,
      isSpellingEnabled: null,
      isAutoSpellingEnabled: null,
    };

    this.onLevelChangeHandlerBinded = this.onLevelChangeHandler.bind(this);
    this.onRoundChangeHandlerBinded = this.onRoundChangeHandler.bind(this);
    this.beforeUnloadHandlerBinded = this.beforeUnloadHandler.bind(this);
  }

  setCurrentLevel(level) {
    this.currentLevel = level % MAX_LEVELS_COUNT;
  }

  setCurrentRound(round = 0) {
    if (round >= this.maxRoundInLevel) {
      this.setCurrentLevel(this.currentLevel + 1);
      this.currentRound = 0;

      if (view.menu.elements.selectors.level) {
        view.menu.elements.selectors.level.remove();
        view.menu.renderLevelSelector(this.currentLevel);
      }

      if (view.menu.elements.selectors.round) {
        view.menu.elements.selectors.round.remove();
        view.menu.renderRoundSelector(
          this.maxRoundInLevel,
          this.currentRound,
          this.completedRoundsByLevels[this.currentLevel],
        );
      }
      return;
    }

    this.currentRound = round;
  }

  async onLevelChangeHandler(evt) {
    this.setCurrentLevel(+evt.target.value);
    this.setCurrentRound();

    showSpinner();
    this.maxRoundInLevel = await model.fetchMaxPagesInDifficultCategory(this.currentLevel)
      .catch(() => MAX_ROUNDS_COUNT);

    if (view.menu.elements.selectors.round) view.menu.elements.selectors.round.remove();
    this.setCurrentRound(0);
    view.menu.renderRoundSelector(
      this.maxRoundInLevel,
      this.currentRound,
      this.completedRoundsByLevels[this.currentLevel],
    );
    this.newRound(this.currentLevel, this.currentRound);
  }

  onRoundChangeHandler(evt) {
    showSpinner();
    this.setCurrentRound(+evt.target.value);
    this.newRound(this.currentLevel, this.currentRound);
  }

  getCanvasElement({
    currentSentence,
    isImage = false,
    isRegular = true,
    isCorrect = false,
  }) {
    if (isImage) {
      if (isRegular) return this.canvasElements.withImage.regular[currentSentence];
      if (isCorrect) return this.canvasElements.withImage.correct[currentSentence];
      return this.canvasElements.withImage.error[currentSentence];
    }
    if (isRegular) return this.canvasElements.withOutImage.regular[currentSentence];
    if (isCorrect) return this.canvasElements.withOutImage.correct[currentSentence];
    return this.canvasElements.withOutImage.error[currentSentence];
  }

  async newRound(currentLevel, currentRound) {
    showSpinner();

    model.errorsList = [];

    view.hidePicture();
    view.clearPictureDescription();

    view.clearGameField();
    view.clearDropZones();

    view.showIDontKnowButton();
    view.hideCheckButton();
    view.hideContinueButton();
    view.hideResultButton();
    this.isPictureShown = false;

    this.fetchedRoundData = await model.fetchCardsPage(currentLevel, currentRound)
      .catch((error) => {
        hideSpinner();
        new ErrorPopup().openPopup({ text: error.message });
        return null;
      });
    debugger;
    if (!this.fetchedRoundData) return;
    const sentences = this.fetchedRoundData.map((wordData) => wordData.textExample);

    this.fetchedPictureData = model.getCurrentPictureDescription(currentLevel, currentRound) || {};
    this.fetchedPictureData.preloadedPicture = await model
      .getPreloadedCurrentPicture(currentLevel, currentRound);
    this.windowSize = document.documentElement.clientWidth;
    const widthGap = (this.windowSize >= TABLET_WIDTH) ? IMAGE_GAP : 0;
    this.canvasElements = getCanvasElementsCollection(
      this.fetchedPictureData.preloadedPicture,
      sentences,
      this.windowSize,
    );

    this.currentSentence = 0;
    view.renderNewDataDropZone();
    view.renderInputSentence(this.getCanvasElement({
      currentSentence: this.currentSentence,
      isImage: this.hints.isBgImage,
      isRegular: true,
    }));

    view.resultDropZone.style.width = `${view.dataDropZone.getBoundingClientRect().width + widthGap}px`;
    view.dataDropZone.style.width = `${view.dataDropZone.getBoundingClientRect().width + widthGap}px`;
    view.resultDropZone.style.height = `${view.dataDropZone.getBoundingClientRect().height}px`;
    view.dataDropZone.style.height = `${view.dataDropZone.getBoundingClientRect().height}px`;

    if (view.menu.elements.selectors.round) view.menu.elements.selectors.round.remove();
    view.menu.renderRoundSelector(
      this.maxRoundInLevel,
      this.currentRound,
      this.completedRoundsByLevels[this.currentLevel],
    );

    if (this.hints.isTranslationEnabled) {
      view.showTranslation(this.fetchedRoundData[this.currentSentence].textExampleTranslate);
    } else {
      view.hideTranslation();
    }

    if (this.hints.isAutoSpellingEnabled && this.hints.isSpellingEnabled) {
      view.playSentenceSpelling(this.fetchedRoundData[this.currentSentence].audioExample);
    }

    hideSpinner();
  }

  nextRound() {
    view.resetPuzzlesStates(
      this.currentSentence,
      this.getCanvasElement({
        currentSentence: this.currentSentence,
        isImage: true,
        isRegular: true,
      }),
    );
    view.hideCheckButton();

    if (this.currentSentence === MAX_SENTENCES_IN_ROUND - 1) {
      if (!this.isPictureShown) {
        if (!this.completedRoundsByLevels[this.currentLevel].includes(this.currentRound)) {
          this.completedRoundsByLevels[this.currentLevel].push(this.currentRound);
        }
        view.menu.elements.selectors.round.remove();
        view.menu.renderRoundSelector(
          this.maxRoundInLevel,
          this.currentRound,
          this.completedRoundsByLevels[[this.currentLevel]],
        );

        const completedRoundsData = {
          completedRoundsByLevels: this.completedRoundsByLevels,
          lastLevelWithLastCompletedRound: this.currentLevel,
          lastCompletedRound: this.currentRound,
        };

        model.saveCompletedRounds(completedRoundsData);

        this.lastGameFinalTime = new Date().toLocaleString();
        model.saveResults(model.errorsList, this.lastGameFinalTime);

        view.resultDropZone.classList.remove(CLASS_NAMES.DROP_PLACE);
        view.dataDropZone.remove();

        this.isPictureShown = true;

        if (this.windowSize >= TABLET_WIDTH) {
          view.clearSentencesBackground();
          view.showPicture(this.canvasElements.finalImage.flat(Infinity));
          view.showPictureDescription(`Author: ${this.fetchedPictureData.author.replace(',', ' ')},
            Name: ${this.fetchedPictureData.name} (Date: ${this.fetchedPictureData.year})`);
        }
        view.showResultButton();
        view.hideTranslation();
        return;
      }

      view.hidePicture();
      view.clearPictureDescription();
      this.isPictureShown = false;
      this.setCurrentRound(this.currentRound + 1);
      this.newRound(this.currentLevel, this.currentRound);
      return;
    }

    view.hideResultButton();
    view.showIDontKnowButton();
    view.hideContinueButton();
    this.currentSentence += 1;
    if (this.windowSize < TABLET_WIDTH) {
      view.resultDropZone.innerHTML = '';
    } else view.renderNextResultDropZone();
    view.renderInputSentence(this.getCanvasElement({
      currentSentence: this.currentSentence,
      isImage: this.hints.isBgImage,
      isRegular: true,
    }));

    if (this.hints.isTranslationEnabled) {
      view.showTranslation(this.fetchedRoundData[this.currentSentence].textExampleTranslate);
    } else {
      view.hideTranslation();
    }

    if (this.hints.isAutoSpellingEnabled && this.hints.isSpellingEnabled) {
      view.playSentenceSpelling(this.fetchedRoundData[this.currentSentence].audioExample);
    }
  }

  beforeUnloadHandler() {
    if (view.menu.elements.selectors.level) view.menu.elements.selectors.level.remove();
    if (view.menu.elements.selectors.round) view.menu.elements.selectors.round.remove();

    window.removeEventListener(EVENTS.BEFORE_UNLOAD, this.beforeUnloadHandlerBinded);
  }

  async init(startLevel = 0, startRound = 0) {
    this.hints = model.loadSettings() || {
      isBgImage: false,
      isTranslationEnabled: true,
      isSpellingEnabled: true,
      isAutoSpellingEnabled: true,
    };

    view.initMenu(this.onLevelChangeHandlerBinded, this.onRoundChangeHandlerBinded);

    const completedRoundsData = model.loadCompletedRounds();
    this.completedRoundsByLevels = (completedRoundsData
      && completedRoundsData.completedRoundsByLevels)
      || new Array(MAX_LEVELS_COUNT).fill('').map(() => []);

    showSpinner();
    this.setCurrentLevel((completedRoundsData
      && completedRoundsData.lastLevelWithLastCompletedRound)
      || startLevel);
    this.maxRoundInLevel = await model.fetchMaxPagesInDifficultCategory(this.currentLevel)
      .catch(() => MAX_ROUNDS_COUNT);
    this.setCurrentRound((completedRoundsData && completedRoundsData.lastCompletedRound + 1)
     || startRound);

    view.menu.renderLevelSelector(this.currentLevel);
    this.newRound(this.currentLevel, this.currentRound);

    window.addEventListener(EVENTS.BEFORE_UNLOAD, this.beforeUnloadHandlerBinded);
  }
}

export default new GameController();
