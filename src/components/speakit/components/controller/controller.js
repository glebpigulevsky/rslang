import model from '../model/model';
import view from '../view/view';

import { ErrorPopup } from '../../../error/error.error_popup';

import {
  toggleDocumentScroll,
  getClosestLink,
  togglePageState,
} from '../../common/speakit.utils';

import {
  LANGUAGE,
  MAX_WORDS_IN_ROUND,
  MAX_LEVELS_COUNT,
  MAX_ROUNDS_COUNT,
  EVENTS,
  CLASS_NAMES,
  SLIDER_ITEM_CHANGE_DELAY,
  FIRST_SLIDER_ITEM_INDEX,
  DEFAULT_START_LEVEL,
  DEFAULT_START_ROUND,
  EMPTY,
} from '../../common/speakit.constants';

class Controller {
  constructor() {
    this.recognition = EMPTY;
    this.guessedList = EMPTY;
    this.isGameStarts = false;

    this.currentLevel = EMPTY;
    this.currentRound = EMPTY;
    this.roundFetchedData = EMPTY;
    this.completedRoundsByLevels = EMPTY;

    this.onPageCardClick = this.onPageCardClick.bind(this);
    this.onIntroButtonClick = this.onIntroButtonClick.bind(this);
    this.onGameButtonClick = this.onGameButtonClick.bind(this);
    this.onChangeSpeechInput = this.onChangeSpeechInput.bind(this);
    this.onStopButtonClick = this.onStopButtonClick.bind(this);
    this.onNewButtonClick = this.onNewButtonClick.bind(this);

    this.onResultButtonClick = this.onResultButtonClick.bind(this);
    this.onResultCardClick = this.onResultCardClick.bind(this);
    this.onResultsNewGameButtonClick = this.onResultsNewGameButtonClick.bind(this);
    this.onResultsResumeGameButtonClick = this.onResultsResumeGameButtonClick.bind(this);
    this.onResultsLongStatisticButtonClick = this.onResultsLongStatisticButtonClick.bind(this);

    this.onLevelChangeHandler = this.onLevelChangeHandler.bind(this);
    this.onRoundChangeHandler = this.onRoundChangeHandler.bind(this);

    this.beforeUnloadHandler = this.beforeUnloadHandler.bind(this);
  }

  setCurrentLevel(level) {
    this.currentLevel = level % MAX_LEVELS_COUNT;
  }

  setCurrentRound(round = 0) {
    if (round >= MAX_ROUNDS_COUNT) {
      this.setCurrentLevel(this.currentLevel + 1);
      this.currentRound = 0;

      if (view.menu && view.menu.elements.selectors.level) {
        view.menu.elements.selectors.level.remove();
        view.menu.renderLevelSelector(this.currentLevel);
      }
    } else {
      this.currentRound = round;
    }

    if (view.menu && view.menu.elements.selectors.round) {
      view.menu.elements.selectors.round.remove();
      view.menu.renderRoundSelector(
        MAX_ROUNDS_COUNT,
        this.currentRound,
        this.completedRoundsByLevels[this.currentLevel],
      );
    }
  }

  addPageList() {
    view.renderPageList(model.pageData, [{
      event: EVENTS.CLICK,
      handler: this.onPageCardClick,
    }]);
  }

  newGame() {
    this.onStopButtonClick();
    this.guessedList = [];
    this.newPage();
    view.clearStatusBar();
    view.renderPicture();
    view.renderTranslation();
    view.renderSpeechInput();
  }

  async newPage() {
    this.roundFetchedData = await model.fetchCardsPage(this.currentLevel, this.currentRound)
      .catch((error) => {
        view.spinner.hide();
        new ErrorPopup().openPopup({ text: error.message });
        return null;
      });
    if (!this.roundFetchedData) return;

    if (view.currentList) view.removeCurrentList();
    model.parseCardsPage(this.roundFetchedData);
    this.addPageList();
    view.spinner.hide();
  }

  onPageCardClick(event) {
    const selectedCard = getClosestLink(event);
    if (!selectedCard) return;
    event.preventDefault();

    if (this.isGameStarts) return;
    view.resetLinksStates(selectedCard);

    view.renderTranslation(selectedCard.dataset.translation);

    const imageSrc = selectedCard.dataset.image;
    view.renderPicture(imageSrc);

    const audioSrc = selectedCard.dataset.audio;
    const audio = new Audio();
    audio.addEventListener(EVENTS.ERROR, view.onErrorSpellingHandler);
    audio.src = audioSrc;
    audio.play();
  }

  onGameButtonClick() {
    if (!this.roundFetchedData) return;
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

    view.renderTranslation(model.getTranslationByWord(recognitionResult));

    this.guessedList.push(recognitionResult);
    view.setLinkActiveStateByWord(recognitionResult);
    view.addStar();
    view.playCorrectSound();

    if (this.guessedList.length !== MAX_WORDS_IN_ROUND) return;

    if (!this.completedRoundsByLevels[this.currentLevel].includes(this.currentRound)) {
      this.completedRoundsByLevels[this.currentLevel].push(this.currentRound);
    }

    if (view.menu.elements.selectors.round) view.menu.elements.selectors.round.remove();

    view.menu.renderRoundSelector(
      MAX_ROUNDS_COUNT,
      this.currentRound,
      this.completedRoundsByLevels[[this.currentLevel]],
    );

    const completedRoundsData = {
      completedRoundsByLevels: this.completedRoundsByLevels,
      lastLevelWithLastCompletedRound: this.currentLevel,
      lastCompletedRound: this.currentRound,
    };
    model.saveCompletedRounds(completedRoundsData);

    view.playSuccessSound();
    this.onStopButtonClick();
    this.onResultButtonClick();
    view.swiper.slideTo(view.swiper.slides.length - 1, SLIDER_ITEM_CHANGE_DELAY);
  }

