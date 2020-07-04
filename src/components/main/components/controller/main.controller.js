import { Spinner } from '../../../spinner/spinner';

import SettingsApi from '../../../../services/main/endpoints/services.main.endpoints.settings';

import { EMPTY } from '../../../../common/common.constants';
import { DEFAULT_ENGLISH_LEVEL } from '../../common/main.constants';
import { DEFAULT_SETTINGS } from '../../../../services/common/services.common.constants';

class MainController {
  constructor() {
    this.userSettings = EMPTY;
    this.englishLevel = DEFAULT_ENGLISH_LEVEL;
    this.isNewUser = false;

    this.settingsAPI = new SettingsApi();
    this.spinner = EMPTY;

    this.getUserSettings = this.getUserSettings.bind(this);
    this.onChangeEnglishLevelHandler = this.onChangeEnglishLevelHandler.bind(this);

    this.init();
  }

  async getUserSettings() {
    this.spinner.show();
    this.userSettings = await this.settingsAPI.getSettings();
    if (!this.userSettings) {
      this.isNewUser = true;
      this.userSettings = {
        wordsPerDay: DEFAULT_SETTINGS.wordsPerDay,
        optional: DEFAULT_SETTINGS,
      };
    }
    this.spinner.hide();
    return this.userSettings;
  }

  async updateUserSettings(userSettings = this.userSettings) {
    const response = await this.settingsAPI.updateSettings({
      wordsPerDay: userSettings.wordsPerDay,
      optional: userSettings.optional,
    });
    if (response) this.userSettings = response;
  }

  onChangeEnglishLevelHandler(event) {
    this.englishLevel = event.target.value;
  }

  init() {
    this.spinner = new Spinner(document.body);
    this.spinner.init();
  }
}

export default new MainController();
