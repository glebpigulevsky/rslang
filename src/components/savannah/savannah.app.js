import './scss/savannah.styles.scss';
import correct from './assets/correct_answear.mp3';
import wrong from './assets/wrong_answear.mp3';
import { WordsApi, GET_RANDOM } from '../../services/services.methods';
import { SavannahServiceStart } from './services/savannah_service_start';
import { getSavannahGame } from './components/savannah_game';
import { getSavannahQuestion } from './components/savannah_question';
import { getSavannahAnswears } from './components/savannah_answears';
import { getSavannahResult } from './components/savannah_result';
import { getSavannahResultAnswear } from './components/savannah_result_answear';
import { Spinner } from '../spinner/spinner';
import { ErrorPopup } from '../error/error.error_popup';
import { DIGIT_CODES } from './common/savannah.common.constans';
import { getNextVariable } from './common/savannah.common.utils';

class SavannahApp {
  constructor() {
    this.gameStatistics = { correct: [], wrong: [] };
    this.statRound = { correct: [], wrong: [] };
    this.errorPopup = new ErrorPopup();
    this.startService = new SavannahServiceStart();
  }

  startGame() {
    this.savannahContainer.innerHTML = null;
    this.savannahContainer.insertAdjacentHTML('beforeend', getSavannahGame());
    this.gameLoop();
    this.burningLives = 5;
    this.onClickCloseBtn();
    this.onClickSoundBtn();
    this.isPlayingSound = true;
  }

  onClickSoundBtn() {
    const savannahSound = document.querySelector('.savannah__sound');
    const mutedClass = 'savannah__sound_muted';
    savannahSound.addEventListener('click', () => {
      if (savannahSound.classList.contains(mutedClass)) {
        this.isPlayingSound = true;
        savannahSound.classList.remove(mutedClass);
      } else {
        this.isPlayingSound = false;
        savannahSound.classList.add(mutedClass);
      }
    });
  }

  onClickStartBtn() {
    const startBtn = document.querySelector('#js-savannah__start_button');
    startBtn.addEventListener('click', () => {
      this.savannahContainer.innerHTML = null;
      this.selectLearningWords();
    });
  }

  onClickAudioBtn() {
    const audioBtn = document.querySelectorAll('.savannah__start_final_audio');
    audioBtn.forEach((answear) => answear.addEventListener('click', (e) => {
      const audio = new Audio(e.target.dataset.audio);
      audio.play();
    }));
  }

  onClickCloseBtn() {
    const closeBtn = document.querySelector('.savannah__close_btn');
    closeBtn.addEventListener('click', () => { window.location.replace(`${window.location.origin}${window.location.pathname}`); });
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

  gameLoop() {
    this.getNextWord();
    this.onPressNumberKey();
  }

  getRamdomTranslation(correctTranslation) {
    this.correctTranslationIndex = GET_RANDOM(0, 3);
    const first = correctTranslation;
    const second = getNextVariable([first], this.answears);
    const third = getNextVariable([first, second], this.answears);
    const fourth = getNextVariable([first, second, third], this.answears);
    const res = [second, third, fourth];
    res.splice(this.correctTranslationIndex, 0, first);
    return {
      first: res[0],
      second: res[1],
      third: res[2],
      fourth: res[3],
    };
  }

  checkAnswear(currentTranslate) {
    if (currentTranslate === this.currentWord.wordTranslate) {
      if (this.isPlayingSound) {
        this._playAudio(correct);
      }
      return true;
    }
    if (this.burningLives === 0) {
      this.endGame();
    } else {
      this._burnLife();
    }
    if (this.isPlayingSound) {
      this._playAudio(wrong);
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
    const mainBlock = document.querySelector('#js-savannah__main');
    mainBlock.insertAdjacentHTML('beforeend', getSavannahQuestion(this.currentWord.word));
    mainBlock.insertAdjacentHTML('beforeend', getSavannahAnswears(this.getRamdomTranslation(this.currentWord.wordTranslate)));
    const questionBtn = document.querySelector('#js-savannah__question');
    questionBtn.classList.add('savannah__question_move');
    questionBtn.addEventListener('animationend', () => {
      this.statRound.wrong.push(this.currentWord);
      this.gameStatistics.wrong.push(this.currentWord);
      this.getNextWord();
    });
    const answearsBtns = document.querySelectorAll('.savannah__answear');
    answearsBtns.forEach((ans) => ans.addEventListener('click', (e) => this.answearHandle(e.target)));
    this.isSelectedAnswear = false;
  }

  endGame() {
    this.savannahContainer.innerHTML = null;
    this.savannahContainer.insertAdjacentHTML('beforeend',
      getSavannahResult({
        correct: this.statRound.correct.length,
        wrong: this.statRound.wrong.length,
      }));

    const wrongAnswears = this.statRound.wrong.reduce((acc, word) => acc + getSavannahResultAnswear(this._transformAnswear(word)), '');
    const correctAnswears = this.statRound.correct.reduce((acc, word) => acc + getSavannahResultAnswear(this._transformAnswear(word)), '');

    document.querySelector('.savannah__start_final_wrong').insertAdjacentHTML('beforeend', wrongAnswears);
    document.querySelector('.savannah__start_final_valid').insertAdjacentHTML('beforeend', correctAnswears);
    this.onClickCloseBtn();
    this.onClickStartBtn();
    this.onClickAudioBtn();
    this.statRound = { correct: [], wrong: [] };
    this.burningLives = 0;
  }

  _transformAnswear({ word, wordTranslate, audio }) {
    return {
      word,
      translate: wordTranslate,
      audio,
    };
  }

  _playAudio(src) {
    const audio = new Audio(src);
    audio.play();
  }

  _burnLife() {
    const burnedLife = document.querySelector(`.savannah__heart[data-pos="${this.burningLives}"]`);
    burnedLife.classList.add('savannah__heart_kill');
    this.burningLives -= 1;
  }

  answearHandle(answearNode) {
    if (this.isSelectedAnswear) {
      return;
    }
    document.querySelector('#js-savannah__answears').childNodes.forEach((btn) => { btn.disabled = true; });
    const isCorrect = this.checkAnswear(answearNode.dataset.answear);
    if (isCorrect) {
      answearNode.classList.add('savannah__answear_correct');
      this.statRound.correct.push(this.currentWord);
      this.gameStatistics.correct.push(this.currentWord);
    } else {
      this.statRound.wrong.push(this.currentWord);
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

  async selectLearningWords() {
    const spinner = new Spinner(this.savannahContainer);
    spinner.render();
    try {
      const wordsRes = await this.wordsApi.getWordsCollection(
        { group: this.level, page: this.round },
      );
      this.learningWords = wordsRes;
    } catch (e) {
      this.errorPopup.openPopup({ text: e.message });
      spinner.remove();
      return;
    }
    try {
      const questRes = await this.wordsApi.getWordsCollection({
        group: GET_RANDOM(0, 5, [this.level]),
        page: GET_RANDOM(0, 9),
        wordsPerExampleSentence: 20,
        wordsPerPage: 60,
      });
      this.answears = questRes.map((word) => word.wordTranslate);
    } catch (e) {
      this.errorPopup.openPopup({ text: e.message });
      spinner.remove();
      return;
    }
    this.startGame();
    spinner.remove();
  }

  init() {
    document.querySelector('.main-header').style.display = 'none';
    this.savannahContainer = document.querySelector('#js-savannah-container');
    this.startService.showSavannahStart();
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
