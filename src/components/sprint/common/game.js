import { WordsApi } from '../../../services/services.methods';
import correct from '../assets/audio/correct.mp3';
import wrong from '../assets/audio/error.mp3';

const success = new Audio(correct);
const fail = new Audio(wrong);

const wordsAPI = new WordsApi();

export default class GameSprint {
  constructor() {
    this.currentWord = null;
    this.group = null;
    this.page = null;
    this.currentWords = [];
    this.currentIndex = 0;
    this.score = 0;
    this.correctAnswers = [];
    this.wrongAnswers = [];
    this.scoreCoeff = 0;
    this.correctAnswerCounter = 0;
  }

  getWords() {
    wordsAPI.getWordsCollection({ group: 0, page: 1 })
      .then((res) => {
        this.createObjectWords(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  createObjectWords(words) {
    if (words) {
      this.currentWords = words.map((el, ind, array) => ({
        id: el.id,
        wordEn: el.word,
        translate: el.wordTranslate,
        wordTranslateRUS: this.pickRandomWord(array),
        // result: el.translate === this.pickRandomWord(array),
      }));
      this.startGame(this.currentWords);
    }
  }

  pickRandomWord(array) {
    const result = array;

    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    const wordRandom = result.map((el) => el.wordTranslate);
    return wordRandom[0];
  }

  // eslint-disable-next-line consistent-return
  shuffledArray(array) {
    if (array) {
      const result = array.slice();
      for (let i = array.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
      }
      return result;
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
      this.renderWord(curentWord);
      this.handleButtonClick();
    }
  }

  handleButtonClick() {
    const btnTRUE = document.getElementById('true');
    const btnFALSE = document.getElementById('false');
    const rightField = document.getElementById('right');
    btnTRUE.addEventListener('click', (event) => {
      if (!(this.currentIndex >= this.currentWords.length - 1)) {
        const target = event.target.className;
        if (target === 'true') {
            
        
        
        this.currentIndex += 1;
        this.renderWord(this.currentWords[this.currentIndex], target);
      } 
      }
    });
    btnFALSE.addEventListener('click', (event) => {
    //   console.log(this.currentWords.length - 1, this.currentIndex);
    //   console.log(!(this.currentIndex >= this.currentWords.length - 1));
      if (!(this.currentIndex >= this.currentWords.length - 1)) {
        const target = event.target.className;
        if (target === 'false') {
          
        this.currentIndex += 1;
        this.renderWord(this.currentWords[this.currentIndex],target);
      } 
      }
    });
  }

  calcScore(answer) {
      console.log(answer);
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

  renderWord(object,boolean) {
      console.log(boolean)
    const rightField = document.getElementById('right');
    
      if (!(this.currentIndex >= this.currentWords.length - 1)) {
        if (boolean === 'true') {
            console.log(object.translate, object.wordTranslateRUS)
          if (object.translate === object.wordTranslateRUS === true) {
            this.correctAnswerCounter += 1;
            success.play();
            this.addElement(this.scoreCoeff += 1);
            this.correctAnswers.push(object.id);
          } else {
            fail.play();
            this.correctAnswerCounter = 0;
            this.wrongAnswers.push(object);
            rightField.innerHTML = '';
            this.scoreCoeff = 0;
          }
          this.calcScore(object.translate === object.wordTranslateRUS === true);
        }
      } else {
        console.log('result');
        rightField.innerHTML = '';
        this.scoreCoeff = 0;
      }
    
      if (!(this.currentIndex >= this.currentWords.length - 1)) {
        
        if (boolean === 'false') {
          if (object.translate === object.wordTranslateRUS === false) {
            success.play();
            this.correctAnswerCounter += 1;
            this.addElement(this.scoreCoeff += 1);
            this.correctAnswers.push(object.id);
          } else {
            fail.play();
            this.correctAnswerCounter = 0;
            this.wrongAnswers.push(object);
            rightField.innerHTML = '';
            this.scoreCoeff = 0;
          }
          this.calcScore(object.translate === object.wordTranslateRUS === false);
        }
      } else {
        console.log(this.correctAnswers, this.wrongAnswers);
        rightField.innerHTML = '';
        this.scoreCoeff = 0;
      }
    const field = document.getElementById('word-container');
    field.innerHTML = '';
    const temp = [object].map((el) => this.createTemplateWords(el));
    field.insertAdjacentHTML('afterbegin', temp);
  }

  createTemplateWords(word) {
    return `<span class = 'word'>${word.wordEn}</span>
    <span class = 'word'>${word.wordTranslateRUS}</span>`;
  }

  addElement(add) {
    const rightField = document.getElementById('right');
    if (add <= 4) {
      rightField.textContent += '✅';
    } else if (add === 5) {
      rightField.innerHTML = '';
      rightField.textContent += '✅';
    } else if (add > 5 && add < 9) {
      rightField.textContent += '✅';
    } else if (add === 9) {
      rightField.innerHTML = '';
      rightField.textContent += '✅';
    } else if (add > 9 && add < 13) {
      rightField.textContent += '✅';
    } else if (add === 13) {
      rightField.innerHTML = '';
      rightField.textContent += '✅';
    } else if (add > 13 && add < 17) {
      rightField.textContent += '✅';
    } else if (add === 17) {
      rightField.innerHTML = '';
      rightField.textContent += '✅';
    } if (add > 17) {
      rightField.textContent += '✅';
    }
  }

  init() {
    this.getWords();
    this.createObjectWords();
    this.startGame();
    document.getElementById('score').textContent = this.score;
    this.addElement();
  }
}
