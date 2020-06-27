import menu from './menu';
import { CLASS_NAMES } from '../../common/common.constants';
import { MAIN_GREETINGS } from './common/main.constants';
// import game from './components/mainGame/mainGame';
// убрать следующие 4 импорта при слиянии с промо пейдж
import { LocalStorageService } from '../../common/common.helper';
import { TOKEN_EXPIRES_MS } from '../../common/utils/common.utils.helper';
import UsersApi from '../../services/main/endpoints/services.main.endpoints.users';

import './scss/main.styles.scss';
import { mainPageComponent } from './pages/main-page.component';
import { learnPageComponent } from './pages/learn-page.component';
import { dictionaryPageComponent } from './pages/dictionary-page.component';
import { gamesPageComponent } from './pages/games-page.component';
import { statisticsPageComponent } from './pages/statistics-page.component';
import { teamPageComponent } from './pages/team-page.component';
import { settingsPageComponent } from './pages/settings-page.component';
import { errorPageComponent } from './pages/error-page.component';

const appRoutes = [
  { path: '/', component: mainPageComponent },
  { path: '/learn', component: learnPageComponent },
  { path: '/dictionary', component: dictionaryPageComponent },
  { path: '/games', component: gamesPageComponent },
  { path: '/statisticks', component: statisticsPageComponent },
  { path: '/team', component: teamPageComponent },
  { path: '/settings', component: settingsPageComponent },
];

const service = new LocalStorageService();
const user = new UsersApi();

const userEnter = { // когда будет сделан логин получить инфу из локал сторадж
  email: 'rslang68@ya.ru',
  password: 'Rslang61?',
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
  }

  async init() {
    menu.init();
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
  }
}

export default new Main();

const parseLocation = () => window.location.hash.slice(1).toLowerCase() || '/';
const findComponentByPath = (path) => appRoutes.find((route) => route.path.match(new RegExp(`^\\${path}$`, 'gm'))) || undefined;

const router = () => {
  const main = document.querySelector('.main');
  const path = parseLocation();
  const { component = errorPageComponent } = findComponentByPath(path) || {};
  main.innerHTML = component.render();
  if (component.init) component.init();
};

const initRouter = () => {
  window.addEventListener('hashchange', router);
  window.addEventListener('load', router);
};

initRouter();
