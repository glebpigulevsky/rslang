import { WordsApi } from '../../services/services.methods';
import StartScreenClass from './components/startScreen';
import { statsTemplate, gameTemplate, roundCalc } from './components/templates/templates';
import { MINI_GAMES_NAMES, mainStorage } from '../main/components/mainStorage/mainStorage';
import './scss/audio-call.scss';

const wordsGetter = new WordsApi();

class AudioCall {
  constructor() {
    this.round = 0;
    this.word = 0;
    this.currentWord = 0;
    this.globalWord = 0;
    this.wordsArray = [];
    this.resultsCorrectArray = [];
    this.resultsWrongArray = [];
    this.resultsDontKnowArray = [];
    this.progress = 0;
    this.wordsClickHandlerBinded = this.wordsClickHandler.bind(this);
    this.dontKnowButtonBinded = this.dontKnowButton.bind(this);
    this.enterCount = 0;
    this.keyCount = 0;
    this.roundState = 'game';
  }

  init() {
    this.startScreenClass = new StartScreenClass(
      this.startGameClickHandler.bind(this),
      this.startGameWithLearnedWords.bind(this),
    );
  }

  startScreen() {
    this.startScreenClass.render();
    this.wordsArray = [];
    this.currentWord = 0;
    this.globalWord = 0;
    this.word = 0;

    if (window.localStorage.getItem('group')) {
      document.querySelector('.group').querySelectorAll('*')[window.localStorage.getItem('group')].selected = true;
      document.querySelector('.page').querySelectorAll('*')[window.localStorage.getItem('page')].selected = true;
    }
  }

  startGameClickHandler() {
    this.getData(+document.querySelector('.group').value - 1, +document.querySelector('.page').value - 1);
    this.renderGameScreen();
  }

  startGameWithLearnedWords() {
    this.getLearnedData(+document.querySelector('.group').value - 1, +document.querySelector('.page').value - 1);
    this.renderGameScreen();
  }

  renderGameScreen() {
    document.querySelector('.main__game').innerHTML = gameTemplate;
  }

  showShortStats() {
    this.roundState = 'stats';
    document.querySelector('.main__game').innerHTML = statsTemplate;
  }

  getLearnedData(group, page) {
    this.roundState = 'game';
    this.group = group;
    this.page = roundCalc[page];
    this.startPage = page;
    this.resultsCorrectArray = [];
    this.resultsWrongArray = [];
    this.resultsDontKnowArray = [];
    window.localStorage.setItem('group', this.group);
    window.localStorage.setItem('page', page);
    this.getLearnedWordsData()
      .then(() => {
        wordsGetter.getWordsCollection({ group: this.group, page: this.page })
          .then((res) => {
            this.page += 1;
            this.wordsArray = [...this.wordsArray, ...res];
            this.renderData(this.wordsArray);
          });
      });
  }

  getData(group, page) {
    this.roundState = 'game';
    this.group = group;
    this.page = roundCalc[page];
    this.startPage = page;
    this.resultsCorrectArray = [];
    this.resultsWrongArray = [];
    this.resultsDontKnowArray = [];
    window.localStorage.setItem('group', this.group);
    window.localStorage.setItem('page', page);
    wordsGetter.getWordsCollection({ group: this.group, page: this.page })
      .then((res) => {
        this.page += 1;
        this.wordsArray = [...this.wordsArray, ...res];
        this.renderData(this.wordsArray);
      });
  }

  getNewData() {
    wordsGetter.getWordsCollection({ group: this.group, page: this.page })
      .then((res) => {
        this.page += 1;
        this.wordsArray = [...this.wordsArray, ...res];
      });
  }

  async getLearnedWordsData() {
    this.wordsArray = [...this.wordsArray, ...await mainStorage.getWordsToLearn()];
  }

  renderData(res) {
    if (this.round < 10) {
      this.playRound(res);
    } else {
      this.showStats();
    }
  }

  wordsClickHandler(event) {
    if (event.currentTarget.classList.contains(`word-${this.currentWord}`)) {
      document.querySelector('.dont-know').removeEventListener('click', this.dontKnowButtonBinded);
      this.correctAnswerClick(event);
    } else {
      document.querySelector('.dont-know').removeEventListener('click', this.dontKnowButtonBinded);
      this.wrongAnswerClick(event);
    }
  }

