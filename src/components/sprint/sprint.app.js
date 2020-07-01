import Select from './components/controls';
import Timer from './components/timer';
import GameSprint from './components/game';
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
