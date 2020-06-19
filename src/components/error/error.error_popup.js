import ErrorPopupFragment from './common/error.common.popup-fragment';

class ErrorPopup {
  constructor() {
    this.closeBtn = null;
  }

  openPopup({ text }) {
    const errorPopupFragment = new ErrorPopupFragment();
    const modal = errorPopupFragment.createPopup({ text });
    this.closeBtn = modal.querySelector('#closePopupBtn');
    document.body.appendChild(modal);
    this.registerEventListener();
  }

  registerEventListener() {
    this.closeBtn.addEventListener('click', this.closeListener);
  }

  closeListener(e) {
    document.body.removeChild(document.querySelector('#errorPopup'));
    e.currentTarget.removeEventListener('click', this.closeListener);
  }
}

export { ErrorPopup };
