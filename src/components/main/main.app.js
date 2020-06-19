import englishPuzzleAppInit from '../english-puzzle/english-puzzle.app';
import menu from './components/menu/menu';

import './scss/main.styles.scss';

class Main {
  constructor() {
    this.gameButtons = {
      englishPuzzle: null,
    };

    this.onEnglishButtonClickHandlerBinded = this.onEnglishButtonClickHandler.bind(this);
  }

  onEnglishButtonClickHandler() {
    menu.removeBurgerIconClickHandler();
    menu.removeCloseButtonClickHandler();
    this.gameButtons.englishPuzzle.removeEventListener('click', this.onEnglishButtonClickHandlerBinded);
    englishPuzzleAppInit();
  }

  init() {
    menu.init();

    this.gameButtons.englishPuzzle = document.querySelector('.english-puzzle');
    this.gameButtons.englishPuzzle.addEventListener('click', this.onEnglishButtonClickHandlerBinded);
  }
}

export default new Main();
