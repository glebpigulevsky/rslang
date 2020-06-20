import { CLASS_NAMES } from '../../common/common.constants';
import { SPEAKIT_CLASS_NAMES, SPEAKIT_GREETINGS } from './common/speakit.constants';

import './scss/speakit.styles.scss';

class SpeakIt {
  constructor() {
    this.logo = null;
  }

  sayHello() {
    const speakItLogo = document.createElement('h2');
    speakItLogo.className = SPEAKIT_CLASS_NAMES.LOGO;
    speakItLogo.textContent = this.logo;

    document.querySelector(`.${CLASS_NAMES.MAIN.LOGO}`).after(speakItLogo);
  }

  init() {
    this.logo = SPEAKIT_GREETINGS;
  }
}

export default new SpeakIt();
