import menu from './menu';
import './scss/main.styles.scss';
import { mainPageComponent } from './pages/main-page.component';
import { learnPageComponent } from './pages/learn-page.component';
import { dictionaryPageComponent } from './pages/dictionary-page.component';
import { gamesPageComponent } from './pages/games-page.component';
import { statisticsPageComponent } from './pages/statistics-page.component';
import { teamPageComponent } from './pages/team-page.component';
import { settingsPageComponent } from './pages/settings-page.component';
import { errorPageComponent } from './pages/error-page.component';
import { AuthenticateUserService } from '../../common/common.helper';

const appRoutes = [
  { path: '/', component: mainPageComponent },
  { path: '/learn', component: learnPageComponent },
  { path: '/dictionary', component: dictionaryPageComponent },
  { path: '/games', component: gamesPageComponent },
  { path: '/statisticks', component: statisticsPageComponent },
  { path: '/team', component: teamPageComponent },
  { path: '/settings', component: settingsPageComponent },
];
const auth = new AuthenticateUserService();
class Main {
  init() {
    menu.init();
  }
}
export default new Main();
const parseLocation = () => window.location.hash.slice(1).toLowerCase() || '/';
const findComponentByPath = (path) => appRoutes.find((route) => route.path.match(new RegExp(`^\\${path}$`, 'gm'))) || undefined;

const router = () => {
  if (!auth.checkUserAccess() && window.location.hash !== '') {
    window.location.replace(`${window.location.origin}${window.location.pathname}#`);
  } else {
    const main = document.querySelector('.main');
    const path = parseLocation();
    const { component = errorPageComponent } = findComponentByPath(path) || {};
    main.innerHTML = component.render();
    if (auth.checkUserAccess()) {
      console.log(auth.checkUserAccess());
      document.querySelector('.main-header__navigation').style.display = 'flex';
      document.querySelector('.main-header__logout').style.display = 'block';
    }
  }
};

const initRouter = () => {
  window.addEventListener('hashchange', router);
  window.addEventListener('load', router);
};

initRouter();
