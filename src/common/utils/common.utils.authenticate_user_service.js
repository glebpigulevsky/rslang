import { LocalStorageService } from './common.utils.local_storage_service';
import { UsersApi } from '../../services/services.methods';
import { getTokenExpiresMs } from './common.utils.helper';

class AuthenticateUserService {
  constructor() {
    this.localStorageService = new LocalStorageService();
    this.userApi = new UsersApi();
  }

  async loginUser({ email, password, hasSignUp }) {
    if (hasSignUp) {
      return this._signUpUser({ email, password });
    }
    return this._authUser({ email, password });
  }

  checkUserAccess() {
    try {
      const storage = new LocalStorageService();
      const userInfo = storage.getUserInfo();
      if (userInfo === null) {
        return false;
      }
      const { expiredTime } = userInfo;
      const now = Date.now();
      if (expiredTime < now) {
        storage.deleteUserInfo();
        return false;
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  async _signUpUser({ email, password }) {
    const created = await this.userApi.createUser({ email, password });
    if (created) {
      return this._authUser({ email, password });
    }
    return false;
  }

  async _authUser({ email, password }) {
    const { token, userId, message } = await this.userApi.authenticateUser({ email, password });
    if (message === 'Authenticated') {
      this.localStorageService.setUserInfo({ userId, token, expiredTime: getTokenExpiresMs() });
      return message;
    }
    return false;
  }
}

export { AuthenticateUserService };
