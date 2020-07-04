import GameSprint from './components/game';
import './scss/sprint.styles.scss';

const game = new GameSprint();
const sprintApp = () => {
  game.init();
};

export default sprintApp;
