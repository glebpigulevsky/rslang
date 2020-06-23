import view from '../view/view';
import model from '../model/model';

import getCanvasElementsCollection from '../../common/english-puzzle.puzzle.utils';

import {
  showSpinner,
  hideSpinner,
} from '../../common/english-puzzle.utils';

class GameController {
  constructor() {
    this.currentLevel = null;
    this.currentRound = null;
    this.maxRoundInLevel = null;

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
  }

  setCurrentLevel(level) {
    this.currentLevel = level % 6;
  }

  setCurrentRound(round = 0) {
    if (round >= this.maxRoundInLevel) {
      this.setCurrentLevel(this.currentLevel + 1);
      this.currentRound = 0;

      if (view.menu.ELEMENTS.SELECTORS.LEVEL) {
        view.menu.ELEMENTS.SELECTORS.LEVEL.remove();
        view.menu.renderLevelSelector(this.currentLevel);
      }

      if (view.menu.ELEMENTS.SELECTORS.ROUND) {
        view.menu.ELEMENTS.SELECTORS.ROUND.remove();
        view.menu.renderRoundSelector(this.maxRoundInLevel, this.currentRound, this.completedRoundsByLevels[this.currentLevel]);
      }

      return;
    }

    this.currentRound = round;
  }

  async onLevelChangeHandler(evt) {
    this.setCurrentLevel(+evt.target.value);
    this.setCurrentRound();

    showSpinner(); //* кандидаты в отдельную функцию
    this.maxRoundInLevel = await model.fetchMaxPagesInDifficultCategory(this.currentLevel);
    // this.maxRoundInLevel = 40; // todo заглушка без интернета
    view.menu.ELEMENTS.SELECTORS.ROUND.remove(); //*
    this.setCurrentRound(0);
    view.menu.renderRoundSelector(this.maxRoundInLevel, this.currentRound, this.completedRoundsByLevels[this.currentLevel]); //*
    this.newRound(this.currentLevel, this.currentRound); //*
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
    view.clearImageDescription();

    view.clearGameField();
    view.clearDropZones();

    view.showIDontKnowButton();
    view.hideCheckButton();
    view.hideContinueButton();
    view.hideResultButton();
    this.isPictureShown = false;

    // try {
    this.fetchedRoundData = await model.fetchCardsPage(currentLevel, currentRound);
    // } catch (err) {
    // this.fetchedRoundData = JSON.parse(localStorage.getItem('data')); // todo заглушка без интернета
    // }
    localStorage.setItem('data', JSON.stringify(this.fetchedRoundData));

    const sentences = this.fetchedRoundData.map((wordData) => wordData.textExample);

    // const sentences = [ // todo заглушка без интернета
    //   'The students agree they have too much homework every day',
    //   'I a`m going to study',
    //   'It is difficult situation for me',
    //   'The are a lot of interesting things',
    //   'We are going to do it together',
    //   'It is very hot summer',
    //   'This situation is not very good',
    //   'Every morning he does his physical exercises',
    //   'It is nine sentence',
    //   'First level and first round',
    // ];

    this.fetchedPictureData = model.getCurrentPictureDescription(currentLevel, currentRound);
    // this.fetchedPictureData = {}; // todo заглушка без интернет
    this.fetchedPictureData.preloadedPicture = await model.getPreloadedCurrentPicture(currentLevel, currentRound);
    this.windowSize = document.documentElement.clientWidth;
    // if (isSmallWindow) this.fetchedPictureData.preloadedPicture.width = 768;
    const widthGap = (this.windowSize >= 768) ? 10 : 0;
    this.canvasElements = getCanvasElementsCollection(this.fetchedPictureData.preloadedPicture, sentences, this.windowSize);

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

    if (view.menu.ELEMENTS.SELECTORS.ROUND) view.menu.ELEMENTS.SELECTORS.ROUND.remove(); //*
    view.menu.renderRoundSelector(this.maxRoundInLevel, this.currentRound, this.completedRoundsByLevels[this.currentLevel]);

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

    if (this.currentSentence === 9) {
      if (!this.isPictureShown) {
        if (!this.completedRoundsByLevels[this.currentLevel].includes(this.currentRound)) this.completedRoundsByLevels[this.currentLevel].push(this.currentRound);
        // todo тут надо записывать на бек пройденный раунд
        view.menu.ELEMENTS.SELECTORS.ROUND.remove(); //* кандидаты на отдельную функцию
        view.menu.renderRoundSelector(this.maxRoundInLevel, this.currentRound, this.completedRoundsByLevels[[this.currentLevel]]);

        const completedRoundsData = {
          completedRoundsByLevels: this.completedRoundsByLevels,
          lastLevelWithLastCompletedRound: this.currentLevel,
          lastCompletedRound: this.currentRound,
        };
        localStorage.setItem('completedRoundsData', JSON.stringify(completedRoundsData));

        this.lastGameFinalTime = new Date().toLocaleString();
        model.saveResults(model.errorsList, this.lastGameFinalTime);

        view.resultDropZone.classList.remove('drop-place');
        view.dataDropZone.remove();

        this.isPictureShown = true;

        if (this.windowSize >= 768) {
          view.clearSentencesBackground();
          view.showPicture(this.canvasElements.finalImage.flat(Infinity));
          view.showImageDescription(`Author: ${this.fetchedPictureData.author.replace(',', ' ')}, Name: ${this.fetchedPictureData.name}, Date: ${this.fetchedPictureData.year}`);
        }
        view.showResultButton();
        view.hideTranslation();
        return;
      }

      view.hidePicture();
      view.clearImageDescription();
      this.isPictureShown = false;
      this.setCurrentRound(this.currentRound + 1);
      this.newRound(this.currentLevel, this.currentRound);
      return;
    }

    view.hideResultButton();
    view.showIDontKnowButton();
    view.hideContinueButton();
    this.currentSentence += 1;
    if (this.windowSize < 768) {
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

  loadCompletedRoundsByLevels() {
    return JSON.parse(localStorage.getItem('completedRoundsData'));
  }

  async init(startLevel = 0, startRound = 0) {
    this.hints.isBgImage = false; // todo берем из бека или локал сторейдж все эти стейты
    this.hints.isTranslationEnabled = false;
    this.hints.isSpellingEnabled = false;
    this.hints.isAutoSpellingEnabled = false;

    view.initMenu(this.onLevelChangeHandlerBinded, this.onRoundChangeHandlerBinded);

    const completedRoundsData = this.loadCompletedRoundsByLevels();
    this.completedRoundsByLevels = (completedRoundsData && completedRoundsData.completedRoundsByLevels) || new Array(6).fill('').map(() => []);

    showSpinner(); //* кандидаты в отдельную функцию
    // try {
    this.setCurrentLevel((completedRoundsData && completedRoundsData.lastLevelWithLastCompletedRound) || startLevel);
    this.maxRoundInLevel = await model.fetchMaxPagesInDifficultCategory(this.currentLevel);
    // } catch (err) {
    // this.maxRoundInLevel = 40; // todo заглушка без Интернета
    // }
    this.setCurrentRound((completedRoundsData && completedRoundsData.lastCompletedRound + 1) || startRound);
    view.menu.renderLevelSelector(this.currentLevel);
    // view.menu.renderRoundSelector(this.maxRoundInLevel, this.currentRound, this.completedRoundsByLevels[this.currentLevel]);
    this.newRound(this.currentLevel, this.currentRound);
  }
}

export default new GameController();
