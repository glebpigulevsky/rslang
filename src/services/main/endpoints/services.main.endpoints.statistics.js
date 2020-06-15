import ApiService from '../../common/services.common.api_service';
import { MAIN_API_URL } from '../../common/services.common.constants';

export default class Statistics {
  constructor() {
    this.apiService = new ApiService(MAIN_API_URL);
  }

  async getStatictics({ userId }) {
    const res = await this.apiService.getResource({ url: `/users/${userId}/statistics`, hasToken: true });
    return this.transformUserStatistics(res);
  }

  async updateStatistics({ userId, learnedWords, optional = {} }) {
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
