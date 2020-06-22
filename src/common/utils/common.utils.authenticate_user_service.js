import { LocalStorageService } from './common.utils.local_storage_service';
import { UsersApi } from '../../services/services.methods';
import { TOKEN_EXPIRES_MS } from './common.utils.helper';

class AuthenticateUserService {
  constructor() {
    this.localStorageService = new LocalStorageService();
    this.userApi = new UsersApi();
  }

  async loginUser({ email, password, hasSignUp }) {
    if (hasSignUp) {
      return this._signUpUser({ email, password });
    }
    return this._loginUser({ email, password });
  }

  async _signUpUser({ email, password }) {
    const created = await this.userApi.createUser({ email, password });
    if (created) {
      return this._loginUser({ email, password });
    }
    return false;
  }

  async _loginUser({ email, password }) {
    const { token, userId, message } = await this.userApi.authenticateUser({ email, password });
    if (message === 'Authenticated') {
      this.localStorageService.setUserInfo({ userId, token, expiredTime: TOKEN_EXPIRES_MS() });
      console.log(`message ${message}`);
      return message;
    }
    return false;
  }
}

export {
  AuthenticateUserService,
};
