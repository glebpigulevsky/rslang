import ApiService from '../../common/services.common.api_service';
import { MAIN_API_URL } from '../../common/services.common.constants';
import { checkUserInfo } from '../../common/services.common.api_service.helper';

export default class UsersApi {
  constructor() {
    this._apiService = new ApiService(MAIN_API_URL);
  }

  async getUser({ token, userId } = checkUserInfo()) {
    const res = await this._apiService.getResource({ url: `/users/${userId}`, hasToken: true, token });
    return this._transformUser(res);
  }

  async updateUser({ email, password }, { token, userId } = checkUserInfo()) {
    const res = await this._apiService.putResourse({
      url: `/users/${userId}`, params: { email, password }, hasToken: true, token,
    });
    return this._transformUser(res);
  }

  async createUser({ email, password }) {
    const res = await this._apiService.postResourse({ url: '/users', params: { email, password }, hasToken: false });
    return this._transformUser(res);
  }

  async deleteUser({ token, userId } = checkUserInfo()) {
    const res = await this._apiService.deleteResourse({ url: `/users/${userId}`, hasToken: true, token });
    return {
      isDeleted: res,
    };
  }

  async authenticateUser({ email, password }) {
    const res = await this._apiService.postResourse({ url: '/signin', params: { email, password }, hasToken: false });
    return this._transformAuthentication(res);
  }

  _transformUser({ id, email }) {
    return {
      id,
      email,
    };
  }

  _transformAuthentication({ message, token, userId }) {
    return {
      message,
      token,
      userId,
    };
  }
}
