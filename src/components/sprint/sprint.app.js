import './scss/sprint.styles.scss';
import Timer from './common/timer';
import View from './common/view';

const timerJS = new Timer();

const sprintGameInit = () => {
  View.init();
  timerJS.init();
};

export default sprintGameInit;
