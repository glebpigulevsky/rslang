// import GameSprint from './game';
import { WordsApi } from '../../../services/services.methods';
import { ErrorPopup } from '../../error/error.error_popup';
import Timer from './timer';

const wordsAPI = new WordsApi();

export default class Select {
  constructor() {
    this.currentLevel = null;
    this.currentRound = null;
  }

  async getWords(group = 0, page = 0) {
    let response;
    try {
      response = await wordsAPI.getWordsCollection({ group, page });
    } catch (error) {
      new ErrorPopup().openPopup({
        text: error.message,
      });
    }
    console.log(response);
  }

  onLevelChangeHandler() {
    this.round = document.querySelector('#round');
    this.round.addEventListener('change', () => {
      this.level = document.querySelector('#level').selectedIndex;
      this.currentRound = this.round.selectedIndex;
      console.log(this.level);
      console.log(this.currentRound);
      this.getWords(this.level, this.currentRound);
    });
  }

  async init() {
    try {
      await this.getWords();
      this.onLevelChangeHandler();
    } catch (error) {
    }
  }
}
