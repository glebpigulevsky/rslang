// import GameSprint from './game';
// import { ErrorPopup } from '../../error/error.error_popup';

// const game = new GameSprint();
import Timer from './timer';

const timerJS = new Timer();

export default class Select {
  constructor() {
    this.currentLevel = null;
    this.currentRound = null;
    this.levelGetData = null;
  }

  onLevelChangeHandler() {
    this.select.addEventListener('change', () => {
      this.currentLevel = this.select.selectedIndex;
      if (!this.currentLevel == 0) {
        timerJS.stopTime();
        // timerJS.startTimer();
      }
    });
  }

  init() {
    this.select = document.querySelector('#selector');
    this.onLevelChangeHandler();
  }
}
