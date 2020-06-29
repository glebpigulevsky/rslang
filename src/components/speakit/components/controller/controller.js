import model from '../model/model';
import view from '../view/view';

import { defaultData } from '../../data';

import {
  initIntroButton,
  toggleDocumentScroll,
  getClosestLink,
  loadCardsJSON,
  isButtonClicked,
  togglePageState,
  hideSpinner,
  showSpinner,
} from '../../common/speakit.utils';

import {
  LANGUAGE,
  MAX_WORDS_IN_ROUND,
  MAX_LEVELS_COUNT,
  MAX_ROUNDS_COUNT,
  EVENTS,
  DATA_PATH,
  CLASS_NAMES,
} from '../../common/speakit.constants';

class Controller {
  constructor() {
    this.recognition = null;
    this.isGameStarts = false;
    this.guessedList = null;

    this.currentLevel = null;
    this.currentRound = null;
    this.roundFetchedData = null;

    this.onPageCardClick = this.onPageCardClick.bind(this);
    this.onIntroButtonClick = this.onIntroButtonClick.bind(this);
    this.onGameButtonClick = this.onGameButtonClick.bind(this);
    this.onChangeSpeechInput = this.onChangeSpeechInput.bind(this);
    this.onStopButtonClick = this.onStopButtonClick.bind(this);
    this.onDifficultChange = this.onDifficultChange.bind(this);
    this.onNewButtonClick = this.onNewButtonClick.bind(this);
    this.onResultButtonClick = this.onResultButtonClick.bind(this);
    this.onResultCardClick = this.onResultCardClick.bind(this);
    this.onResultsNewGameButtonClick = this.onResultsNewGameButtonClick.bind(this);
    this.onResultsResumeGameButtonClick = this.onResultsResumeGameButtonClick.bind(this);
    this.beforeUnloadHandler = this.beforeUnloadHandler.bind(this);

    this.onLevelChangeHandlerBinded = this.onLevelChangeHandler.bind(this);
    this.onRoundChangeHandlerBinded = this.onRoundChangeHandler.bind(this);
  }

  loadPage(data) {
    model.loadPage(data);
  }

  setCurrentLevel(level) {
    this.currentLevel = level % MAX_LEVELS_COUNT;
  }

  setCurrentRound(round = 0) {
    if (round >= MAX_ROUNDS_COUNT) {
      this.setCurrentLevel(this.currentLevel + 1);
      this.currentRound = 0;

      if (view.menu.ELEMENTS.SELECTORS.LEVEL) {
        view.menu.ELEMENTS.SELECTORS.LEVEL.remove();
        view.menu.renderLevelSelector(this.currentLevel);
      }

      if (view.menu.ELEMENTS.SELECTORS.ROUND) {
        view.menu.ELEMENTS.SELECTORS.ROUND.remove();
        view.menu.renderRoundSelector(
          MAX_ROUNDS_COUNT,
          this.currentRound,
          this.completedRoundsByLevels[this.currentLevel],
        );
      }
      return;
    }

    this.currentRound = round;
  }

  addPageList() {
    view.renderPageList(model.pageData, [{
      event: EVENTS.CLICK,
      handler: this.onPageCardClick,
    }]);
  }

  // newGame(currentLevel = 0) {
  newGame() {
    this.onStopButtonClick();
    this.guessedList = [];
    // this.setCurrentLevel(currentLevel);
    this.newPage();
    view.clearStatusBar();
    view.renderPicture();
    view.renderTranslation();
    view.renderSpeechInput();
  }

  async newPage() {
    // loadCardsJSON(this.currentLevel, (cardsData) => {
    //   if (view.currentList) view.removeCurrentList();
    //   model.loadPage(cardsData);
    //   this.addPageList();
    //   hideSpinner();
    // });
    // this.roundFetchedData = await model.fetchCardsPage(this.currentLevel, this.currentRound); // todo without Internet!
    this.roundFetchedData = defaultData;

    if (view.currentList) view.removeCurrentList();
    model.loadPage(this.roundFetchedData);
    this.addPageList();
    hideSpinner();
  }

