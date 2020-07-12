import mainController from '../controller/main.controller';

import { EMPTY } from '../../../../common/common.constants';

import './scss/settingsPage.style.scss';

const LIMITS = {
  WORDS_PER_DAY: {
    MIN: 10,
    MAX: 100,
  },
  CARDS_PER_DAY: {
    MIN: 20,
    MAX: 100,
  },
};

class SettingsPage {
  constructor() {
    this.elements = {
      buttons: EMPTY,
      saveUserSettingsButton: EMPTY,
      inputs: {
        wordsPerDay: EMPTY,
        cardsPerDay: EMPTY,
      },
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
    this.elements.buttons.forEach((button) => {
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
    this.elements.buttons = document.querySelectorAll('.switch-btn');
    this.elements.buttons.forEach((element) => {
      element.addEventListener('click', () => {
        element.classList.toggle('switch-on');
      });
    });

    mainController.spinner.show();
    await mainController.getUserSettings();
    mainController.spinner.hide();
    this.loadSettingsToFront(mainController.userSettings);

    this.elements.saveUserSettingsButton = document.querySelector('.save__settings');
    this.elements.inputs.wordsPerDay = document.querySelector('.input-words__day');
    this.elements.inputs.cardsPerDay = document.querySelector('.input-cards__day');

    this.elements.saveUserSettingsButton.addEventListener('click', this.saveUserSettings);

    this.elements.translation = document.querySelector('#isTranslation');
    this.elements.example = document.querySelector('#isExampleSentence');
    this.elements.meaning = document.querySelector('#isMeaningSentence');

    this.elements.inputs.wordsPerDay.addEventListener('change', (event) => {
      if (event.target.value < LIMITS.WORDS_PER_DAY.MIN) {
        event.target.value = LIMITS.WORDS_PER_DAY.MIN;
      }
      if (event.target.value > LIMITS.WORDS_PER_DAY.MAX) {
        event.target.value = LIMITS.WORDS_PER_DAY.MAX;
      }
    });

    this.elements.inputs.cardsPerDay.addEventListener('change', (event) => {
      if (event.target.value < LIMITS.CARDS_PER_DAY.MIN) {
        event.target.value = LIMITS.CARDS_PER_DAY.MIN;
      }
      if (event.target.value > LIMITS.CARDS_PER_DAY.MAX) {
        event.target.value = LIMITS.CARDS_PER_DAY.MAX;
      }
    });

    this.elements.translation.addEventListener('click', (event) => {
      const isTextExample = this.elements.example.classList.contains('switch-on');
      const isTextMeaning = this.elements.meaning.classList.contains('switch-on');

      if (!isTextExample && !isTextMeaning) event.target.classList.add('switch-on');
    });

    this.elements.example.addEventListener('click', (event) => {
      const isTranslation = this.elements.translation.classList.contains('switch-on');
      const isTextMeaning = this.elements.meaning.classList.contains('switch-on');

      if (!isTranslation && !isTextMeaning) event.target.classList.add('switch-on');
    });

    this.elements.meaning.addEventListener('click', (event) => {
      const isTranslation = this.elements.translation.classList.contains('switch-on');
      const isTextExample = this.elements.example.classList.contains('switch-on');

      if (!isTranslation && !isTextExample) event.target.classList.add('switch-on');
    });
  }
}

export default new SettingsPage();
