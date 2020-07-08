import { WordsApi } from '../../../services/services.methods';
// import { ErrorPopup } from '../../error/error.error_popup';

// const wordsAPI = new WordsApi();

export default class DropGame {
  constructor() {
    this.onDropIntroButtonBinded = this.onDropIntroButton.bind(this);
  }

  onDropIntroButton(event) {
    if (event.target.classList.contains('preview-drop__btn')) {
      this.inner.classList.remove('display-none');
      this.preview.classList.add('display-none');
    }
  }

  addDropIntroButton() {
    this.previewButton.addEventListener('click', this.onDropIntroButtonBinded);
  }

  removeDropIntroButton() {
    this.previewButton.removeEventListener('click', this.onDropIntroButtonBinded);
  }

  init() {
    this.inner = document.querySelector('.drop-game__wrapper');
    this.preview = document.querySelector('.preview-drop');
    this.previewButton = document.querySelector('.preview-drop__btn');

    this.addDropIntroButton();
  }
}