  onPageCardClick(event) {
    const selectedCard = getClosestLink(event);
    if (!selectedCard) return;
    event.preventDefault();

    if (this.isGameStarts) return;
    view.resetLinksStates(selectedCard);

    // const { word } = selectedCard.dataset;
    // const translation = model.translationsMap.get(word);
    view.renderTranslation(selectedCard.dataset.translation);

    const imageSrc = selectedCard.dataset.image;
    // view.renderPicture(`${DATA_PATH}${imageSrc}`);
    view.renderPicture(imageSrc);

    const audioSrc = selectedCard.dataset.audio;
    // const audio = new Audio(`${DATA_PATH}${audioSrc}`);
    const audio = new Audio(audioSrc);
    audio.play();
  }

  onGameButtonClick() {
    if (this.isGameStarts) return;
    this.isGameStarts = true;
    if (!this.guessedList.length) view.removeActiveStates();
    view.toggleGameButtonState();
    view.renderPicture();
    view.renderTranslation();

    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new window.SpeechRecognition();
    this.recognition.interimResults = false;
    this.recognition.lang = LANGUAGE;
    this.recognition.continuous = true;
    this.recognition.maxAlternatives = MAX_WORDS_IN_ROUND;
    const { renderSpeechInput } = view;

    this.recognition.onresult = (event) => {
      const recognitionResult = this.onRecognitionResult(event) || '';
      renderSpeechInput(recognitionResult);
    };

    this.recognition.onend = () => this.recognition.start;

    this.recognition.start();
  }

  onRecognitionResult(event) {
    const last = event.results.length - 1;

    return Array.from(event.results[last])
      .map((spelledWordData) => spelledWordData.transcript.toLowerCase().trim())
      .find(model.isWordGuessed) || event.results[last][0].transcript;
  }

  onChangeSpeechInput({ target }) {
    const recognitionResult = target.value;
    if (!model.isWordGuessed(recognitionResult)
      || this.guessedList.includes(recognitionResult)) return;

    // const translation = model.translationsMap.get(recognitionResult);
    view.renderTranslation(model.getTranslationByWord(recognitionResult));

    this.guessedList.push(recognitionResult);
    view.setLinkActiveStateByWord(recognitionResult);
    view.addStar();
    view.playCorrectSound();

    if (this.guessedList.length !== MAX_WORDS_IN_ROUND) return;

    const completedRoundsData = {
      completedRoundsByLevels: this.completedRoundsByLevels,
      lastLevelWithLastCompletedRound: this.currentLevel,
      lastCompletedRound: this.currentRound,
    };
    model.saveCompletedRounds(completedRoundsData);

    view.playSuccessSound();
    this.onResultButtonClick();
    this.onStopButtonClick();
  }

  onStopButtonClick() {
    if (!this.isGameStarts) return;

    model.saveResults(this.guessedList);

    this.recognition.abort();
    this.recognition.onresult = null;
    this.recognition.onend = null;
    this.recognition = null;
    this.isGameStarts = false;
    view.toggleGameButtonState();

    view.clearStatusBar();
    view.renderPicture();
    this.guessedList = [];
    view.renderSpeechInput();
    view.removeActiveStates();
  }

  onDifficultChange(event) {
    const button = event.target;
    if (!isButtonClicked(event)) return;

    view.removeActiveStates(view.difficultiesContainer);
    button.classList.add(CLASS_NAMES.ACTIVE);

    const newDifficult = +button.innerText - 1;
    if (newDifficult === this.difficult) return;
    showSpinner();
    this.newGame(newDifficult);
  }

  onNewButtonClick() {
    showSpinner();
    this.newGame(this.currentLevel);
  }

  onResultsNewGameButtonClick() {
    togglePageState(CLASS_NAMES.RESULT.PAGE);
    view.resultList.remove();

    this.onNewButtonClick();
  }

  onResultsResumeGameButtonClick() {
    togglePageState(CLASS_NAMES.RESULT.PAGE);
    view.resultList.remove();

    if (this.recognition) this.recognition.start();
  }

