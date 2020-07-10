import mainController from '../controller/main.controller';

import './scss/settingsPage.style.scss';

const LIMITS = {
  WORDS_PER_DAY: {
    MIN: 5,
    MAX: 100,
  },
  CARDS_PER_DAY: {
    MIN: 20,
    MAX: 100,
  },
};

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
    document.querySelector('.input-cards__day').value = userSettings.optional.cardsPerDay;
    Object.keys(userSettings.optional).forEach((key) => {
      if (userSettings.optional[key] === true) {
        const optionElement = document.querySelector(`#${key}`);
        if (optionElement) optionElement.classList.toggle('switch-on');
      }
    });
  }

  async saveUserSettings() {
    const wordsPerDayFront = document.querySelector('.input-words__day').value;
    const optionalFront = {};
    optionalFront.cardsPerDay = document.querySelector('.input-cards__day').value;
    this.buttons.forEach((button) => {
      if (button.classList.contains('switch-on')) {
        optionalFront[button.getAttribute('id')] = true;
      } else optionalFront[button.getAttribute('id')] = false;
    });
    optionalFront.englishLevel = mainController.englishLevel;
    mainController.spinner.show();
    await mainController.updateUserSettings({
      wordsPerDay: wordsPerDayFront,
      optional: optionalFront,
    });
    mainController.spinner.hide();
  }

  async init() {
    this.buttons = document.querySelectorAll('.switch-btn');
    this.buttons.forEach((element) => {
      element.addEventListener('click', () => {
        element.classList.toggle('switch-on');
      });
    });

    mainController.spinner.show();
    await mainController.getUserSettings();
    mainController.spinner.hide();
    this.loadSettingsToFront(mainController.userSettings);

    this.saveUserSettingsButton = document.querySelector('.save__settings');
    this.saveUserSettingsButton.addEventListener('click', this.saveUserSettings);

    document.querySelector('.input-words__day').addEventListener('input', (event) => {
      if (event.target.value < LIMITS.WORDS_PER_DAY.MIN) {
        event.target.value = LIMITS.WORDS_PER_DAY.MIN;
      }
      if (event.target.value > LIMITS.WORDS_PER_DAY.MAX) {
        event.target.value = LIMITS.WORDS_PER_DAY.MAX;
      }
    });

    document.querySelector('.input-cards__day').addEventListener('input', (event) => {
      if (event.target.value < LIMITS.CARDS_PER_DAY.MIN) {
        event.target.value = LIMITS.CARDS_PER_DAY.MIN;
      }
      if (event.target.value > LIMITS.CARDS_PER_DAY.MAX) {
        event.target.value = LIMITS.CARDS_PER_DAY.MAX;
      }
    });

    document.querySelector('#isTranslation').addEventListener('click', (event) => {
      const isTextExample = document.querySelector('#isExampleSentence').classList.contains('switch-on');
      const isTextMeaning = document.querySelector('#isMeaningSentence').classList.contains('switch-on');

      if (!isTextExample && !isTextMeaning) event.target.classList.add('switch-on');
    });

    document.querySelector('#isExampleSentence').addEventListener('click', (event) => {
      const isTranslation = document.querySelector('#isTranslation').classList.contains('switch-on');
      const isTextMeaning = document.querySelector('#isMeaningSentence').classList.contains('switch-on');

      if (!isTranslation && !isTextMeaning) event.target.classList.add('switch-on');
    });

    document.querySelector('#isMeaningSentence').addEventListener('click', (event) => {
      const isTranslation = document.querySelector('#isTranslation').classList.contains('switch-on');
      const isTextExample = document.querySelector('#isExampleSentence').classList.contains('switch-on');

      if (!isTranslation && !isTextExample) event.target.classList.add('switch-on');
    });
  }
}

export default new SettingsPage();