  chooseWordByKey(event) {
    const playKeys = ['1', '2', '3', '4', '5', 'Enter'];

    if (!playKeys.includes(event.key)) {
      return;
    }

    if (event.key === 'Enter' && this.roundState !== 'stats') {
      this.enterCount += 1;
      if (this.roundState === 'answered' && event.key === 'Enter') {
        this.roundState = 'null';
        this.enterCount += 2;
        document.querySelector('.audio-call-container').classList.add('move');
        setTimeout(() => {
          this.renderGameScreen();
          this.renderData(this.wordsArray);
        }, 1500);
      }
      if (this.enterCount === 1) {
        this.dontKnowButtonBinded();
      }
    }

    if (+event.key === this.currentWord + 1 && this.roundState === 'game' && this.keyCount === 0) {
      this.keyCount += 1;
      this.correctAnswerKeyBoard(event.key);
    }

    if (+event.key !== this.currentWord + 1 && this.roundState === 'game' && this.keyCount === 0 && event.key !== 'Enter') {
      this.keyCount += 1;
      this.wrongAnswerKeyBoard(+event.key);
    }
  }

  clickArrowStartNextRound() {
    document.querySelector('.dont-know').addEventListener('click', () => {
      document.querySelector('.audio-call-container').classList.add('move');
      setTimeout(() => {
        this.renderGameScreen();
        this.renderData(this.wordsArray);
      }, 1500);
    });
  }

  correctAnswerClick(event) {
    this.roundState = 'answered';
    document.querySelectorAll('.word').forEach((el) => {
      el.removeEventListener('click', this.wordsClickHandlerBinded);
    });
    this.resultsCorrectArray.push(this.wordsArray[this.globalWord]);
    document.querySelector('.img-block').innerHTML = `
        <img class="answer-image" src="${this.wordsArray[this.globalWord].image}" alt="answer">
        `;
    document.querySelector('.speaker-block').classList.add('speaker-block-answer');
    document.querySelector('.answer-word-eng').innerHTML = `${this.wordsArray[this.globalWord].word}`;

    for (let i = 0; i < 5; i++) {
      if (i !== this.currentWord) {
        document.querySelector(`.word-${i}`).classList.add('wrong-answer');
      }
    }
    event.currentTarget.firstChild.innerHTML = '';
    event.currentTarget.firstChild.insertAdjacentHTML('beforeend', `
        <img class="correct-icon" src="./assets/main/img/correct-icon.png" alt="correct">
        `);
    document.querySelector('.dont-know').innerHTML = '<img class="arrow" src="./assets/main/img/arrow.png" alt="arrow">';
    this.clickArrowStartNextRound();
  }

  wrongAnswerClick(event) {
    this.roundState = 'answered';
    document.querySelectorAll('.word').forEach((el) => {
      el.removeEventListener('click', this.wordsClickHandlerBinded);
    });
    this.resultsWrongArray.push(this.wordsArray[this.globalWord]);
    event.currentTarget.lastChild.classList.add('wrong-main-answer');
    document.querySelector('.img-block').innerHTML = `<img class="answer-image" src="${this.wordsArray[this.globalWord].image}" alt="answer">`;
    document.querySelector('.speaker-block').classList.add('speaker-block-answer');
    document.querySelector('.answer-word-eng').innerHTML = `${this.wordsArray[this.globalWord].word}`;

    for (let i = 0; i < 5; i++) {
      if (i !== this.currentWord) {
        document.querySelector(`.word-${i}`).classList.add('wrong-answer');
      }
    }
    document.querySelector('.dont-know').innerHTML = '<img class="arrow" src="./assets/main/img/arrow.png" alt="arrow">';
    this.clickArrowStartNextRound();
  }

  correctAnswerKeyBoard(event) {
    this.roundState = 'answered';
    document.querySelector('.dont-know').removeEventListener('click', this.dontKnowButtonBinded);
    document.querySelectorAll('.word').forEach((el) => {
      el.removeEventListener('click', this.wordsClickHandlerBinded);
    });
    this.resultsCorrectArray.push(this.wordsArray[this.globalWord]);
    document.querySelector('.img-block').innerHTML = `<img class="answer-image" src="${this.wordsArray[this.globalWord].image}" alt="answer">`;
    document.querySelector('.speaker-block').classList.add('speaker-block-answer');
    document.querySelector('.answer-word-eng').innerHTML = `${this.wordsArray[this.globalWord].word}`;

    for (let i = 0; i < 5; i++) {
      if (i !== this.currentWord) {
        document.querySelector(`.word-${i}`).classList.add('wrong-answer');
      }
    }
    document.querySelector(`.number-${event}`).innerHTML = '';
    document.querySelector(`.number-${event}`).insertAdjacentHTML('beforeend', `
        <img class="correct-icon" src="./assets/main/img/correct-icon.png" alt="correct">
        `);
    document.querySelector('.dont-know').innerHTML = '<img class="arrow" src="./assets/main/img/arrow.png" alt="arrow">';
    this.clickArrowStartNextRound();
  }

