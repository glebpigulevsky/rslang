import { getSavannahStart } from '../components/savannah_start';
import { getSavannahResult } from '../components/savannah_result';
import { getSavannahStatistics } from '../components/savannah_statistics';
import background from '../assets/img/startSavannah.png';
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

  showSavannahResult(correct, wrong) {
    const savannahContainer = document.querySelector('#js-savannah-container');
    savannahContainer.insertAdjacentHTML('beforeend',
      getSavannahResult({
        correct,
        wrong,
      }));
    const spinner = new Spinner(savannahContainer);
    spinner.render();
    const image = document.createElement('img');
    image.src = background;
    image.onload = () => {
      document.querySelector('#js-savannah-container').style.backgroundImage = `url(${background})`;
      spinner.remove();
    };
  }

  showSavannahStatistics(value) {
    return getSavannahStatistics(value);
  }
}
