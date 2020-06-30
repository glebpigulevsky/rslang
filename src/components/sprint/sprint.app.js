import Select from './common/change-level';
import Timer from './common/timer';
import GameSprint from './common/game';
import './scss/sprint.styles.scss';

const timerJS = new Timer();
const game = new GameSprint();
const select = new Select();
const sprintApp = () => {
  timerJS.init();
  game.init();
  select.init();
};

export default sprintApp;
