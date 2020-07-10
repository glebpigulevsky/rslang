import '../scss/savannah.styles.scss';
import correct from '../assets/correct_answear.mp3';
import wrong from '../assets/wrong_answear.mp3';
import { WordsApi, GET_RANDOM } from '../../../services/services.methods';
import { SavannahServiceStart } from './savannah_service_start';
import { getSavannahGame } from '../components/savannah_game';
import { getSavannahQuestion } from '../components/savannah_question';
import { getSavannahAnswears } from '../components/savannah_answears';
import { getSavannahResult } from '../components/savannah_result';
import { getSavannahResultAnswear } from '../components/savannah_result_answear';
import { Spinner } from '../../spinner/spinner';
import { ErrorPopup } from '../../error/error.error_popup';
import { DIGIT_CODES, GAME_DEFAULT } from '../common/savannah.common.constans';
import { getNextVariable } from '../common/savannah.common.utils';

export class SavannahGame {
  constructor() {
    this.statRound = { correct: [], wrong: [] };
    this.errorPopup = new ErrorPopup();
    this.startService = new SavannahServiceStart();
    this.wordsApi = new WordsApi();
  }

  startGame() {
    this.savannahContainer.innerHTML = null;
    this.savannahContainer.insertAdjacentHTML('beforeend', getSavannahGame());
    this.burningLives = GAME_DEFAULT.BurningLivesCount;
    this.isPlayingSound = true;
    this.onClickCloseBtn();
    this.onClickSoundBtn();
    this.onPressNumberKey();
    this.gameLoop();
  }

  gameLoop() {
    this.removeQuiz();
    const learnLength = this.learningWords.length;
    const { 0: nextWord } = this.learningWords.splice(GET_RANDOM(0, (learnLength - 1)), 1);
    if (!nextWord) {
      this.endGame();
      return;
    }
    this.currentWord = nextWord;
    this.addQuiz();
    this.isSelectedAnswear = false;
  }

  removeQuiz() {
    const quest = document.querySelector('#js-savannah__question');
    if (quest) {
      quest.parentNode.removeChild(quest);
    }
    const answears = document.querySelector('#js-savannah__answears');
    if (answears) {
      answears.parentNode.removeChild(answears);
    }
  }

  addQuiz() {
    const mainBlock = document.querySelector('#js-savannah__main');
    mainBlock.insertAdjacentHTML('beforeend', getSavannahQuestion(this.currentWord.word));
    mainBlock.insertAdjacentHTML('beforeend', getSavannahAnswears(this.getRamdomTranslation(this.currentWord.wordTranslate)));
    const questionBtn = document.querySelector('#js-savannah__question');
    questionBtn.classList.add('savannah__question_move');
    questionBtn.addEventListener('animationend', () => {
      this.statRound.wrong.push(this.currentWord);
      this.gameLoop();
    });
    const answearsBtns = document.querySelectorAll('.savannah__answear');
    answearsBtns.forEach((ans) => ans.addEventListener('click', (e) => this.answearHandle(e.target)));
  }

  checkAnswear(currentTranslate) {
    const isCorrect = (currentTranslate === this.currentWord.wordTranslate);
    if (this.isPlayingSound) {
      this._playAudio(isCorrect ? correct : wrong);
    }
    if (!isCorrect) {
      if (this.burningLives === 0) {
        this.endGame();
      } else {
        this.burnLife();
      }
    }
    return !!isCorrect;
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
    this.onChangeLevel();
    this.onChangeRound();
    this.statRound.correct = [];
    this.statRound.wrong = [];
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

  burnLife() {
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
    } else {
      this.statRound.wrong.push(this.currentWord);
      answearNode.classList.add('savannah__answear_wrong');
      document
        .querySelector('#js-savannah__answears')
        .querySelector(`:nth-child(${this.correctTranslationIndex + 1}`)
        .classList.add('savannah__answear_correct');
    }
    const quest = document.querySelector('#js-savannah__question');
    quest.parentNode.removeChild(quest);
    setTimeout(() => {
      this.gameLoop();
    }, 2000);
    this.isSelectedAnswear = true;
  }

  async getLearningWords() {
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
        group: GET_RANDOM(
          GAME_DEFAULT.WordGroupRange.Min,
          GAME_DEFAULT.WordGroupRange.Max,
          [this.level],
        ),
        page: GET_RANDOM(GAME_DEFAULT.WordPageRange.Min, GAME_DEFAULT.WordPageRange.Max),
        wordsPerExampleSentence: GAME_DEFAULT.WordsPerExampleSentence,
        wordsPerPage: GAME_DEFAULT.WordsPerPage,
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
      this.getLearningWords();
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
    closeBtn.addEventListener('click', () => {
      document.querySelector('.main-header').style.display = 'block';
      window.location.replace(`${window.location.origin}${window.location.pathname}`);
    });
  }

  onPressNumberKey() {
    document.addEventListener('keydown', (e) => {
      if (DIGIT_CODES.includes(e.code)) {
        e.preventDefault();
        const answearNode = document
          .querySelector('#js-savannah__answears')
          .querySelector(`[data-digit="${e.key}"]`);
        this.answearHandle(answearNode);
      }
    });
  }

  onChangeLevel() {
    document.querySelector('#savannah__level').addEventListener('change', (e) => {
      this.level = Number(e.target.value);
    });
  }

  onChangeRound() {
    document.querySelector('#savannah__round').addEventListener('click', (e) => {
      this.round = Number(e.target.value);
    });
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

  unmount() {
    document.querySelector('.main-header').style.display = 'block';
  }

  init() {
    document.querySelector('.main-header').style.display = 'none';
    this.savannahContainer = document.querySelector('#js-savannah-container');
    this.startService.showSavannahStart();
    this.startBlock = document.querySelector('#js-start_block');
    this.round = 0;
    this.level = 0;
    this.onChangeLevel();
    this.onChangeRound();
    this.onClickStartBtn();
    this.onClickCloseBtn();
  }
}
