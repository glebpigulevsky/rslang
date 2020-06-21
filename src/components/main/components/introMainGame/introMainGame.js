import { MAIN_GREETINGS, GAME_BLOCK, TEMPLATE_MAIN_GAMEINTRO } from '../../common/main.constants';
import SettingsApi from '../../../../services/main/endpoints/services.main.endpoints.settings';
import UsersApi from '../../../../services/main/endpoints/services.main.endpoints.users';
import {
  MAIN_API_URL, TOKEN, ERRORS_DESCRIPTION, MEDIA_LINK,
} from '../../../../services/common/services.common.constants';
import game from '../mainGame/mainGame';
import ApiService from '../../../../services/common/services.common.api_service';

const settings = new SettingsApi();
const user = new UsersApi();
const userDefault = {
  email: 'pigulevsky.gleb@gmail.com',
  password: 'Carver2017?',
  id: '5eeb987b98ffbf00174581a7',
};
const optional = {
  cardsDay: '4',
  isTranslation: 'true',
  isTranscription: 'true',
  isPicture: 'true',
  isAddSentExplWord: 'true',
  isAddSentUsingWord: 'true',
  isShowAnswerButton: 'true',
  isShowDiffMoveButton: 'true',
  isShowDeleteButton: 'true',
  isShowAgainButton: 'true',
  isShowDiffButton: 'true',
  isShowGoodButton: 'true',
  isShowEasyButton: 'true',
};
const introMainGame = {

  introButtons: {
    mainGameStart: null,
  },

  async init() {
    GAME_BLOCK.innerHTML = '';
    GAME_BLOCK.append(TEMPLATE_MAIN_GAMEINTRO.content.cloneNode(true));
    const auth = await user.authenticateUser({
      email: userDefault.email,
      password: userDefault.password,
    });
    settings.apiService = new ApiService(MAIN_API_URL, auth.token);
    settings.updateSettings({ userId: userDefault.id, wordsPerDay: 1, optional })
      .then((res) => {
        introMainGame.settings = res;
      })
      .catch((err) => {
        console.log(err);
      });
    this.initMd();  //---- чтобы включить стартовый экран расскоментить и удалить следующую строку
    //game.init(introMainGame.settings);
  },

  initMd() {
    this.introButtons.mainGameStart = document.querySelector('.main__game-start__button');
    this.introButtons.mainGameStart.addEventListener('click', this.onMainGameStartClickHandler);
  },

  onMainGameStartClickHandler() {
    game.init(introMainGame.settings);
  },

};

export default introMainGame;
