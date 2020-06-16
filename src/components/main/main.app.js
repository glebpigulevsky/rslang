import { CLASS_NAMES } from '../../common/common.constants';
import { MAIN_GREETINGS, GAME_BLOCK, TEMPLATE_MAIN_GAME } from './common/main.constants';

import './scss/main.styles.scss';

class Main {
  constructor() {
    this.logoContent = null;
    this.logoElement = null;

    this.gameButtons = {
      englishPuzzle: null,
    };
  }

  sayHello() {
    this.logoElement.textContent = this.logoContent;
  }

  addMdStartScreen() {
    GAME_BLOCK.innerHTML = '';
    GAME_BLOCK.append(TEMPLATE_MAIN_GAME.content.cloneNode(true));
  }

  init() {
    this.logoElement = document.querySelector(`.${CLASS_NAMES.MAIN.LOGO}`);
    this.logoContent = MAIN_GREETINGS;
    this.addMdStartScreen();
  }
}

export default new Main();
