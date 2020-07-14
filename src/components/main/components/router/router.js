import spacedRepetitions from '../spacedRepetitions/spacedRepetitions';
import mainController from '../controller/main.controller';
import menu from '../menu/menu';
import { mainStorage } from '../mainStorage/mainStorage';
import { errorPageComponent } from '../../pages/error-page.component';
import routes from './routes/routes';

import { getLocationPath, isRouteHasPath } from './common/router.helper';

class Router {
  constructor() {
    this.mainContainer = null;
    this.menu = null;
    this.previousComponent = null;

    this.rout = this.rout.bind(this);
  }

  findComponentByPath(currentPath) {
    return routes
      .find((route) => isRouteHasPath(route, currentPath))
        || { path: '/error', component: errorPageComponent };
  }

  async rout() {
    if (menu.hasAccessUser() || window.location.hash === '') {
      if (this.previousComponent && this.previousComponent.unmount) {
        this.previousComponent.unmount();
      }
      const currentPath = getLocationPath();
      const { component } = this.findComponentByPath(currentPath);
      this.previousComponent = component;

      mainController.spinner.show();
      if (window.location.hash !== '') {
        await mainController.getUserSettings();
        if (!mainController.isNewUser) {
          await spacedRepetitions.init();
          spacedRepetitions.parseMiniGamesResults(mainStorage.miniGamesResults);
          await spacedRepetitions.updateUserWords();
          spacedRepetitions.count = 0;
        }
      }

      this.mainContainer.innerHTML = '';
      const componentMarkup = await component.render();
      mainController.spinner.hide();
      this.mainContainer.insertAdjacentHTML('afterbegin', componentMarkup);
      if (component.init) await component.init();
    }
  }

  init() {
    this.mainContainer = document.querySelector('.main');
    window.addEventListener('hashchange', this.rout);
    this.rout();
  }
}

export default new Router();
