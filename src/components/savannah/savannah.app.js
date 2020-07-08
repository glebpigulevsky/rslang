import './scss/savannah.styles.scss';
import { WordsApi, GET_RANDOM } from '../../services/services.methods';
import { getSavannahStart } from './components/savannah_start';
import { getSavannahGame } from './components/savannah_game';
import { getSavannahQuestion } from './components/savannah_question';
import { getSavannahAnswears } from './components/savannah_answears';
import { getSavannahResult } from './components/savannah_result';
import { getSavannahResultAnswear } from './components/savannah_result_answear';

const DIGIT_CODES = ['Digit1', 'Digit2', 'Digit3', 'Digit4', 'Numpad1', 'Numpad2', 'Numpad3', 'Numpad4'];

class SavannahApp {
  constructor() {
    this.gameStatistics = { correct: [], wrong: [] };
    this.gameStatisticsRound = { correct: [], wrong: [] };
  }

  startGame() {
    this.savannahContainer.innerHTML = null;
    this.savannahContainer.insertAdjacentHTML('beforeend', getSavannahGame());
    this.gameLoop();
    this.burningLives = 5;
    this.onClickCloseBtn();
  }

  gameLoop() {
    this.getNextWord();
    this.onPressNumberKey();
  }

  getRamdomTranslation(correctTranslation) {
    this.correctTranslationIndex = GET_RANDOM(0, 3);
    const first = correctTranslation;
    const second = this.getNextVariable([first]);
    const third = this.getNextVariable([first, second]);
    const fourth = this.getNextVariable([first, second, third]);
    const res = [];
    res.push(second);
    res.push(third);
    res.push(fourth);
    res.splice(this.correctTranslationIndex, 0, first);
    return {
      first: res[0],
      second: res[1],
      third: res[2],
      fourth: res[3],
    };
  }

  onClickCloseBtn() {
    document.querySelector('.savannah__close_btn').addEventListener('click', () => { window.location.replace(`${window.location.origin}${window.location.pathname}`);});
  }

  getNextVariable(lockedTranslations = []) {
    let res = '';
    do {
      res = this.answears[GET_RANDOM(0, this.answears.length - 1)];
    }
    while (lockedTranslations.includes(res));
    return res;
  }

  checkAnswear(currentTranslate) {
    if (currentTranslate === this.currentWord.wordTranslate) {
      return true;
    }
    if (this.burningLives === 0) {
      this.endGame();
    } else {
      document.querySelector(`.savannah__heart[data-pos="${this.burningLives}"]`).classList.add('savannah__heart_kill');
      this.burningLives -= 1;
    }
    return false;
  }

  getNextWord() {
    const quest = document.querySelector('#js-savannah__question');
    if (quest) {
      quest.parentNode.removeChild(quest);
    }
    const answears = document.querySelector('#js-savannah__answears');
    if (answears) {
      answears.parentNode.removeChild(answears);
    }
    this.currentWord = this.learningWords.shift();
    if (!this.currentWord) {
      this.endGame();
      return;
    }
    document.querySelector('#js-savannah__main').insertAdjacentHTML('beforeend', getSavannahQuestion(this.currentWord.word));
    document.querySelector('#js-savannah__main').insertAdjacentHTML('beforeend', getSavannahAnswears(this.getRamdomTranslation(this.currentWord.wordTranslate)));
    document.querySelector('#js-savannah__question').classList.add('savannah__question_move');
    document.querySelector('#js-savannah__question').addEventListener('animationend', () => {
      this.gameStatisticsRound.wrong.push(this.currentWord);
      this.gameStatistics.wrong.push(this.currentWord);
      this.getNextWord();
    });
    document.querySelectorAll('.savannah__answear').forEach((ans) => ans.addEventListener('click', (e) => this.answearHandle(e.target)));
    this.isSelectedAnswear = false;
  }

  endGame() {
    this.savannahContainer.innerHTML = null;
    this.savannahContainer.insertAdjacentHTML('beforeend',
      getSavannahResult({
        correct: this.gameStatisticsRound.correct.length,
        wrong: this.gameStatisticsRound.wrong.length,
      }));
    let wrongAnswears = '';
    this.gameStatisticsRound.wrong.forEach((word) => {
      wrongAnswears += getSavannahResultAnswear({
        word: word.word,
        translate: word.wordTranslate,
      });
    });
    let correctAnswears = '';
    this.gameStatisticsRound.correct.forEach((word) => {
      correctAnswears += getSavannahResultAnswear({
        word: word.word,
        translate: word.wordTranslate,
      });
    });
    document.querySelector('.savannah__start_final_wrong').insertAdjacentHTML('beforeend', wrongAnswears);
    document.querySelector('.savannah__start_final_valid').insertAdjacentHTML('beforeend', correctAnswears);
    this.onClickCloseBtn();
    this.onClickStartBtn();
    this.gameStatisticsRound = { correct: [], wrong: [] };
    this.burningLives = 0;
  }

  answearHandle(answearNode) {
    if (this.isSelectedAnswear) {
      return;
    }
    document.querySelector('#js-savannah__answears').childNodes.forEach((btn) => { btn.disabled = true; });
    const isCorrect = this.checkAnswear(answearNode.dataset.answear);
    if (isCorrect) {
      answearNode.classList.add('savannah__answear_correct');
      this.gameStatisticsRound.correct.push(this.currentWord);
      this.gameStatistics.correct.push(this.currentWord);
    } else {
      this.gameStatisticsRound.wrong.push(this.currentWord);
      this.gameStatistics.wrong.push(this.currentWord);
      answearNode.classList.add('savannah__answear_wrong');
      document
        .querySelector('#js-savannah__answears')
        .querySelector(`:nth-child(${this.correctTranslationIndex + 1}`)
        .classList.add('savannah__answear_correct');
    }
    const quest = document.querySelector('#js-savannah__question');
    quest.parentNode.removeChild(quest);
    setTimeout(() => {
      this.getNextWord();
    }, 2000);
    this.isSelectedAnswear = true;
  }

  onPressNumberKey() {
    document.addEventListener('keydown', (e) => {
      if (DIGIT_CODES.includes(e.code)) {
        e.preventDefault();
        const answearNode = document.querySelector('#js-savannah__answears').querySelector(`[data-digit="${e.key}"]`);
        this.answearHandle(answearNode);
      }
    });
  }

  async selectLearningWords() {
    try {
      const wordsRes = await this.wordsApi.getWordsCollection(
        { group: this.level, page: this.round },
      );
      const questRes = await this.wordsApi.getWordsCollection({
        group: GET_RANDOM(0, 5, [this.level]),
        page: GET_RANDOM(0, 9),
        wordsPerExampleSentence: 20,
        wordsPerPage: 60,
      });
      this.learningWords = wordsRes.map((word) => ({
        word: word.word,
        wordTranslate: word.wordTranslate,
        id: word.id
      }));
      this.answears = questRes.map((word) => word.wordTranslate);
      this.startGame();
    } catch (e) {
      console.log(e);
    }
  }

  onClickStartBtn() {
    document.querySelector('#js-savannah__start_button').addEventListener('click', () => {
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
    this.startBlock = document.querySelector('#js-start_block');
    this.savannahLevel = document.querySelector('#savannah__level');
    this.savannahRound = document.querySelector('#savannah__round');
    this.round = 0;
    this.level = 0;
    this.onChangeLevel();
    this.onChangeRound();
    this.onClickStartBtn();
    this.onClickCloseBtn();
  }
}

const savannahApp = () => {
  const savannah = new SavannahApp();
  savannah.init();
};

export default savannahApp;
