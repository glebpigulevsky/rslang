import './scss/promo.styles.scss';
import { LoginUser } from '../login_user/login_user.popup';
import * as observable from '../../common/utils/common.utils.observable';

class Promo {
  openLoginPopup() {
    document.querySelector('.login__submitBtn').addEventListener('click', this._openLoginHandler.bind(this));
  }

  _openLoginHandler() {
    const loginUser = new LoginUser();
    observable.subscribe('Authenticate', (data) => {
      console.log(`observer got result!!!!!!!: ${data}`);
      this._onSuccessUserLogin();
    });
    loginUser.showLoginPopup();
    document.querySelector('#js-login-container').addEventListener('UserSuccess', this._onSuccessUserLogin.bind(this));
  }

  _onSuccessUserLogin() {
    // document.querySelector('.login__submitBtn').removeEventListener('click', this._openLoginHandler);
    // document.querySelector('#js-login-container').removeEventListener('click', this._onSuccessUserLogin);
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
