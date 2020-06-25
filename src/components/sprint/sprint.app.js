import View from './common/view';
import Timer from './common/timer';
import GameSprint from './common/game';
import './scss/sprint.styles.scss';

const timerJS = new Timer();
const game = new GameSprint();

const sprintGameInit = () => {
  View.init();
  timerJS.init();
  game.init();
};

export default sprintGameInit;