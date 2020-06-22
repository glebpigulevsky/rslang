import ErrorPopupFragment from './common/error.common.popup-fragment';

class ErrorPopup {
  constructor() {
    this._closeBtn = null;
    this._modal = null;
  }

  openPopup({ text }) {
    const errorPopupFragment = new ErrorPopupFragment();
    const modal = errorPopupFragment.createPopup({ text });
    document.body.appendChild(modal);
    this._modal = document.querySelector('#errorPopup');
    this._closeBtn = document.querySelector('#closePopupBtn');
    this._registerEventListener();
  }

  _registerEventListener() {
    this._closeBtn.addEventListener('click', () => this._closeListener());
  }

  _closeListener() {
    this._modal.parentNode.removeChild(this._modal);
    this._closeBtn.removeEventListener('click', this._closeListener);
  }
}

export { ErrorPopup };
