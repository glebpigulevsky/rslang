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
import { speakItPageComponent } from './pages/speakit-page.component';
import { englishPuzzleComponent } from './pages/english-puzzle.component';
import { sprintComponent } from './pages/sprint-game.component';

class Main {
  init() {
    menu.init();
  }
}

const appRoutes = [
  { path: '/', component: mainPageComponent },
  { path: '/learn', component: learnPageComponent },
  { path: '/dictionary', component: dictionaryPageComponent },
  { path: '/games', component: gamesPageComponent },
  { path: '/statistics', component: statisticsPageComponent },
  { path: '/team', component: teamPageComponent },
  { path: '/settings', component: settingsPageComponent },
  { path: '/speakit', component: speakItPageComponent },
  { path: '/english-puzzle', component: englishPuzzleComponent },
  { path: '/sprint', component: sprintComponent },
];

const parseLocation = () => window.location.hash.slice(1).toLowerCase() || '/';
const findComponentByPath = (path) =>
  appRoutes.find((route) => route.path.match(new RegExp(`^\\${path}$`, 'gm'))) || undefined;

const router = () => {
  if (menu.hasAccessUser() || window.location.hash === '') {
    const main = document.querySelector('.main');
    const path = parseLocation();
    const { component = errorPageComponent } = findComponentByPath(path) || {};
    main.innerHTML = component.render();
    if (component.init) component.init();
  }
};

const initRouter = () => {
  window.addEventListener('hashchange', router);
  window.addEventListener('load', router);
};

initRouter();

const main = new Main();
export default main;
