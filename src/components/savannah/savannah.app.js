import './scss/savannah.styles.scss';
import { WordsApi, GET_RANDOM } from '../../services/services.methods';
import { getSavannahStart } from './components/savannah_start';
import { getSavannahGame } from './components/savannah_game';
import { getSavannahQuestion } from './components/savannah_question';

class SavannahApp {
  startGame() {
    this.savannahContainer.innerHTML = null;
    this.savannahContainer.insertAdjacentHTML('beforeend', getSavannahGame());
    this.gameLoop();
  }

  gameLoop() {
    this.isEndGame = false;
    this.getNextWord();
  }

  getNextWord() {
    if (document.querySelector('#js-savannah__question')) {
      document.querySelector('#js-savannah__question').parentNode.removeChild(document.querySelector('#js-savannah__question'));
    }
    const word = this.learningWords.shift();
    if (!word) {
      alert('END GAME');
    }
    document.querySelector('#js-savannah__main').insertAdjacentHTML('beforeend', getSavannahQuestion());
    document.querySelector('#js-savannah__question').textContent = word;
    document.querySelector('#js-savannah__question').classList.add('savannah__question_move');
    document.querySelector('#js-savannah__question').addEventListener('animationend', () => this.getNextWord());
  }

  async selectLearningWords() {
    try {
      const wordsRes = await this.wordsApi.getWordsCollection({ group: this.level, page: this.round });
      const questRes = await this.wordsApi.getWordsCollection({
        group: GET_RANDOM(0, 5, this.level),
        page: GET_RANDOM(0, 9),
        wordsPerExampleSentence: 20,
        wordsPerPage: 60,
      });
      this.learningWords = wordsRes.map((word) => word.word);
      this.answears = questRes.map((word) => word.wordTranslate);
      this.startGame();
      console.log(this.learningWords);
      console.log(questRes);
      console.log(this.answears);
    } catch (e) {
      console.log(e);
    }
  }

  onClickStartBtn() {
    this.startBtn.addEventListener('click', () => {
      this.selectLearningWords();
    });
  }

  onChangeLevel() {
    this.savannahLevel.addEventListener('change', (e) => {
      this.level = Number(e.target.value);
    });
  }

  onChangeRound() {
    this.savannahRound.addEventListener('click', (e) => {
      this.round = Number(e.target.value);
    });
  }

  showSavannahStart() {
    this.savannahContainer.insertAdjacentHTML('beforeend', getSavannahStart());
  }

  init() {
    document.querySelector('.main-header').style.display = 'none';
    this.savannahContainer = document.querySelector('#js-savannah-container');
    this.showSavannahStart();
    this.wordsApi = new WordsApi();
    this.startBtn = document.querySelector('#js-savannah__start_button');
    this.startBlock = document.querySelector('#js-start_block');
    this.savannahLevel = document.querySelector('#savannah__level');
    this.savannahRound = document.querySelector('#savannah__round');
    this.round = 0;
    this.level = 0;
    this.onChangeLevel();
    this.onChangeRound();
    this.onClickStartBtn();
  }
}

const savannahApp = () => {
  const savannah = new SavannahApp();
  savannah.init();
};

export default savannahApp;
