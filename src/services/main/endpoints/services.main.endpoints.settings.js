import ApiService from '../../common/services.common.api_service';
import { MAIN_API_URL, LINK_TYPE } from '../../common/services.common.constants';
import { checkUserInfo } from '../../common/services.common.api_service.helper';

export default class SettingsApi {
  constructor() {
    this._apiService = new ApiService(MAIN_API_URL);
  }

  async getSettings({ token, userId } = checkUserInfo()) {
    const res = await this._apiService.getResource({
      url: `/users/${userId}/settings`,
      hasToken: true,
      token,
      type: LINK_TYPE.Settings,
    });
    return res ? this._transformUserSettings(res) : res;
  }

  async updateSettings({ wordsPerDay, optional = {} }, { token, userId } = checkUserInfo()) {
    const res = await this._apiService.putResourse({
      url: `/users/${userId}/settings`,
      params: { wordsPerDay, optional },
      hasToken: true,
      token,
    });
    return this._transformUserSettings(res);
  }

  _transformUserSettings({ id, wordsPerDay, optional }) {
    return {
      id,
      wordsPerDay,
      optional: optional || null,
    };
  }
}
