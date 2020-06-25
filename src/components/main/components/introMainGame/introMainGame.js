import { GAME_BLOCK, TEMPLATE_MAIN_GAMEINTRO } from '../../common/main.constants';
import SettingsApi from '../../../../services/main/endpoints/services.main.endpoints.settings';
import {
  MAIN_API_URL,
} from '../../../../services/common/services.common.constants';
import game from '../mainGame/mainGame';
import ApiService from '../../../../services/common/services.common.api_service';
import { LocalStorageService } from '../../../../common/common.helper';

const settings = new SettingsApi();
const service = new LocalStorageService();

const introMainGame = {

  introButtons: {
    mainGameStart: null,
  },
  settingsBack: null,
  englishLevel: null,

  async init() {
    GAME_BLOCK.innerHTML = '';
    GAME_BLOCK.append(TEMPLATE_MAIN_GAMEINTRO.content.cloneNode(true));
    service.keyUserInfo = 'userInfo';
    const res = service.getUserInfo();
    settings._apiService = new ApiService(MAIN_API_URL, res.token);
    const set = await settings.getSettings({ userId: res.userId });
    this.settingsBack = set;

    this.initMd();
  },

  initMd() {
    this.englishLevel = document.getElementById('englishlevel').value;
    this.changeRangeLevel();
    this.introButtons.mainGameStart = document.querySelector('.main__game-start__button');
    this.introButtons.mainGameStart.addEventListener('click', this.onMainGameStartClickHandler);
    console.info(this.englishLevel);
    console.info(this.settingsBack);
  },

  changeRangeLevel() {
    document.getElementById('englishlevel').addEventListener('change', () => {
      this.englishLevel = document.getElementById('englishlevel').value;
      console.info(this.englishLevel);
    });
  },

  onMainGameStartClickHandler() {
    game.init(introMainGame.settingsBack, introMainGame.englishLevel);
  },

};

export default introMainGame;
