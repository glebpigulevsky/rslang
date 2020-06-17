import './scss/some_component.scss';
import { GAME_BLOCK, TEMPLATE_MAIN_GAME } from '../../common/main.constants';
import {
  SettingsApi, StatisticsApi, UsersApi, UserWordsApi, WordsApi,
} from '../../../../services/services.methods';

const wordsApi = new WordsApi();
const game = {

  async addMdGameScreen() {
    GAME_BLOCK.innerHTML = '';
    GAME_BLOCK.append(TEMPLATE_MAIN_GAME.content.cloneNode(true));
    const res = await wordsApi.getWordsCollection({ group: 0, page: 1 });
    console.log(res);
  },

  init() {
    this.addMdGameScreen();
  },
};

export default game;
