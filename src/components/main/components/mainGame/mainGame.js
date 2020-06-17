import './scss/some_component.scss';
import { GAME_BLOCK, TEMPLATE_MAIN_GAME } from '../../common/main.constants';

const game = {

  addMdGameScreen() {
    GAME_BLOCK.innerHTML = '';
    GAME_BLOCK.append(TEMPLATE_MAIN_GAME.content.cloneNode(true));
  },

  init() {
    this.addMdGameScreen();
  },
};

export default game;
