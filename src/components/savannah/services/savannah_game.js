import '../scss/savannah.styles.scss';
import correct from '../assets/correct_answear.mp3';
import wrong from '../assets/wrong_answear.mp3';
import background from '../assets/img/bgSavannah.jpg';
import { WordsApi, GET_RANDOM } from '../../../services/services.methods';
import { SavannahServiceStart } from './savannah_service_start';
import { getSavannahGame } from '../components/savannah_game';
import { getSavannahQuestion } from '../components/savannah_question';
import { getSavannahAnswears } from '../components/savannah_answears';
import { getSavannahResultAnswear } from '../components/savannah_result_answear';
import { Spinner } from '../../spinner/spinner';
import { ErrorPopup } from '../../error/error.error_popup';
import { DIGIT_CODES, GAME_DEFAULT } from '../common/savannah.common.constans';
import { getNextVariable } from '../common/savannah.common.utils';
import { MINI_GAMES_NAMES, mainStorage, mainController } from '../../main/components/mainStorage/mainStorage';

export class SavannahGame {
  constructor() {
    this.staticticsRound = { correct: [], wrong: [] };
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
    if (nextWord) {
      console.log(nextWord);
      this.currentWord = nextWord;
      this.addQuiz();
      this.isSelectedAnswear = false;
    } else {
      this.endGame();
    }
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
      this.answearHandle(null, true);
    });
    const answearsBtns = document.querySelector('#js-savannah__answears');
    answearsBtns.addEventListener('click', (e) => {
      if (e.target.classList.contains('savannah__answear')) {
        this.answearHandle(e.target);
      }
    });
  }

  checkAnswear(currentTranslate) {
    const isCorrect = (currentTranslate === this.currentWord.wordTranslate);
    if (this.isPlayingSound) {
      this.playAudio(isCorrect ? correct : wrong);
    }
    if (!isCorrect) {
      this.burnLife();
    }
    return !!isCorrect;
  }

  endGame() {
    document.querySelector('#js-savannah-container').innerHTML = null;
    this.startService.showSavannahResult(this.staticticsRound.correct.length, this.staticticsRound.wrong.length);
    this.sendStatistics(this.staticticsRound.correct.length, this.staticticsRound.wrong.length);
    const wrongAnswears = this.staticticsRound.wrong.reduce((acc, word) => acc + getSavannahResultAnswear(this._transformAnswear(word)), '');
    const correctAnswears = this.staticticsRound.correct.reduce((acc, word) => acc + getSavannahResultAnswear(this._transformAnswear(word)), '');
    mainStorage.addMiniGameResults({
      miniGameName: MINI_GAMES_NAMES.SAVANNA,
      isCorrect: true,
      wordsDataArray: correctAnswears,
    });
    mainStorage.addMiniGameResults({
      miniGameName: MINI_GAMES_NAMES.SAVANNA,
      isCorrect: false,
      wordsDataArray: wrongAnswears,
    });
    document.querySelector('.savannah__start_final_wrong').insertAdjacentHTML('beforeend', wrongAnswears);
    document.querySelector('.savannah__start_final_valid').insertAdjacentHTML('beforeend', correctAnswears);
    this.onClickCloseBtn();
    this.onClickStartBtn();
    this.onClickLearningBtn();
    this.onClickAudioBtn();
    this.onChangeLevel();
    this.onChangeRound();
    this.onClickStatisticsBtn();
    this.staticticsRound.correct = [];
    this.staticticsRound.wrong = [];
    this.burningLives = 0;
  }

  async sendStatistics(correctVal, wrongVal) {
    const allResults = await mainController.getUserStatistics();
    const longResults = JSON.parse(allResults.optional[MINI_GAMES_NAMES.SAVANNA]);
    if (longResults.length > GAME_DEFAULT.StatisticsMaxCount) {
      longResults.shift();
    }
    const newLongResult = `${new Date().toLocaleString()} I know: ${correctVal}, I don't know: ${wrongVal}`;
    longResults.push(newLongResult);
    allResults.optional[MINI_GAMES_NAMES.SAVANNA] = JSON.stringify(longResults);
    await mainController.updateUserStatistics(allResults);
  }

  _transformAnswear({ word, wordTranslate, audio }) {
    return {
      word,
      translate: wordTranslate,
      audio,
    };
  }

  playAudio(src) {
    const audio = new Audio(src);
    audio.play();
  }

  burnLife() {
    if (this.burningLives > 0) {
      const burnedLife = document.querySelector(`.savannah__heart[data-pos="${this.burningLives}"]`);
      burnedLife.classList.add('savannah__heart_kill');
    }
    this.burningLives -= 1;
  }

  answearHandle(answearNode = null, isAnimationEnd = null) {
    if (this.isSelectedAnswear) {
      return;
    }
    document.querySelector('#js-savannah__answears').childNodes.forEach((btn) => { btn.disabled = true; });
    const isCorrectAnswer = (isAnimationEnd) ? this.checkAnswear('[unselectAnswerGame]') : this.checkAnswear(answearNode.dataset.answear);
    if (isCorrectAnswer) {
      if (answearNode) {
        answearNode.classList.add('savannah__answear_correct');
      }
      this.staticticsRound.correct.push(this.currentWord);
    } else {
      this.staticticsRound.wrong.push(this.currentWord);
      if (answearNode) {
        answearNode.classList.add('savannah__answear_wrong');
      }
      document
        .querySelector('#js-savannah__answears')
        .querySelector(`:nth-child(${this.correctTranslationIndex + 1}`)
        .classList.add('savannah__answear_correct');
    }
    const quest = document.querySelector('#js-savannah__question');
    quest.parentNode.removeChild(quest);
    this.isSelectedAnswear = true;
    if (this.burningLives < 0 && !isCorrectAnswer) {
      setTimeout(() => {
        this.endGame();
      }, 2000);
    } else {
      setTimeout(() => {
        this.gameLoop();
      }, 2000);
    }
  }

  async getLearningWords(isUserWords) {
    this.spinner = new Spinner(this.savannahContainer);
    this.spinner.render();
    let wordsRes = null;
    if (isUserWords) {
      wordsRes = await mainStorage
        .getWordsToLearn()
        .catch(this.showErrorPopup.bind(this));
      wordsRes = wordsRes.slice(0, 21);
    } else {
      wordsRes = await this.wordsApi
        .getWordsCollection({ group: this.level, page: this.round })
        .catch(this.showErrorPopup.bind(this));
    }
    this.learningWords = wordsRes;
    const questRes = await this.wordsApi
      .getWordsCollection({
        group: GET_RANDOM(
          GAME_DEFAULT.WordGroupRange.Min,
          GAME_DEFAULT.WordGroupRange.Max,
          [this.level],
        ),
        page: GET_RANDOM(GAME_DEFAULT.WordPageRange.Min, GAME_DEFAULT.WordPageRange.Max),
        wordsPerExampleSentence: GAME_DEFAULT.WordsPerExampleSentence,
        wordsPerPage: GAME_DEFAULT.WordsPerPage,
      }).catch(this.showErrorPopup.bind(this));
    this.answears = questRes.map((word) => word.wordTranslate);
    const image = document.createElement('img');
    image.src = background;
    image.onload = () => {
      document.querySelector('#js-savannah-container').style.backgroundImage = `url(${background})`;
      this.spinner.remove();
      this.startGame();
    };
  }

  showErrorPopup(err) {
    this.errorPopup.openPopup({ text: err.message });
    this.spinner.remove();
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

  onClickResultBtn() {
    const statisticNode = document.querySelector('#js-savannah_start_page_result');
    statisticNode.addEventListener('click', () => {

    });
  }

  onClickStatisticsBtn() {
    const statisticNode = document.querySelector('#js-savannah_start_page_statistics');
    statisticNode.addEventListener('click', async () => {
      const allResults = await mainController.getUserStatistics();
      const longResults = JSON.parse(allResults.optional[MINI_GAMES_NAMES.SAVANNA]);
      const finalNode = document.querySelector('.savannah__start_final_answears');
      finalNode.innerHTML = null;
      const wrongAnswears = longResults.reduce((acc, word) => acc + this.startService.showSavannahStatistics(word), '');
      finalNode.insertAdjacentHTML('beforeend', wrongAnswears);
      document.querySelectorAll('.savannah__start_page').forEach((stat) => { stat.classList.remove('savannah__start_page_select'); });
      statisticNode.classList.add('savannah__start_page_select');
    });
  }

  onClickStartBtn() {
    const startBtn = document.querySelector('#js-savannah__start_button');
    startBtn.addEventListener('click', () => {
      this.savannahContainer.innerHTML = null;
      this.getLearningWords(false);
    });
  }

  onClickLearningBtn() {
    const startBtn = document.querySelector('#js-savannah__start_learning');
    startBtn.addEventListener('click', () => {
      this.savannahContainer.innerHTML = null;
      this.getLearningWords(true);
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
    this.onClickLearningBtn();
    this.onClickCloseBtn();
  }
}
