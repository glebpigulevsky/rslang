import './scss/promo.styles.scss';
import { LoginUser } from '../login_user/login_user.popup';

class Promo {
  constructor() {
    this._loginUser = new LoginUser();
  }

  openLoginPopup() {
    document.querySelector('.login__submitBtn').addEventListener('click', this._openLoginHandler.bind(this));
  }

  _openLoginHandler() {
    this._loginUser.showLoginPopup();
    document.querySelector('#js-login-container').addEventListener('UserSuccess', this._onSuccessUserLogin);
  }

  _onSuccessUserLogin(e) {
    window.location.replace(`${window.location.origin}/main.index.html#`);
  }

  init() {
    this.openLoginPopup();
  }
}

window.onload = () => {
  const promo = new Promo();
  promo.init();
};
