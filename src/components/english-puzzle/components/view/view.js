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
    this.elements = null;

    this.menu = null;
    this.dataDropZone = null;
    this.resultDropZone = null;
    this.statisticList = null;

    this.audio = null;
    this.errorAudio = new Audio(ERROR_AUDIO);

    this.listenersList = null;

    this.onEndSpellingHandlerBinded = this.onEndSpellingHandler.bind(this);
    this.onErrorSpellingHandlerBinded = this.onErrorSpellingHandler.bind(this);
    this.onEndErrorSpellingHandlerBinded = this.onEndErrorSpellingHandler.bind(this);
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
      this.elements.containers.statistic,
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

  playSentenceSpelling(src) {
    if (this.audio && !this.audio.ended) {
      this.audio.pause();
      this.onEndSpellingHandlerBinded();
    }

    this.audio = new Audio(src);
    this.audio.addEventListener(EVENTS.ENDED, this.onEndSpellingHandlerBinded);
    this.audio.addEventListener(EVENTS.ERROR, this.onErrorSpellingHandlerBinded);
    this.startSpellingAnimation();
    this.audio.play();
  }

  startSpellingAnimation() {
    this.elements.buttons.repeatSpelling.classList.add(CLASS_NAMES.ANIMATED);
  }

  stopSpellingAnimation() {
    this.elements.buttons.repeatSpelling.classList.remove(CLASS_NAMES.ANIMATED);
  }

  onEndSpellingHandler() {
    this.audio.removeEventListener(EVENTS.ENDED, this.onEndSpellingHandlerBinded);
    this.stopSpellingAnimation();
  }

  onErrorSpellingHandler() {
    this.audio.removeEventListener(EVENTS.ERROR, this.onErrorSpellingHandlerBinded);
    this.errorAudio.addEventListener(EVENTS.ENDED, this.onEndErrorSpellingHandlerBinded);
    this.errorAudio.play();
    this.startSpellingAnimation();
  }

  onEndErrorSpellingHandler() {
    this.errorAudio.removeEventListener(EVENTS.ENDED, this.onEndErrorSpellingHandlerBinded);
    this.stopSpellingAnimation();
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
    Array.from(this.elements.containers.field.querySelectorAll(`.${CLASS_NAMES.SENTENCE}`))
      .forEach((sentence) => {
        sentence.classList.add(CLASS_NAMES.SENTENCE_CLEAR);
      });
  }

  showPictureDescription(pictureDescription = '') {
    this.elements.description.picture.textContent = pictureDescription;
  }

  clearPictureDescription() {
    this.showPictureDescription();
  }

  showTranslation(translation = '') {
    this.elements.description.translation.textContent = translation;
  }

  hideTranslation() {
    this.showTranslation();
  }

  removeActiveStates(container) {
    container.querySelectorAll(`.${CLASS_NAMES.ACTIVE}`)
      .forEach((item) => item.classList.remove(CLASS_NAMES.ACTIVE));
  }

  resetStatisticLinksStates(target) {
    this.removeActiveStates(this.elements.containers.statistic);
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
      this.elements.buttons.introduction,
      EVENTS.CLICK,
      onIntroButtonClick,
    );
  }

  initCheckButton(onCheckButtonClick) {
    this.addListener(
      this.elements.buttons.check,
      EVENTS.CLICK,
      onCheckButtonClick,
    );
  }

  initIDontKnowButton(onIDontKnowButtonClick) {
    this.addListener(
      this.elements.buttons.iDontKnow,
      EVENTS.CLICK,
      onIDontKnowButtonClick,
    );
  }

  initContinueButton(onContinueButtonClick) {
    this.addListener(
      this.elements.buttons.continue,
      EVENTS.CLICK,
      onContinueButtonClick,
    );
  }

  initHintBgButton(onHintBgButtonClick, isBgImage) {
    this.addListener(
      this.elements.buttons.hints.bg,
      EVENTS.CLICK,
      onHintBgButtonClick,
    );
    if (isBgImage) this.elements.buttons.hints.bg.classList.add(CLASS_NAMES.ACTIVE);
  }

  initHintTranslationButton(onHintTranslationButtonClick, isTranslationEnabled) {
    this.addListener(
      this.elements.buttons.hints.translation,
      EVENTS.CLICK,
      onHintTranslationButtonClick,
    );
    if (isTranslationEnabled) {
      this.elements.buttons.hints.translation.classList.add(CLASS_NAMES.ACTIVE);
    }
  }

  initHintSpellingButton(onHintSpellingButtonClick, isSpellingEnabled) {
    this.addListener(
      this.elements.buttons.hints.spelling,
      EVENTS.CLICK,
      onHintSpellingButtonClick,
    );
    if (isSpellingEnabled) this.elements.buttons.hints.spelling.classList.add(CLASS_NAMES.ACTIVE);
  }

  initHintAutoSpellingButton(onHintAutoSpellingButtonClick, isAutoSpellingEnabled) {
    this.addListener(
      this.elements.buttons.hints.autoSpelling,
      EVENTS.CLICK,
      onHintAutoSpellingButtonClick,
    );
    if (isAutoSpellingEnabled) {
      this.elements.buttons.hints.autoSpelling.classList.add(CLASS_NAMES.ACTIVE);
    }
  }

  initRepeatSpellingButton(onRepeatSpellingButtonClick) {
    this.addListener(
      this.elements.buttons.repeatSpelling,
      EVENTS.CLICK,
      onRepeatSpellingButtonClick,
    );
  }

  initResultsButton(onResultsButtonClick) {
    this.addListener(
      this.elements.buttons.results,
      EVENTS.CLICK,
      onResultsButtonClick,
    );
  }

  initStatisticContinueButton(onStatisticContinueButtonClick) {
    this.addListener(
      this.elements.buttons.statistics.continue,
      EVENTS.CLICK,
      onStatisticContinueButtonClick,
    );
  }

  initStatisticLongStatisticButton(onStatisticLongStatisticClick) {
    this.addListener(
      this.elements.buttons.statistics.longStatistic,
      EVENTS.CLICK,
      onStatisticLongStatisticClick,
    );
  }

  hideCheckButton() {
    hideElement(this.elements.buttons.check);
  }

  showCheckButton() {
    showElement(this.elements.buttons.check);
  }

  hideIDontKnowButton() {
    hideElement(this.elements.buttons.iDontKnow);
  }

  showIDontKnowButton() {
    showElement(this.elements.buttons.iDontKnow);
  }

  hideContinueButton() {
    hideElement(this.elements.buttons.continue);
  }

  showContinueButton() {
    showElement(this.elements.buttons.continue);
  }

  hideResultButton() {
    hideElement(this.elements.buttons.results);
  }

  showResultButton() {
    showElement(this.elements.buttons.results);
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

    this.elements = {
      translation: document.querySelector('.main-card__translation'),
      containers: {
        field: document.body.querySelector('.field__container'),
        data: document.body.querySelector('.data__container'),
        statistic: document.body.querySelector('.statistics__container'),
      },
      buttons: {
        results: document.querySelector('.game__button_results'),
        statistics: {
          continue: document.querySelector('.game__button_results-continue'),
          longStatistic: document.querySelector('.game__button_results-statistic'),
        },
        introduction: document.querySelector('.introduction__button'),
        iDontKnow: document.querySelector('.game__button_dont-know'),
        check: document.querySelector('.game__button_check'),
        continue: document.querySelector('.game__button_continue'),
        hints: {
          bg: document.querySelector('.game-hints_bg'),
          translation: document.querySelector('.game-hints_translation'),
          spelling: document.querySelector('.game-hints_spelling'),
          autoSpelling: document.querySelector('.game-hints_auto-spelling'),
        },
        repeatSpelling: document.querySelector('.button-repeat-spelling'),
      },
      description: {
        picture: document.querySelector('.picture__description'),
        translation: document.querySelector('.translation__description'),
      },
    };

    window.addEventListener(EVENTS.BEFORE_UNLOAD, this.beforeUnloadHandlerBinded);
  }
}

export default new View();
