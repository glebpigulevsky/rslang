import model from '../model/model';
import view from '../view/view';

import {
  showSpinner,
  hideSpinner,
} from '../data/utils';

class MenuController {
  constructor() {
    this.currentLevel = null;
    this.currentRound = null;
    this.maxRoundInLevel = null;

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
    showSpinner();
    // const newLevel = view.menu.elements.select.level.value;
    this.setCurrentLevel(evt.target.value);
    this.setCurrentRound();

    this.maxRoundInLevel = await model.fetchMaxPagesInDifficultCategory(this.currentLevel);
    view.menu.elements.select.round.remove();
    view.menu.renderRoundSelect(this.maxRoundInLevel);
    this.newRound(this.currentLevel, this.currentRound);
  }

  async newRound(currentLevel, currentRound) {
    this.fetchedRoundData = await model.fetchCardsPage(currentLevel, currentRound);
    view.clearDropZones();
    this.currentSentence = 0;
    view.renderInputSentence(this.fetchedRoundData[this.currentSentence].textExample);
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
    view.renderInputSentence(this.fetchedRoundData[this.currentSentence].textExample);
  }

  onRoundChangeHandler(evt) {
    showSpinner();
    // const newLevel = view.menu.elements.select.level.value;
    this.setCurrentRound(evt.target.value);
    console.log('New round: ', this.currentRound);
    this.newRound(this.currentLevel, this.currentRound);
  }

  async init(startLevel = 0, startRound = 0) {
    view.initMenu(this.onLevelChangeHandlerBinded, this.onRoundChangeHandlerBinded);

    this.setCurrentLevel(startLevel);
    this.setCurrentRound(startRound);

    showSpinner();
    this.maxRoundInLevel = await model.fetchMaxPagesInDifficultCategory(this.currentLevel);
    view.menu.renderRoundSelect(this.maxRoundInLevel);
    this.newRound(this.currentLevel, this.currentRound);
  }
}

export default new MenuController();
