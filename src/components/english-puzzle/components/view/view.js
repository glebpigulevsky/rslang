import correctSound from './assets/audio/correct.mp3';
import successSound from './assets/audio/success.mp3';
import starWin from './assets/img/star-win.svg';
import logo from './assets/img/logo.jpg';
import image from '../../assets/img/9th_wave.jpg';

import './scss/introduction.scss';
import './scss/spinner.scss';
import './scss/card.scss';
import './scss/controls.scss';
import './scss/status-bar.scss';
import './scss/drag-and-drop.scss';

import {
  CLASS_NAMES,
  EVENTS,
  DATA_PATH,
} from '../data/helper';

import {
  setActiveState,
  createStar,
  shuffleArray,
  hideElement,
  showElement,
} from '../data/utils';

import StatisticList from './components/statisticList/statisticList';
import Slider from './components/slider/slider';
import Menu from './components/menu/menu';

class View {
  constructor() {
    this.ELEMENTS = null;

    // this.currentList = null;
    this.statisticList = null;
    this.slider = null;

    this.menu = null;
    this.dataDropZone = null;
    this.resultDropZone = null;

    this.correctSound = new Audio(correctSound);
    this.successSound = new Audio(successSound);

    this.audio = null;

    this.onEndSpellingHandlerBinded = this.onEndSpellingHandler.bind(this);

    // this.renderSpeechInput = this.renderSpeechInput.bind(this);
  }

  // renderPageList(pageData, listenersList) {
  //   this.currentList = new PageList(this.ELEMENTS.CARDS_CONTAINER, pageData, listenersList);
  //   this.currentList.render();
  // }

  renderStatisticList(lastGameRoundData, listenersList, iDontKnowList, lastGameFinalTime, pictureData, results) {
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

    // results.forEach((result) => {
    //   new ResultsList(
    //     this.ELEMENTS.RESULT.CONTAINER,
    //     result.pageData,
    //     listenersList,
    //     // result.translations,
    //     result.guessedList,
    //     result.time,
    //   ).render();
    // });

    // this.slider = new Slider();
    // this.slider.init();
  }

  removeActiveStates(container) {
    container.querySelectorAll(`.${CLASS_NAMES.ACTIVE}`)
      .forEach((item) => item.classList.remove(CLASS_NAMES.ACTIVE));
  }

  // setLinkActiveStateByWord(speechInputValue) {
  //   const card = Array.from(this.ELEMENTS.CARDS_CONTAINER.querySelectorAll(`.${CLASS_NAMES.LINK}`))
  //     .find((link) => link.dataset.word === speechInputValue);
  //   card.classList.add(CLASS_NAMES.ACTIVE);

  //   this.renderPicture(`${DATA_PATH}${card.dataset.image}`);
  // }

  // resetLinksStates(target) {
  //   this.removeActiveStates();
  //   setActiveState(target);
  // }

  resetStatisticLinksStates(target) {
    this.removeActiveStates(this.ELEMENTS.CONTAINERS.STATISTIC);
    setActiveState(target);
  }

  // removeCurrentList() {
  //   this.currentList.remove();
  // }

  // renderPicture(imageSrc = logo) {
  //   this.ELEMENTS.PICTURE.src = imageSrc;
  // }

  showTranslation(translation = '') {
    this.ELEMENTS.DESCRIPTION.TRANSLATION.innerText = translation;
  }

  hideTranslation() {
    this.showTranslation();
  }

  // renderSpeechInput(speechInput = '') {
  //   this.ELEMENTS.SPEECH_INPUT.value = speechInput;

  //   if (!speechInput) return;
  //   const changeEvent = new Event(EVENTS.CHANGE);
  //   this.ELEMENTS.SPEECH_INPUT.dispatchEvent(changeEvent);
  // }

  // initGameButton(onGameButtonClick) {
  //   this.ELEMENTS.BUTTONS.GAME.addEventListener(EVENTS.CLICK, onGameButtonClick);
  // }

  // toggleGameButtonState() {
  //   this.ELEMENTS.BUTTONS.GAME.classList.toggle(CLASS_NAMES.DISABLED);
  // }

  // initSpeechInput(onChangeSpeechInput) {
  //   this.ELEMENTS.SPEECH_INPUT.addEventListener(EVENTS.CHANGE, onChangeSpeechInput);
  // }

  // initStopButton(onStopButtonClick) {
  //   this.ELEMENTS.BUTTONS.STOP.addEventListener(EVENTS.CLICK, onStopButtonClick);
  // }

