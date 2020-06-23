import View from './common/view';
import Timer from './common/timer';
import './scss/sprint.styles.scss';

const timerJS = new Timer();
const sprintGameInit = () => {
  View.init();
  timerJS.init();
};

export default sprintGameInit;