  wrongAnswerKeyBoard(event) {
    this.roundState = 'answered';
    document.querySelector('.dont-know').removeEventListener('click', this.dontKnowButtonBinded);
    document.querySelectorAll('.word').forEach((el) => {
      el.removeEventListener('click', this.wordsClickHandlerBinded);
    });
    this.resultsWrongArray.push(this.wordsArray[this.globalWord]);
    document.querySelector(`.rus-word-${event - 1}`).classList.add('wrong-main-answer');
    document.querySelector('.img-block').innerHTML = `<img class="answer-image" src="${this.wordsArray[this.globalWord].image}" alt="answer">`;
    document.querySelector('.speaker-block').classList.add('speaker-block-answer');
    document.querySelector('.answer-word-eng').innerHTML = `${this.wordsArray[this.globalWord].word}`;

    for (let i = 0; i < 5; i++) {
      if (i !== this.currentWord) {
        document.querySelector(`.word-${i}`).classList.add('wrong-answer');
      }
    }
    document.querySelector('.dont-know').innerHTML = '<img class="arrow" src="./assets/main/img/arrow.png" alt="arrow">';
    document.querySelector('.dont-know').addEventListener('click', () => {
      document.querySelector('.audio-call-container').classList.add('move');
      setTimeout(() => {
        this.renderGameScreen();
        this.renderData(this.wordsArray);
      }, 1500);
    });
  }

  dontKnowButton() {
    this.roundState = 'answered';
    document.querySelector('.dont-know').removeEventListener('click', this.dontKnowButtonBinded);
    document.querySelectorAll('.word').forEach((el) => {
      el.removeEventListener('click', this.wordsClickHandlerBinded);
    });
    this.resultsDontKnowArray.push(this.wordsArray[this.globalWord]);
    document.querySelector('.img-block').innerHTML = `<img class="answer-image" src="${this.wordsArray[this.globalWord].image}" alt="answer">`;
    document.querySelector('.speaker-block').classList.add('speaker-block-answer');
    document.querySelector('.answer-word-eng').innerHTML = `${this.wordsArray[this.globalWord].word}`;

    for (let i = 0; i < 5; i++) {
      if (i !== this.currentWord) {
        document.querySelector(`.word-${i}`).classList.add('wrong-answer');
      }
    }
    document.querySelector(`.number-${this.currentWord + 1}`).innerHTML = '';
    document.querySelector(`.number-${this.currentWord + 1}`).insertAdjacentHTML('beforeend', `
        <img class="correct-icon" src="./assets/main/img/correct-icon.png" alt="correct">
        `);
    document.querySelector('.dont-know').innerHTML = '<img class="arrow" src="./assets/main/img/arrow.png" alt="arrow">';
    document.querySelector('.dont-know').addEventListener('click', () => {
      document.querySelector('.audio-call-container').classList.add('move');
      setTimeout(() => {
        this.renderGameScreen();
        this.renderData(this.wordsArray);
      }, 1500);
    });
  }

