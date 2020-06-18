import { createAnyDomElement } from '../../../common/common.helper';
import './scss/error.common.popup.styles.scss';

export default class ErrorPopupFragment {
  createPopup({ text }) {
    const fragment = document.createDocumentFragment();
    const modal = this.createModal();
    const modalContent = this.createModalContent();
    const modalHeader = this.createModalHeader();
    const modalCloseBtn = this.createClose();
    modalCloseBtn.innerHTML = '&times;';
    const modalTitle = this.createModalTitle();
    const modalBody = this.createModalBody();
    const modalTextPhar = this.createModalTextPhar({ text });

    fragment.appendChild(modal);
    modal.appendChild(modalContent);
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalHeader.appendChild(modalCloseBtn);
    modalHeader.appendChild(modalTitle);
    modalBody.appendChild(modalTextPhar);
    return fragment;
  }

  createModal() {
    return createAnyDomElement({
      elem: 'div',
      classList: ['modal'],
      id: 'errorPopup',
    });
  }

  createModalContent() {
    return createAnyDomElement({
      elem: 'div',
      classList: ['modal-content'],
    });
  }

  createModalHeader() {
    return createAnyDomElement({
      elem: 'div',
      classList: ['modal-header'],
    });
  }

  createClose() {
    return createAnyDomElement({
      elem: 'span',
      classList: ['modal-header__close'],
      id: 'closePopupBtn',
    });
  }

  createModalTitle() {
    return createAnyDomElement({
      elem: 'h2',
      textContent: 'Error',
    });
  }

  createModalBody() {
    return createAnyDomElement({
      elem: 'class',
      classList: ['modal-body'],
    });
  }

  createModalTextPhar({ text = '' }) {
    return createAnyDomElement({
      elem: 'p',
      classList: ['modal-body__text'],
      textContent: text,
    });
  }
}
