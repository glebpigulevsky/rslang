import ErrorPopupFragment from './common/error.common.popup-fragment';

class ErrorPopup {
  constructor() {
    this._closeBtn = null;
  }

  openPopup({ text }) {
    const errorPopupFragment = new ErrorPopupFragment();
    const modal = errorPopupFragment.createPopup({ text });
    this._closeBtn = modal.querySelector('#closePopupBtn');
    document.body.appendChild(modal);
    this._registerEventListener();
  }

  _registerEventListener() {
    this._closeBtn.addEventListener('click', this._closeListener);
  }

  _closeListener(e) {
    document.body.removeChild(document.querySelector('#errorPopup'));
    e.currentTarget.removeEventListener('click', this._closeListener);
  }
}

export { ErrorPopup };
