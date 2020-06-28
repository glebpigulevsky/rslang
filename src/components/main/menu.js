import { LoginUser } from '../login_user/login_user.popup';
import { ERRORS_DESCRIPTION } from '../../services/services.methods';
import { AuthenticateUserService, LocalStorageService, Observable } from '../../common/common.helper';
import { mainHeaderLogout } from './components/main_header_logout';
import { mainHeaderNavigation } from './components/main_header_navigation';
import * as observable from '../../common/utils/common.utils.observable';

class Menu {
  constructor() {
    this.onCloseClickHandlerBinded = this.onCloseClickHandler.bind(this);
    this.onBurgerIconClickHandlerBinded = this.onBurgerIconClickHandler.bind(this);
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

  changeActiveStateLinks() {
    const { navigation } = this;
    navigation.addEventListener('click', (e) => {
      navigation.querySelectorAll('.navigation__link').forEach((el) => (el.classList.remove('active')));
      e.target.classList.add('active');
    });
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
    document.addEventListener(ERRORS_DESCRIPTION.ERROR_TOKEN, document.logout = this.logoutUser);
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
      window.location.replace(`${window.location.origin}${window.location.pathname}#`);
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
      const wrapperNode = document.querySelector('.wrapper');
      const mainHeaderLogoutNode = document.querySelector('.main-header__logout');
      const mainHeaderNavigationNode = document.querySelector('.main-header__navigation');

      if (!mainHeaderNavigationNode) {
        wrapperNode.insertAdjacentHTML('beforeend', mainHeaderNavigation.render());
        this.navBar = document.querySelector('.main-header__navigation');
        this.navigation = document.querySelector('.navigation__list');
        this.toggleButton = document.querySelector('.hamburger-menu__button');

        this.addBurgerIconClickHandler();
        this.addCloseButtonClickHandler();
        this.changeActiveStateLinks();
        this.addErrorTokenLogoutHandler();
      }

      if (!mainHeaderLogoutNode) {
        wrapperNode.insertAdjacentHTML('beforeend', mainHeaderLogout.render());
        document.querySelector('.main-header__logout').addEventListener('click', this.logoutUser);
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
