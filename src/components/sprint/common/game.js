import { WordsApi } from '../../../services/services.methods';
import correct from '../assets/audio/correct.mp3';
import wrong from '../assets/audio/error.mp3';

const success = new Audio(correct);
const fail = new Audio(wrong);

const wordsAPI = new WordsApi();

export default class GameSprint {
  constructor() {
    // this.currentWord = null;
    // this.group = null;
    // this.page = null;
    // this.currentWords = [];
    // this.currentIndex = 0;
    // this.score = 0;
    // this.correctAnswers = [];
    // this.wrongAnswers = [];
    // this.scoreCoeff = 0;
    // this.correctAnswerCounter = 0;
    this.words = null;
    this.gameWords = null;
    this.gameResults = null;
    this.currentGameWord = null;
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
    // show results
    // clear game field and state
  }

  handleButtonClick(flag) {
    return (event) => {
      if (this.currentGameWord.isCorrectTranslation === flag) {
        this.gameResults.push({ 
          isCorrect: true,
          word: this.currentGameWord,
        });
      } else {
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
    const rightField = document.getElementById('right');
    const [score, correctCounter] = this.gameResults.reduce(([score, correctCounter], result) => {
      if (!result.isCorrect) {
        return [score, 0];
      }
      return [
        score + 10 + 5 * Math.floor(correctCounter / 4),
        correctCounter + 1,
      ];
    }, [0, 0]);
    rightField.innerHTML = '';
    for ( let i = 0; i < correctCounter; i++) {
      success.play();
      rightField.textContent += '✅';
    }
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

  //  startGame(wordsEn) {
  //     if(wordsEn) {
  //    const objectEN = this.shuffledArray(wordsEn);
  //    const curentWord = objectEN;
  //    console.log(objectEN);
  //    this.addButtonsListenersClick();
  //   }
  // }


  // addButtonsListenersClick() {
  //   //   this.renderWord(this.currentWords[this.currentIndex]);
  //   const btnTRUE = document.getElementById('true');
  //   const btnFALSE = document.getElementById('false');
  //   const rightField = document.getElementById('right');
  //   console.log(this.currentIndex);
  //   btnTRUE.addEventListener('click', (event) => {
  //     if (!(this.currentIndex >= this.currentWords.length - 1)) {
  //       const target = event.target.className;
  //       if (target === 'true') {
  //       this.currentIndex += 1;
  //       this.gameFunctionality(this.currentWords[this.currentIndex], target);
  //     } 
  //     }
  //   });
  //   btnFALSE.addEventListener('click', (event) => {
  //     if (!(this.currentIndex >= this.currentWords.length - 1)) {
  //       const target = event.target.className;
  //       if (target === 'false') { 
  //       this.currentIndex += 1;
  //       this.gameFunctionality(this.currentWords[this.currentIndex],target);
  //     } 
  //     }
  //   });
  // }

  // calcScore(answer) {
  //     console.log(answer);
  //   const score = document.getElementById('score');
  //   if (answer === true) {
  //     if (this.correctAnswerCounter <= 4) {
  //       this.score += 10;
  //     } else if (this.currentIndex <= 8) {
  //       this.score += 15;
  //     } else if (this.currentIndex <= 12) {
  //       this.score += 20;
  //     } else if (this.currentIndex <= 16) {
  //       this.score += 30;
  //     } else if (this.currentIndex <= 20) {
  //       this.score += 40;
  //     }
  //   }
  //   score.textContent = this.score;
  // }

  // gameFunctionality(word,boolean) {
  //     console.log(boolean)
  //   const rightField = document.getElementById('right');

  //   this.renderWord(word);

  //     if (!(this.currentIndex >= this.currentWords.length - 1)) {
  //       if (boolean === 'true') {
  //           console.log(word.translate, word.wordTranslateRUS)
  //         if (word.translate === word.wordTranslateRUS === true) {
  //           this.correctAnswerCounter += 1;
  //           success.play();
  //           this.addElement(this.scoreCoeff += 1);
  //           this.correctAnswers.push(word.id);
  //         } else {
  //           fail.play();
  //           this.correctAnswerCounter = 0;
  //           this.wrongAnswers.push(word);
  //           rightField.innerHTML = '';
  //           this.scoreCoeff = 0;
  //         }
  //         this.calcScore(word.translate === word.wordTranslateRUS === true);
  //       }
  //     } else {
  //       console.log('result');
  //       rightField.innerHTML = '';
  //       this.scoreCoeff = 0;
  //     }
    
  //     if (!(this.currentIndex >= this.currentWords.length - 1)) {
        
  //       if (boolean === 'false') {
  //         if (word.translate === word.wordTranslateRUS === false) {
  //           success.play();
  //           this.correctAnswerCounter += 1;
  //           this.addElement(this.scoreCoeff += 1);
  //           this.correctAnswers.push(word.id);
  //         } else {
  //           fail.play();
  //           this.correctAnswerCounter = 0;
  //           this.wrongAnswers.push(word);
  //           rightField.innerHTML = '';
  //           this.scoreCoeff = 0;
  //         }
  //         this.calcScore(word.translate === word.wordTranslateRUS === false);
  //       }
  //     } else {
  //       console.log(this.correctAnswers, this.wrongAnswers);
  //       rightField.innerHTML = '';
  //       this.scoreCoeff = 0;
  //     }
  // }

  // renderWord(objectWord) {
  //      const field = document.getElementById('word-container');
  //   field.innerHTML = '';
  //   const temp = [objectWord].map((el) => this.createTemplateWords(el));
  //   field.insertAdjacentHTML('afterbegin', temp);
  // }

  // createTemplateWords(word) {
  //   return `<span class = 'word'>${word.wordEn}</span>
  //   <span class = 'word'>${word.wordTranslateRUS}</span>`;
  // }

  // addElement(add) {
  //   const rightField = document.getElementById('right');
  //   if (add <= 4) {
  //     rightField.textContent += '✅';
  //   } else if (add === 5) {
  //     rightField.innerHTML = '';
  //     rightField.textContent += '✅';
  //   } else if (add > 5 && add < 9) {
  //     rightField.textContent += '✅';
  //   } else if (add === 9) {
  //     rightField.innerHTML = '';
  //     rightField.textContent += '✅';
  //   } else if (add > 9 && add < 13) {
  //     rightField.textContent += '✅';
  //   } else if (add === 13) {
  //     rightField.innerHTML = '';
  //     rightField.textContent += '✅';
  //   } else if (add > 13 && add < 17) {
  //     rightField.textContent += '✅';
  //   } else if (add === 17) {
  //     rightField.innerHTML = '';
  //     rightField.textContent += '✅';
  //   } if (add > 17) {
  //     rightField.textContent += '✅';
  //   }
  // }

  async init() {
    try {
      await this.getWords();
      this.startGame();
    } catch (error) {
      
    }
    // this.createObjectWords();
    // this.startGame();
    // document.getElementById('score').textContent = this.score;
    // this.addElement();
  }
}
