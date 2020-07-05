import ApiService from '../../common/services.common.api_service';
import { MAIN_API_URL } from '../../common/services.common.constants';
import { checkUserInfo } from '../../common/services.common.api_service.helper';

export default class UserWordsApi {
  constructor() {
    this._apiService = new ApiService(MAIN_API_URL);
  }

  async createUserWord({ wordId, difficulty, optional = {} }, { token, userId } = checkUserInfo()) {
    const res = await this._apiService.postResourse({
      url: `/users/${userId}/words/${wordId}`,
      params: { difficulty, optional },
      hasToken: true,
      token,
    });
    return this._transformUserWord(res);
  }

  async getAllUserWords({ token, userId } = checkUserInfo()) {
    const res = await this._apiService.getResource({ url: `/users/${userId}/words`, hasToken: true, token });
    return res.map(this._transformUserWord);
  }

  async getUserWord({ wordId }, { token, userId } = checkUserInfo()) {
    const res = await this._apiService.getResource({ url: `/users/${userId}/words/${wordId}`, hasToken: true, token });
    return this._transformUserWord(res);
  }

  async updateUserWord({ wordId, difficulty, optional = {} }, { token, userId } = checkUserInfo()) {
    const res = await this._apiService.putResourse({
      url: `/users/${userId}/words/${wordId}`,
      params: { difficulty, optional },
      hasToken: true,
      token,
    });
    return this._transformUserWord(res);
  }

  async deleteUserWord({ wordId }, { token, userId } = checkUserInfo()) {
    const res = await this._apiService.deleteResourse({
      url: `/users/${userId}/words/${wordId}`,
      hasToken: true,
      token,
    });
    return {
      isDeleted: res,
    };
  }

  _transformUserWord({
    id, wordId, difficulty, optional,
  }) {
    return {
      id,
      wordId,
      difficulty,
      optional: optional || null,
    };
  }
}
