import mainController from '../controller/main.controller';

import './scss/settingsPage.style.scss';

class SettingsPage {
  constructor() {
    this.element = {
      buttons: null,
      saveUserSettingsButton: null,
    };

    this.init = this.init.bind(this);
    this.saveUserSettings = this.saveUserSettings.bind(this);
  }

  loadSettingsToFront(userSettings) {
    document.querySelector('.input-words__day').value = userSettings.wordsPerDay;
    Object.keys(userSettings.optional).forEach((key) => {
      if (userSettings.optional[key] === 'true') {
        document.querySelector(`#${key}`).classList.toggle('switch-on');
      }
    });
  }

  async saveUserSettings() {
    const wordsPerDayFront = document.querySelector('.input-words__day').value;
    const optionalFront = {};
    this.buttons.forEach((button) => {
      if (button.classList.contains('switch-on')) {
        optionalFront[button.getAttribute('id')] = 'true';
      } else optionalFront[button.getAttribute('id')] = 'false';
    });
    await mainController.updateUserSettings({
      wordsPerDay: wordsPerDayFront,
      optional: optionalFront,
    });
  }

  async init() {
    this.buttons = document.querySelectorAll('.switch-btn');
    this.buttons.forEach((element) => {
      element.addEventListener('click', () => {
        element.classList.toggle('switch-on');
      });
    });

    await mainController.getUserSettings();
    this.loadSettingsToFront(mainController.userSettings);

    this.saveUserSettingsButton = document.querySelector('.save__settings');
    this.saveUserSettingsButton.addEventListener('click', this.saveUserSettings);
  }
}

export default new SettingsPage();
