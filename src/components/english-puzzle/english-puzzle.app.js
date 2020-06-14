import './scss/main.scss';

import model from './components/model/model';
import view from './components/view/view';
import controller from './components/controller/controller';
// import menuController from './components/controller/menu.controller';
// import dragAndDropController from './components/controller/drag-and-drop.controller';

const englishPuzzleAppInit = () => {
  model.init();
  view.init();

  controller.init();
  // dragAndDropController.init();
  // menuController.init();
};

export default englishPuzzleAppInit;
