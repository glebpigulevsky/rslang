import { AuthenticateUserService } from '../../common/common.helper';
import { getLoginComponent } from './common/login_user.component';
import { LOGIN_BUTTONS_NAME, LOGIN_BUTTONS_COLOR_CLASS } from './common/login_user.common.constants';
import './scss/login.styles.scss';

class LoginUser {
  constructor() {
    this._authUserService = new AuthenticateUserService();
    this._closeBtn = null;
    this._createBtn = null;
    this._trainSwitch = null;
    this._createInfo = null;
    this._switchLabelSignUp = null;
    this._switchLabelSignIn = null;
    this._inputEmail = null;
    this._inputPassword = null;
    this._loginContainer = null;
  }

  showLoginPopup() {
    document.body.insertAdjacentHTML('afterend', getLoginComponent());
    this._loginContainer = document.querySelector('#js-login-container');
    this._closeBtn = document.querySelector('#js-loginCloseBtn');
    this._createBtn = document.querySelector('#js-loginCreateBtn');
    this._trainSwitch = document.querySelector('#js-trainSwitch');
    this._createInfo = document.querySelector('#js-loginCreateInfo');
    this._switchLabelSignUp = document.querySelector('#js-switchLabelSignUp');
    this._switchLabelSignIn = document.querySelector('#js-switchLabelSignIn');
    this._inputEmail = document.querySelector('#js-inputEmail');
    this._inputPassword = document.querySelector('#js-inputPassword');

    this._trainSwitch.addEventListener('click', this._trainSwitchHandler.bind(this));
    this._createBtn.addEventListener('click', this._createBtnHandler.bind(this));
    this._closeBtn.addEventListener('click', this._closeLoginHandler.bind(this));
    this._inputEmail.addEventListener('keyup', this._emptyFieldsValidator.bind(this));
    this._inputPassword.addEventListener('keyup', this._emptyFieldsValidator.bind(this));
  }

  _trainSwitchHandler() {
    const hasSignUp = this._trainSwitch.checked;
    if (hasSignUp) {
      this._createBtn.textContent = LOGIN_BUTTONS_NAME.SignUp;
      this._switchLabelSignUp.classList.add(LOGIN_BUTTONS_COLOR_CLASS);
      this._switchLabelSignIn.classList.remove(LOGIN_BUTTONS_COLOR_CLASS);
    } else {
      this._createBtn.textContent = LOGIN_BUTTONS_NAME.SignIn;
      this._switchLabelSignIn.classList.add(LOGIN_BUTTONS_COLOR_CLASS);
      this._switchLabelSignUp.classList.remove(LOGIN_BUTTONS_COLOR_CLASS);
    }
  }

  _createBtnHandler(e) {
    e.preventDefault();
    this._createInfo.textContent = '';
    const email = this._inputEmail.value.toString();
    const password = this._inputPassword.value.toString();
    const hasSignUp = this._trainSwitch.checked;
    this._authUserService
      .loginUser({ email, password, hasSignUp })
      .then((res) => {
        if (res === 'Authenticated') {
          this._createInfo.textContent = 'Authenticated';
          setTimeout(() => {
            this._loginContainer.dispatchEvent(new CustomEvent('UserSuccess', {
              detail: { result: 'Authenticated' },
            }));
            this._closeLoginHandler();
          }, 2000);
        }
      })
      .catch((err) => { this._createInfo.textContent = err; });
  }

  _emptyFieldsValidator() {
    if (this._inputEmail.value.trim() !== '' && this._inputPassword.value.trim() !== '') {
      this._createBtn.disabled = false;
    }
  }

  _closeLoginHandler() {
    this._trainSwitch.removeEventListener('click', this._trainSwitchHandler);
    this._createBtn.removeEventListener('click', this._createBtnHandler);
    this._closeBtn.removeEventListener('click', this._closeLoginHandler);
    this._loginContainer.parentNode.removeChild(this._loginContainer);
  }
}

export { LoginUser };
