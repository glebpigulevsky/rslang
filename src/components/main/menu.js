import { LoginUser } from '../login_user/login_user.popup';
import { logoutUser, hasAccessUser } from './common/main.helper';
import { Observable } from '../../common/utils/common.utils.observable';
import { ERRORS_DESCRIPTION } from '../../services/services.methods';

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
    if ((target.id) && (this.mainButton) && target.id === this.mainButton.id) {
      this._mainButtunHandler();
    }
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

  addLogoutHandler() {
    this.logoutButton.addEventListener('click', this._onLogoutButtonHandler.bind(this));
  }

  _onLogoutButtonHandler() {
    logoutUser();
  }

  _mainButtunHandler() {
    if (hasAccessUser()) {
      window.location.replace(`${window.location.origin}${window.location.pathname}#/learn`);
    } else {
      const observer = new Observable();
      const loginUser = new LoginUser(observer);
      observer.subscribe((auth) => {
        console.info(`observer got result: ${auth}`);
        this._onSuccessUserLogin();
      });
      loginUser.showLoginPopup();
    }
  }

  _onSuccessUserLogin() {
    hasAccessUser();
  }

  addErrorTokenLogoutHandler() {
    document.addEventListener(ERRORS_DESCRIPTION.ERROR_TOKEN, () => {
      console.info(ERRORS_DESCRIPTION.ERROR_TOKEN);
      logoutUser();
    });
  }

  init() {
    this.toggleButton = document.querySelector('.hamburger-menu__button');
    this.navBar = document.querySelector('.main-header__navigation');
    this.navigation = document.querySelector('.navigation__list');
    this.mainButton = document.querySelector('.main-button__start');
    this.logoutButton = document.querySelector('.main-header__logout');

    this.addBurgerIconClickHandler();
    this.addCloseButtonClickHandler();
    this.changeActiveStateLinks();
    this.addLogoutHandler();
    this.addErrorTokenLogoutHandler();
  }
}

export default new Menu();
