import './scss/promo.styles.scss';
import { LoginUser } from '../login_user/login_user.popup';
import * as observable from '../../common/utils/common.utils.observable';

class Promo {
  openLoginPopup() {
    this.submitBtn.addEventListener('click', this._openLoginHandler.bind(this));
  }

  _openLoginHandler() {
    const loginUser = new LoginUser();
    loginUser.showLoginPopup();
    observable.subscribe('Authenticate', () => {
      this.submitBtn.removeEventListener('click', this.submitBtn.fn);
      window.location.replace(`${window.location.origin}/main.index.html#`);
    });
  }

  init() {
    this.submitBtn = document.querySelector('.login__submitBtn');
    this.openLoginPopup();
  }
}

window.onload = () => {
  const promo = new Promo();
  promo.init();
};
