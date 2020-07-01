import { WordsApi } from '../../../services/services.methods';
import { ErrorPopup } from '../../error/error.error_popup';
import { getRandomElement } from '../common/sprint.helper';

const wordsAPI = new WordsApi();

export default class Data {
  constructor() {
    this.words = null;
  }

  async getWords(group = 0, page = 0) {
    let response;
    try {
      response = await wordsAPI.getWordsCollection({ group, page });
    } catch (error) {
      new ErrorPopup().openPopup({
        text: error.message,
      });
      return null;
    }
    this.words = this.createObjectWords(response);
  }

  createObjectWords(words) {
    const translations = words.map((word) => word.wordTranslate);
    return words.map(({ id, word, wordTranslate }) => {
      const randomTranslation = getRandomElement(translations);
      return {
        id,
        word,
        translation: wordTranslate,
        randomTranslation,
        isCorrectTranslation: wordTranslate === randomTranslation,
      };
    });
  }

//   async init() {
//     try {
//       await this.getWords();
//     } catch (error) {
//       return error;
//     }
//   }

}
