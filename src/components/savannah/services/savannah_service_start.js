import { getSavannahStart } from '../components/savannah_start';
import { getSavannahResult } from '../components/savannah_result';
import { getSavannahStatistics } from '../components/savannah_statistics';
import { getSavannahLiveVideo } from '../components/savannah_live_video';
import { Spinner } from '../../spinner/spinner';
import { getFinalCountdown } from '../common/savannah.common.utils';
import { getAnimatedBackground } from '../components/savannah_animated_background';

export class SavannahServiceStart {
  showSavannahStart() {
    const savannahContainer = document.querySelector('#js-savannah-game-wrap');
    savannahContainer.insertAdjacentHTML('beforeend', getSavannahStart());
  }

  showSavannahResult(correct, wrong) {
    const savannahContainer = document.querySelector('#js-savannah-game-wrap');
    savannahContainer.insertAdjacentHTML('beforeend',
      getSavannahResult({
        correct,
        wrong,
      }));
  }

  showSavannahStatistics(value) {
    return getSavannahStatistics(value);
  }

  showAnimatedBackground() {
    document.querySelector('#js-savannah-container').style.backgroundImage = ``;
    document.querySelector('#js-savannah-background-wrap').insertAdjacentHTML('afterbegin', getAnimatedBackground());
  }

  skipAnimatedBackground() {
    document.querySelector('#js-savannah-background-wrap').innerHTML = null;
  }

  showSavannahFinalCountdown() {
    getFinalCountdown('js-savannah__start_final_coundown', 3, 1, 4000);
  }

  showSavannahLiveVideo() {
    const savannahContainer = document.querySelector('#js-savannah-game-wrap');
    const spinner = new Spinner(savannahContainer);
    spinner.render();
    document.querySelector('#js-start_block').insertAdjacentHTML('beforeend', getSavannahLiveVideo());
    const iframeNode = document.querySelector('#js-savannah__modal_iframe');
    iframeNode.addEventListener('load', () => {
      document.querySelector('#savannah__modal').style.display = 'block';
      const closeBtn = document.querySelector('#js-savannah__modal_close');
      closeBtn.addEventListener('click', () => {
        this.removeSavannahLiveVideo();
      });
      spinner.remove();
    });
  }

  removeSavannahLiveVideo() {
    document.querySelector('#js-start_block').removeChild(document.querySelector('#savannah__modal'));
  }
}
