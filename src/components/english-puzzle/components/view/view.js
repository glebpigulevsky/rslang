import Menu from './components/menu/menu';
import StatisticList from './components/statisticList/statisticList';

import {
  setActiveState,
  shuffleArray,
  hideElement,
  showElement,
  getPuzzleIndex,
} from '../../common/english-puzzle.utils';

import { CLASS_NAMES, EVENTS } from '../../common/english-puzzle.constants';

import ERROR_AUDIO from '../../assets/audio/server-error.mp3';

class View {
  constructor() {
    this.ELEMENTS = null;

    this.menu = null;
    this.dataDropZone = null;
    this.resultDropZone = null;
    this.statisticList = null;

    this.audio = null;
    this.errorAudio = new Audio(ERROR_AUDIO);

    this.listenersList = null;

    this.onEndSpellingHandlerBinded = this.onEndSpellingHandler.bind(this);
    this.onErrorSpellingHandlerBinded = this.onErrorSpellingHandler.bind(this);
    this.beforeUnloadHandlerBinded = this.beforeUnloadHandler.bind(this);
  }

  renderStatisticList(
    lastGameRoundData,
    listenersList,
    iDontKnowList,
    lastGameFinalTime,
    pictureData,
    results,
  ) {
    this.statisticList = new StatisticList(
      this.ELEMENTS.CONTAINERS.STATISTIC,
      lastGameRoundData,
      listenersList,
      iDontKnowList,
      lastGameFinalTime,
      pictureData,
      results,
    );

    this.statisticList.render();
  }

  getCountElementsInDataDropZone() {
    return this.dataDropZone.querySelectorAll('*').length;
  }

  renderInputSentence(currentSentencePuzzles) {
    shuffleArray((currentSentencePuzzles)).forEach((puzzle) => {
      const clonePuzzle = puzzle.cloneNode(true);
      clonePuzzle.getContext('2d').drawImage(puzzle, 0, 0);
      clonePuzzle.classList.add(CLASS_NAMES.DRAGABLE);
      this.dataDropZone.append(clonePuzzle);
    });
  }

  renderNewDataDropZone() {
    this.dataDropZone.remove();
    const div = document.createElement('div');
    div.className = CLASS_NAMES.DROP_PLACE_SENTENCE;
    document.querySelector(`.${CLASS_NAMES.DATA_CONTAINER}`).append(div);
    this.dataDropZone = div;
  }

  renderNextResultDropZone() {
    const div = document.createElement('div');
    div.className = CLASS_NAMES.DROP_PLACE_SENTENCE;
    this.resultDropZone.classList.toggle(CLASS_NAMES.DROP_PLACE);
    this.resultDropZone.after(div);
    this.resultDropZone = div;

    this.resultDropZone.style.width = `${this.dataDropZone.getBoundingClientRect().width}px`;
    this.resultDropZone.style.height = `${this.dataDropZone.getBoundingClientRect().height}px`;
  }

  resetPuzzlesStates(currentSentence, regularPuzzlesWithImage) {
    Array.from(document.querySelectorAll(`.${CLASS_NAMES.CANVAS_ROW}-${currentSentence + 1}`))
      .forEach((puzzle) => {
        puzzle.getContext('2d').drawImage(regularPuzzlesWithImage[getPuzzleIndex(puzzle)], 0, 0);
      });
  }

  clearGameField() {
    document.querySelector(`.${CLASS_NAMES.FIELD_CONTAINER}`).innerHTML = '';
    document.querySelector(`.${CLASS_NAMES.FIELD_CONTAINER}`)
      .insertAdjacentHTML('afterbegin', '<div class="drop-place sentence"></div>');
    this.resultDropZone = document.querySelector(`.${CLASS_NAMES.FIELD_CONTAINER} > .${CLASS_NAMES.DROP_PLACE}`);
  }

  clearDropZones() {
    this.dataDropZone.innerHTML = '';
    this.resultDropZone.innerHTML = '';
  }

  async playSentenceSpelling(src) {
    if (this.audio && !this.audio.ended) {
      this.audio.pause();
      this.onEndSpellingHandlerBinded();
    }
    this.audio = new Audio(src);
    this.audio.addEventListener(EVENTS.ENDED, this.onEndSpellingHandlerBinded);
    this.audio.addEventListener(EVENTS.ERROR, this.onErrorSpellingHandlerBinded);
    this.audio.play();

    this.toggleSpellingAnimation();
  }

