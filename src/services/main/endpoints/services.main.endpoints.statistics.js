import ApiService from '../../common/services.common.api_service';
import { MAIN_API_URL } from '../../common/services.common.constants';
import { GET_USER_DATA } from '../../common/services.common.api_service.helper';

export default class StatisticsApi {
  constructor() {
    this._apiService = new ApiService(MAIN_API_URL);
  }

  async getStatictics({ token, userId } = GET_USER_DATA()) {
    const res = await this._apiService.getResource({ url: `/users/${userId}/statistics`, hasToken: true, token });
    return this._transformUserStatistics(res);
  }

  async updateStatistics({ learnedWords, optional = {} }, { token, userId } = GET_USER_DATA()) {
    this._learnedWordsValidator({ learnedWords });
    const res = await this._apiService.putResourse({
      url: `/users/${userId}/statistics`,
      params: { learnedWords, optional },
      hasToken: true,
      token,
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
