import { MAIN_GREETINGS, GAME_BLOCK, TEMPLATE_MAIN_GAMEINTRO } from '../../common/main.constants';
import SettingsApi from '../../../../services/main/endpoints/services.main.endpoints.settings';
import {
  MAIN_API_URL, TOKEN, ERRORS_DESCRIPTION, MEDIA_LINK, OPTIONAL_DEFAULT,
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

  englishLevel: null,

  async init() {
    //this.englishLevel = document.getElementById('englishlevel').value;
    GAME_BLOCK.innerHTML = '';
    GAME_BLOCK.append(TEMPLATE_MAIN_GAMEINTRO.content.cloneNode(true));
    service.keyUserInfo = 'userInfo';
    const res = service.getUserInfo();

    settings._apiService = new ApiService(MAIN_API_URL, res.token);
    settings.updateSettings({ userId: res.userId, wordsPerDay: 1, optional: OPTIONAL_DEFAULT })
      .then((res) => {
        console.log(res);
        introMainGame.settings = res;
      })
      .catch((err, res) => {
        console.log(res);
        console.log(err);
      });
    settings.getSettings({ userId: res.userId })
      .then((res) => {
        console.log(res);
        introMainGame.settings = res;
      })
      .catch((err, res) => {
        console.log(res);
        console.log(err);
      });

    
    this.initMd();  //---- чтобы включить стартовый экран расскоментить и удалить следующую строку
    //game.init(introMainGame.settings);
  },

  initMd() {
    this.englishLevel = document.getElementById('englishlevel').value;
    this.changeRangeLevel();
    this.introButtons.mainGameStart = document.querySelector('.main__game-start__button');
    this.introButtons.mainGameStart.addEventListener('click', this.onMainGameStartClickHandler);
    console.info(this.englishLevel);
  },

  changeRangeLevel() {
    document.getElementById('englishlevel').addEventListener('change', () => {
      this.englishLevel = document.getElementById('englishlevel').value;
      console.info(this.englishLevel);
    });
  },

  onMainGameStartClickHandler() {
    game.init(introMainGame.settings, introMainGame.englishLevel);
  },

};

export default introMainGame;
