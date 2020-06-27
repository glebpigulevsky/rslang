import './main/scss/main.scss';

import controller from './components/controller/controller';
import model from './components/model/model';
import view from './components/view/view';

const speakItApp = () => {
  view.init();
  model.init();
  controller.init();
};

export default speakItApp;
