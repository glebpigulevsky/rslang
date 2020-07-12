import { getSavannahStart } from '../components/savannah_start';
import { getSavannahResult } from '../components/savannah_result';
import { getSavannahStatistics } from '../components/savannah_statistics';
import background from '../assets/img/startSavannah.png';
import { Spinner } from '../../spinner/spinner';
import { getFinalCountdown } from '../common/savannah.common.utils';
import { getAnimatedBackground } from '../components/savannah_animated_background';

export class SavannahServiceStart {
  showSavannahStart() {
    const savannahContainer = document.querySelector('#js-savannah-game-wrap');
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
    const savannahContainer = document.querySelector('#js-savannah-game-wrap');
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

  showAnimatedBackground() {
    document.querySelector('#js-savannah-background-wrap').insertAdjacentHTML('afterbegin', getAnimatedBackground());
  }

  skipAnimatedBackground() {
    document.querySelector('#js-savannah-background-wrap').innerHTML = null;
  }

  showSavannahFinalCountdown() {
    getFinalCountdown('js-savannah__start_final_coundown', 3, 1, 3000);
  }
}
