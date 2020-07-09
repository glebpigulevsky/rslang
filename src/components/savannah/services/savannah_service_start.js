import { getSavannahStart } from '../components/savannah_start';
import background from '../assets/img/bgSavannah.jpg';
import { Spinner } from '../../spinner/spinner';

export class SavannahServiceStart {
  showSavannahStart() {
    const savannahContainer = document.querySelector('#js-savannah-container');
    savannahContainer.insertAdjacentHTML('beforeend', getSavannahStart());
    const spinner = new Spinner(savannahContainer);
    spinner.render();
    const image = document.createElement('img');
    image.src = background;
    image.onload = () => {
      document.querySelector('#js-savannah-container').style.backgroundImage = `url(${background})`;
      spinner.remove();
    };
  }
}
