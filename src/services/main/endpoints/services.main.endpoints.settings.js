import ApiService from '../../common/services.common.api_service';
import { MAIN_API_URL, TOKEN } from '../../common/services.common.constants';

export default class SettingsApi {
  constructor() {
    this.apiService = new ApiService(MAIN_API_URL, TOKEN);
  }

  async getSettings({ userId }) {
    const res = await this.apiService.getResource({ url: `/users/${userId}/settings`, hasToken: true });
    return this.transformUserSettings(res);
  }

  async updateSettings({ userId, wordsPerDay, optional = {} }) {
    this.wordsPerDayValidator(wordsPerDay);
    const res = await this.apiService.putResourse({
      url: `/users/${userId}/settings`,
      params: { wordsPerDay, optional },
      hasToken: true,
    });
    return this.transformUserSettings(res);
  }

  wordsPerDayValidator({ wordsPerDay }) {
    if (wordsPerDay < 1) {
      console.info("'wordsPerDay' should be greather then 0");
    }
  }

  transformUserSettings({ id, wordsPerDay, optional }) {
    return {
      id,
      wordsPerDay,
      optional: optional || null,
    };
  }
}
