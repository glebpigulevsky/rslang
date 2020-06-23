import Menu from './main_menu';
import { CLASS_NAMES } from '../../common/common.constants';
import { MAIN_GREETINGS } from './common/main.constants';
import game from './components/mainGame/mainGame';
// убрать следующие 4 импорта при слиянии с промо пейдж
import { LocalStorageService } from '../../common/common.helper';
import { TOKEN_EXPIRES_MS } from '../../common/utils/common.utils.helper';
import ApiService from '../../services/common/services.common.api_service';
import UsersApi from '../../services/main/endpoints/services.main.endpoints.users';

import introMainGame from './components/introMainGame/introMainGame';

import './scss/main.styles.scss';

const burgerMenu = new Menu();
burgerMenu.init();

const service = new LocalStorageService();
//const settings = new SettingsApi();
const user = new UsersApi();

const userEnter = {
  email: 'pigulevsky.gleb@gmail.com',
  password: 'Carver2017?',
};

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

  async init() {
    this.logoElement = document.querySelector(`.${CLASS_NAMES.MAIN.LOGO}`);
    this.logoContent = MAIN_GREETINGS;
    // 7 следующих строк перенести в логин
    const auth = await user.authenticateUser({
      email: userEnter.email,
      password: userEnter.password,
    });
    const userToken = auth.token;
    const id = auth.userId;
    service.keyUserInfo = 'userInfo_TEST';
    service.setUserInfo({ userId: id, token: userToken, expiredTime: TOKEN_EXPIRES_MS() });
    this.addMdStartScreen();
  }

  initMainGame() {
    this.gameButtons.mainGameStart = document.querySelector('.main__game-start__button');
    this.gameButtons.mainGameStart.addEventListener('click', this.onMainGameStartClickHandlerBinded);
  }
}

export default new Main();