  showStats() {
    document.onkeydown = null;
    this.showShortStats();
    this.round = 0;
    this.progress = 0;
    document.querySelector('.main-button__start').addEventListener('click', () => {
      this.startScreen();
    });

    mainStorage.addMiniGameResults({
      miniGameName: MINI_GAMES_NAMES.AUDIO_CALL,
      isCorrect: true,
      wordsDataArray: this.resultsCorrectArray,
    });

    mainStorage.addMiniGameResults({
      miniGameName: MINI_GAMES_NAMES.AUDIO_CALL,
      isCorrect: false,
      wordsDataArray: this.resultsWrongArray,
    });

    document.querySelector('.correct-count').innerHTML = `${this.resultsCorrectArray.length}`;
    document.querySelector('.mistakes-count').innerHTML = `${this.resultsWrongArray.length}`;
    document.querySelector('.dont-know-count').innerHTML = `${this.resultsDontKnowArray.length}`;
    for (let i = 0; i < this.resultsWrongArray.length; i++) {
      document.querySelector('.mistakes-list').insertAdjacentHTML('beforeend', `
                <li><img class="speaker-small-${i}" src="./assets/main/img/speakersmall.png" alt="small speaker"><span class="results-eng-word">${this.resultsWrongArray[i].word}</span><div style="width: 20px;"></div><span class="results-ru-word">${this.resultsWrongArray[i].wordTranslate}</span></li>
                `);
      const audioWrong = new Audio(this.resultsWrongArray[i].audio);
      document.querySelector(`.speaker-small-${i}`).addEventListener('click', () => {
        audioWrong.play();
      });
    }

    for (let i = 0; i < this.resultsCorrectArray.length; i++) {
      document.querySelector('.correct-list').insertAdjacentHTML('beforeend', `
                <li><img class="speaker-small-${i + 10}" src="./assets/main/img/speakersmall.png" alt="small speaker"><span class="results-eng-word">${this.resultsCorrectArray[i].word}</span><div style="width: 20px;"></div><span class="results-ru-word">${this.resultsCorrectArray[i].wordTranslate}</span></li>
                `);
      const audioCorrect = new Audio(this.resultsCorrectArray[i].audio);
      document.querySelector(`.speaker-small-${i + 10}`).addEventListener('click', () => {
        audioCorrect.play();
      });
    }

    for (let i = 0; i < this.resultsDontKnowArray.length; i++) {
      document.querySelector('.dont-know-list').insertAdjacentHTML('beforeend', `
                <li><img class="speaker-small-${i + 20}" src="./assets/main/img/speakersmall.png" alt="small speaker"><span class="results-eng-word">${this.resultsDontKnowArray[i].word}</span><div style="width: 20px;"></div><span class="results-ru-word">${this.resultsDontKnowArray[i].wordTranslate}</span></li>
                `);
      const audioCorrect = new Audio(this.resultsDontKnowArray[i].audio);
      document.querySelector(`.speaker-small-${i + 20}`).addEventListener('click', () => {
        audioCorrect.play();
      });
    }
  }

  playRound(res) {
    document.onkeydown = null;
    this.roundState = 'game';
    this.enterCount = 0;
    this.keyCount = 0;
    this.progress += 10;
    if ((this.startPage + 1) % 2 === 0 && this.round === 0) {
      this.word += 10;
      this.getNewData();
    }
    if ((this.startPage + 1) % 2 === 0) {
      this.globalWord = Math.round(1 - 0.5 + Math.random() * (5 - 1 + 1)) - 1 + this.round * 5 + 10;
    } else {
      this.globalWord = Math.round(1 - 0.5 + Math.random() * (5 - 1 + 1)) - 1 + this.round * 5;
    }

    document.querySelector('.progress-bar').style.width = `${this.progress}%`;
    document.querySelector('.words-block').innerHTML = '';
    for (let i = 0; i < 5; i++) {
      document.querySelector('.words-block').insertAdjacentHTML('beforeend', `
                <div class="word word-${i}"><span class="number number-${i + 1}">${i + 1}</span><span class="rus-word-${i}">${res[this.word].wordTranslate}</span></div>
                `);
      this.word += 1;
    }

    this.round += 1;

    if ((this.startPage + 1) % 2 === 0) {
      this.currentWord = this.globalWord - 10 - (this.round - 1) * 5;
    } else {
      this.currentWord = this.globalWord - (this.round - 1) * 5;
    }

    if (this.round % 3 === 0 && this.round < 9 && (this.startPage + 1) % 2 !== 0) {
      this.getNewData();
    } else if (this.round % 3 === 0 && this.round < 6 && (this.startPage + 1) % 2 === 0) {
      this.getNewData();
    }
    const audio = new Audio(res[this.globalWord].audio);
    document.querySelector('.speaker-block').classList.add('speaker-block-active');
    audio.play();
    audio.onended = () => {
      document.querySelector('.speaker-block').classList.remove('speaker-block-active');
      document.querySelector('.dont-know').addEventListener('click', this.dontKnowButtonBinded);
      document.onkeydown = this.chooseWordByKey.bind(this);
      document.querySelectorAll('.word').forEach((el) => {
        el.addEventListener('click', this.wordsClickHandlerBinded);
      });
    };
  }

  unmount() {
    document.body.classList.remove('audio-call-wrapper');
    document.onkeydown = null;
    this.round = 0;
    this.word = 0;
    this.currentWord = 0;
    this.globalWord = 0;
    this.wordsArray = [];
    this.resultsCorrectArray = [];
    this.resultsWrongArray = [];
    this.resultsDontKnowArray = [];
    this.progress = 0;
    this.enterCount = 0;
    this.keyCount = 0;
  }
}

const audioCallInit = new AudioCall();

audioCallInit.init();

const audioCallStartScreen = () => {
  document.querySelector('body').classList.add('audio-call-wrapper');
  audioCallInit.startScreen();
};

const audioCallUnmount = () => {
  audioCallInit.unmount();
};

export { audioCallStartScreen, audioCallUnmount };
