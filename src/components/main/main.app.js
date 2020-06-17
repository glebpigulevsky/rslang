import { CLASS_NAMES } from '../../common/common.constants';
import { MAIN_GREETINGS, GAME_BLOCK, TEMPLATE_MAIN_GAMEINTRO } from './common/main.constants';
import game from './components/mainGame/mainGame';

import './scss/main.styles.scss';

class Main {
  constructor() {
    this.logoContent = null;
    this.logoElement = null;

    this.gameButtons = {
      englishPuzzle: null,
      mainGameStart: null,
    };
    this.onMainGameStartClickHandlerBinded = this.onMainGameStartClickHandler.bind(this);
  }

  addMdStartScreen() {
    GAME_BLOCK.innerHTML = '';
    GAME_BLOCK.append(TEMPLATE_MAIN_GAMEINTRO.content.cloneNode(true));
    this.initMainGame();
    game.init();
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
