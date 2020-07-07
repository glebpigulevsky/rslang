import { mainStorage } from './components/mainStorage/mainStorage';
import router from './components/router/router';
import './scss/main.styles.scss';

class Main {
  init() {
    router.init();
    mainStorage.init();
  }
}

export default new Main();
