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
    console.log(this.gameResults);
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
