import Select from './components/controls';
import GameSprint from './components/game';
import './scss/sprint.styles.scss';

const game = new GameSprint();
const select = new Select();
const sprintApp = () => {
  game.init();
  select.init();
};

export default sprintApp;
