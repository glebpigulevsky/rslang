// import { GAME_BLOCK, TEMPLATE_MAIN_GAMEINTRO } from '../../common/main.constants';
import SettingsApi from '../../../../services/main/endpoints/services.main.endpoints.settings';
// import { MAIN_API_URL } from '../../../../services/common/services.common.constants';
import game from '../mainGame/mainGame';
import { Spinner } from '../../../spinner/spinner';
// import ApiService from '../../../../services/common/services.common.api_service';
// import { LocalStorageService } from '../../../../common/common.helper';

// const settings = new SettingsApi();
// const service = new LocalStorageService();

import { EMPTY } from '../../../../common/common.constants';
import { DEFAULT_SETTINGS } from '../../../../services/common/services.common.constants'; // это добавил я для дефолтных настроек

class IntroMainGame {
  constructor() {
    this.elements = {
      container: EMPTY,
      mainGameStartButton: EMPTY,
      englishLevelInput: EMPTY,
    };
    this.englishLevel = EMPTY;
    this.settingsBack = EMPTY;

    this.settingsAPI = new SettingsApi();
    this.spinner = EMPTY;

    this.init = this.init.bind(this);
    this.render = this.render.bind(this);
    this.onChangeEnglishLevelHandler = this.onChangeEnglishLevelHandler.bind(this);
    this.onMainGameStartClickHandler = this.onMainGameStartClickHandler.bind(this);
    this.beforeUnloadHandler = this.beforeUnloadHandler.bind(this);
  }

  appendIntoDom(container = document.querySelector('.main')) {
    container.innerHTML = '';
    container.insertAdjacentHTML('afterbegin', this.render());
  }

  initEnglishLevel() {
    this.englishLevel = this.elements.englishLevelInput.value || 0;
    console.info(this.englishLevel); // todo убрать
  }

  onChangeEnglishLevelHandler(event) {
    this.englishLevel = event.target.value;
    console.info(this.englishLevel); // todo убрать
  }

  addChangeEnglishLevelHandler() {
    this.elements.englishLevelInput.addEventListener('change', this.onChangeEnglishLevelHandler);
  }

  removeChangeEnglishLevelHandler() {
    this.elements.englishLevelInput.removeEventListener('change', this.onChangeEnglishLevelHandler);
  }

  onMainGameStartClickHandler() {
    this.removeHandlers();
    game.init(this.settingsBack, this.englishLevel);
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
    window.removeEventListener('beforeunload', this.beforeUnloadHandler);
  }

  async loadUserSettings() {
    this.spinner.show();
    this.settingsBack = await this.settingsAPI.getSettings() || { optional: DEFAULT_SETTINGS };
    this.spinner.hide();
  }

  beforeUnloadHandler() {
    this.removeHandlers();
  }

  async init() {
    // GAME_BLOCK.innerHTML = '';
    // GAME_BLOCK.append(TEMPLATE_MAIN_GAMEINTRO.content.cloneNode(true));

    // service.keyUserInfo = 'userInfo'; // * По сути это все Асилия сделала в своей части работы
    // const res = service.getUserInfo();
    // settings._apiService = new ApiService(MAIN_API_URL, res.token);
    // const set = await settings.getSettings({ userId: res.userId });
    // this.settingsBack = set;
    this.elements.mainGameStartButton = document.querySelector('.main__game-start__button');
    this.elements.englishLevelInput = document.querySelector('#englishlevel');
    this.spinner = new Spinner(document.querySelector('.main'));
    this.spinner.init();

    this.initEnglishLevel();
    this.addHandlers();
    this.loadUserSettings();

    // this.renderMainIntro();
    window.addEventListener('beforeunload', this.beforeUnloadHandler);
  }

  render() {
    return `
      <div class="main__game-start">
        <div class="main__game-start__description">
          "English words" game.<br>
          <span>Based on russian</span>
        </div>
        <button class="main__game-start__button">Start lesson</button>
      </div>

      <div class="main__game-level">
        <div class="main__game-level__description">Выберите свой уровень для тренировки:</div>
        
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

      <div class="main__game-stat">
        <div class="main__game-stat__today">Today</div>
        <div class="main__game-stat__week">Weekly progress</div>
      </div>
    `;
  }
}

export default new IntroMainGame();
