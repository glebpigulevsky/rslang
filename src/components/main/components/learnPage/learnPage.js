import mainController from '../controller/main.controller';
import introMainGame from '../introMainGame/introMainGame';
import mainGame from '../mainGame/mainGame';

class LearnPage {
  constructor() {
    this.init = this.init.bind(this);
    this.render = this.render.bind(this);
  }

  init() {
    if (mainController.isNewUser) {
      mainController.isNewUser = false;
      introMainGame.init();
    } else {
      mainGame.init(mainController.userSettings, mainController.englishLevel);
    }
  }

  async render() {
    await mainController.getUserSettings();
    if (mainController.isNewUser) {
      return introMainGame.render();
    }
    return mainGame.render();
  }
}

export default new LearnPage();
