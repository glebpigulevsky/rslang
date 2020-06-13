import someComponent from './components/some_component/some_component';

import { CLASS_NAMES } from '../../common/common.constants';
import MAIN_GREETINGS from './common/main.constants';

import './scss/main.styles.scss';

class Main {
  constructor() {
    this.logoContent = null;
    this.logoElement = null;
  }

  sayHello() {
    console.log(this.logoContent);

    this.logoElement.textContent = this.logoContent;
  }

  init() {
    this.logoElement = document.querySelector(`.${CLASS_NAMES.MAIN.LOGO}`);
    this.logoContent = MAIN_GREETINGS;
  }
}

export default new Main();
