// import dynamicRouting from './router';
import Menu from './main_menu';
import { CLASS_NAMES } from '../../common/common.constants';
import MAIN_GREETINGS from './common/main.constants';
import './scss/main.styles.scss';
import { mainPageComponent } from './pages/main-page.component';
import { learnPageComponent } from './pages/learn-page.component';
import { dictionaryPageComponent } from './pages/dictionary-page.component';
import { gamesPageComponent } from './pages/games-page.component';
import { statisticsPageComponent } from './pages/statistics-page.component';
import { teamPageComponent } from './pages/team-page.component';
import { settingsPageComponent } from './pages/settings-page.component';
import { errorPageComponent } from './pages/error-page.component';
// import { Router } from './router';

const appRoutes = [
  { path: '/', component: mainPageComponent },
  { path: '/learn', component: learnPageComponent },
  { path: '/dictionary', component: dictionaryPageComponent },
  { path: '/games', component: gamesPageComponent },
  { path: '/statistics', component: statisticsPageComponent },
  { path: '/team', component: teamPageComponent },
  { path: '/settings', component: settingsPageComponent },
];

// const routing = new Router(appRoutes);
// routing.initRouter();

const burgerMenu = new Menu();
burgerMenu.init();

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

const parseLocation = () => window.location.hash.slice(1).toLowerCase() || '/';

const findComponentByPath = (path) => appRoutes.find((r) => r.path.match(new RegExp(`^\\${path}$`, 'gm'))) || undefined;

const router = () => {
  const path = parseLocation();
  const { component = errorPageComponent } = findComponentByPath(path, appRoutes) || {};
  const main = document.querySelector('.main');
  main.innerHTML = component.render();
};

const initRouter = () => {
  window.addEventListener('hashchange', router);
  window.addEventListener('load', router);
};

initRouter();
