import ApiService from '../../common/services.common.api_service';
import { MAIN_API_URL, TOKEN } from '../../common/services.common.constants';

export default class UserWords {
  constructor() {
    this.apiService = new ApiService(MAIN_API_URL, TOKEN);
  }

  async createUserWord({ userId, wordId, difficulty, optional = {} }) {
    const res = await this.apiService.postResourse({
      url: `/users/${userId}/words/${wordId}`,
      params: { difficulty, optional },
      hasToken: true,
    });
    return this.transformUserWord(res);
  }

  async getAllUserWords({ userId }) {
    const res = await this.apiService.getResource({ url: `/users/${userId}/words`, hasToken: true });
    return res.map(this.transformUserWord);
  }

  async getUserWord({ userId, wordId }) {
    const res = await this.apiService.getResource({ url: `/users/${userId}/words/${wordId}`, hasToken: true });
    return this.transformUserWord(res);
  }

  async updateUserWord({ userId, wordId, difficulty, optional = {} }) {
    const res = await this.apiService.putResourse({
      url: `/users/${userId}/words/${wordId}`,
      params: { difficulty, optional },
      hasToken: true,
    });
    return this.transformUserWord(res);
  }

  async deleteUserWord({ userId, wordId }) {
    const res = await this.apiService.deleteResourse({ url: `/users/${userId}/words/${wordId}`, hasToken: true });
    return res;
  }

  transformUserWord({ id, wordId, difficulty, optional }) {
    return {
      id,
      wordId,
      difficulty,
      optional,
    };
  }
}
