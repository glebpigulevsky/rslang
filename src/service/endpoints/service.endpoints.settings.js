import ApiService from '../common/service.common.apiService';

export default class Settings {
  constructor() {
    this.apiService = new ApiService();
  }

  async getUserSettings({ userId }) {
    const res = await this.apiService.getResource({ url: `/users/${userId}/settings`, hasToken: true });
    return this.transformUserSettings(res);
  }

  async updateUserSettings({ userId, wordsPerDay, optional = {} }) {
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
      console.info('\'wordsPerDay\' should be greather then 0');
    }
  }

  transformUserSettings({ id, wordsPerDay, optional }) {
    return {
      id,
      wordsPerDay,
      optional,
    };
  }
}
