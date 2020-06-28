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
  }

  async getWords() {
    let response;
    try {
      response = await wordsAPI.getWordsCollection({
        group: 0,
        page: 1,
      });
    } catch (error) {
      console.log(error);
      return;
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
    return (event) => {
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
    const field = document.querySelector('.game-sprint__field');
    field.innerHTML = '';
    const temp = [objectWord].map((el) => this.createTemplateWords(el));
    field.insertAdjacentHTML('afterbegin', temp);
  }

  createTemplateWords(wordObj) {
    return `<div class="game-sprint__word game-sprint__word--eng">${wordObj.word}</div>
     <div class="game-sprint__word game-sprint__word--rus"${wordObj.randomTranslation}</div>`;
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
      this.previewsStatrt();
      this.startGame();
    } catch (error) {
    }
  }
}

// import { WordsApi } from '../../../services/services.methods';

// import { ErrorPopup } from '../../error/error.error_popup';

// const wordsAPI = new WordsApi();

// export default class GameSprint {
//   constructor() {
//     this.currentWord = null;
//     this.group = null;
//     this.page = null;
//     this.level = null;
//     this.currentWords = [];
//     this.currentIndex = 0;
//     this.score = 0;
//     this.correctAnswers = [];
//     this.wrongAnswers = [];
//     this.scoreCoeff = 10;
//     this.correctAnswerCounter = 0;
//   }

//   getWords() {
//     wordsAPI.getWordsCollection({
//       group: 0,
//       page: 1,
//     })
//       .then((res) => {
//         this.createObjectWords(res);
//       })
//       .catch((error) => {
//         // new ErrorPopup().openPopup(error);
//         console.log(error);
//       });
//   }

//   createObjectWords(words) {
//     if (words) {
//       this.currentWords = words.map((el, ind, array) => ({
//         id: el.id,
//         wordEn: el.word,
//         translate: el.wordTranslate,
//         wordTranslateRUS: this.pickRandomWord(array),
//         result: el.wordTranslate === this.wordTranslateRUS,
//       }));
//       this.startGame(this.currentWords);
//     }
//   }

//   pickRandomWord(array) {
//     const arr = array;
//     arr.sort(() => Math.random() - 0.5);
//     const wordRandom = arr.map((el) => el.wordTranslate);
//     return wordRandom[0];
//   }

//   shuffledArray(array) {
//     if (array) {
//       return array.sort(() => Math.random() - 0.5);
//     }
//   }

//   startGame(wordsEn) {
//     const objectEN = this.shuffledArray(wordsEn);
//     this.makeTurn(objectEN);
//   }

//   makeTurn(gameWords) {
//     if (gameWords) {
//       const curentWord = gameWords[this.currentIndex];
//       console.log(gameWords);
//       this.handleButtonClick(curentWord);
//       this.renderWord(curentWord);
//     }
//   }

//   handleButtonClick(word) {
//     const btnTRUE = document.getElementById('true');
//     const btnFALSE = document.getElementById('false');
//     btnTRUE.addEventListener('click', (event) => {
//       if (!(this.currentIndex > this.currentWords.length - 1)) {
//         const target = event.target.className;
//         if (target === 'true') {
//           if (word.result === true) {
//             console.log('TRUE');
//             this.correctAnswerCounter += 1;
//             this.correctAnswers.push(word.id);
//           } else {
//             console.log('FALSE');
//             this.correctAnswerCounter = 0;
//             this.wrongAnswers.push(word);
//           }
//         }
//         console.log(this.correctAnswerCounter);
//         this.calcScore(word.result === true);
//         this.currentIndex += 1;
//         this.renderWord(this.currentWords[this.currentIndex]);
//       } else {
//         console.log('result');
//       }
//     });
//     btnFALSE.addEventListener('click', (event) => {
//       console.log(this.currentWords.length - 1, this.currentIndex);
//       console.log(!(this.currentIndex >= this.currentWords.length - 1));
//       if (!(this.currentIndex >= this.currentWords.length - 1)) {
//         const target = event.target.className;
//         console.log(target);
//         if (target === 'false wrong') {
//           if (word.result === false) {
//             console.log('TRUE');
//             this.correctAnswerCounter += 1;
//             this.correctAnswers.push(word.id);
//           } else {
//             console.log('FALSE');
//             this.correctAnswerCounter = 0;
//             this.wrongAnswers.push(word);
//           }
//         }
//         console.log(this.correctAnswerCounter);
//         this.calcScore(word.result === false);
//         this.currentIndex += 1;
//         this.renderWord(this.currentWords[this.currentIndex]);
//       } else {
//         console.log(this.correctAnswers, this.wrongAnswers);
//       }
//     });
//   }

//   calcScore(answer) {
//     const score = document.getElementById('score');
//     if (answer === true) {
//       if (this.correctAnswerCounter <= 4) {
//         this.score += 10;
//       } else if (this.currentIndex <= 8) {
//         this.score += 15;
//       } else if (this.currentIndex <= 12) {
//         this.score += 20;
//       } else if (this.currentIndex <= 16) {
//         this.score += 30;
//       } else if (this.currentIndex <= 20) {
//         this.score += 40;
//       }
//     }
//     score.textContent = this.score;
//   }

//   renderWord(object) {
//     const field = document.querySelector('.game-sprint__field');
//     field.innerHTML = '';
//     const temp = [object].map((el) => this.createTemplateWords(el));
//     field.insertAdjacentHTML('afterbegin', temp);
//   }

//   createTemplateWords(word) {
//     return `<div class="game-sprint__word game-sprint__word--eng">${word.wordEn}</div>
//     <div class="game-sprint__word game-sprint__word--rus">${word.wordTranslateRUS}</div>
//     `;
//   }

//   previewsStatrt() {
//     this.startbtn.addEventListener('click', (event) => {
//       if (event.target.classList.contains('preview__btn')) {
//        document.querySelector('.sprint-game__wrapper').classList.remove('display-none');
//        document.querySelector('.preview').classList.add('display-none');
//       }
//     });
//   }

//   init() {
//     this.getWords();
//     this.createObjectWords();
//     this.startGame();
//     this.startbtn = document.querySelector('.preview__btn');
//     this.previewsStatrt();
//     document.getElementById('score').textContent = this.score;
//     // this.playGame();
//   }
// }
