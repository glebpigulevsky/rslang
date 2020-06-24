import LocalStorageService from '../../common/common.helper';
import AuthenticateUserService from '../../common/common.helper';
import LoginUser from '../login_user/login_user';

const auth = new AuthenticateUserService();

export default class Menu {
  constructor() {
    this.isOpen = false;
    this.login = new LoginUser();
  }

  burgerMenuClickHandler() {
    this.toggleButton = document.querySelector('.hamburger-menu__button');
    this.navBar = document.querySelector('.main-header__navigation');
    this.toggleButton.addEventListener('click', () => {
      this.navBar.classList.toggle('toggle');
    });
  }

  close() {
    document.addEventListener('click', (e) => {
      const toggleButton = document.querySelector('.hamburger-menu__button');
      const navBar = document.querySelector('.main-header__navigation');
      const { target } = e;
      const itsMenu = target === navBar || navBar.contains(target);
      const itsBtnMenu = target === toggleButton;
      const menuIsActive = navBar.classList.contains('toggle');
      if (!itsMenu && !itsBtnMenu && menuIsActive) {
        this.navBar.classList.toggle('toggle');
      }
    });
  }

  logout() {
    document.querySelector('.main-header__logout').addEventListener('click', () => {
      const storage = new LocalStorageService();
      storage.deleteUserInfo();
      window.location.replace(`${window.location.origin}${window.location.pathname}#`);
    });
  }



  showMenuButton() {
    document.querySelector('.main-header__navigation').display = 'flex';
    document.querySelector('.main-header__logout').display = 'block';
  }

  init() {
    this.burgerMenuClickHandler();
    this.close();
    this.logout();
  }
}
