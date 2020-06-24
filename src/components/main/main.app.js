import englishPuzzleAppInit from '../english-puzzle/english-puzzle.app';
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

class Main {
  constructor() {
    this.gameButtons = {
      englishPuzzle: null,
    };

    this.onEnglishButtonClickHandlerBinded = this.onEnglishButtonClickHandler.bind(this);
  }

  onEnglishButtonClickHandler() {
    menu.removeBurgerIconClickHandler();
    menu.removeCloseButtonClickHandler();
    this.gameButtons.englishPuzzle.removeEventListener('click', this.onEnglishButtonClickHandlerBinded);
    englishPuzzleAppInit();
  }

  init() {
    menu.init();

    this.gameButtons.englishPuzzle = document.querySelector('.english-puzzle');
    this.gameButtons.englishPuzzle.addEventListener('click', this.onEnglishButtonClickHandlerBinded);
  }
}

const appRoutes = [
  { path: '/', component: mainPageComponent },
  { path: '/learn', component: learnPageComponent },
  { path: '/dictionary', component: dictionaryPageComponent },
  { path: '/games', component: gamesPageComponent },
  { path: '/statisticks', component: statisticsPageComponent },
  { path: '/team', component: teamPageComponent },
  { path: '/settings', component: settingsPageComponent },
];

const parseLocation = () => window.location.hash.slice(1).toLowerCase() || '/';
const findComponentByPath = (path) => appRoutes.find((route) => route.path.match(new RegExp(`^\\${path}$`, 'gm'))) || undefined;

const router = () => {
  const main = document.querySelector('.main');
  const path = parseLocation();
  const { component = errorPageComponent } = findComponentByPath(path) || {};
  main.innerHTML = component.render();
};

const initRouter = () => {
  window.addEventListener('hashchange', router);
  window.addEventListener('load', router);
};

initRouter();
