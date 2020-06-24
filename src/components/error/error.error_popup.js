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
    const el = document.querySelector('#closePopupBtn');
    el.addEventListener('click', el.fn = this._closeListener);
  }

  _closeListener() {
    const el = document.querySelector('#closePopupBtn');
    el.removeEventListener('click', el.fn);
    document.body.removeChild(document.querySelector('#errorPopup'));
  }
}

export { ErrorPopup };
