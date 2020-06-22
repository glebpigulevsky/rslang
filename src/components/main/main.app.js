import Menu from './main_menu';
import sprintGameInit from '../sprint/sprint.app';
import './scss/main.styles.scss';

const burgerMenu = new Menu();
// burgerMenu.init();

class Main {
  constructor() {
    this.gameButtons = {
      sprint: null,
    };
    this.onSprintButtonClickHandlerBinded = this.onSprintButtonClickHandler.bind(this);
  }

  onSprintButtonClickHandler() {
    burgerMenu.removeBurgerIconClickHandler();
    burgerMenu.removeBurgerIconClickHandler();
    this.gameButtons.sprint.removeEventListener('click', this.onSprintButtonClickHandlerBinded);
    sprintGameInit();
  }

  init() {
    burgerMenu.init();
    this.gameButtons.sprint = document.querySelector('.sprint-game');
    this.gameButtons.sprint.addEventListener('click', this.onSprintButtonClickHandlerBinded);
  }
}

export default new Main();
