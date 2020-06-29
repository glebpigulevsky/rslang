import { LoginUser } from '../login_user/login_user.popup';
import { ERRORS_DESCRIPTION } from '../../services/services.methods';
import { AuthenticateUserService, LocalStorageService } from '../../common/common.helper';
import { mainHeaderLogout } from './components/main_header_logout';
import { mainHeaderNavigation } from './components/main_header_navigation';
import { mainPageComponent } from './pages/main-page.component';
import * as observable from '../../common/utils/common.utils.observable';

class Menu {
  constructor() {
    this.onCloseClickHandlerBinded = this.onCloseClickHandler.bind(this);
    this.onBurgerIconClickHandlerBinded = this.onBurgerIconClickHandler.bind(this);
    this.onCloseMenuClickHandlerBinded = this.onCloseMenuClickHandler.bind(this);
    this.onLinksActiveClickHandlerBinded = this.onLinksActiveClickHandler.bind(this);
  }

  onBurgerIconClickHandler() {
    this.navBar.classList.toggle('toggle');
  }

  addBurgerIconClickHandler() {
    this.toggleButton.addEventListener('click', this.onBurgerIconClickHandlerBinded);
  }

  removeBurgerIconClickHandler() {
    this.toggleButton.removeEventListener('click', this.onBurgerIconClickHandlerBinded);
  }

  onCloseClickHandler({ target }) {
    const itsMenu = target === this.navBar || this.navBar.contains(target);
    const itsBtnMenu = target === this.toggleButton;
    const menuIsActive = this.navBar.classList.contains('toggle');
    if (!itsMenu && !itsBtnMenu && menuIsActive) {
      this.navBar.classList.toggle('toggle');
    }
  }

  addCloseButtonClickHandler() {
    document.addEventListener('click', this.onCloseClickHandlerBinded);
  }

  removeCloseButtonClickHandler() {
    document.removeEventListener('click', this.onCloseClickHandlerBinded);
  }

  onCloseMenuClickHandler(event) {
    if (event.target.closest('ul li a')) {
      this.navBar.classList.toggle('toggle');
    }
  }

  addCloseMenuClickHandler() {
    this.navigation.addEventListener('click', this.onCloseMenuClickHandlerBinded);
  }

  removeCloseMenuClickHandler() {
    this.navigation.removeEventListener('click', this.onCloseMenuClickHandlerBinded);
  }

  onLinksActiveClickHandler(event) {
    if (event.target.classList.contains('navigation__link')) {
      const clickedTag = event.target;
      const tags = document.querySelectorAll('.navigation__link');
      tags.forEach((tag) => {
        tag.classList.remove('active');
        tag.classList.add('navigation__link');
      });
      clickedTag.classList.add('active');
    } else if (event.target.classList.contains('icon')) {
      const clickedTag = event.target.parentNode;
      const tags = document.querySelectorAll('.navigation__link');
      tags.forEach((tag) => {
        tag.classList.remove('active');
        tag.classList.add('navigation__link');
      });
      clickedTag.classList.add('active');
    }
  }

  addLinksActiveClickHandler() {
    this.navigation.addEventListener('click', this.onLinksActiveClickHandlerBinded);
  }

  removeLinksActiveClickHandler() {
    this.navigation.removeEventListener('click', this.onLinksActiveClickHandlerBinded);
  }

  mainButtonHandler() {
    if (this.hasAccessUser()) {
      window.location.replace(`${window.location.origin}${window.location.pathname}#/learn`);
    } else {
      const loginUser = new LoginUser();
      loginUser.showLoginPopup();
      observable.subscribe('Authenticate', (data) => {
        console.info(`observer got result: ${data}`);
        this.hasAccessUser();
      });
    }
  }

  addErrorTokenLogoutHandler() {
    document.addEventListener(ERRORS_DESCRIPTION.ERROR_TOKEN, this.logoutUser.bind(this));
  }

  logoutUser() {
    const localStorage = new LocalStorageService();
    localStorage.deleteUserInfo();
    let mainHeaderNavigationNode = document.querySelector('.main-header__navigation');
    if (mainHeaderNavigationNode) {
      mainHeaderNavigationNode.parentElement.removeChild(mainHeaderNavigationNode);
      mainHeaderNavigationNode = null;
    }

    let mainHeaderLogoutNode = document.querySelector('.main-header__logout');
    if (mainHeaderLogoutNode) {
      mainHeaderLogoutNode.parentNode.removeChild(mainHeaderLogoutNode);
      mainHeaderLogoutNode = null;
    }
    if (window.location.hash !== '') {
      window.history.pushState({ pageId: '/' }, 'main', `${window.location.pathname}#`);
      const main = document.querySelector('.main');
      main.innerHTML = mainPageComponent.render();
      const mainButton = document.querySelector('.main-button__start');
      mainButton.addEventListener('click', this.mainButtonHandler.bind(this));
    }
    console.info('UserDoesNotHaveAccess');
  }

  addMainButtonEventListener() {
    const el = document.querySelector('.main-button__start');
    el.addEventListener('click', this.mainButtonHandler.bind(this));
  }

  hasAccessUser() {
    const auth = new AuthenticateUserService();
    if (auth.checkUserAccess()) {
      console.info('userHasAccess');
      const mainHeader = document.querySelector('.main-header');
      const mainHeaderLogoutNode = document.querySelector('.main-header__logout');
      const mainHeaderNavigationNode = document.querySelector('.main-header__navigation');

      if (!mainHeaderNavigationNode) {
        mainHeader.insertAdjacentHTML('beforeend', mainHeaderNavigation.render());
        this.toggleButton = document.querySelector('.hamburger-menu__button');
        this.navBar = document.querySelector('.main-header__navigation');
        this.navigation = document.querySelector('.navigation__list');

        this.addBurgerIconClickHandler();
        this.addCloseButtonClickHandler();
        this.addCloseMenuClickHandler();
        this.addLinksActiveClickHandler();
        this.addErrorTokenLogoutHandler();
      }

      if (!mainHeaderLogoutNode) {
        mainHeader.insertAdjacentHTML('beforeend', mainHeaderLogout.render());
        document.querySelector('.main-header__logout').addEventListener('click', this.logoutUser.bind(this));
      }

      return true;
    }
    this.logoutUser();
    return false;
  }

  init() {
    this.addMainButtonEventListener();
  }
}

export default new Menu();
