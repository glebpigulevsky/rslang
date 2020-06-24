import './scss/promo.styles.scss';
import LoginUser from '../login_user/login_user';

class Promo {
  constructor() {
    this._startBtn = null;
    this._loginUser = new LoginUser();
  }

  init() {
    this._startBtn = document.querySelector('.login__submitBtn');
    this._startBtn.addEventListener('click', () => this._openLoginHandler());    
  }

  _openLoginHandler() {
    this._loginUser.showLoginPopup();
  }
}

window.onload = () => {
  const promo = new Promo();
  promo.init();
};
