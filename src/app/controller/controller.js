import {
  LANGUAGE,
  MAX_WORDS_COUNT,
  ELEMENTS,
  EVENTS,
  DATA_PATH,
  CLASS_NAMES,
} from '../data/helper';

import {
  initIntroButton,
  toggleDocumentScroll,
  getClosestLink,
  loadCardsJSON,
  isButtonClicked,
  togglePageState,
  hideSpinner,
  showSpinner,
} from '../data/utils';

export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.difficult = 0;
    this.recognition = null;
    this.isGameStarts = false;
    this.guessedList = null;

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
  }

  loadPage(data) {
    this.model.loadPage(data);
  }

  setPage(difficult) {
    this.model.setPage(difficult);
  }

  setDifficult(difficult) {
    this.difficult = difficult;
  }

  addPageList() {
    this.view.renderPageList(this.model.pageData, [{
      event: EVENTS.CLICK,
      handler: this.onPageCardClick,
    }]);
  }

  newGame(difficult = 0) {
    this.onStopButtonClick();
    this.guessedList = [];
    this.setDifficult(difficult);
    this.newPage();
    this.view.clearStatusBar();
    this.view.renderPicture();
    this.view.renderTranslation();
    this.view.renderSpeechInput();
  }

  newPage() {
    loadCardsJSON(this.difficult, (cardsData) => {
      if (this.view.currentList) this.view.removeCurrentList();
      this.model.loadPage(cardsData);
      this.addPageList();
      hideSpinner();
    });
  }

  onPageCardClick(event) {
    const selectedCard = getClosestLink(event);
    if (!selectedCard) return;
    event.preventDefault();

    if (this.isGameStarts) return;
    this.view.resetLinksStates(selectedCard);

    const { word } = selectedCard.dataset;
    const translation = this.model.translationsMap.get(word);
    this.view.renderTranslation(translation);

    const imageSrc = selectedCard.dataset.image;
    this.view.renderPicture(`${DATA_PATH}${imageSrc}`);

    const audioSrc = selectedCard.dataset.audio;
    const audio = new Audio(`${DATA_PATH}${audioSrc}`);
    audio.play();
  }

  onGameButtonClick() {
    if (this.isGameStarts) return;
    this.isGameStarts = true;
    if (!this.guessedList.length) this.view.removeActiveStates();
    this.view.toggleGameButtonState();
    this.view.renderPicture();
    this.view.renderTranslation();

    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new window.SpeechRecognition();
    this.recognition.interimResults = false;
    this.recognition.lang = LANGUAGE;
    this.recognition.continuous = true;
    this.recognition.maxAlternatives = MAX_WORDS_COUNT;
    const { renderSpeechInput } = this.view;

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
      .find(this.model.isWordGuessed) || event.results[last][0].transcript;
  }

  onChangeSpeechInput({ target }) {
    const recognitionResult = target.value;
    if (!this.model.isWordGuessed(recognitionResult)
      || this.guessedList.includes(recognitionResult)) return;

    const translation = this.model.translationsMap.get(recognitionResult);
    this.view.renderTranslation(translation);

    this.guessedList.push(recognitionResult);
    this.view.setLinkActiveStateByWord(recognitionResult);
    this.view.addStar();
    this.view.playCorrectSound();

    if (this.guessedList.length !== MAX_WORDS_COUNT) return;
    this.view.playSuccessSound();
    this.onResultButtonClick();
    this.onStopButtonClick();
  }

  onStopButtonClick() {
    if (!this.isGameStarts) return;

    this.model.saveResults(this.guessedList);

    this.recognition.abort();
    this.recognition.onresult = null;
    this.recognition.onend = null;
    this.recognition = null;
    this.isGameStarts = false;
    this.view.toggleGameButtonState();

    this.view.clearStatusBar();
    this.view.renderPicture();
    this.guessedList = [];
    this.view.renderSpeechInput();
    this.view.removeActiveStates();
  }

  onDifficultChange(event) {
    const button = event.target;
    if (!isButtonClicked(event)) return;

    this.view.removeActiveStates(ELEMENTS.BUTTONS.DIFFICULTIES);
    button.classList.add(CLASS_NAMES.ACTIVE);

    const newDifficult = +button.innerText - 1;
    if (newDifficult === this.difficult) return;
    showSpinner();
    this.newGame(newDifficult);
  }

  onNewButtonClick() {
    showSpinner();
    this.newGame(this.difficult);
  }

  onResultsNewGameButtonClick() {
    togglePageState(CLASS_NAMES.RESULT.PAGE);
    this.view.resultList.remove();

    this.onNewButtonClick();
  }

  onResultsResumeGameButtonClick() {
    togglePageState(CLASS_NAMES.RESULT.PAGE);
    this.view.resultList.remove();

    if (this.recognition) this.recognition.start();
  }

  onResultButtonClick() {
    togglePageState(CLASS_NAMES.RESULT.PAGE);

    this.view.renderResultsList(
      this.model.pageData,
      [{
        event: EVENTS.CLICK,
        handler: this.onResultCardClick,
      }],
      this.model.translationsMap,
      this.guessedList,
      this.model.results,
    );

    if (this.recognition) this.recognition.abort();
  }

  onResultCardClick(event) {
    const selectedCard = getClosestLink(event);
    if (!selectedCard) return;
    event.preventDefault();

    this.view.resetResultsLinksStates(selectedCard);

    const audioSrc = selectedCard.dataset.audio;
    const audio = new Audio(`${DATA_PATH}${audioSrc}`);
    audio.play();
  }

  beforeUnloadHandler() {
    if (this.isGameStarts) this.model.saveResults(this.guessedList);
    window.removeEventListener(EVENTS.BEFORE_UNLOAD, this.beforeUnloadHandler);
  }

  onIntroButtonClick({ target }) {
    ELEMENTS.INTRODUCTION.classList.add(CLASS_NAMES.HIDDEN);
    ELEMENTS.SPINNER.classList.remove(CLASS_NAMES.HIDDEN);
    ELEMENTS.CENTRALIZER.classList.remove(CLASS_NAMES.HIDDEN);
    toggleDocumentScroll();
    this.newGame();
    target.removeEventListener(EVENTS.CLICK, this.onIntroButtonClick);
  }

  init() {
    initIntroButton(this.onIntroButtonClick);

    this.view.initGameButton(this.onGameButtonClick);
    this.view.initSpeechInput(this.onChangeSpeechInput);
    this.view.initStopButton(this.onStopButtonClick);
    this.view.initDifficulties(this.onDifficultChange);
    this.view.initNewButton(this.onNewButtonClick);
    this.view.initResultButton(this.onResultButtonClick);
    this.view.initResultsNewGameButton(this.onResultsNewGameButtonClick);
    this.view.initResultsResumeGameButton(this.onResultsResumeGameButtonClick);

    window.addEventListener(EVENTS.BEFORE_UNLOAD, this.beforeUnloadHandler);
  }
}
