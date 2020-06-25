import view from './common/view';
import Timer from './common/timer';
import game from './common/game';
import './scss/sprint.styles.scss';

const timerJS = new Timer();
const sprintApp = {
  render: () => view.renderDOM(),
  init: () => {
    timerJS.init();
    view.init();
    game.init();
  },
};

export default sprintApp;
