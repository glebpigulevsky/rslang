import { WordsApi } from '../../../services/services.methods';
import { ErrorPopup } from '../../error/error.error_popup';
import Rating from './rating';
import correct from '../assets/audio/correct.mp3';
import wrong from '../assets/audio/error.mp3';
import { showSpinner, hideSpinner } from '../common/sprint.utils';
import { shuffleArray, getRandomElement } from '../common/sprint.helper';
import Timer from './timer';

const rating = new Rating();

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
    this.currentLevel = 0;
    this.currentRound = 0;
    this.answerTrue = this.handleButtonClick(true);
    this.answerFalse = this.handleButtonClick(false);
    this.removeField = this.clearGameFieldAndState();
  }

  onLevelChangeHandler() {
    this.level = document.querySelector('#level');
    this.level.addEventListener('change', async (event) => {
      this.currentLevel = +event.target.value;
      showSpinner();
      await this.getWords();
      hideSpinner();
      this.startbtn = document.querySelector('.preview__btn');
      this.gameField = document.querySelector('.inner__game-sprint');
      this.previewsStatrt();
      this.startGame();
    });
  }

  onRoundChangeHandler() {
    this.round = document.querySelector('#round');
    this.round.addEventListener('change', async (event) => {
      this.currentLevel = +event.target.value;
      showSpinner();
      await this.getWords();
      hideSpinner();
      this.startbtn = document.querySelector('.preview__btn');
      this.gameField = document.querySelector('.inner__game-sprint');
      this.previewsStatrt();
      this.startGame();
    });
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
    btnTrue.addEventListener('click', this.answerTrue);
    btnFalse.addEventListener('click', this.answerFalse);
    this.gameWords = shuffleArray(this.words);
    this.gameResults = [];
    document.querySelector('.sprint-game__container').classList.remove('display-block');
    document.querySelector('.navigation').classList.remove('display-block');
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
    document.querySelector('.sprint-game__container').classList.add('display-none');
    document.querySelector('.navigation').classList.add('display-none');
    document.querySelector('.statistics').classList.remove('display-none');

    this.gameResults.forEach((word) => {
      if (word.isCorrect === true) {
        this.correctAnswer.push(word.word);
      } else {
        this.wrongAnswer.push(word.word);
      }
    });
    const knowElement = document.querySelector('.result-correct');
    const dntKnowElement = document.querySelector('.result-errors');
    const resultKnow = document.createElement('p');
    resultKnow.className = 'correct__title';
    const tamplateScoreKnow = `
            <span class="correct__lead">Correctly <span class="correct">${this.correctAnswer.length}</span></span>
            <ul class = 'correctly__list list'></ul>`;
    resultKnow.innerHTML = tamplateScoreKnow;

    const resultDntknow = document.createElement('p');
    resultDntknow.className = 'errors__title';
    const tamplateScoreDntknow = ` 
            <span class="errors__lead">Errors <span class="errors">${this.wrongAnswer.length}</span></span>
            <ul class = 'error__list list'></ul>`;
    resultDntknow.innerHTML = tamplateScoreDntknow;

    knowElement.append(resultKnow);
    dntKnowElement.append(resultDntknow);

    const containerCorrectWords = document.querySelector('.correctly__list');
    const objectWordsCorrect = this.correctAnswer.map((word) => word);

    const addTamplateCorrectWords = (Correct) => `<li class="list__item">${Correct.word}</li>`;
    const htmlTamplateCorrectWords = objectWordsCorrect.map(addTamplateCorrectWords).join('');
    containerCorrectWords.innerHTML = htmlTamplateCorrectWords;

    const containerWrongWords = document.querySelector('.error__list');
    const objectWordsWrong = this.wrongAnswer.map((word) => word);

    const addTamplateWrongWords = (Wrong) => `<li class="list__item">${Wrong.word}</li>`;
    const htmlTamplateWrongWords = objectWordsWrong.map(addTamplateWrongWords).join('');
    containerWrongWords.innerHTML = htmlTamplateWrongWords;

    const buttonContinue = document.querySelector('#new');
    buttonContinue.addEventListener('click', this.removeField);
  }

  clearGameFieldAndState() {
    return (event) => {
      const target = event.target.className;
      if (target === 'button-result__new') {
        document.querySelector('.result-correct').remove();
        document.querySelector('.result-errors').remove();
        document.querySelector('.statistics').classList.add('display-none');
        const rightField = document.getElementById('rating');
        const btnTrue = document.getElementById('true');
        const btnFalse = document.getElementById('false');
        btnTrue.removeEventListener('click', this.answerTrue);
        btnFalse.removeEventListener('click', this.answerTrue);
        this.counterElement = 0;
        this.gameWords = [];
        this.correctAnswer = [];
        this.wrongAnswer = [];
        rightField.innerHTML = '';

        this.startGame();
      }
    };
  }

  handleButtonClick(flag) {
    return () => {
      if (this.currentGameWord.isCorrectTranslation === flag) {
        success.play();
        rating.addImageRating((this.counterElement += 1));
        this.gameResults.push({
          isCorrect: true,
          word: this.currentGameWord,
        });
      } else {
        const rightField = document.getElementById('rating');
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
      this.onLevelChangeHandler();
      this.onRoundChangeHandler();
      hideSpinner();
      this.startbtn = document.querySelector('.preview__btn');
      this.gameField = document.querySelector('.inner__game-sprint');
      this.previewsStatrt();
      this.startGame();
      this.spinner.init();
    } catch (error) {}
  }
}
