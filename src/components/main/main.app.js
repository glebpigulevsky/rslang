import { mainStorage } from './components/mainStorage/mainStorage';
import spacedRepetitions from './components/spacedRepetitions/spacedRepetitions';
import router from './components/router/router';
import './scss/main.styles.scss';

class Main {
  init() {
    router.init();
    mainStorage.init();
    spacedRepetitions.init();
  }
}

export default new Main();
