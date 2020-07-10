import { WordsApi } from '../../../services/services.methods';
import { ErrorPopup } from '../../error/error.error_popup';
import { Spinner } from '../../spinner/spinner';
// import { shuffleArray } from '../common/drop.utils';

const wordsAPI = new WordsApi();
class DropModel {
  constructor() {
    this.currentLevel = 0;
    this.currentRound = 0;
    this.cardsData = null;
    this.pageData = null;
    this.onDropIntroButtonBinded = this.onDropIntroButton.bind(this);
  }

  async getData() {
    let response;
    try {
      response = await wordsAPI.getWordsCollection({
        group: this.currentLevel,
        page: this.currentRound,
      });
    } catch (error) {
      new ErrorPopup().openPopup({
        text: error.message,
      });
    }
    this.cardsData = this.createPageData(response);
    console.log(response);
  }

  createPageData(cardsData) {
    return cardsData.map(({
      id,
      word,
      image,
    }) => ({
      id,
      word: word.toLowerCase().trim(),
      image,
    }));
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

  async init() {
    try {
      this.spinner = new Spinner(document.body.querySelector('.main'));
      this.spinner.init();
      this.inner = document.querySelector('.drop-game__wrapper');
      this.preview = document.querySelector('.preview-drop');
      this.previewButton = document.querySelector('.preview-drop__btn');
      this.dropWords = document.querySelector('.drop__words');
      this.spinner.show();
      await this.getData();
      this.addDropIntroButton();
      this.spinner.hide();
    } catch (error) {
      new ErrorPopup().openPopup({
        text: error.message,
      });
    }
  }
}

export default new DropModel();
