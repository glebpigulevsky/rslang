import { WordsApi } from '../../../services/services.methods';
import { ErrorPopup } from '../../error/error.error_popup';
import correct from '../assets/audio/correct.mp3';
import wrong from '../assets/audio/error.mp3';
// import Spinner from '../../spinner/spinner';
// const spinner = new Spinner();
// spinner.init()

const success = new Audio(correct);
const fail = new Audio(wrong);

const wordsAPI = new WordsApi();

export default class GameSprint {
  constructor() {
    this.currentLevel = null;
    this.currentRound = null;
    this.words = null;
    this.gameWords = null;
    this.gameResults = null;
    this.currentGameWord = null;
    this.counterElement = null;
  }

  async getWords() {
    let response;
    try {
      response = await wordsAPI.getWordsCollection({
        group: 0,
        page: 1,
      });
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
    return words.map(({
      id,
      word,
      wordTranslate,
    }) => {
      const randomTranslation = this.getRandomElement(translations);
      return {
        id,
        word,
        translation: wordTranslate,
        randomTranslation,
        isCorrectTranslation: wordTranslate === randomTranslation,
      };
    });
  }

  getRandomElement(array) {
    const result = array.slice();

    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result[0];
  }

  shuffleArray(array) {
    const result = array.slice();
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  startGame() {
    const btnTrue = document.getElementById('true');
    const btnFalse = document.getElementById('false');
    btnTrue.addEventListener('click', this.handleButtonClick(true));
    btnFalse.addEventListener('click', this.handleButtonClick(false));
    this.gameWords = this.shuffleArray(this.words);
    this.gameResults = [];
    this.makeTurn();
  }

  makeTurn() {
    this.renderScore();
    if (this.gameWords.length === 0) {
      return this.finishGame();
    }
    this.currentGameWord = this.gameWords.pop();

    this.renderWord(this.currentGameWord);
  }

  finishGame() {
    console.log(this.gameResults);
    // show results
    // clear game field and state
  }

  handleButtonClick(flag) {
    const rightField = document.getElementById('rating');
    return () => {
      if (this.currentGameWord.isCorrectTranslation === flag) {
        success.play();
        this.addElemenet(this.counterElement += 1);
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
    const [score] = this.gameResults.reduce(([score, correctCounter], result) => {
      if (!result.isCorrect) {
        return [score, 0];
      }
      return [
        score + 10 + 5 * Math.floor(correctCounter / 4),
        correctCounter + 1,
      ];
    }, [0, 0]);
    scoreField.innerHTML = score;
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

  addElemenet(add) {
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
      }
    });
  }

  async init() {
    try {
      await this.getWords();
      this.startbtn = document.querySelector('.preview__btn');
      this.gameField = document.querySelector('.inner__game-sprint');
      this.previewsStatrt();
      this.startGame();
      this.spinner.init();
    } catch (error) {

    }
  }
}
