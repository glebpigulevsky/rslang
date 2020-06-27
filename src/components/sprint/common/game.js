import { WordsApi } from '../../../services/services.methods';

// import { ErrorPopup } from '../../error/error.error_popup';

const wordsAPI = new WordsApi();

export default class GameSprint {
  constructor() {
    this.currentWord = null;
    this.group = null;
    this.page = null;
    this.level = null;
    this.currentWords = [];
    this.currentIndex = 0;
    this.score = 0;
    this.correctAnswers = [];
    this.wrongAnswers = [];
    this.scoreCoeff = 10;
    this.correctAnswerCounter = 0;
  }

  getWords() {
    wordsAPI.getWordsCollection({
      group: 0,
      page: 1,
    })
      .then((res) => {
        this.createObjectWords(res);
      })
      .catch((error) => {
        // new ErrorPopup().openPopup(error);
        console.log(error);
      });
  }

  createObjectWords(words) {
    if (words) {
      this.currentWords = words.map((el, ind, array) => ({
        id: el.id,
        wordEn: el.word,
        translate: el.wordTranslate,
        wordTranslateRUS: this.pickRandomWord(array),
        result: el.wordTranslate === this.wordTranslateRUS,
      }));
      this.startGame(this.currentWords);
    }
  }

  pickRandomWord(array) {
    const arr = array;
    arr.sort(() => Math.random() - 0.5);
    const wordRandom = arr.map((el) => el.wordTranslate);
    return wordRandom[0];
  }

  shuffledArray(array) {
    if (array) {
      return array.sort(() => Math.random() - 0.5);
    }
  }

  startGame(wordsEn) {
    const objectEN = this.shuffledArray(wordsEn);
    this.makeTurn(objectEN);
  }

  makeTurn(gameWords) {
    if (gameWords) {
      const curentWord = gameWords[this.currentIndex];
      console.log(gameWords);
      this.handleButtonClick(curentWord);
      this.renderWord(curentWord);
    }
  }

  handleButtonClick(word) {
    const btnTRUE = document.getElementById('true');
    const btnFALSE = document.getElementById('false');
    btnTRUE.addEventListener('click', (event) => {
      if (!(this.currentIndex > this.currentWords.length - 1)) {
        const target = event.target.className;
        if (target === 'true') {
          if (word.result === true) {
            console.log('TRUE');
            this.correctAnswerCounter += 1;
            this.correctAnswers.push(word.id);
          } else {
            console.log('FALSE');
            this.correctAnswerCounter = 0;
            this.wrongAnswers.push(word);
          }
        }
        console.log(this.correctAnswerCounter);
        this.calcScore(word.result === true);
        this.currentIndex += 1;
        this.renderWord(this.currentWords[this.currentIndex]);
      } else {
        console.log('result');
      }
    });
    btnFALSE.addEventListener('click', (event) => {
      console.log(this.currentWords.length - 1, this.currentIndex);
      console.log(!(this.currentIndex >= this.currentWords.length - 1));
      if (!(this.currentIndex >= this.currentWords.length - 1)) {
        const target = event.target.className;
        console.log(target);
        if (target === 'false wrong') {
          if (word.result === false) {
            console.log('TRUE');
            this.correctAnswerCounter += 1;
            this.correctAnswers.push(word.id);
          } else {
            console.log('FALSE');
            this.correctAnswerCounter = 0;
            this.wrongAnswers.push(word);
          }
        }
        console.log(this.correctAnswerCounter);
        this.calcScore(word.result === false);
        this.currentIndex += 1;
        this.renderWord(this.currentWords[this.currentIndex]);
      } else {
        console.log(this.correctAnswers, this.wrongAnswers);
      }
    });
  }

  calcScore(answer) {
    const score = document.getElementById('score');
    if (answer === true) {
      if (this.correctAnswerCounter <= 4) {
        this.score += 10;
      } else if (this.currentIndex <= 8) {
        this.score += 15;
      } else if (this.currentIndex <= 12) {
        this.score += 20;
      } else if (this.currentIndex <= 16) {
        this.score += 30;
      } else if (this.currentIndex <= 20) {
        this.score += 40;
      }
    }
    score.textContent = this.score;
  }

  renderWord(object) {
    const field = document.querySelector('.game-sprint__field');
    field.innerHTML = '';
    const temp = [object].map((el) => this.createTemplateWords(el));
    field.insertAdjacentHTML('afterbegin', temp);
  }

  createTemplateWords(word) {
    return `<div class="game-sprint__word game-sprint__word--eng">${word.wordEn}</div>
    <div class="game-sprint__word game-sprint__word--rus">${word.wordTranslateRUS}</div>
    `;
  }

  init() {
    this.getWords();
    this.createObjectWords();
    this.startGame();
    document.getElementById('score').textContent = this.score;
    // this.playGame();
  }
}
