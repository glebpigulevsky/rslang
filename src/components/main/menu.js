import { LoginUser } from '../login_user/login_user.popup';
import { AuthenticateUserService, LocalStorageService } from '../../common/common.helper';

class Menu {
  constructor() {
    this.onCloseClickHandlerBinded = this.onCloseClickHandler.bind(this);
    this.onBurgerIconClickHandlerBinded = this.onBurgerIconClickHandler.bind(this);
    this._loginUser = new LoginUser();
    this._authUserService = new AuthenticateUserService();
    this._localStorage = new LocalStorageService();
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
    if (target.id === this._mainButton.id) {
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

  logout() {
    this._logout.addEventListener('click', this._onLogoutButtonHandler.bind(this));
  }

  _onLogoutButtonHandler() {
    console.info('logout');
    this._localStorage.deleteUserInfo();
    document.querySelector('.main-header__navigation').style.removeProperty('display');
    document.querySelector('.main-header__logout').style.removeProperty('display');
    window.location.replace(`${window.location.origin}${window.location.pathname}#`);
  }

  _mainButtunHandler() {
    if (this._authUserService.checkUserAccess()) {
      window.location.replace(`${window.location.origin}${window.location.pathname}#/learn`);
    } else {
      this._loginUser.showLoginPopup();
      document.querySelector('#js-login-container').addEventListener('UserSuccess', this._onSuccessUserLogin);
    }
  }

  _onSuccessUserLogin(e) {
    document.querySelector('.main-header__navigation').style.display = 'flex';
    document.querySelector('.main-header__logout').style.display = 'block';
  }

  init() {
    this.toggleButton = document.querySelector('.hamburger-menu__button');
    this.navBar = document.querySelector('.main-header__navigation');
    this.navigation = document.querySelector('.navigation__list');
    this._mainButton = document.querySelector('.main-button__start');
    this._logout = document.querySelector('.main-header__logout');

    this.addBurgerIconClickHandler();
    this.addCloseButtonClickHandler();
    this.changeActiveStateLinks();
    this.logout();
  }
}

export default new Menu();