  toggleSpellingAnimation() {
    this.ELEMENTS.BUTTONS.REPEAT_SPELLING.classList.toggle(CLASS_NAMES.ANIMATED);
  }

  onEndSpellingHandler() {
    this.audio.removeEventListener(EVENTS.ENDED, this.onEndSpellingHandlerBinded);
    this.toggleSpellingAnimation();
  }

  onErrorSpellingHandler() {
    this.audio.removeEventListener(EVENTS.ERROR, this.onErrorSpellingHandlerBinded);
    this.errorAudio.play();
  }

  showPicture(finalImagePuzzles) {
    Array.from(document.querySelectorAll(`.${CLASS_NAMES.CANVAS_ITEM}`)).forEach((puzzle, index) => {
      puzzle.getContext('2d').drawImage(finalImagePuzzles[index], 0, 0);
    });
  }

  hidePicture() {
    this.clearGameField();
  }

  clearSentencesBackground() {
    Array.from(this.ELEMENTS.CONTAINERS.FIELD.querySelectorAll(`.${CLASS_NAMES.SENTENCE}`))
      .forEach((sentence) => {
        sentence.classList.add(CLASS_NAMES.SENTENCE_CLEAR);
      });
  }

  showPictureDescription(pictureDescription = '') {
    this.ELEMENTS.DESCRIPTION.PICTURE.textContent = pictureDescription;
  }

  clearPictureDescription() {
    this.showPictureDescription();
  }

  showTranslation(translation = '') {
    this.ELEMENTS.DESCRIPTION.TRANSLATION.textContent = translation;
  }

  hideTranslation() {
    this.showTranslation();
  }

  removeActiveStates(container) {
    container.querySelectorAll(`.${CLASS_NAMES.ACTIVE}`)
      .forEach((item) => item.classList.remove(CLASS_NAMES.ACTIVE));
  }

