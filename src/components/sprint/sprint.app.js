import View from './common/view';
import Timer from './common/timer';
import GameSprint from './common/game';
import './scss/sprint.styles.scss';

const timerJS = new Timer();
const view = new View();
const game = new GameSprint();
const sprintApp = {
  render: () => view.renderDOM(),
  init: () => {
    timerJS.init();
    // render.init();
    game.init();
  },
};

export default sprintApp;
