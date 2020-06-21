import { LocalStorageService } from './common.utils.local_storage_service';
import { UsersApi } from '../../services/services.methods';
import { TOKEN_EXPIRES_MS } from './common.utils.helper';

class AuthenticateUserService {
  constructor() {
    this.localStorageService = new LocalStorageService();
    this.userApi = new UsersApi();
  }

  async createUser({ email, password }) {
    const created = await this.userApi.createUser({ email, password });
    if (created) {
      const auth = await this.userApi.authenticateUser({ email, password });
      return auth;
    }
    return null;
  }

  async loginUser({ email, password }) {
    const auth = await this.userApi.authenticateUser({ email, password });
    return auth;
  }
}

export {
  AuthenticateUserService,
};
