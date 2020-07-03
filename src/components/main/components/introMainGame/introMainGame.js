import { EMPTY } from '../../../../common/common.constants';

class IntroMainGame {
  constructor() {
    this.elements = {
      container: EMPTY,
      mainGameStartButton: EMPTY,
      englishLevelInput: EMPTY,
    };
    this.englishLevel = EMPTY;
    this.settingsBack = EMPTY;

    this.init = this.init.bind(this);
    this.render = this.render.bind(this);
    this.onMainGameStartClickHandler = this.onMainGameStartClickHandler.bind(this);
    this.beforeUnloadHandler = this.beforeUnloadHandler.bind(this);
  }

  appendIntoDom(container = document.querySelector('.main')) {
    container.innerHTML = '';
    container.insertAdjacentHTML('afterbegin', this.render());
  }

  addChangeEnglishLevelHandler() {
    this.elements.englishLevelInput.addEventListener('change', this.onChangeEnglishLevelHandler);
  }

  removeChangeEnglishLevelHandler() {
    this.elements.englishLevelInput.removeEventListener('change', this.onChangeEnglishLevelHandler);
  }

  onMainGameStartClickHandler() {
    this.removeHandlers();
    this.startMainGame();
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

  beforeUnloadHandler() {
    this.removeHandlers();
  }

  init() {
    this.elements.mainGameStartButton = document.querySelector('.main__game-start__button');
    this.elements.englishLevelInput = document.querySelector('#englishlevel');

    this.addHandlers();
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
