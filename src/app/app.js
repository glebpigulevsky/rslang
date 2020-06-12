import Controller from './controller/controller';
import Model from './model/model';
import View from './view/view';

import '../main/scss/main.scss';

const model = new Model();
const view = new View();
const controller = new Controller(model, view);

window.onload = () => {
  view.init();
  model.init();
  controller.init();
};
