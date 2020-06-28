import View from './common/view';
import Timer from './common/timer';
import GameSprint from './common/game';
import Spinner from '../spinner/spinner';
import './scss/sprint.styles.scss';

const timerJS = new Timer();
const view = new View();
const game = new GameSprint();
// const spinner = new Spinner();
const sprintApp = {
  render: () => view.renderDOM(),
  init: () => {
    timerJS.init();
    game.init();
    // spinner.init();
  },
};

export default sprintApp;
