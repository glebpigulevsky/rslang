import {
  SettingsApi, StatisticsApi, UsersApi, UserWordsApi, WordsApi,
} from '../../../../services/services.methods';
import {
  MAIN_API_URL, TOKEN, GET_RANDOM, ERRORS_DESCRIPTION, MEDIA_LINK, LINK_TYPE, DEFAULT_SETTINGS,
} from '../../../../services/common/services.common.constants';
import ApiService from '../../../../services/common/services.common.api_service';
import { ErrorPopup } from '../../../error/error.error_popup';

const errorPopup = new ErrorPopup();
const user = new UsersApi();
const settings = new SettingsApi();
const userDefault = { // когда будет сделан логин получить инфу из локал сторадж
  email: 'rslang68@ya.ru',
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
    await this.loadSettingsToFront();
  },

  async getRemoteSettings() {
    const auth = await user.authenticateUser({
      email: userDefault.email,
      password: userDefault.password,
    });
    settings._apiService = new ApiService(MAIN_API_URL, auth.token);
    const set = await settings.getSettings({ userId: auth.userId });
    this.settings = set;
    if (this.settings === null) {
      errorPopup.openPopup({ text: 'Your settings will be default' });
      const res = await settings.updateSettings({
        userId: auth.userId,
        wordsPerDay: DEFAULT_SETTINGS.wordsPerDay,
        optional: DEFAULT_SETTINGS.optional,
      });
      this.settings = res;
      console.log(this.settings);
    }
  },

  loadSettingsToFront() {
    document.querySelector('.input-words__day').value = settingsPage.settings.wordsPerDay;
    Object.keys(settingsPage.settings.optional).forEach((key) => {
      if (settingsPage.settings.optional[key] === 'true') {
        document.querySelector(`#${key}`).classList.toggle('switch-on');
      }
    });
  },
};

export default settingsPage;
