import ApiService from '../../common/services.common.api_service';
import { MAIN_API_URL, TOKEN } from '../../common/services.common.constants';

export default class UserWordsApi {
  constructor() {
    this._apiService = new ApiService(MAIN_API_URL, TOKEN);
  }

  async createUserWord({ userId, wordId, difficulty, optional = {} }) {
    const res = await this._apiService.postResourse({
      url: `/users/${userId}/words/${wordId}`,
      params: { difficulty, optional },
      hasToken: true,
    });
    return this._transformUserWord(res);
  }

  async getAllUserWords({ userId }) {
    const res = await this._apiService.getResource({ url: `/users/${userId}/words`, hasToken: true });
    return res.map(this._transformUserWord);
  }

  async getUserWord({ userId, wordId }) {
    const res = await this._apiService.getResource({ url: `/users/${userId}/words/${wordId}`, hasToken: true });
    return this._transformUserWord(res);
  }

  async updateUserWord({ userId, wordId, difficulty, optional = {} }) {
    const res = await this._apiService.putResourse({
      url: `/users/${userId}/words/${wordId}`,
      params: { difficulty, optional },
      hasToken: true,
    });
    return this._transformUserWord(res);
  }

  async deleteUserWord({ userId, wordId }) {
    const res = await this._apiService.deleteResourse({ url: `/users/${userId}/words/${wordId}`, hasToken: true });
    return {
      isDeleted: res,
    };
  }

  _transformUserWord({ id, wordId, difficulty, optional }) {
    return {
      id,
      wordId,
      difficulty,
      optional: optional || null,
    };
  }
}
