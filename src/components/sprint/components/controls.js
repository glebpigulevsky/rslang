import GameSprint from './game';
import { WordsApi } from '../../../services/services.methods';
import { showSpinner, hideSpinner } from '../common/sprint.utils';
import { ErrorPopup } from '../../error/error.error_popup';
// import Timer from './timer';

const game = new GameSprint();
const wordsAPI = new WordsApi();

export default class Select {
  constructor() {
    this.currentLevel = null;
    this.currentRound = null;
    this.roundFetchedData = null;
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

  //   fetchCardsPage(difficult, page) {
  //     return this.wordsAPI.getWordsCollection({
  //       group: difficult,
  //       page,
  //     });
  //   }

  onLevelChangeHandler() {
    this.level = document.querySelector('#level');
    this.level.addEventListener('change', (event) => {
      this.currentLevel = +event.target.value;
      if (this.currentLevel !== 0) {
        // console.log(this.getWords(this.currentLevel));
        this.getWords(this.currentLevel);
      }
    });
  }

  onRoundChangeHandler() {
    this.round = document.querySelector('#round');
    this.round.addEventListener('change', (event) => {
      this.currentRound = +event.target.value;
      if (this.currentRound !== 0) {
        this.getWords(this.currentRound);
      }
    });
  }
  //   async newPage() {
  //     this.roundFetchedData = await game.getWords(this.currentLevel, this.currentRound).catch((error) => {
  //       hideSpinner();
  //       new ErrorPopup().openPopup({ text: error.message });
  //       return null;
  //     });
  //     if (!this.roundFetchedData) return;
  //   }

  //   async onLevelChangeHandler(event) {
  //     this.setCurrentLevel(+event.target.value);
  //     this.setCurrentRound(0);
  //     showSpinner();
  //     this.roundData = await this.fetchRoundData(this.currentLevel, this.currentRound);
  //     hideSpinner();
  //     // this.newGame(this.roundData);
  //   }

  //   async onRoundChangeHandler(event) {
  //     this.setCurrentRound(+event.target.value);
  //     showSpinner();
  //     this.roundData = await this.fetchRoundData(this.currentLevel, this.currentRound);
  //     hideSpinner.hide();
  //     // this.newGame(this.roundData);
  //   }

  async init() {
    try {
    //   await this.onLevelChangeHandler();
    //   this.onRoundChangeHandler();
    //   this.onLevelChangeHandler();
      await this.getWords(this.onLevelChangeHandler());
      this.spinner.init();
    } catch (error) {}
  }
}
