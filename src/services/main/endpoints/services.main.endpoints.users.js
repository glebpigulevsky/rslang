import ApiService from '../../common/services.common.api_service';
import { MAIN_API_URL, TOKEN } from '../../common/services.common.constants';

export default class UsersApi {
  constructor() {
    this.apiService = new ApiService(MAIN_API_URL, TOKEN);
  }

  async getUser({ id }) {
    const res = await this.apiService.getResource({ url: `/users/${id}`, hasToken: true });
    return this.transformUser(res);
  }

  async editUser({ id, email, password }) {
    const res = await this.apiService.putResourse({ url: `/users/${id}`, params: { email, password }, hasToken: true });
    return this.transformUser(res);
  }

  async createUser({ email, password }) {
    const res = await this.apiService.postResourse({ url: '/users', params: { email, password }, hasToken: false });
    return this.transformUser(res);
  }

  async deleteUser({ id }) {
    const res = await this.apiService.deleteResourse({ url: `/users/${id}`, hasToken: true });
    return res;
  }

  async authenticateUser({ email, password }) {
    const res = await this.apiService.postResourse({ url: '/signin', params: { email, password } });
    return this.transformAuthentication(res);
  }

  transformUser({ id, email }) {
    return {
      id,
      email,
    };
  }

  transformAuthentication({ message, token, userId }) {
    return {
      message,
      token,
      userId,
    };
  }
}
