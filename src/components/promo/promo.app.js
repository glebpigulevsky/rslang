import './scss/promo.styles.scss';
import { LoginUser, POINT_OF_ENTRY } from '../login_user/login_user.popup';

class Promo {
  constructor(){
    this._loginUser = new LoginUser({ pointOfEntry: POINT_OF_ENTRY.Promo });
    this._startBtn = document.querySelector('.login__submitBtn');
  }
  init() {
    this._startBtn.addEventListener('click', this._openLoginHandler.bind(this));
  }

  _openLoginHandler() {
    this._loginUser.showLoginPopup();
  }
}

window.onload = () => {
  const promo = new Promo();
  promo.init();
};