  onStopButtonClick() {
    if (!this.isGameStarts) return;
    if (!this.roundFetchedData) return;

    model.saveCurrentResults(this.guessedList);

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

  onNewButtonClick() {
    view.spinner.show();
    this.newGame();
  }

  onResultsNewGameButtonClick() {
    togglePageState(CLASS_NAMES.RESULT.PAGE);
    view.resultList.remove();
    view.resultsContainer.classList.remove(CLASS_NAMES.RESULT.LONG_STATISTIC);

    this.setCurrentRound(this.currentRound + 1);
    this.onNewButtonClick();
  }

  onResultsResumeGameButtonClick() {
    togglePageState(CLASS_NAMES.RESULT.PAGE);
    view.resultList.remove();
    view.resultsContainer.classList.remove(CLASS_NAMES.RESULT.LONG_STATISTIC);

    if (this.recognition) this.recognition.start();
  }

  onResultsLongStatisticButtonClick() {
    view.resultsContainer.classList.toggle(CLASS_NAMES.RESULT.LONG_STATISTIC);
  }

  onResultButtonClick() {
    togglePageState(CLASS_NAMES.RESULT.PAGE);

    view.renderResultsList(
      model.pageData,
      [{
        event: EVENTS.CLICK,
        handler: this.onResultCardClick,
      }],
      this.guessedList,
      model.currentResults,
      model.longResults,
    );
    view.swiper.slideTo(FIRST_SLIDER_ITEM_INDEX, SLIDER_ITEM_CHANGE_DELAY);

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

  onIntroButtonClick({ target }) {
    view.introduction.classList.add(CLASS_NAMES.HIDDEN);
    view.spinner.show();
    view.centralizer.classList.remove(CLASS_NAMES.HIDDEN);
    toggleDocumentScroll();
    this.newGame();
    target.removeEventListener(EVENTS.CLICK, this.onIntroButtonClick);
  }

  onLevelChangeHandler(evt) {
    this.setCurrentLevel(+evt.target.value);
    this.setCurrentRound();

    view.spinner.show();

    if (view.menu.elements.selectors.round) view.menu.elements.selectors.round.remove();
    view.menu.renderRoundSelector(
      MAX_ROUNDS_COUNT,
      this.currentRound,
      this.completedRoundsByLevels[this.currentLevel],
    );
    this.newGame();
  }

  onRoundChangeHandler(evt) {
    view.spinner.show();
    this.setCurrentRound(+evt.target.value);
    this.newGame();
  }

  beforeUnloadHandler() {
    if (this.isGameStarts) model.saveCurrentResults(this.guessedList);
    if (view.menu.elements.selectors.level) view.menu.elements.selectors.level.remove();
    if (view.menu.elements.selectors.round) view.menu.elements.selectors.round.remove();
    window.removeEventListener(EVENTS.BEFORE_UNLOAD, this.beforeUnloadHandler);
  }

  init(startLevel = DEFAULT_START_LEVEL, startRound = DEFAULT_START_ROUND) {
    view.initIntroButton(this.onIntroButtonClick);

    const completedRoundsData = model.loadCompletedRounds();
    this.completedRoundsByLevels = (completedRoundsData
      && completedRoundsData.completedRoundsByLevels)
      || new Array(MAX_LEVELS_COUNT).fill('').map(() => []);

    this.setCurrentLevel((completedRoundsData
      && completedRoundsData.lastLevelWithLastCompletedRound)
      || startLevel);
    this.setCurrentRound((completedRoundsData && completedRoundsData.lastCompletedRound + 1)
      || startRound);

    view.initMenu(this.onLevelChangeHandler, this.onRoundChangeHandler);

    if (view.menu.elements.selectors.level) {
      view.menu.elements.selectors.level.remove();
    }
    view.menu.renderLevelSelector(this.currentLevel);

    if (view.menu.elements.selectors.round) {
      view.menu.elements.selectors.round.remove();
    }
    view.menu.renderRoundSelector(
      MAX_ROUNDS_COUNT,
      this.currentRound,
      this.completedRoundsByLevels[this.currentLevel],
    );

    view.initGameButton(this.onGameButtonClick);
    view.initSpeechInput(this.onChangeSpeechInput);
    view.initStopButton(this.onStopButtonClick);
    view.initNewButton(this.onNewButtonClick);
    view.initResultButton(this.onResultButtonClick);
    view.initResultsNewGameButton(this.onResultsNewGameButtonClick);
    view.initResultsResumeGameButton(this.onResultsResumeGameButtonClick);
    view.initResultsLongStatisticButton(this.onResultsLongStatisticButtonClick);

    window.addEventListener(EVENTS.BEFORE_UNLOAD, this.beforeUnloadHandler);
  }
}

export default new Controller();
