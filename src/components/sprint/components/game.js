import { WordsApi } from '../../../services/services.methods';
import { ErrorPopup } from '../../error/error.error_popup';
import correct from '../assets/audio/correct.mp3';
import wrong from '../assets/audio/error.mp3';
import { showSpinner, hideSpinner } from '../common/sprint.utils';
import { shuffleArray, getRandomElement } from '../common/sprint.helper';
import Timer from './timer';

const timerJS = new Timer();

const success = new Audio(correct);
const fail = new Audio(wrong);

const wordsAPI = new WordsApi();

export default class GameSprint {
  constructor() {
    this.words = null;
    this.gameWords = null;
    this.gameResults = null;
    this.currentGameWord = null;
    this.counterElement = null;
    this.correctAnswer = [];
    this.wrongAnswer = [];
    this.answerTrue = this.handleButtonClick(true);
    this.answerFalse = this.handleButtonClick(false);
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

  startGame() {
    const btnTrue = document.getElementById('true');
    const btnFalse = document.getElementById('false');
    btnTrue.addEventListener('click', this.handleButtonClick(true));
    btnFalse.addEventListener('click', this.handleButtonClick(false));
    this.gameWords = shuffleArray(this.words);
    this.gameResults = [];
    this.makeTurn();
  }

  makeTurn() {
    this.renderScore();
    if (this.gameWords.length === 0) {
      this.finishGame();
    } else {
      this.currentGameWord = this.gameWords.pop();

      this.renderWord(this.currentGameWord);
    }
  }

  finishGame() {

  }

  handleButtonClick(flag) {
    const rightField = document.getElementById('rating');
    return () => {
      if (this.currentGameWord.isCorrectTranslation === flag) {
        success.play();
        this.addImageRating((this.counterElement += 1));
        this.gameResults.push({
          isCorrect: true,
          word: this.currentGameWord,
        });
      } else {
        fail.play();
        rightField.innerHTML = '';
        this.gameResults.push({
          isCorrect: false,
          word: this.currentGameWord,
        });
      }

      this.makeTurn();
    };
  }

  renderScore() {
    const scoreField = document.getElementById('score');
    const [value] = this.gameResults.reduce(
      ([score, correctCounter], result) => {
        if (!result.isCorrect) {
          return [score, 0];
        }
        return [score + 10 + 5 * Math.floor(correctCounter / 4), correctCounter + 1];
      },
      [0, 0],
    );
    scoreField.innerHTML = value;
  }

  renderWord(objectWord) {
    const field = document.querySelector('.game-sprint__field');
    field.innerHTML = '';
    const temp = [objectWord].map((el) => this.createTemplateWords(el));
    field.insertAdjacentHTML('afterbegin', temp);
  }

  createTemplateWords(wordObj) {
    return `<div class="game-sprint__word game-sprint__word--eng">${wordObj.word}</div>
     <div class="game-sprint__word game-sprint__word--rus">${wordObj.randomTranslation}</div>`;
  }

  addImageRating(add) {
    const rightField = document.getElementById('rating');
    if (add <= 4) {
      rightField.insertAdjacentHTML('afterbegin', '<img src="./assets/main/img/icon/mark.svg" alt="logo">');
    } else if (add === 5) {
      rightField.innerHTML = '';
      rightField.insertAdjacentHTML('afterbegin', '<img src="./assets/main/img/icon/mark.svg" alt="logo">');
    } else if (add > 5 && add < 9) {
      rightField.insertAdjacentHTML('afterbegin', '<img src="./assets/main/img/icon/mark.svg" alt="logo">');
    } else if (add === 9) {
      rightField.innerHTML = '';
      rightField.insertAdjacentHTML('afterbegin', '<img src="./assets/main/img/icon/mark.svg" alt="logo">');
    } else if (add > 9 && add < 13) {
      rightField.insertAdjacentHTML('afterbegin', '<img src="./assets/main/img/icon/mark.svg" alt="logo">');
    } else if (add === 13) {
      rightField.innerHTML = '';
      rightField.insertAdjacentHTML('afterbegin', '<img src="./assets/main/img/icon/mark.svg" alt="logo">');
    } else if (add > 13 && add < 17) {
      rightField.insertAdjacentHTML('afterbegin', '<img src="./assets/main/img/icon/mark.svg" alt="logo">');
    } else if (add === 17) {
      rightField.innerHTML = '';
      rightField.insertAdjacentHTML('afterbegin', '<img src="./assets/main/img/icon/mark.svg" alt="logo">');
    }
    if (add > 17) {
      rightField.insertAdjacentHTML('afterbegin', '<img src="./assets/main/img/icon/mark.svg" alt="logo">');
    }
  }

  previewsStatrt() {
    this.startbtn.addEventListener('click', (event) => {
      if (event.target.classList.contains('preview__btn')) {
        document.querySelector('.sprint-game__wrapper').classList.remove('display-none');
        document.querySelector('.preview').classList.add('display-none');
        timerJS.startTimer();
      }
    });
  }

  async init() {
    try {
      showSpinner();
      await this.getWords();
      hideSpinner();
      this.startbtn = document.querySelector('.preview__btn');
      this.gameField = document.querySelector('.inner__game-sprint');
      this.previewsStatrt();
      this.startGame();
      this.spinner.init();
      this.onChangeLevel();
    } catch (error) {
    }
  }
}
