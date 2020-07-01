import GameSprint from './game';
// import { ErrorPopup } from '../../error/error.error_popup';

const game = new GameSprint();

export default class Select {
  constructor() {
    this.currentLevel = null;
    this.currentRound = null;
    this.levelGetData = null;
  }

  onLevelChangeHandler() {
    this.select.addEventListener('change', () => {
      this.currentLevel = this.select.selectedIndex;
      if (!this.currentLevel === 0) {
        // console.log('figji');
      }
    });
  }

  init() {
    this.select = document.querySelector('#selector');
    this.onLevelChangeHandler();
    // this.onRoundChangeHandler();
  }
}
