import { WordsApi } from '../../../services/services.methods';
import { ErrorPopup } from '../../error/error.error_popup';
// import Timer from './timer';
import Rating from './rating';
import { showSpinner, hideSpinner } from '../common/sprint.utils';
import { shuffleArray, getRandomElement } from '../common/sprint.helper';
import correct from '../assets/audio/correct.mp3';
import wrong from '../assets/audio/error.mp3';

const wordsAPI = new WordsApi();
// const timer = new Timer();
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
    this.onHandleEventKeysBinded = this.onHandleEventKeys.bind(this);

    const COLOR_CODES = {
      info: {
        color: 'green',
      },
      warning: {
        color: 'orange',
        threshold: 10,
      },
      alert: {
        color: 'red',
        threshold: 5,
      },
    };
    this.FULL_DASH_ARRAY = 283;
    this.TIME_LIMIT = 59;
    this.timePassed = 0;
    this.timeLeft = this.TIME_LIMIT;
    this.timerInterval = null;
    this.remainingPathColor = COLOR_CODES.info.color;
    this.warning = COLOR_CODES.warning.color;
    this.alert = COLOR_CODES.alert.color;
    this.info = COLOR_CODES.info.color;
  }

  addTemplateTimer() {
    const temp = `<div class="base-timer">
    <svg class="base-timer__svg" viewBox="0 0 100 100" >
      <g class="base-timer__circle">
        <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45" />
        <path
          id="base-timer-path-remaining"
          stroke-dasharray="283"
          class="base-timer__path-remaining ${this.remainingPathColor}"
          d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
          "
        ></path>
      </g>
    </svg>
    <span id="base-timer-label" class="base-timer__label">
    ${this.formatTimeLeft(this.timeLeft)}  </span>  </div>  `;
    document.querySelector('.game-sprint__timer').insertAdjacentHTML('afterbegin', temp);
  }

  formatTimeLeft(time) {
    let seconds = time % 60;
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    return `${seconds}`;
  }

  startTimer() {
    this.addTemplateTimer();
    this.timerInterval = setInterval(() => {
      this.timePassed = this.timePassed += 1;
      this.timeLeft = this.TIME_LIMIT - this.timePassed;
      document.getElementById('base-timer-label').innerHTML = this.formatTimeLeft(this.timeLeft);
      if (this.timeLeft === 0) {
        this.stopTime();
        this.resultResumeGame();
      }
      this.setCircleDasharray();
      this.setRemainingPathColor(this.timeLeft);
    }, 1000);
  }

  calculateTimeFraction() {
    const rawTimeFraction = this.timeLeft / this.TIME_LIMIT;
    return rawTimeFraction - (1 / this.TIME_LIMIT) * (1 - rawTimeFraction);
  }

  setCircleDasharray() {
    const circleDasharray = `${(this.calculateTimeFraction() * this.FULL_DASH_ARRAY).toFixed(0)} 283`;
    document.getElementById('base-timer-path-remaining').setAttribute('stroke-dasharray', circleDasharray);
  }

  setRemainingPathColor(timeLeft) {
    if (timeLeft <= 5) {
      document.getElementById('base-timer-path-remaining').classList.remove(this.warning);
      document.getElementById('base-timer-path-remaining').classList.add(this.alert);
    } else if (timeLeft <= 10) {
      document.getElementById('base-timer-path-remaining').classList.remove(this.info);
      document.getElementById('base-timer-path-remaining').classList.add(this.warning);
    }
  }

  stopTime() {
    clearInterval(this.timerInterval);
  }

  onInitIntroButton(event) {
    if (event.target.classList.contains('preview__btn')) {
      this.wrapper.classList.remove('display-none');
      this.previewSection.classList.add('display-none');
      this.startTimer();
    }
  }

  addInitIntroButton() {
    this.previewButton.addEventListener('click', this.onInitIntroButtonBinded);
  }

  removeInitIntroButton() {
    this.previewButton.removeEventListener('click', this.onInitIntroButtonBinded);
  }

  async getWords() {
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
    this.addHandleEventKeys();
  }

  handleButtonClick(flag) {
    return () => {
      if (this.currentGameWord.isCorrectTranslation === flag) {
        this.gameField.classList.remove('regress');
        this.gameField.classList.add('progress');
        success.play();
        rating.addImageRating((this.counterElement += 1));
        this.gameResults.push({
          isCorrect: true,
          word: this.currentGameWord,
        });
      } else {
        this.gameField.classList.remove('progress');
        this.gameField.classList.add('regress');
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

  onHandleEventKeys(event) {
    if (event.code === 'ArrowLeft') {
      this.btnTrue.click();
    } else if (event.code === 'ArrowRight') {
      this.btnFalse.click();
    }
  }

  addHandleEventKeys() {
    document.addEventListener('keydown', this.onHandleEventKeysBinded);
  }

  removeHandleEventKeys() {
    document.removeEventListener('keydown', this.onHandleEventKeysBinded);
  }

  renderScore() {
    const [value] = this.gameResults.reduce(
      ([score, correctCounter], result) => {
        if (!result.isCorrect) {
          return [score, 0];
        }
        return [score + 10 + 10 * Math.floor(correctCounter / 3), correctCounter + 1];
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

  // deleteHandleEventKeys() {
  //   document.addEventListener('keydown', (event) => {
  //     if (event.code === 'ArrowLeft' || event.code === 'ArrowRight') {
  //       event.preventDefault();
  //     }
  //   });
  // }

  resultResumeGame() {
    this.gameContainer.classList.add('display-none');
    this.navigation.classList.add('display-none');
    this.statistics.classList.remove('display-none');
    this.gameField.classList.remove('regress');
    this.gameField.classList.remove('progress');
    this.stopTime();
    // this.deleteHandleEventKeys();

    this.gameResults.forEach((word) => {
      if (word.isCorrect === true) {
        this.correctAnswer.push(word.word);
      } else {
        this.wrongAnswer.push(word.word);
      }
    });

    const resultCorrect = document.querySelector('.result-correct');
    const resultErrorst = document.querySelector('.result-errors');
    const correctList = document.createElement('div');
    correctList.className = 'correctly__list';
    const tamplateScoreCorrectly = `<p class="correct__title"><span class="correct__lead">Correctly <span class="correct-descr">${this.correctAnswer.length}</span></span></p>
    <ul class = 'correctly list'></ul>`;
    correctList.innerHTML = tamplateScoreCorrectly;

    const errorList = document.createElement('div');
    errorList.className = 'error__list';
    const tamplateScoreErrors = `<p class="errors__title"><span class="errors__lead">Errors <span class="errors-descr">${this.wrongAnswer.length}</span></span></p>
    <ul class = 'errors list'></ul>`;
    errorList.innerHTML = tamplateScoreErrors;

    resultCorrect.append(correctList);
    resultErrorst.append(errorList);

    const containerCorrectWords = document.querySelector('.correctly');
    const objectWordsCorrect = this.correctAnswer.map((word) => word);

    const addTamplateCorrectWords = (objectCorrect) => `<span class="list__item">${objectCorrect.word}</span>`;
    const htmlTamplateCorrectWords = objectWordsCorrect.map(addTamplateCorrectWords).join('');
    containerCorrectWords.innerHTML = htmlTamplateCorrectWords;

    const containerWrongWords = document.querySelector('.errors');
    const objectWordsWrong = this.wrongAnswer.map((word) => word);

    const addTamplateWrongWords = (objectWrong) => `<span class="list__item">${objectWrong.word}</span>`;
    const htmlTamplateWrongWords = objectWordsWrong.map(addTamplateWrongWords).join('');
    containerWrongWords.innerHTML = htmlTamplateWrongWords;

    const buttonContinue = document.querySelector('#new');
    buttonContinue.addEventListener('click', this.removeField);
  }

  clearGameFieldAndState() {
    return (event) => {
      const target = event.target.className;
      if (target === 'button-result__new sprint-button') {
        document.querySelector('.error__list').remove();
        document.querySelector('.correctly__list').remove();
        this.newGame();
        this.startGame();
        document.querySelector('.base-timer').remove();
        this.startTimer();
      }
    };
  }

  onLevelChangeHandler() {
    this.level.blur();
    this.level.addEventListener('change', async (event) => {
      this.currentLevel = +event.target.value;
      showSpinner();
      await this.getWords();
      hideSpinner();
      this.newGame();
      this.startGame();
      document.querySelector('.base-timer').remove();
      this.startTimer();
    });
  }

  newGame() {
    this.FULL_DASH_ARRAY = 283;
    this.TIME_LIMIT = 59;
    this.timePassed = 0;
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
      this.currentRound = +event.target.value;
      showSpinner();
      await this.getWords();
      hideSpinner();
      this.newGame();
      this.startGame();
      document.querySelector('.base-timer').remove();
      this.startTimer();
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
      this.gameField = document.querySelector('.inner__game-sprint');
      this.spinner = document.querySelector('.spinner');

      showSpinner();
      await this.getWords();
      this.onLevelChangeHandler();
      this.onRoundChangeHandler();
      hideSpinner();
      this.addInitIntroButton();
      this.startGame();
    } catch (error) {
      new ErrorPopup().openPopup({
        text: error.message,
      });
    }
  }
}
