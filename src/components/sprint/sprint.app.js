import './scss/sprint.styles.scss';
import Timer from './common/timer';
import View from './common/view';
import GameSprint from './common/game';

const timerJS = new Timer();
const game = new GameSprint();

const sprintGameInit = () => {
  View.init();
  timerJS.init();
  game.init();
};

export default sprintGameInit;
