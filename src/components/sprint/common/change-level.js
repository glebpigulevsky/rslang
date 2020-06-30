// import game from './game'
import GameSprint from './game';

const game = new GameSprint();

export default class Select {
  constructor() {
    this.currentLevel = null;
    this.currentRound = null;
  }

  onLevelChangeHandler() {
    this.select.addEventListener('change', () => {
      console.log(this.select.selectedIndex);
    });
  }

  onRoundChangeHandler() {

  }

  init() {
    this.select = document.querySelector('#selector');
    this.onLevelChangeHandler();
    this.onRoundChangeHandler();
  }
}
