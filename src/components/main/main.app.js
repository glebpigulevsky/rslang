// import englishPuzzleRender from '../english-puzzle/english-puzzle.render';
import englishPuzzleAppInit from '../english-puzzle/english-puzzle.app';

import Menu from './main_menu';
import { CLASS_NAMES } from '../../common/common.constants';
import MAIN_GREETINGS from './common/main.constants';

import './scss/main.styles.scss';

const burgerMenu = new Menu();
burgerMenu.init();

class Main {
  constructor() {
    this.logoContent = null;
    this.logoElement = null;

    this.gameButtons = {
      englishPuzzle: null,
      audioCall: null,
    };

    this.onEnglishButtonClickHandlerBinded = this.onEnglishButtonClickHandler.bind(this);
  }

  sayHello() {
    this.logoElement.textContent = this.logoContent;
  }

  onEnglishButtonClickHandler() {
    this.gameButtons.englishPuzzle.removeEventListener('click', this.onEnglishButtonClickHandlerBinded);
    englishPuzzleAppInit();
  }

  init() {
    this.logoElement = document.querySelector(`.${CLASS_NAMES.MAIN.LOGO}`);

    this.gameButtons.englishPuzzle = document.querySelector('.english-puzzle');
    this.gameButtons.englishPuzzle.addEventListener('click', this.onEnglishButtonClickHandlerBinded);

    this.logoContent = MAIN_GREETINGS;
  }
}

export default new Main();
