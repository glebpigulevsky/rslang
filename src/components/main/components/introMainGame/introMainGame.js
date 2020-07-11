import mainController from '../controller/main.controller';
import mainGame from '../mainGame/mainGame_New';
import spacedRepetitions from '../spacedRepetitions/spacedRepetitions';
import { DEFAULT_SETTINGS } from '../../../../services/common/services.common.constants';

import { EMPTY } from '../../../../common/common.constants';

class IntroMainGame {
  constructor() {
    this.elements = {
      container: EMPTY,
      mainGameStartButton: EMPTY,
      englishLevelInput: EMPTY,
    };

    this.init = this.init.bind(this);
    this.render = this.render.bind(this);
    this.onMainGameStartClickHandler = this.onMainGameStartClickHandler.bind(this);
    this.beforeUnloadHandler = this.beforeUnloadHandler.bind(this);
  }

  appendIntoDom(container = this.elements.container) {
    container.innerHTML = '';
    container.insertAdjacentHTML('afterbegin', this.render());
  }

  addChangeEnglishLevelHandler() {
    this.elements.englishLevelInput.addEventListener('change', mainController.onChangeEnglishLevelHandler);
  }

  removeChangeEnglishLevelHandler() {
    this.elements.englishLevelInput.removeEventListener('change', mainController.onChangeEnglishLevelHandler);
  }

  async onMainGameStartClickHandler() {
    const userEnglishLevel = this.elements.englishLevelInput.value || 0;

    mainController.isNewUser = false;
    this.removeHandlers();

    let userSettings = await mainController.getUserSettings();
    if (!userSettings) {
      userSettings = {
        wordsPerDay: DEFAULT_SETTINGS.wordsPerDay,
        optional: DEFAULT_SETTINGS.optional,
      };
    }
    mainController.userSettings = userSettings;

    mainController.spinner.show();
    await Promise.all([
      mainController.updateUserSettings(userSettings),
      spacedRepetitions.init(userEnglishLevel),
      spacedRepetitions.updateUserWords(),
    ]);

    // await mainController.updateUserSettings(userSettings);
    // await spacedRepetitions.init();
    // await spacedRepetitions.updateUserWords();
    mainController.spinner.hide();

    this.elements.container.innerHTML = '';
    this.elements.container.insertAdjacentHTML('afterbegin', mainGame.render());
    mainGame.init(mainController.userSettings, userEnglishLevel);
  }

  addMainGameStartButtonHandler() {
    this.elements.mainGameStartButton.addEventListener('click', this.onMainGameStartClickHandler);
  }

  removeMainGameStartButtonHandler() {
    this.elements.mainGameStartButton.removeEventListener('click', this.onMainGameStartClickHandler);
  }

  addHandlers() {
    this.addChangeEnglishLevelHandler();
    this.addMainGameStartButtonHandler();
  }

  removeHandlers() {
    this.removeChangeEnglishLevelHandler();
    this.removeMainGameStartButtonHandler();
  }

  beforeUnloadHandler() {
    this.removeHandlers();
    window.removeEventListener('beforeunload', this.beforeUnloadHandler);
  }

  init() {
    this.elements.container = document.querySelector('.main');
    this.elements.mainGameStartButton = document.querySelector('.main__game-start__button');
    this.elements.englishLevelInput = document.querySelector('#englishlevel');

    this.addHandlers();
    window.addEventListener('beforeunload', this.beforeUnloadHandler);
  }

  render() {
    return `
      <div class="main__game-start">
        <div class="main__game-start__description">
          Train 3600 essential english words. Based on russian
        </div>
        <button class="main__game-start__button linguist__button">Start studying</button>
      </div>

      <div class="main__game-level">
        <div class="main__game-level__description">Choose you current english level:</div>
        
        <datalist id="levellist">
          <option value="0" label="A0">
          <option value="1" label="A1">
          <option value="2" label="A2">
          <option value="3" label="B1">
          <option value="4" label="B2">
          <option value="5" label="C1">
        </datalist>
        <input id="englishlevel" type="range" min="0" max="5" step="1" list="levellist">
      </div>
    `;
  }
}

export default new IntroMainGame();
