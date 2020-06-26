import { LocalStorageService } from './common.utils.local_storage_service';
import { UsersApi } from '../../services/services.methods';
import { TOKEN_EXPIRES_MS, GET_HUMAN_DATE_UTC } from './common.utils.helper';

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
      console.info(`token expiredTime ${GET_HUMAN_DATE_UTC(expiredTime)}`);
      console.info(`token now ${GET_HUMAN_DATE_UTC(now)}`);
      if (expiredTime < now) {
        storage.deleteUserInfo();
        return false;
      }
      return true;
    } catch (e) {
      console.info(e.message);
      return false;
    }
  }

  async _signUpUser({ email, password }) {
    const created = await this.userApi.createUser({ email, password });
    if (created) {
      console.info(`User is created: ${created.id}, ${created.email}`);
      return this._authUser({ email, password });
    }
    return false;
  }

  async _authUser({ email, password }) {
    const { token, userId, message } = await this.userApi.authenticateUser({ email, password });
    if (message === 'Authenticated') {
      this.localStorageService.setUserInfo({ userId, token, expiredTime: TOKEN_EXPIRES_MS() });
      console.info(`User got token: ${token}, userId: ${userId}}`);
      return message;
    }
    return false;
  }
}

export { AuthenticateUserService };
