import { CLASS_NAMES } from '../../common/common.constants';
import MAIN_GREETINGS from './common/main.constants';

import './scss/main.styles.scss';

class Main {
  constructor() {
    this.logoContent = null;
    this.logoElement = null;
  }

  sayHello() {
    this.logoElement.textContent = this.logoContent;
  }

  init() {
    this.logoElement = document.querySelector(`.${CLASS_NAMES.MAIN.LOGO}`);
    this.logoContent = MAIN_GREETINGS;
  }
}

export default new Main();

const toggleButton = document.querySelector('.hamburger-menu__button');
const navBar = document.querySelector('.main-header__navigation');
toggleButton.addEventListener('click', () => {
  navBar.classList.toggle('toggle');
});
