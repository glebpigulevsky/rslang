import introMainGame from '../introMainGame/introMainGame';
import mainGame from '../mainGame/mainGame';

import { Spinner } from '../../../spinner/spinner';

import SettingsApi from '../../../../services/main/endpoints/services.main.endpoints.settings';

import { DEFAULT_ENGLISH_LEVEL } from '../../common/main.constants';
import { EMPTY } from '../../../../common/common.constants';
import { DEFAULT_SETTINGS } from '../../../../services/common/services.common.constants';

class LearnPage {
  constructor() {
    this.settingsBack = EMPTY;
    this.englishLevel = DEFAULT_ENGLISH_LEVEL;
    this.isNewUser = EMPTY;

    this.settingsAPI = new SettingsApi();
    this.spinner = EMPTY;

    this.loadUserSettings = this.loadUserSettings.bind(this);
    this.onChangeEnglishLevelHandler = this.onChangeEnglishLevelHandler.bind(this);
    this.init = this.init.bind(this);
    this.render = this.render.bind(this);
  }

  async loadUserSettings() {
    this.spinner.show();
    this.settingsBack = await this.settingsAPI.getSettings();
    if (!this.settingsBack) {
      this.isNewUser = true;
      this.settingsBack = { optional: DEFAULT_SETTINGS };
    }
    this.spinner.hide();
    return this.settingsBack;
  }

  onChangeEnglishLevelHandler(event) {
    this.englishLevel = event.target.value;
  }

  setState(settingsBack, isNewUser) {
    this.settingsBack = settingsBack;
    this.isNewUser = isNewUser;
  }

  init() {
    if (this.isNewUser) {
      this.isNewUser = false;
      introMainGame.onChangeEnglishLevelHandler = this.onChangeEnglishLevelHandler;
      introMainGame.startMainGame = () => mainGame.init(this.settingsBack, this.englishLevel);
      introMainGame.init();
    } else {
      mainGame.init(this.settingsBack, this.englishLevel);
    }
  }

  async render() {
    this.spinner = new Spinner(document.querySelector('.main'));
    this.spinner.init();

    await this.loadUserSettings();
    if (this.isNewUser) {
      return introMainGame.render();
    }
    return mainGame.render();
  }
}

export default new LearnPage();
