import { mainStorage } from './components/mainStorage/mainStorage';
import router from './components/router/router';
import './scss/main.styles.scss';

class Main {
  async init() {
    mainStorage.init();
    router.init();
  }
}

export default new Main();