  // initNewButton(onNewButtonClick) {
  //   this.ELEMENTS.BUTTONS.NEW.addEventListener(EVENTS.CLICK, onNewButtonClick);
  // }

  // initDifficulties(onDifficultChange) {
  //   this.ELEMENTS.BUTTONS.DIFFICULTIES.addEventListener(EVENTS.CLICK, onDifficultChange);
  // }

  initResultsButton(onResultsButtonClick) {
    this.ELEMENTS.BUTTONS.RESULTS.addEventListener(EVENTS.CLICK, onResultsButtonClick);
  }

  // initResultsNewGameButton(onResultsNewGameButtonClick) {
  //   this.ELEMENTS.BUTTONS.RESULTS_NEW_GAME
  //     .addEventListener(EVENTS.CLICK, onResultsNewGameButtonClick);
  // }

  // initResultsResumeGameButton(onResultsResumeGameButtonClick) {
  //   this.ELEMENTS.BUTTONS.RESULTS_RESUME_GAME
  //     .addEventListener(EVENTS.CLICK, onResultsResumeGameButtonClick);
  // }

  addStar() {
    const star = createStar(starWin);
    this.ELEMENTS.STATUS_BAR.append(star);
  }

  playCorrectSound() {
    this.correctSound.play();
  }

  playSuccessSound() {
    this.successSound.play();
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

  clearStatusBar() {
    this.ELEMENTS.STATUS_BAR.innerHTML = '';
  }

  clearDropZones() {
    this.dataDropZone.innerHTML = '';
    this.resultDropZone.innerHTML = '';
  }

  getCountElementsInDataDropZone() {
    return this.dataDropZone.querySelectorAll('*').length;
  }

  renderInputSentence(currentSentensePuzzles) {
    // shuffleArray(Array.from(currentSentensePuzzles)).forEach((puzzle) => {
    shuffleArray((currentSentensePuzzles)).forEach((puzzle) => {
      const clonePuzzle = puzzle.cloneNode(true); // todo повторение будет в рендеринге правильной последовательности
      clonePuzzle.getContext('2d').drawImage(puzzle, 0, 0);
      clonePuzzle.classList.add('dragable');

      document.querySelector('.data__container').querySelector('.drop__place').append(clonePuzzle);
    });

    // shuffleArray(currentSentense.split(' ')).forEach((word) => {
    //   const span = document.createElement('span');
    //   span.className = 'dragable';
    //   span.textContent = word.replace('<b>', '').replace('</b>', '');
    //   document.querySelector('.data__container').querySelector('.drop__place').append(span);
    // });
  }

  renderNextResultDropZone() {
    const div = document.createElement('div');
    div.className = 'drop__place sentence';
    this.resultDropZone.classList.toggle('drop__place');
    this.resultDropZone.after(div);
    this.resultDropZone = div;
  }

  clearGameField() {
    document.querySelector('.field__container').innerHTML = '<div class="drop__place sentence"></div>';
    this.resultDropZone = document.querySelector('.field__container > .drop__place');
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
    this.ELEMENTS.BUTTONS.HINTS.TRANSLATION.addEventListener(EVENTS.CLICK, onHintTranslationButtonClick);

    if (isTranslationEnabled) this.ELEMENTS.BUTTONS.HINTS.TRANSLATION.classList.add(CLASS_NAMES.ACTIVE);
  }

  initHintSpellingButton(onHintSpellingButtonClick, isSpellingEnabled) {
    this.ELEMENTS.BUTTONS.HINTS.SPELLING.addEventListener(EVENTS.CLICK, onHintSpellingButtonClick);

    if (isSpellingEnabled) this.ELEMENTS.BUTTONS.HINTS.SPELLING.classList.add(CLASS_NAMES.ACTIVE);
  }

  initHintAutoSpellingButton(onHintAutoSpellingButtonClick, isAutoSpellingEnabled) {
    this.ELEMENTS.BUTTONS.HINTS.AUTO_SPELLING.addEventListener(EVENTS.CLICK, onHintAutoSpellingButtonClick);

    if (isAutoSpellingEnabled) this.ELEMENTS.BUTTONS.HINTS.AUTO_SPELLING.classList.add(CLASS_NAMES.ACTIVE);
  }

  initRepeatSpellingButton(onRepeatSpellingButtonClick) {
    this.ELEMENTS.BUTTONS.REPEAT_SPELLING.addEventListener(EVENTS.CLICK, onRepeatSpellingButtonClick);
  }

  initStatisticContinueButton(onStatisticContinueButtonClick) {
    this.ELEMENTS.BUTTONS.STATISTICS.CONTINUE.addEventListener(EVENTS.CLICK, onStatisticContinueButtonClick);
  }

  initStatisticLongStatisticButton(onStatisticLongStatisticClick) {
    this.ELEMENTS.BUTTONS.STATISTICS.LONG_STATISTIC.addEventListener(EVENTS.CLICK, onStatisticLongStatisticClick);
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

  showPicture(finalImagePuzzles) {
    // this.ELEMENTS.CONTAINERS.FIELD.classList.add(CLASS_NAMES.BG_PICTURE);
    // this.ELEMENTS.CONTAINERS.FIELD.style.backgroundImage = `url(${image})`;

    Array.from(document.querySelectorAll('.canvas-item')).forEach((puzzle, index) => {
      // puzzle.getContext('2d').drawImage(finalImagePuzzles[+puzzle.dataset.item.slice(0, 1) - 1][index], 0, 0);
      puzzle.getContext('2d').drawImage(finalImagePuzzles[index], 0, 0);
    });
  }

  hidePicture() {
    // this.ELEMENTS.CONTAINERS.FIELD.classList.remove(CLASS_NAMES.BG_PICTURE);
    // this.ELEMENTS.CONTAINERS.FIELD.style.backgroundImage = '';
    this.clearGameField();
  }

  showImageDescription(imageDescription = '') {
    this.ELEMENTS.DESCRIPTION.IMAGE.innerHTML = imageDescription;
  }

  clearImageDescription() {
    this.showImageDescription();
  }

  resetPuzzlesStates(currentSentence, regularPuzzlesWithImage) {
    Array.from(document.querySelectorAll(`.canvas-row-${currentSentence + 1}`))
      .forEach((puzzle) => {
      //  puzzle.classList.remove(
        // CLASS_NAMES.PUZZLE.CORRECT,
        // CLASS_NAMES.PUZZLE.WRONG,
      // ));
        puzzle.getContext('2d').drawImage(regularPuzzlesWithImage[+puzzle.dataset.item.slice(-2).replace('-', '') - 1], 0, 0);
      });
  }

  init() {
    this.renderDOM();

    this.ELEMENTS = {
      // CARDS_CONTAINER: document.querySelector('.cards__container'),
      // PICTURE: document.querySelector('.main-card__picture'),
      TRANSLATION: document.querySelector('.main-card__translation'),
      // SPEECH_INPUT: document.querySelector('.main-card__speech-input'),
      // STATUS_BAR: document.querySelector('.status-bar'),
      // RESULT: {
      //   CONTAINER: document.body.querySelector('.gallery'),
      // },
      CONTAINERS: {
        FIELD: document.body.querySelector('.field__container'), // todo
        DATA: document.body.querySelector('.data__container'), // todo
        STATISTIC: document.body.querySelector('.statistics__container'),
      },
      BUTTONS: {
        // NEW: document.querySelector('.game__button-new'),
        // GAME: document.querySelector('.game__button-start'),
        // STOP: document.querySelector('.game__button-stop'),
        RESULTS: document.querySelector('.game__button-results'),
        STATISTICS: {
          CONTINUE: document.querySelector('.game__button-results_continue'),
          LONG_STATISTIC: document.querySelector('.game__button-results_statistic'),
        },
        // DIFFICULTIES: document.querySelector('.difficulties'),
        // RESULTS_NEW_GAME: document.querySelector('.game__button-results_new'),
        // RESULTS_RESUME_GAME: document.querySelector('.game__button-results_return'),
        INTRODUCTION: document.querySelector('.introduction__button'),
        I_DONT_KNOW: document.querySelector('.game__button-dont_know'),
        CHECK: document.querySelector('.game__button-check'),
        CONTINUE: document.querySelector('.game__button-continue'),
        HINTS: {
          BG: document.querySelector('.game__hints-bg'),
          TRANSLATION: document.querySelector('.game__hints-translation'),
          SPELLING: document.querySelector('.game__hints-spelling'),
          AUTO_SPELLING: document.querySelector('.game__hints-auto-spelling'),
        },
        REPEAT_SPELLING: document.querySelector('.button-repeat-spelling'),
      },
      DESCRIPTION: {
        IMAGE: document.querySelector('.image__description'),
        TRANSLATION: document.querySelector('.translation__description'),
      },
    };

    this.dataDropZone = document.querySelector('.data__container > .drop__place');
    this.resultDropZone = document.querySelector('.field__container > .drop__place');
  }

  renderDOM() {
    document.querySelector('body').innerHTML = '';
    document.querySelector('body').insertAdjacentHTML('afterbegin', `
      <div class="body overflow-hidden">
        <div class="centralizer hidden">
          <header class="header">
            <nav class="navigation">
              <div class="navigation__box navigation__box_left">
                <span class="navigation__description level__description">Level</span>
                <!-- <select class="navigation__level level select" name="level">
                  <option value="0">1</option>
                  <option value="1">2</option>
                  <option value="2">3</option>
                  <option value="3">4</option>
                  <option value="4">5</option>
                  <option value="5">6</option>
                </select> -->
              </div>
              <div class="navigation__box navigation__box_right">
                <span class="navigation__description round__description">Round</span>
                <!-- <select class="navigation__round round select" name="round">
                  <option value="0">1</option>
                  <option value="1">2</option>
                  <option value="2">3</option>
                  <option value="3">4</option>
                  <option value="4">5</option>
                  <option value="5">6</option>
                  <option value="6">7</option>
                  <option value="7">8</option>
                  <option value="8">9</option>
                  <option value="9">10</option>
                </select> -->
              </div>
            </nav>
          </header>
    
          <main class="main">
            <div class="main-game__container">
              <div class="game__controls">
                <div class="buttons__wrapper">
                  <button class="button-repeat-spelling button-rounded" type="button">Sound</button>
                  <button class="game__hints game__hints-bg button-rounded">Bg hint</button>
                  <button class="game__hints game__hints-translation button-rounded">Translate</button>
                  <button class="game__hints game__hints-spelling button-rounded">Spelling</button>
                  <button class="game__hints game__hints-auto-spelling button-rounded">AutoSpelling</button>
                <!--<div class="difficulties">
                    <span class="difficult__description">Level:</span>
                    <button class="game__difficult game__difficult-1 button-rounded active">1</button>
                    <button class="game__difficult game__difficult-2 button-rounded">2</button>
                    <button class="game__difficult game__difficult-3 button-rounded">3</button>
                    <button class="game__difficult game__difficult-4 button-rounded">4</button>
                    <button class="game__difficult game__difficult-5 button-rounded">5</button>
                    <button class="game__difficult game__difficult-6 button-rounded">6</button>
                  </div>
                  <div class="button__container">
                    <button class="game__button game__button-new button-rounded">New game</button>
                    <button class="game__button game__button-start button-rounded">Start game</button>
                    <button class="game__button game__button-stop button-rounded">Stop game</button>
                    <button class="game__button game__button-results button-rounded">Results</button>
                  </div> -->
                </div>
                <p class="status-bar"></p>
              </div>
    
              <div class="main-card">
                <div>
                  <p class="main-card__translation"></p>
                  <input class="main-card__speech-input input" type="text" readonly> <!-- readonly -->
                </div>
                <div class="picture__container">
                  <img class="main-card__picture" alt="current word picture">
                </div>
              </div>
    
              <div class="cards__container">
              </div>

              <p class="translation__description description"></p>
    
              <div class="game__field">
                <div class="field__container game__field_container">
                  <div class="drop__place sentence"></div>
                </div>
    
                <div class="data__container game__field_container">
                  <div class="drop__place sentence">
                    <!-- <span class="dragable d1">1</span>
                    <span class="dragable d2">2</span>
                    <span class="dragable d3">3</span>
                    <span class="dragable d4">4</span>
                    <span class="dragable d5">5</span> -->
                  </div>
                </div>
              </div>

              <p class="image__description description"></p>

              <div class="game__controls">
                <button class="game__button game__button-check button-rounded hidden">Check</button>
                <button class="game__button game__button-dont_know button-rounded">I don\`t know</button>
                <button class="game__button game__button-continue button-rounded hidden">Continue</button>
                <button class="game__button game__button-results button-rounded hidden">Results</button>
              </div>
            </div>
  
            <div class="results__container">
              <div class="button__container-results">
                <button class="game__button game__button-results_continue button-rounded">Continue</button>
                <button class="game__button game__button-results_statistic button-rounded">Statistics</button>
              </div>

              <div class="statistics__container">
              </div>
  
                  <!-- <div class="slider__wrapper wrapper">
                    <div class="button__container-slider button__container_left">
                      <button class="slider__button slider__button_previous">
                        <span class="slider__button-icon"></span>
                      </button>
                    </div>
                    <div class="button__container-slider button__container_right">
                      <button class="slider__button slider__button_next">
                        <span class="slider__button-icon"></span>
                      </button>
                    </div>
      
                    <div class="gallery">
                    </div> -->
              </div>
            </div>
          </main>
        </div>
  
        <div class="spinner hidden">
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
            <button class="introduction__button button-rounded">start</button>
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