  onResultButtonClick() {
    togglePageState(CLASS_NAMES.RESULT.PAGE);

    view.renderResultsList(
      model.pageData,
      [{
        event: EVENTS.CLICK,
        handler: this.onResultCardClick,
      }],
      model.translationsMap,
      this.guessedList,
      model.results,
    );

    if (this.recognition) this.recognition.abort();
  }

  onResultCardClick(event) {
    const selectedCard = getClosestLink(event);
    if (!selectedCard) return;
    event.preventDefault();

    view.resetResultsLinksStates(selectedCard);

    const audioSrc = selectedCard.dataset.audio;
    const audio = new Audio(audioSrc);
    audio.play();
  }

  beforeUnloadHandler() {
    if (this.isGameStarts) model.saveResults(this.guessedList);
    window.removeEventListener(EVENTS.BEFORE_UNLOAD, this.beforeUnloadHandler);
  }

  onIntroButtonClick({ target }) {
    view.introduction.classList.add(CLASS_NAMES.HIDDEN);
    view.spinner.classList.remove(CLASS_NAMES.HIDDEN);
    view.centralizer.classList.remove(CLASS_NAMES.HIDDEN);
    toggleDocumentScroll();
    this.newGame();
    target.removeEventListener(EVENTS.CLICK, this.onIntroButtonClick);
  }

  onLevelChangeHandler(evt) {
    // this.setCurrentLevel(+evt.target.value);
    this.setCurrentLevel(+evt.target.value);
    this.setCurrentRound();

    showSpinner();

    if (view.menu.ELEMENTS.SELECTORS.ROUND) view.menu.ELEMENTS.SELECTORS.ROUND.remove();
    // this.setCurrentRound();
    view.menu.renderRoundSelector(
      MAX_ROUNDS_COUNT,
      this.currentRound,
      this.completedRoundsByLevels[this.currentLevel],
    );
    // this.newRound(this.currentLevel, this.currentRound);
    this.newGame();
  }

  onRoundChangeHandler(evt) {
    showSpinner();
    this.setCurrentRound(+evt.target.value);
    // this.newRound(this.currentLevel, this.currentRound);
    this.newGame();
  }

  init(startLevel = 0, startRound = 0) {
    initIntroButton(this.onIntroButtonClick);

    const completedRoundsData = model.loadCompletedRounds();
    this.completedRoundsByLevels = (completedRoundsData
      && completedRoundsData.completedRoundsByLevels)
      || new Array(MAX_LEVELS_COUNT).fill('').map(() => []);

    this.setCurrentLevel((completedRoundsData
      && completedRoundsData.lastLevelWithLastCompletedRound)
      || startLevel);
    this.setCurrentRound((completedRoundsData && completedRoundsData.lastCompletedRound + 1)
      || startRound);

    view.initMenu(this.onLevelChangeHandlerBinded, this.onRoundChangeHandlerBinded);

    if (view.menu.ELEMENTS.SELECTORS.LEVEL) {
      view.menu.ELEMENTS.SELECTORS.LEVEL.remove();
    }
    view.menu.renderLevelSelector(this.currentLevel);
    if (view.menu.ELEMENTS.SELECTORS.ROUND) {
      view.menu.ELEMENTS.SELECTORS.ROUND.remove();
    }
    view.menu.renderRoundSelector(
      MAX_ROUNDS_COUNT,
      this.currentRound,
      this.completedRoundsByLevels[this.currentLevel],
    );

    view.initGameButton(this.onGameButtonClick);
    view.initSpeechInput(this.onChangeSpeechInput);
    view.initStopButton(this.onStopButtonClick);
    view.initDifficulties(this.onDifficultChange);
    view.initNewButton(this.onNewButtonClick);
    view.initResultButton(this.onResultButtonClick);
    view.initResultsNewGameButton(this.onResultsNewGameButtonClick);
    view.initResultsResumeGameButton(this.onResultsResumeGameButtonClick);

    window.addEventListener(EVENTS.BEFORE_UNLOAD, this.beforeUnloadHandler);
  }
}

export default new Controller();
