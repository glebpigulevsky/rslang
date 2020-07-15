import './scss/promo.styles.scss';
import { LoginUser } from '../login_user/login_user.popup';
import { Spinner } from '../spinner/spinner';
import { getPromoVideo } from './promo_video_component';
import * as observable from '../../common/utils/common.utils.observable';

class Promo {
  openLoginPopup() {
    this.submitBtn.addEventListener('click', this._openLoginHandler.bind(this));
  }

  _openLoginHandler() {
    const loginUser = new LoginUser();
    loginUser.showLoginPopup();
    observable.subscribe('Authenticate', () => {
      this.submitBtn.removeEventListener('click', this.submitBtn.fn);
      window.location.replace(`${window.location.origin}/main.index.html#`);
    });
  }

  onClickLiveVideoBtn() {
    const videoNode = document.querySelector('#js-prvideo__open');
    videoNode.addEventListener('click', () => {
      this.showPromoVideo();
    });
  }

  showPromoVideo() {
    const promoContainer = document.querySelector('.prvideo');
    const spinner = new Spinner(promoContainer);
    spinner.render();
    document.querySelector('.prvideo').insertAdjacentHTML('beforeend', getPromoVideo());
    const iframeNode = document.querySelector('#js-promovideo__modal_iframe');
    iframeNode.addEventListener('load', () => {
      document.querySelector('#promovideo__modal').style.display = 'block';
      const closeBtn = document.querySelector('#js-promovideo__modal_close');
      closeBtn.addEventListener('click', () => {
        this.removePromoVideo();
      });
      spinner.remove();
    });
  }

  removePromoVideo() {
    document.querySelector('.prvideo').removeChild(document.querySelector('#promovideo__modal'));
  }

  init() {
    this.submitBtn = document.querySelector('.login__submitBtn');
    this.openLoginPopup();
    this.onClickLiveVideoBtn();
  }
}

window.onload = () => {
  const promo = new Promo();
  promo.init();
};
