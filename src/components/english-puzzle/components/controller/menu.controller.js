import model from '../model/model';
import view from '../view/view';

import createCanvasElements from '../../common/english-puzzle.utils';

import image from '../../assets/img/9th_wave.jpg';

import {
  showSpinner,
  hideSpinner,
} from '../data/utils';

class MenuController {
  constructor() {
    this.currentLevel = null;
    this.currentRound = null;
    this.maxRoundInLevel = null;

    this.currentSentence = null;
    this.isPictureShown = null;

    this.completedRoundsByLevels = [];

    this.onLevelChangeHandlerBinded = this.onLevelChangeHandler.bind(this);
    this.onRoundChangeHandlerBinded = this.onRoundChangeHandler.bind(this);
  }

  setCurrentLevel(level) {
    this.currentLevel = level < 5 ? level : 0;
  }

  setCurrentRound(round = 0) {
    if (round > this.maxRoundInLevel) {
      this.setCurrentLevel(this.currentLevel + 1);
      this.currentRound = 0;
      return;
    }

    this.currentRound = round;
  }

  async onLevelChangeHandler(evt) {
    // const newLevel = view.menu.elements.selector.level.value;
    this.setCurrentLevel(+evt.target.value);
    this.setCurrentRound();

    showSpinner(); //* кандидаты в отдельную функцию
    this.maxRoundInLevel = await model.fetchMaxPagesInDifficultCategory(this.currentLevel);
    view.menu.elements.selectors.round.remove(); //*
    view.menu.renderRoundSelector(this.maxRoundInLevel, this.completedRoundsByLevels[this.currentLevel]); //*
    this.newRound(this.currentLevel, this.currentRound); //*
  }

  onRoundChangeHandler(evt) {
    showSpinner();
    // const newLevel = view.menu.elements.selector.level.value;
    this.setCurrentRound(+evt.target.value);
    console.log('New round: ', this.currentRound);
    this.newRound(this.currentLevel, this.currentRound);
  }

  async newRound(currentLevel, currentRound) {
    view.hidePicture();
    view.clearGameField();
    view.clearDropZones();

    view.showIDontKnowButton();
    view.hideCheckButton();
    view.hideContinueButton();

    // try {
    this.fetchedRoundData = await model.fetchCardsPage(currentLevel, currentRound);
    // } catch (err) {
    // this.fetchedRoundData = JSON.parse(localStorage.getItem('data'));
    // }
    localStorage.setItem('data', JSON.stringify(this.fetchedRoundData));

    const sentences = this.fetchedRoundData.map((wordData) => wordData.textExample);

    this.canvasElements = await createCanvasElements({
      src: image,
      wordsList: sentences,
    });

    this.currentSentence = 0;
    // view.renderInputSentence(this.fetchedRoundData[this.currentSentence].textExample);
    view.renderInputSentence(this.canvasElements[this.currentSentence].querySelectorAll('*'));
    hideSpinner();
  }

  nextRound() {
    view.resetPuzzlesStates(this.currentSentence);
    view.hideCheckButton();

    if (this.currentSentence === 9) {
      view.clearGameField();
      if (!this.isPictureShown) {
        if (!this.completedRoundsByLevels[this.currentLevel].includes(this.currentRound)) this.completedRoundsByLevels[this.currentLevel].push(this.currentRound);
        // todo тут надо записывать на бек пройденный раунд
        view.menu.elements.selectors.round.remove(); //* кандидаты на отдельную функцию
        view.menu.renderRoundSelector(this.maxRoundInLevel, this.currentRound, this.completedRoundsByLevels[[this.currentLevel]]);

        const completedRoundsData = {
          completedRoundsByLevels: this.completedRoundsByLevels,
          lastLevelWithLastCompletedRound: this.currentLevel,
          lastCompletedRound: this.currentRound,
        };
        localStorage.setItem('completedRoundsData', JSON.stringify(completedRoundsData));

        this.isPictureShown = true;
        view.showPicture();
        return;
      }

      view.hidePicture();
      this.isPictureShown = false;
      this.setCurrentRound(this.currentRound + 1);
      this.newRound(this.currentLevel, this.currentRound);
      return;
    }

    view.showIDontKnowButton();
    view.hideContinueButton();
    this.currentSentence += 1;
    view.renderNextResultDropZone();
    view.renderInputSentence(this.canvasElements[this.currentSentence].querySelectorAll('*'));
  }

  loadCompletedRoundsByLevels() {
    return JSON.parse(localStorage.getItem('completedRoundsData'));
  }

  async init(startLevel = 0, startRound = 0) {
    view.initMenu(this.onLevelChangeHandlerBinded, this.onRoundChangeHandlerBinded);

    const completedRoundsData = this.loadCompletedRoundsByLevels();
    this.completedRoundsByLevels = (completedRoundsData && completedRoundsData.completedRoundsByLevels) || new Array(6).fill('').map(() => []);

    showSpinner(); //* кандидаты в отдельную функцию
    // try {
    this.setCurrentLevel((completedRoundsData && completedRoundsData.lastLevelWithLastCompletedRound) || startLevel);
    this.maxRoundInLevel = await model.fetchMaxPagesInDifficultCategory(this.currentLevel);
    this.setCurrentRound((completedRoundsData && completedRoundsData.lastCompletedRound + 1) || startRound);
    // } catch (err) {
    // this.maxRoundInLevel = 40;
    // }

    view.menu.renderLevelSelector(this.currentLevel);
    view.menu.renderRoundSelector(this.maxRoundInLevel, this.currentRound, this.completedRoundsByLevels[this.currentLevel]);
    this.newRound(this.currentLevel, this.currentRound);
  }
}

export default new MenuController();
