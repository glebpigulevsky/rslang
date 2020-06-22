import { AuthenticateUserService } from '../../common/common.helper';
import { LoginComponent } from './login_user.component';
import { ErrorPopup } from '../error/error.error_popup'; 
import './scss/login.styles.scss';

// const CREATE_ACCOUNT_BTN = document.querySelector('#create_btn');
// const CREATE_EMAIL_INPUT = document.querySelector('#inputEmail');
// const CREATE_PASSWORD_INPUT = document.querySelector('#inputPassword');
const CREATE_CONTAINER = document.querySelector('[data-container="container-create"]');
const REGISTER_SWITCH = document.querySelector('#trainSwitch');
const LOGIN_ACCOUNT_BTN = document.querySelector('#login_btn');
const LOGIN_EMAIL_INPUT = document.querySelector('#inputEmailLogin');
const LOGIN_PASSWORD_INPUT = document.querySelector('#inputPasswordLogin');
const LOGIN_CONTAINER = document.querySelector('[data-container="container-login"]');
const LOGIN_INFO = document.querySelector('#login_info');

const START_CONTAINER = document.querySelector('[data-container="container-start"]');

class LoginUser {
  constructor() {
    this.authUserService = new AuthenticateUserService();
  }

  async showLoginPopup() {
    //const x = new ErrorPopup();
   // x.openPopup({ 'dddddd' });
    document.body.insertAdjacentHTML('afterend', LoginComponent);

    document.querySelector('.login').oncontextmenu = () => false; //  Disable browser right-click (or double-click) menu.

    document.querySelector('#trainSwitch').addEventListener('click', (e) => {
      const hasSignUp = document.querySelector('#trainSwitch').checked;
      if (hasSignUp) {
        document.querySelector('#create_btn').textContent = 'Sign Up';
        document.querySelector('#switchLabelSignUp').classList.add('login__mode_selected');
        document.querySelector('#switchLabelSignIn').classList.remove('login__mode_selected');
      } else {
        document.querySelector('#create_btn').textContent = 'Sign In';
        document.querySelector('#switchLabelSignIn').classList.add('login__mode_selected');
        document.querySelector('#create_btn').classList.remove('login__mode_selected');
      }
    });

    document.querySelector('#create_btn').addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector('#create_info').textContent = '';
      const email = document.querySelector('#inputEmail').value.toString();
      const password = document.querySelector('#inputPassword').value.toString();
      const hasSignUp = document.querySelector('#trainSwitch').checked;
      console.log(`hasSignUp ${hasSignUp}`);
      this.authUserService
        .loginUser({ email, password, hasSignUp })
        .then((res) => {
          console.log(`return creation ${res}`);
          document.querySelector('#create_info').textContent = res;
        })
        .catch((err) => {
          console.log(`return error ${err}`);
          document.querySelector('#create_info').textContent = err;
        });
    });
  }
}

export { LoginUser };
