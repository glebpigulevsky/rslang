import './scss/drop.styles.scss';
import DropGame from './components/model';

const drop = new DropGame();

const dropApp = () => {
  drop.init();
};

export default dropApp;
