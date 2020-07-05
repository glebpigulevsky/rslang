import { WordsApi } from '../../../services/services.methods';
import { ErrorPopup } from '../../error/error.error_popup';
import Timer from './timer';
import Rating from './rating';
import { showSpinner, hideSpinner } from '../common/sprint.utils';
import { shuffleArray, getRandomElement } from '../common/sprint.helper';
import correct from '../assets/audio/correct.mp3';
import wrong from '../assets/audio/error.mp3';

const wordsAPI = new WordsApi();
const timer = new Timer();
const rating = new Rating();

const success = new Audio(correct);
const fail = new Audio(wrong);

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

    this.onInitIntroButtonBinded = this.onInitIntroButton.bind(this);
  }

  onInitIntroButton(event) {
    if (event.target.classList.contains('preview__btn')) {
      this.wrapper.classList.remove('display-none');
      this.previewSection.classList.add('display-none');
      timer.startTimer();
    }
  }

  addInitIntroButton() {
    this.previewButton.addEventListener('click', this.onInitIntroButtonBinded);
  }

  removeInitIntroButton() {
    this.previewButton.addEventListener('click', this.onInitIntroButtonBinded);
  }

  async getWords(group = 0, page = 0) {
    let response;
    try {
      response = await wordsAPI.getWordsCollection({
        group,
        page,
      });
    } catch (error) {
      new ErrorPopup().openPopup({
        text: error.message,
      });
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

  renderWord(objectWord) {
    this.wordField.innerHTML = '';
    const temp = [objectWord].map((el) => this.createTemplateWords(el));
    this.wordField.insertAdjacentHTML('afterbegin', temp);
  }

  createTemplateWords(wordObj) {
    return `<div class="game-sprint__word game-sprint__word--eng">${wordObj.word}</div>
     <div class="game-sprint__word game-sprint__word--rus">${wordObj.randomTranslation}</div>`;
  }

  startGame() {
    this.btnTrue.addEventListener('click', this.answerTrue);
    this.btnFalse.addEventListener('click', this.answerFalse);
    this.gameWords = shuffleArray(this.words);
    this.gameResults = [];
    this.gameContainer.classList.remove('display-none');
    this.navigation.classList.remove('display-none');
    this.makeCheckListWords();
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
        fail.play();
        this.ratingField.innerHTML = '';
        this.gameResults.push({
          isCorrect: false,
          word: this.currentGameWord,
        });
      }

      this.makeCheckListWords();
    };
  }

  renderScore() {
    const [value] = this.gameResults.reduce(
      ([score, correctCounter], result) => {
        if (!result.isCorrect) {
          return [score, 0];
        }
        return [score + 10 + 5 * Math.floor(correctCounter / 4), correctCounter + 1];
      },
      [0, 0],
    );
    this.scoreField.innerHTML = value;
  }

  makeCheckListWords() {
    this.renderScore();
    if (this.gameWords.length === 0) {
      this.resultResumeGame();
    } else {
      this.currentGameWord = this.gameWords.pop();

      this.renderWord(this.currentGameWord);
    }
  }

  resultResumeGame() {
    this.gameContainer.classList.add('display-none');
    this.navigation.classList.add('display-none');
    this.statistics.classList.remove('display-none');
    timer.stopTime();

    this.gameResults.forEach((word) => {
      if (word.isCorrect === true) {
        this.correctAnswer.push(word.word);
      } else {
        this.wrongAnswer.push(word.word);
      }
    });
    const correctly = document.createElement('p');
    correctly.className = 'correct__title';
    const tamplateScoreCorrectly = `
            <span class="correct__lead">Correctly <span class="correct">${this.correctAnswer.length}</span></span>
            <ul class = 'correctly__list list'></ul>`;
    correctly.innerHTML = tamplateScoreCorrectly;

    const errors = document.createElement('p');
    errors.className = 'errors__title';
    const tamplateScoreDntErrors = `
            <span class="errors__lead">Errors <span class="errors">${this.wrongAnswer.length}</span></span>
            <ul class = 'error__list list'></ul>`;
    errors.innerHTML = tamplateScoreDntErrors;

    this.correctResult.append(correctly);
    this.errorResult.append(errors);

    const correctList = document.querySelector('.correctly__list');
    const objectWordsCorrect = this.correctAnswer.map((word) => word);

    const addTamplateCorrectWords = (Correct) => `<li class="list__item">${Correct.word}</li>`;
    const htmlTamplateCorrectWords = objectWordsCorrect.map(addTamplateCorrectWords).join('');
    correctList.innerHTML = htmlTamplateCorrectWords;

    const errorList = document.querySelector('.error__list');
    const objectWordsWrong = this.wrongAnswer.map((word) => word);

    const addTamplateWrongWords = (Wrong) => `<li class="list__item">${Wrong.word}</li>`;
    const htmlTamplateWrongWords = objectWordsWrong.map(addTamplateWrongWords).join('');
    errorList.innerHTML = htmlTamplateWrongWords;

    const buttonContinue = document.querySelector('#new');
    buttonContinue.addEventListener('click', this.removeField);
  }

  clearGameFieldAndState() {
    return (event) => {
      const target = event.target.className;
      if (target === 'button-result__new sprint-button') {
        this.resultCorrect.remove();
        this.resultErrors.remove();
        this.statistics.classList.add('display-none');
        this.btnTrue.removeEventListener('click', this.answerTrue);
        this.btnFalse.removeEventListener('click', this.answerTrue);
        this.counterElement = 0;
        this.gameWords = [];
        this.correctAnswer = [];
        this.wrongAnswer = [];
        this.ratingField.innerHTML = '';

        this.startGame();
        // timer.startTimer();
      }
    };
  }

  onLevelChangeHandler() {
    this.level.addEventListener('change', async (event) => {
      this.currentLevel = +event.target.value;
      showSpinner();
      await this.getWords();
      hideSpinner();
      this.newGame();
      this.startGame();
    });
  }

  newGame() {
    this.resultCorrect.remove();
    this.resultErrors.remove();
    this.statistics.classList.add('display-none');
    this.btnTrue.removeEventListener('click', this.answerTrue);
    this.btnFalse.removeEventListener('click', this.answerTrue);
    this.counterElement = 0;
    this.gameWords = [];
    this.correctAnswer = [];
    this.wrongAnswer = [];
    this.ratingField.innerHTML = '';
  }

  onRoundChangeHandler() {
    this.round.addEventListener('change', async (event) => {
      this.currentLevel = +event.target.value;
      showSpinner();
      await this.getWords();
      hideSpinner();
      this.startGame();
    });
  }

  async init() {
    try {
      this.level = document.querySelector('#level');
      this.round = document.querySelector('#round');
      this.btnTrue = document.getElementById('true');
      this.btnFalse = document.getElementById('false');
      this.navigation = document.querySelector('.navigation');
      this.statistics = document.querySelector('.statistics');
      this.resultCorrect = document.querySelector('.result-correct');
      this.resultErrors = document.querySelector('.result-errors');
      this.ratingField = document.getElementById('rating');
      this.scoreField = document.getElementById('score');
      this.wordField = document.querySelector('.game-sprint__field');
      this.gameContainer = document.querySelector('.sprint-game__container');
      this.wrapper = document.querySelector('.sprint-game__wrapper');
      this.previewSection = document.querySelector('.preview');
      this.previewButton = document.querySelector('.preview__btn');
      this.correctResult = document.querySelector('.result-correct');
      this.errorResult = document.querySelector('.result-errors');
      this.gameField = document.querySelector('.inner__game-sprint');

      showSpinner();

      await this.getWords();

      this.onLevelChangeHandler();
      this.onRoundChangeHandler();

      hideSpinner();

      this.addInitIntroButton();

      this.startGame();
      this.spinner.init();
    } catch (error) {
      return null;
    }
  }
}