  resetStatisticLinksStates(target) {
    this.removeActiveStates(this.ELEMENTS.CONTAINERS.STATISTIC);
    setActiveState(target);
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

  initMenu(onLevelChangeHandler, onRoundChangeHandler) {
    this.menu = new Menu(onLevelChangeHandler, onRoundChangeHandler);
  }

  initIntroButton(onIntroButtonClick) {
    this.addListener(
      this.ELEMENTS.BUTTONS.INTRODUCTION,
      EVENTS.CLICK,
      onIntroButtonClick,
    );
  }

  initCheckButton(onCheckButtonClick) {
    this.addListener(
      this.ELEMENTS.BUTTONS.CHECK,
      EVENTS.CLICK,
      onCheckButtonClick,
    );
  }

  initIDontKnowButton(onIDontKnowButtonClick) {
    this.addListener(
      this.ELEMENTS.BUTTONS.I_DONT_KNOW,
      EVENTS.CLICK,
      onIDontKnowButtonClick,
    );
  }

  initContinueButton(onContinueButtonClick) {
    this.addListener(
      this.ELEMENTS.BUTTONS.CONTINUE,
      EVENTS.CLICK,
      onContinueButtonClick,
    );
  }

  initHintBgButton(onHintBgButtonClick, isBgImage) {
    this.addListener(
      this.ELEMENTS.BUTTONS.HINTS.BG,
      EVENTS.CLICK,
      onHintBgButtonClick,
    );
    if (isBgImage) this.ELEMENTS.BUTTONS.HINTS.BG.classList.add(CLASS_NAMES.ACTIVE);
  }

  initHintTranslationButton(onHintTranslationButtonClick, isTranslationEnabled) {
    this.addListener(
      this.ELEMENTS.BUTTONS.HINTS.TRANSLATION,
      EVENTS.CLICK,
      onHintTranslationButtonClick,
    );
    if (isTranslationEnabled) {
      this.ELEMENTS.BUTTONS.HINTS.TRANSLATION.classList.add(CLASS_NAMES.ACTIVE);
    }
  }

  initHintSpellingButton(onHintSpellingButtonClick, isSpellingEnabled) {
    this.addListener(
      this.ELEMENTS.BUTTONS.HINTS.SPELLING,
      EVENTS.CLICK,
      onHintSpellingButtonClick,
    );
    if (isSpellingEnabled) this.ELEMENTS.BUTTONS.HINTS.SPELLING.classList.add(CLASS_NAMES.ACTIVE);
  }

  initHintAutoSpellingButton(onHintAutoSpellingButtonClick, isAutoSpellingEnabled) {
    this.addListener(
      this.ELEMENTS.BUTTONS.HINTS.AUTO_SPELLING,
      EVENTS.CLICK,
      onHintAutoSpellingButtonClick,
    );
    if (isAutoSpellingEnabled) {
      this.ELEMENTS.BUTTONS.HINTS.AUTO_SPELLING.classList.add(CLASS_NAMES.ACTIVE);
    }
  }

  initRepeatSpellingButton(onRepeatSpellingButtonClick) {
    this.addListener(
      this.ELEMENTS.BUTTONS.REPEAT_SPELLING,
      EVENTS.CLICK,
      onRepeatSpellingButtonClick,
    );
  }

  initResultsButton(onResultsButtonClick) {
    this.addListener(
      this.ELEMENTS.BUTTONS.RESULTS,
      EVENTS.CLICK,
      onResultsButtonClick,
    );
  }

  initStatisticContinueButton(onStatisticContinueButtonClick) {
    this.addListener(
      this.ELEMENTS.BUTTONS.STATISTICS.CONTINUE,
      EVENTS.CLICK,
      onStatisticContinueButtonClick,
    );
  }

  initStatisticLongStatisticButton(onStatisticLongStatisticClick) {
    this.addListener(
      this.ELEMENTS.BUTTONS.STATISTICS.LONG_STATISTIC,
      EVENTS.CLICK,
      onStatisticLongStatisticClick,
    );
  }

  hideCheckButton() {
    hideElement(this.ELEMENTS.BUTTONS.CHECK);
  }

  showCheckButton() {
    showElement(this.ELEMENTS.BUTTONS.CHECK);
  }

  hideIDontKnowButton() {
    hideElement(this.ELEMENTS.BUTTONS.I_DONT_KNOW);
  }

  showIDontKnowButton() {
    showElement(this.ELEMENTS.BUTTONS.I_DONT_KNOW);
  }

  hideContinueButton() {
    hideElement(this.ELEMENTS.BUTTONS.CONTINUE);
  }

  showContinueButton() {
    showElement(this.ELEMENTS.BUTTONS.CONTINUE);
  }

  hideResultButton() {
    hideElement(this.ELEMENTS.BUTTONS.RESULTS);
  }

  showResultButton() {
    showElement(this.ELEMENTS.BUTTONS.RESULTS);
  }

  beforeUnloadHandler() {
    this.removeListeners();
    if (this.audio) this.audio.pause();
    if (this.errorAudio) this.errorAudio.pause();

    window.removeEventListener(EVENTS.BEFORE_UNLOAD, this.beforeUnloadHandlerBinded);
  }

  init() {
    this.listenersList = [];

    this.dataDropZone = document.querySelector('.data__container > .drop-place');
    this.resultDropZone = document.querySelector('.field__container > .drop-place');

    this.ELEMENTS = {
      TRANSLATION: document.querySelector('.main-card__translation'),
      CONTAINERS: {
        FIELD: document.body.querySelector('.field__container'),
        DATA: document.body.querySelector('.data__container'),
        STATISTIC: document.body.querySelector('.statistics__container'),
      },
      BUTTONS: {
        RESULTS: document.querySelector('.game__button_results'),
        STATISTICS: {
          CONTINUE: document.querySelector('.game__button_results-continue'),
          LONG_STATISTIC: document.querySelector('.game__button_results-statistic'),
        },
        INTRODUCTION: document.querySelector('.introduction__button'),
        I_DONT_KNOW: document.querySelector('.game__button_dont-know'),
        CHECK: document.querySelector('.game__button_check'),
        CONTINUE: document.querySelector('.game__button_continue'),
        HINTS: {
          BG: document.querySelector('.game-hints_bg'),
          TRANSLATION: document.querySelector('.game-hints_translation'),
          SPELLING: document.querySelector('.game-hints_spelling'),
          AUTO_SPELLING: document.querySelector('.game-hints_auto-spelling'),
        },
        REPEAT_SPELLING: document.querySelector('.button-repeat-spelling'),
      },
      DESCRIPTION: {
        PICTURE: document.querySelector('.picture__description'),
        TRANSLATION: document.querySelector('.translation__description'),
      },
    };

    window.addEventListener(EVENTS.BEFORE_UNLOAD, this.beforeUnloadHandlerBinded);
  }
}

export default new View();
