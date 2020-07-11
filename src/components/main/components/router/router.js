import menu from '../menu/menu';
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
      this.mainContainer.innerHTML = '';
      this.mainContainer.insertAdjacentHTML('afterbegin', await component.render());
      if (component.init) component.init();
    }
  }

  init() {
    this.mainContainer = document.querySelector('.main');
    window.addEventListener('hashchange', this.rout);
    this.rout();
  }
}

export default new Router();
