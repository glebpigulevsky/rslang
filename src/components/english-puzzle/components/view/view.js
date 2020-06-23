import Menu from './components/menu/menu';
import StatisticList from './components/statisticList/statisticList';

import {
  setActiveState,
  shuffleArray,
  hideElement,
  showElement,
} from '../../common/english-puzzle.utils';

import {
  CLASS_NAMES,
  EVENTS,
} from '../../common/english-puzzle.helper';

import image from '../../assets/img/9th_wave.jpg'; // todo default image

class View {
  constructor() {
    this.ELEMENTS = null;

    this.menu = null;
    this.dataDropZone = null;
    this.resultDropZone = null;
    this.statisticList = null;

    this.audio = null;

    this.onEndSpellingHandlerBinded = this.onEndSpellingHandler.bind(this);
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
      // todo повторение будет в рендеринге правильной последовательности
      const clonePuzzle = puzzle.cloneNode(true);
      clonePuzzle.getContext('2d').drawImage(puzzle, 0, 0);
      clonePuzzle.classList.add('dragable');

      this.dataDropZone.append(clonePuzzle);
    });
  }

  renderNewDataDropZone() {
    this.dataDropZone.remove();
    const div = document.createElement('div');
    div.className = 'drop-place sentence';
    document.querySelector('.data__container').append(div);
    this.dataDropZone = div;
  }

  renderNextResultDropZone() {
    const div = document.createElement('div');
    div.className = 'drop-place sentence';
    this.resultDropZone.classList.toggle('drop-place');
    this.resultDropZone.after(div);
    this.resultDropZone = div;

    this.resultDropZone.style.width = `${this.dataDropZone.getBoundingClientRect().width}px`;
    this.resultDropZone.style.height = `${this.dataDropZone.getBoundingClientRect().height}px`;
  }

  resetPuzzlesStates(currentSentence, regularPuzzlesWithImage) {
    Array.from(document.querySelectorAll(`.canvas-row-${currentSentence + 1}`))
      .forEach((puzzle) => {
        puzzle.getContext('2d').drawImage(regularPuzzlesWithImage[+puzzle.dataset.item.slice(-2).replace('-', '') - 1], 0, 0);
      });
  }

  clearGameField() {
    document.querySelector('.field__container').innerHTML = '';
    document.querySelector('.field__container').insertAdjacentHTML('afterbegin', '<div class="drop-place sentence"></div>');
    this.resultDropZone = document.querySelector('.field__container > .drop-place');
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
    this.audio.play();

    this.audio.addEventListener(EVENTS.ENDED, this.onEndSpellingHandlerBinded);
    this.toggleSpellingAnimation();
  }

  toggleSpellingAnimation() {
    this.ELEMENTS.BUTTONS.REPEAT_SPELLING.classList.toggle(CLASS_NAMES.ANIMATED);
  }

  onEndSpellingHandler() {
    this.audio.removeEventListener(EVENTS.ENDED, this.onEndSpellingHandlerBinded);
    this.toggleSpellingAnimation();
  }

  showPicture(finalImagePuzzles) {
    Array.from(document.querySelectorAll('.canvas-item')).forEach((puzzle, index) => {
      // puzzle.getContext('2d').drawImage(finalImagePuzzles[+puzzle.dataset.item.slice(0, 1) - 1][index], 0, 0);
      puzzle.getContext('2d').drawImage(finalImagePuzzles[index], 0, 0);
    });
  }

  hidePicture() {
    this.clearGameField(); // todo
  }

  clearSentencesBackground() {
    debugger;
    Array.from(this.ELEMENTS.CONTAINERS.FIELD.querySelectorAll('.sentence'))
      .forEach((sentence) => {
        sentence.classList.add('sentence-clear');
      });
  }

  showImageDescription(imageDescription = '') {
    this.ELEMENTS.DESCRIPTION.IMAGE.innerHTML = imageDescription;
  }

  clearImageDescription() {
    this.showImageDescription();
  }

  showTranslation(translation = '') {
    this.ELEMENTS.DESCRIPTION.TRANSLATION.innerText = translation;
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

  initMenu(onLevelChangeHandler, onRoundChangeHandler) {
    this.menu = new Menu(onLevelChangeHandler, onRoundChangeHandler);
  }

  initIntroButton(onIntroButtonClick) {
    this.ELEMENTS.BUTTONS.INTRODUCTION.addEventListener(EVENTS.CLICK, onIntroButtonClick);
  }

  initCheckButton(onCheckButtonClick) {
    this.ELEMENTS.BUTTONS.CHECK.addEventListener(EVENTS.CLICK, onCheckButtonClick);
  }

  initIDontKnowButton(onIDontKnowButtonClick) {
    this.ELEMENTS.BUTTONS.I_DONT_KNOW.addEventListener(EVENTS.CLICK, onIDontKnowButtonClick);
  }

  initContinueButton(onContinueButtonClick) {
    this.ELEMENTS.BUTTONS.CONTINUE.addEventListener(EVENTS.CLICK, onContinueButtonClick);
  }

  initHintBgButton(onHintBgButtonClick, isBgImage) {
    this.ELEMENTS.BUTTONS.HINTS.BG.addEventListener(EVENTS.CLICK, onHintBgButtonClick);

    if (isBgImage) this.ELEMENTS.BUTTONS.HINTS.BG.classList.add(CLASS_NAMES.ACTIVE);
  }

  initHintTranslationButton(onHintTranslationButtonClick, isTranslationEnabled) {
    this.ELEMENTS.BUTTONS.HINTS.TRANSLATION.addEventListener(
      EVENTS.CLICK,
      onHintTranslationButtonClick,
    );

    if (isTranslationEnabled) {
      this.ELEMENTS.BUTTONS.HINTS.TRANSLATION.classList.add(CLASS_NAMES.ACTIVE);
    }
  }

  initHintSpellingButton(onHintSpellingButtonClick, isSpellingEnabled) {
    this.ELEMENTS.BUTTONS.HINTS.SPELLING.addEventListener(EVENTS.CLICK, onHintSpellingButtonClick);

    if (isSpellingEnabled) this.ELEMENTS.BUTTONS.HINTS.SPELLING.classList.add(CLASS_NAMES.ACTIVE);
  }

  initHintAutoSpellingButton(onHintAutoSpellingButtonClick, isAutoSpellingEnabled) {
    this.ELEMENTS.BUTTONS.HINTS.AUTO_SPELLING.addEventListener(
      EVENTS.CLICK,
      onHintAutoSpellingButtonClick,
    );

    if (isAutoSpellingEnabled) {
      this.ELEMENTS.BUTTONS.HINTS.AUTO_SPELLING.classList.add(CLASS_NAMES.ACTIVE);
    }
  }

  initRepeatSpellingButton(onRepeatSpellingButtonClick) {
    this.ELEMENTS.BUTTONS.REPEAT_SPELLING.addEventListener(
      EVENTS.CLICK,
      onRepeatSpellingButtonClick,
    );
  }

  initResultsButton(onResultsButtonClick) {
    this.ELEMENTS.BUTTONS.RESULTS.addEventListener(EVENTS.CLICK, onResultsButtonClick);
  }

  initStatisticContinueButton(onStatisticContinueButtonClick) {
    this.ELEMENTS.BUTTONS.STATISTICS.CONTINUE.addEventListener(
      EVENTS.CLICK,
      onStatisticContinueButtonClick,
    );
  }

  initStatisticLongStatisticButton(onStatisticLongStatisticClick) {
    this.ELEMENTS.BUTTONS.STATISTICS.LONG_STATISTIC.addEventListener(
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

  init() {
    this.renderDOM();

    this.ELEMENTS = {
      TRANSLATION: document.querySelector('.main-card__translation'),
      CONTAINERS: {
        FIELD: document.body.querySelector('.field__container'), // todo
        DATA: document.body.querySelector('.data__container'), // todo
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
        IMAGE: document.querySelector('.image__description'),
        TRANSLATION: document.querySelector('.translation__description'),
      },
    };

    this.dataDropZone = document.querySelector('.data__container > .drop-place');
    this.resultDropZone = document.querySelector('.field__container > .drop-place');
  }

  renderDOM() {
    document.querySelector('body').innerHTML = '';
    document.querySelector('body').insertAdjacentHTML('afterbegin', `
      <div class="overflow-hidden english-puzzle-body">
        <div class="wrapper display-none">
         
          <div class="english-puzzle-main">
            <div class="main-game__container">
              <nav class="navigation">
                <div class="navigation__box navigation__box_left">
                  <span class="navigation__description level__description">Level</span>
                  <!-- <select class="navigation__level level select" name="level"> // todo
                    <option value="0">1</option>
                    <option value="1">2</option>
                  </select> -->
                </div>
                <div class="navigation__box navigation__box_right">
                  <span class="navigation__description round__description">Round</span>
                  <!-- <select class="navigation__round round select" name="round"> // todo
                    <option value="0">1</option>
                    <option value="1">2</option>
                  </select> -->
                </div>
              </nav>
              <div class="game__controls">
                <div class="hints__controls">
                  <button class="game-hints__button game-hints_bg button">B</button>
                  <button class="game-hints__button game-hints_translation button">T</button>
                  <button class="game-hints__button game-hints_spelling button">S</button>
                  <button class="game-hints__button game-hints_auto-spelling button">A</button>
                </div>
                <button class="button-repeat-spelling button">So</button>
              </div>
    
              <p class="translation__description description"></p>
              
              <p class="image__description description"></p>

              <div class="game__field">
                <div class="field__container game__field_container">
                  <div class="drop-place sentence">
                  </div>
                </div>
                <div class="data__container game__field_container">
                  <div class="drop-place sentence">
                  </div>
                </div>
              </div>

              <div class="field__controls">
                <button class="game__button game__button_check button display-none">Check</button>
                <button class="game__button game__button_dont-know button">I don\`t know</button>
                <button class="game__button game__button_continue button display-none">Continue</button>
                <button class="game__button game__button_results button display-none">Results</button>
              </div>
            </div>
  
            <div class="results__container">
              <div class="button__container-results">
                <button class="game__button_results game__button_results-continue button">Continue</button>
                <button class="game__button_results game__button_results-statistic button">Statistics</button>
              </div>

              <div class="statistics__container">
              </div>
            </div>
          </div>
        </div>
  
        <div class="spinner display-none">
          <div class="spinner__gear">
            <div class="spinner__inner">
              <div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
          <span class="spinner__description">loading...</span>
        </div>
  
        <div class="introduction">
          <div class="introduction__container">
            <button class="introduction__button button">start</button>
          </div>
        </div>
  
        <template class="statistic-template">
          <div class="current-statistic__container">
            <p class="time"></p>
            <div class="correct__container">
              <p class="correct__title">
                <span class="correct__lead">I know:
                  <span class="correct"></span>
                </span>
              </p>
            </div>
            <div class="errors__container">
              <p class="errors__title">
                <span class="errors__lead">I don\`t know:
                  <span class="errors"></span>
                </span>
              </p>
            </div>
          </div>
          <div class="long-statistic__container">
          </div>
        </template>
      </div>
    `);
  }
}

export default new View();
