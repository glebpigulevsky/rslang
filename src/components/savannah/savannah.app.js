import { SavannahGame } from './services/savannah_game';

const savannahApp = () => {
  const savannah = new SavannahGame();
  savannah.init();
};

savannahApp.unmount = () => { document.querySelector('.main-header').style.display = 'block'; };

export default savannahApp;
