import './scss/main.scss';
import './scss/puzzle.scss';

import model from './components/model/model';
import view from './components/view/view';
import controller from './components/controller/controller';

const englishPuzzleAppInit = () => {
  model.init();
  view.init();
  controller.init();
};

export default englishPuzzleAppInit;
