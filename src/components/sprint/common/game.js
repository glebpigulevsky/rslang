import { WordsApi } from '../../../services/services.methods';
import correct from '../assets/audio/correct.mp3';
import wrong from '../assets/audio/error.mp3';

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
  }

  async getWords() {
    let response;
    try {
      response = await wordsAPI.getWordsCollection({ group: 0, page: 1 });
    } catch (error) {
      console.log(error);
      return;
    }

    this.words = this.createObjectWords(response);
  }

  createObjectWords(words) {
    const translations = words.map((word) => word.wordTranslate);
    return words.map(({ id, word, wordTranslate }) => {
      const randomTranslation = this.getRandomElement(translations) 
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

  // eslint-disable-next-line consistent-return
  shuffleArray(array) {
    const result = array.slice();
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }
//?________------------------

  startGame() {
    const btnTrue = document.getElementById('true');
    const btnFalse = document.getElementById('false');
    btnTrue.addEventListener('click', this.handleButtonClick(true));
    btnFalse.addEventListener('click', this.handleButtonClick(false));
    this.gameWords = this.shuffleArray(this.words);
    this.gameResults = [];
    console.log(this.gameResults);
  // clear field
    this.makeTurn();
  };

  makeTurn() {
    this.renderScore();
    if (this.gameWords.length === 0) {
      return this.finishGame();
    }
    this.currentGameWord = this.gameWords.pop();

    this.renderWord(this.currentGameWord);
  }

  finishGame() {
    this.gameResults.forEach(word => {
      word.isCorrect === true ? this.correctAnswer.push(word.word) : this.wrongAnswer.push(word.word);
    });

    document.querySelector('body').insertAdjacentHTML('afterbegin', `<div class="wrapper-score">
    <div class="score">
      <div class ='know'></div><div class ='dntKnow'></div>
      </div>
    </div>`);
    const knowElement = document.querySelector('.know');
    const dntKnowElement =document.querySelector('.dntKnow');
    const resultKnow = document.createElement('div');
    resultKnow.className = 'score-result-know';
    const tamplateScoreKnow = `<p>Know : ${this.correctAnswer.length}</p><div class = 'correctly'></div>`;
    resultKnow.innerHTML = tamplateScoreKnow;

    const resultDntknow = document.createElement('div');
    resultDntknow.className = 'score-result-dont-know';
    const tamplateScoreDntknow = ` <p>Do not know : ${this.wrongAnswer.length}</p><div class = 'error'></div>`;
    resultDntknow.innerHTML = tamplateScoreDntknow;

    knowElement.append(resultKnow);
    dntKnowElement.append(resultDntknow);

    const containerCorrectWords = document.querySelector('.correctly');
    const objectWordsCorrect = this.correctAnswer.map(word => word);
    const addTamplateCorrectWords = (objectWordsCorrect) => `<span>${objectWordsCorrect.word}</span>`;
    const htmlTamplateCorrectWords = objectWordsCorrect.map(addTamplateCorrectWords).join('');
    containerCorrectWords.innerHTML = htmlTamplateCorrectWords;


    const containerWrongWords = document.querySelector('.error');
    const objectWordsWrong = this.wrongAnswer.map(word => word);
    const addTamplateWrongWords = (objectWordsWrong) => `<span>${objectWordsWrong.word}</span>`;
    const htmlTamplateWrongWords = objectWordsWrong.map(addTamplateWrongWords).join('');
    containerWrongWords.innerHTML = htmlTamplateWrongWords;

    // show results
    // clear game field and state
  }

  handleButtonClick(flag) {
    const rightField = document.getElementById('right');
    return (event) => {
      if (this.currentGameWord.isCorrectTranslation === flag) {
         success.play();
         this.addElemenet(this.counterElement +=1);
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
  };
 
  renderScore() {
    const scoreField = document.getElementById('score');
    // const rightField = document.getElementById('right');
    const [score, correctCounter] = this.gameResults.reduce(([score, correctCounter], result) => {
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
    const field = document.getElementById('word-container');
    field.innerHTML = '';
    const temp = [objectWord].map((el) => this.createTemplateWords(el));
    field.insertAdjacentHTML('afterbegin', temp);
  }

  createTemplateWords(wordObj) {
    return `<span class = 'word'>${wordObj.word}</span>
    <span class = 'word'>${wordObj.randomTranslation}</span>`;
  }

  addElemenet(add) {
      const rightField = document.getElementById('right');
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
    } if (add > 17) {
      rightField.insertAdjacentHTML('afterbegin', '<img src="./assets/main/img/icon/mark.svg" alt="logo">');
    }
  }

  async init() {
    try {
      await this.getWords();
      this.startGame();
    } catch (error) {
      
    }
  }
}
