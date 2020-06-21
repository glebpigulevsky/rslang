import Menu from './main_menu';
import { CLASS_NAMES } from '../../common/common.constants';
import { MAIN_GREETINGS } from './common/main.constants';
import game from './components/mainGame/mainGame';

import introMainGame from './components/introMainGame/introMainGame';

import './scss/main.styles.scss';

const burgerMenu = new Menu();
burgerMenu.init();

class Main {
  constructor() {
    this.logoContent = null;
    this.logoElement = null;
    this.gameButtons = {
      englishPuzzle: null,
      mainGameStart: null,
      mainGameSettings: null,
    };
    this.onMainGameStartClickHandlerBinded = this.onMainGameStartClickHandler.bind(this);
  }

  addMdStartScreen() {
    introMainGame.init();
  }

  onMainGameStartClickHandler() {
    this.gameButtons.mainGameStart.removeEventListener('click', this.onMainGameStartClickHandlerBinded);
    game.init();
  }

  init() {
    this.logoElement = document.querySelector(`.${CLASS_NAMES.MAIN.LOGO}`);
    this.logoContent = MAIN_GREETINGS;
    this.addMdStartScreen();
  }

  initMainGame() {
    this.gameButtons.mainGameStart = document.querySelector('.main__game-start__button');
    this.gameButtons.mainGameStart.addEventListener('click', this.onMainGameStartClickHandlerBinded);
  }
}

export default new Main();
