import ApiService from '../common/service.common.apiService';

export default class UserWords {
  constructor() {
    this.apiService = new ApiService();
  }

  async createUserWord({
    userId, wordId, difficulty, optional = {},
  }) {
    const res = await this.apiService.postResourse({
      url: `/users/${userId}/words/${wordId}`,
      params: { difficulty, optional },
      hasToken: true,
    });
    return this.transformUserWord(res);
  }

  async getUserWordsCollection({ userId }) {
    const res = await this.apiService.getResource({ url: `/users/${userId}/words`, hasToken: true });
    return res.map(this.transformUserWord);
  }

  async getUserWord({ userId, wordId }) {
    const res = await this.apiService.getResource({ url: `/users/${userId}/words/${wordId}`, hasToken: true });
    return this.transformUserWord(res);
  }

  async updateUserWord({
    userId, wordId, difficulty, optional = {},
  }) {
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

  transformUserWord({
    id, wordId, difficulty, optional,
  }) {
    return {
      id,
      wordId,
      difficulty,
      optional,
    };
  }
}
