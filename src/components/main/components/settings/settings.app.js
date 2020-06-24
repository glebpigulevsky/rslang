import {
  SettingsApi, StatisticsApi, UsersApi, UserWordsApi, WordsApi,
} from '../../../../services/services.methods';
import {
  MAIN_API_URL, TOKEN, GET_RANDOM, ERRORS_DESCRIPTION, MEDIA_LINK, LINK_TYPE, DEFAULT_SETTINGS,
} from '../../../../services/common/services.common.constants';
import ApiService from '../../../../services/common/services.common.api_service';

const user = new UsersApi();
const settings = new SettingsApi();
const userDefault = { // когда будет сделан логин получить инфу из локал сторадж
  email: 'rslang61@ya.ru',
  password: 'Rslang61?',
};

const settingsPage = {
  buttons: null,
  settings: null,

  async init() {
    this.buttons = document.querySelectorAll('.switch-btn');
    this.buttons.forEach(element => {
      element.addEventListener('click', () => {
        element.classList.toggle('switch-on');
      });
    });
    await this.getRemoteSettings();
  },

  async getRemoteSettings() {
    const auth = await user.authenticateUser({
      email: userDefault.email,
      password: userDefault.password,
    });
    settings._apiService = new ApiService(MAIN_API_URL, auth.token);
    const set = await settings.getSettings({ userId: auth.userId });
    this.settings = await set;
    console.log(set);
    if (set === null) {
      const res = await settings.updateSettings({
        userId: auth.id,
        wordsPerDay: DEFAULT_SETTINGS.wordsPerDay,
        optional: DEFAULT_SETTINGS.optional });
      console.log(res);
    }
    console.log(auth);
  },

  loadDefaultSettings() {

  }
};

export default settingsPage;
