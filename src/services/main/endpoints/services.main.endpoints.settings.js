import ApiService from '../../common/services.common.api_service';
import { MAIN_API_URL } from '../../common/services.common.constants';
import { GET_USER_DATA } from '../../common/services.common.api_service.helper';

export default class SettingsApi {
  constructor() {
    this._apiService = new ApiService(MAIN_API_URL);
  }

  async getSettings({ token, userId } = GET_USER_DATA()) {
    const res = await this._apiService.getResource({ url: `/users/${userId}/settings`, hasToken: true, token });
    return this._transformUserSettings(res);
  }

  async updateSettings({ wordsPerDay, optional = {} }, { token, userId } = GET_USER_DATA()) {
    this._wordsPerDayValidator(wordsPerDay);
    const res = await this._apiService.putResourse({
      url: `/users/${userId}/settings`,
      params: { wordsPerDay, optional },
      hasToken: true,
      token,
    });
    return this._transformUserSettings(res);
  }

  _wordsPerDayValidator({ wordsPerDay }) {
    if (wordsPerDay < 1) {
      console.info("'wordsPerDay' should be greather then 0");
    }
  }

  _transformUserSettings({ id, wordsPerDay, optional }) {
    return {
      id,
      wordsPerDay,
      optional: optional || null,
    };
  }
}
