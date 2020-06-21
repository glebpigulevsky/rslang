import { AuthenticateUserService } from '../../common/common.helper';
import { LoginPopup } from './login_user.component';

// const CREATE_ACCOUNT_BTN = document.querySelector('#create_btn');
// const CREATE_EMAIL_INPUT = document.querySelector('#inputEmail');
// const CREATE_PASSWORD_INPUT = document.querySelector('#inputPassword');
const CREATE_CONTAINER = document.querySelector('[data-container="container-create"]');
// const CREATE_INFO = document.querySelector('#create_info');

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
    document.body.insertAdjacentHTML('afterend', LoginPopup);
    document.querySelector('#create_btn').addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector('#create_info').textContent = '';

      const email = document.querySelector('#inputEmail').value.toString();
      const password = document.querySelector('#inputPassword').value.toString();
      this.authUserService
        .createUser({ email, password })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          document.querySelector('#create_info').textContent = err;
        });
    });
  }
}

export { LoginUser };
