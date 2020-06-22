import audioCallAppInit from '../audio-call/audio-call.app';
import Menu from './main_menu';
import { CLASS_NAMES } from '../../common/common.constants';
import MAIN_GREETINGS from './common/main.constants';


import './scss/main.styles.scss';
// import '../audio-call/scss/audio-call.css'


// audioCallAppInit(); //УДАЛИТЬ КАК ЗАКОНЧУ

const burgerMenu = new Menu();
burgerMenu.init();

class Main {
  constructor() {
    this.logoContent = null;
    this.logoElement = null;

    this.gameButtons = {
      audioCall: null,
    };

    this.onAudioCallButtonClickHandlerBinded = this.onAudioCallButtonClickHandler.bind(this);

  }

  onAudioCallButtonClickHandler() {
    this.gameButtons.audioCall.removeEventListener('click', this.onAudioCallButtonClickHandlerBinded);
    audioCallAppInit();
  }

  sayHello() {
    this.logoElement.textContent = this.logoContent;
  }

  init() {
    this.logoElement = document.querySelector(`.${CLASS_NAMES.MAIN.LOGO}`);
    this.logoContent = MAIN_GREETINGS;

    this.gameButtons.audioCall = document.querySelector('.audio-call-start');
    this.gameButtons.audioCall.addEventListener('click', this.onAudioCallButtonClickHandlerBinded);



  }
}

export default new Main();
