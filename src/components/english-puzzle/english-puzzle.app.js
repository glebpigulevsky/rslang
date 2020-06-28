import './scss/english-puzzle.styles.scss';

import model from './components/model/model';
import view from './components/view/view';
import controller from './components/controller/controller';

const englishPuzzleApp = () => {
  model.init();
  view.init();
  controller.init();
};

export default englishPuzzleApp;
