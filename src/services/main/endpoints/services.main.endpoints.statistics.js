import ApiService from '../../common/services.common.api_service';
import { MAIN_API_URL, TOKEN } from '../../common/services.common.constants';

export default class StatisticsApi {
  constructor() {
    this.apiService = new ApiService(MAIN_API_URL, TOKEN);
  }

  async getStatictics({ userId }) {
    const res = await this.apiService.getResource({ url: `/users/${userId}/statistics`, hasToken: true });
    return this._transformUserStatistics(res);
  }

  async updateStatistics({ userId, learnedWords, optional = {} }) {
    this._learnedWordsValidator({ learnedWords });
    const res = await this.apiService.putResourse({
      url: `/users/${userId}/statistics`,
      params: { learnedWords, optional },
      hasToken: true,
    });
    return this._transformUserStatistics(res);
  }

  _learnedWordsValidator({ learnedWords }) {
    if (!Number.isInteger(learnedWords)) {
      console.info("Statictics: 'learnedWords' should be integer (equal or greater then 0)");
    }
  }

  _transformUserStatistics({ id, learnedWords, optional }) {
    return {
      id,
      learnedWords,
      optional: optional || null,
    };
  }
}
