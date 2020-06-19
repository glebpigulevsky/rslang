import ErrorPopupFragment from './common/error.common.popup-fragment';

class ErrorPopup {
  constructor() {
    this.modal = null;
    this.closeBtn = null;
  }

  openPopup({ text }) {
    const errorPopupFragment = new ErrorPopupFragment();
    this.modal = errorPopupFragment.createPopup({ text });
    this.closeBtn = this.modal.querySelector('#closePopupBtn');
    document.body.appendChild(this.modal);
    this.registerEventListener();
  }

  registerEventListener() {
    this.closeBtn.addEventListener('click', this.closePopup);
  }

  closePopup(e) {
    document.body.removeChild(document.querySelector('#errorPopup'));
    e.closeBtn.removeEventListener('click', this.closePopup);
  }
}

export { ErrorPopup };
