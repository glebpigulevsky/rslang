import ApiService from '../common/service.common.apiService';

export default class Statistics {
  constructor() {
    this.apiService = new ApiService();
  }

  async getUserStatistics({ userId }) {
    const res = await this.apiService.getResource({ url: `/users/${userId}/statistics`, hasToken: true });
    return this.transformUserStatistics(res);
  }

  async updateUserStatistics({ userId, learnedWords, optional = {} }) {
    const res = await this.apiService.putResourse({
      url: `/users/${userId}/statistics`,
      params: { learnedWords, optional },
      hasToken: true,
    });
    return this.transformUserStatistics(res);
  }

  transformUserStatistics({ id, learnedWords, optional }) {
    return {
      id,
      learnedWords,
      optional,
    };
  }
}
