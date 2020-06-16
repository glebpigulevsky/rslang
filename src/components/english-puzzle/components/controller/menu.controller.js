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

    this.onLevelChangeHandlerBinded = this.onLevelChangeHandler.bind(this);
    this.onRoundChangeHandlerBinded = this.onRoundChangeHandler.bind(this);
  }

  setCurrentLevel(level) {
    this.currentLevel = level;
  }

  setCurrentRound(round = 0) {
    this.currentRound = round;
  }

  async onLevelChangeHandler(evt) {
    // const newLevel = view.menu.elements.selector.level.value;
    this.setCurrentLevel(evt.target.value);
    this.setCurrentRound();

    showSpinner(); //* кандидаты в отдельную функцию
    this.maxRoundInLevel = await model.fetchMaxPagesInDifficultCategory(this.currentLevel);
    view.menu.elements.selectors.round.remove(); //*
    view.menu.renderRoundSelector(this.maxRoundInLevel); //*
    this.newRound(this.currentLevel, this.currentRound); //*
  }

  onRoundChangeHandler(evt) {
    showSpinner();
    // const newLevel = view.menu.elements.selector.level.value;
    this.setCurrentRound(evt.target.value);
    console.log('New round: ', this.currentRound);
    this.newRound(this.currentLevel, this.currentRound);
  }

  async newRound(currentLevel, currentRound) {
    view.clearDropZones();

    // try {
      // this.fetchedRoundData = await model.fetchCardsPage(currentLevel, currentRound);
    // } catch (err) {
      this.fetchedRoundData = JSON.parse(localStorage.getItem('data'));
    // }
    // localStorage.setItem('data', JSON.stringify(this.fetchedRoundData));

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
    this.currentSentence += 1;
    if (this.currentSentence > 9) {
      view.clearGameField();
      this.setCurrentRound(this.currentRound + 1);
      this.newRound(this.currentLevel, this.currentRound);
      return;
    }

    view.renderNextResultDropZone();
    view.renderInputSentence(this.canvasElements[this.currentSentence].querySelectorAll('*'));
  }

  async init(startLevel = 0, startRound = 0) {
    view.initMenu(this.onLevelChangeHandlerBinded, this.onRoundChangeHandlerBinded);

    this.setCurrentLevel(startLevel);
    this.setCurrentRound(startRound);

    showSpinner(); //* кандидаты в отдельную функцию
    // try {
      // this.maxRoundInLevel = await model.fetchMaxPagesInDifficultCategory(this.currentLevel);
    // } catch (err) {
      this.maxRoundInLevel = 40;
    // }
    view.menu.renderRoundSelector(this.maxRoundInLevel);
    this.newRound(this.currentLevel, this.currentRound);
  }
}

export default new MenuController();
