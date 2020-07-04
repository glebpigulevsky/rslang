import './scss/error.common.popup.styles.scss';

export default class ErrorPopupFragment {
  createPopup({ text }) {
    const fragment = document.createDocumentFragment();
    const modal = this._createModal();
    const modalContent = this._createModalContent();
    const modalHeader = this._createModalHeader();
    const modalCloseBtn = this._createClose();
    modalCloseBtn.innerHTML = '&times;';
    const modalTitle = this._createModalTitle();
    const modalBody = this._createModalBody();
    const modalTextPhar = this._createModalTextPhar({ text });

    fragment.appendChild(modal);
    modal.appendChild(modalContent);
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalHeader.appendChild(modalCloseBtn);
    modalHeader.appendChild(modalTitle);
    modalBody.appendChild(modalTextPhar);
    return fragment;
  }

  _createModal() {
    return this._createAnyDomElement({
      elem: 'div',
      classList: ['modal'],
      id: 'errorPopup',
    });
  }

  _createModalContent() {
    return this._createAnyDomElement({
      elem: 'div',
      classList: ['modal-content'],
    });
  }

  _createModalHeader() {
    return this._createAnyDomElement({
      elem: 'div',
      classList: ['modal-header'],
    });
  }

  _createClose() {
    return this._createAnyDomElement({
      elem: 'span',
      classList: ['modal-header__close'],
      id: 'closePopupBtn',
    });
  }

  _createModalTitle() {
    return this._createAnyDomElement({
      elem: 'h2',
      textContent: 'Error',
    });
  }

  _createModalBody() {
    return this._createAnyDomElement({
      elem: 'div',
      classList: ['modal-body'],
    });
  }

  _createModalTextPhar({ text = '' }) {
    return this._createAnyDomElement({
      elem: 'p',
      classList: ['modal-body__text'],
      textContent: text,
    });
  }

  _createAnyDomElement({ elem, classList = [], id = null, dataAttributeList = [], textContent = null }) {
    const item = document.createElement(elem);
    if (classList.length > 0) {
      item.classList.add(...classList);
    }
    if (dataAttributeList.length > 0) {
      dataAttributeList.map((x) => item.setAttribute(x.name, x.value));
    }
    if (id !== null) {
      item.id = id;
    }
    if (textContent !== null) {
      item.textContent = textContent;
    }
    return item;
  }
}
