import { WordsApi } from '../../services/services.methods';
import StartScreenClass from './components/startScreen';

import './scss/audio-call.scss';

const wordsGetter = new WordsApi();
// const startScreen = new StartScreenClass();




class AudioCall {
  constructor() {
  
    this.menuData = {
      level: 0,
      round: 0,
    };
    this.lang = 'ru';
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

  zeroStartScreen () {
    this.wordsArray = [];
    this.currentWord = 0;
    this.globalWord = 0;
    this.word = 0;
  }

  startScreen() {
    this.startScreen1.render();
    this.wordsArray = [];
    this.currentWord = 0;
    this.globalWord = 0;
    this.word = 0;
 
    // document.querySelector('.start').removeEventListener('click', this.startGameClickHandler.bind(this));

    if (window.localStorage.getItem('group')) {
      document.querySelector('.group').querySelectorAll('*')[window.localStorage.getItem('group')].selected = true;
      document.querySelector('.page').querySelectorAll('*')[window.localStorage.getItem('page')].selected = true;
    }

    // document.querySelector('.start').addEventListener('click', this.startGameClickHandler.bind(this));
  }

  startGameClickHandler() {
    console.log('start')
    this.getData(+document.querySelector('.group').value - 1, +document.querySelector('.page').value - 1);
    this.init();
  }

  init1 () {
    // this.container = document.createElement('div');
    // this.container.classList.add('main__game');
    // this.container.classList.add('audio-game-wrapper');
    // document.querySelector('.firstPoint').appendChild(this.container);
    this.startScreen1 = new StartScreenClass(null, this.startGameClickHandler.bind(this), this.container);
  }

  init() {
    document.querySelector('.main__game').innerHTML = `
      <div class="audio-call-container">
      <div class="audio-block">
          <div class="img-block"></div>
          <div class="speaker-eng-word">
            <div class="speaker-block">
              <svg class="speaker" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 475.082 475.081" xml:space="preserve">
              <g>
                <g>
                  <path d="M200.999,63.952c-4.946,0-9.229,1.812-12.847,5.426l-95.074,95.075H18.276c-4.952,0-9.234,1.812-12.85,5.424    C1.809,173.493,0,177.778,0,182.726v109.63c0,4.949,1.809,9.233,5.426,12.848c3.619,3.617,7.902,5.427,12.85,5.427h74.798    l95.074,95.078c3.617,3.61,7.9,5.424,12.847,5.424c4.952,0,9.234-1.813,12.85-5.424c3.617-3.614,5.426-7.901,5.426-12.847V82.228    c0-4.948-1.809-9.234-5.422-12.85C210.23,65.764,205.951,63.952,200.999,63.952z"/>
                  <path d="M316.769,277.936c8.093-12.467,12.135-25.93,12.135-40.395s-4.042-27.992-12.135-40.556    c-8.094-12.562-18.791-21.41-32.121-26.551c-1.902-0.949-4.284-1.427-7.139-1.427c-4.944,0-9.232,1.762-12.847,5.282    c-3.61,3.521-5.427,7.852-5.427,12.99c0,3.997,1.143,7.376,3.432,10.137c2.283,2.762,5.041,5.142,8.282,7.139    c3.23,1.998,6.468,4.188,9.708,6.567c3.238,2.38,5.996,5.758,8.278,10.135c2.276,4.38,3.426,9.804,3.426,16.277    c0,6.471-1.143,11.896-3.426,16.276c-2.282,4.381-5.04,7.755-8.278,10.14c-3.24,2.379-6.478,4.569-9.708,6.567    c-3.241,1.992-5.999,4.377-8.282,7.132c-2.282,2.765-3.432,6.143-3.432,10.14c0,5.144,1.816,9.47,5.427,12.99    c3.614,3.521,7.902,5.288,12.847,5.288c2.854,0,5.236-0.479,7.139-1.424C297.978,299.304,308.679,290.403,316.769,277.936z"/>
                  <path d="M377.728,318.194c16.18-24.646,24.273-51.531,24.273-80.654c0-29.124-8.094-56.005-24.273-80.666    c-16.177-24.645-37.6-42.583-64.241-53.815c-2.471-0.95-4.948-1.427-7.416-1.427c-4.948,0-9.236,1.809-12.854,5.426    c-3.613,3.616-5.424,7.898-5.424,12.847c0,7.424,3.713,13.039,11.139,16.849c10.657,5.518,17.888,9.705,21.693,12.559    c14.089,10.28,25.077,23.173,32.976,38.686c7.898,15.514,11.848,32.026,11.848,49.537c0,17.512-3.949,34.023-11.848,49.536    c-7.898,15.516-18.894,28.407-32.976,38.684c-3.806,2.857-11.036,7.043-21.693,12.563c-7.426,3.809-11.139,9.424-11.139,16.847    c0,4.948,1.811,9.236,5.424,12.847c3.617,3.621,7.991,5.432,13.131,5.432c2.286,0,4.668-0.483,7.139-1.428    C340.128,360.783,361.551,342.844,377.728,318.194z"/>
                  <path d="M438.824,116.92c-24.171-36.638-56.343-63.622-96.505-80.943c-2.471-0.95-4.948-1.425-7.416-1.425    c-4.948,0-9.236,1.811-12.847,5.424c-3.621,3.615-5.432,7.902-5.432,12.85c0,6.851,3.714,12.469,11.14,16.846    c1.335,0.756,3.467,1.755,6.42,2.996c2.95,1.232,5.089,2.231,6.427,2.993c8.754,4.755,16.56,9.611,23.418,14.56    c23.407,17.318,41.682,38.922,54.816,64.809c13.134,25.885,19.697,53.388,19.697,82.512c0,29.129-6.563,56.626-19.697,82.512    c-13.131,25.889-31.409,47.496-54.816,64.809c-6.858,4.948-14.664,9.801-23.418,14.562c-1.338,0.756-3.477,1.752-6.427,2.99    c-2.953,1.232-5.085,2.231-6.42,2.998c-7.426,4.374-11.14,9.993-11.14,16.844c0,4.949,1.811,9.233,5.432,12.848    c3.61,3.617,7.898,5.427,12.847,5.427c2.468,0,4.945-0.476,7.416-1.431c40.162-17.315,72.334-44.3,96.505-80.94    c24.174-36.638,36.258-76.849,36.258-120.625S463.001,153.554,438.824,116.92z"/>
                </g>
              </g>
              </svg>
            </div>
            <div class="answer-word-eng"></div>
          </div>
      </div>
      <div class="words-block">
      </div>
      <div class="answer-block">
        <div class="dont-know">Не знаю</div>
      </div>
    </div>
    <div class="progress-block">
          <div class="progress-bar"></div>
    </div>
      `;
  }

  showShortStats() {
    this.roundState = 'stats';
    document.querySelector('.main__game').innerHTML = `
    <div class="results">
    <div class="start-game">
              <button class="main-button__start start">TRY AGAIN</button>
            </div>
    <div class="mistakes-block">
      <p class="mistakes">Ошибок <span class="mistakes-count"></span></p>
      <ul class="mistakes-list">
      </ul>
    </div>
    <div class="correct-block">
      <p class="mistakes">Знаю <span class="correct-count"></span></p>
      <ul class="correct-list">
      </ul>
    </div>
    <div class="dont-know-block">
      <p class="mistakes">Не знаю <span class="dont-know-count"></span></p>
      <ul class="dont-know-list">
      </ul>
    </div>
  </div>
    `;
  }

  getData(group, page) {
    this.roundState = 'game';
    this.group = group;
    this.page = page;
    this.resultsCorrectArray = [];
    this.resultsWrongArray = [];
    this.resultsDontKnowArray = [];
    window.localStorage.setItem('group', this.group);
    window.localStorage.setItem('page', this.page);
    wordsGetter.getWordsCollection({ group: this.group, page: this.page })
      .then((res) => {
        console.log('RES', res);
        this.page += 1;
        this.wordsArray = [...this.wordsArray, ...res];
        this.renderData(this.wordsArray);
      });
    document.onkeydown = this.chooseWordByKey.bind(this);
  }

  getNewData() {
    wordsGetter.getWordsCollection({ group: this.group, page: this.page })
      .then((res) => {
        this.page += 1;
        this.wordsArray = [...this.wordsArray, ...res];
      });
  }

  renderData(res) {
    if (this.round < 1) {
      this.playRound(res);
    } else {
      this.showStats();
    }
  }

  wordsClickHandler(event) {
    if (event.currentTarget.classList.contains(`word-${this.currentWord}`)) {
      this.correctAnswerClick(event);
    } else {
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
        this.enterCount += 2;
        document.querySelector('.audio-call-container').classList.add('move');
        setTimeout(() => {
          this.init();
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

  correctAnswerClick(event) {
    this.roundState = 'answered';
    document.querySelector('.dont-know').removeEventListener('click', this.dontKnowButtonBinded);
    document.querySelectorAll('.word').forEach((el) => {
      el.removeEventListener('click', this.wordsClickHandlerBinded);
    });
    this.resultsCorrectArray.push(this.wordsArray[this.globalWord]);
    document.querySelector('.img-block').insertAdjacentHTML('beforeend', `
        <img class="answer-image" src="${this.wordsArray[this.globalWord].image}" alt="answer">
        `);
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

  clickArrowStartNextRound() {
    document.querySelector('.dont-know').addEventListener('click', () => {
      document.querySelector('.audio-call-container').classList.add('move');
      setTimeout(() => {
        this.init();
        this.renderData(this.wordsArray);
      }, 1500);
    });
  }

  wrongAnswerClick(event) {
    this.roundState = 'answered';
    document.querySelector('.dont-know').removeEventListener('click', this.dontKnowButtonBinded);
    document.querySelectorAll('.word').forEach((el) => {
      el.removeEventListener('click', this.wordsClickHandlerBinded);
    });
    this.resultsWrongArray.push(this.wordsArray[this.globalWord]);
    event.currentTarget.lastChild.classList.add('wrong-main-answer');
    document.querySelector('.img-block').insertAdjacentHTML('beforeend', `<img class="answer-image" src="${this.wordsArray[this.globalWord].image}" alt="answer">`);
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
    document.querySelector('.dont-know').addEventListener('click', () => {
      document.querySelector('.audio-call-container').classList.add('move');
      setTimeout(() => {
        this.init();
        this.renderData(this.wordsArray);
      }, 1500);
    });
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
        this.init();
        this.renderData(this.wordsArray);
      }, 1500);
    });
  }

  dontKnowButton() {
    this.roundState = 'answered';
    document.querySelectorAll('.word').forEach((el) => {
      el.removeEventListener('click', this.wordsClickHandlerBinded);
    });
    this.resultsDontKnowArray.push(this.wordsArray[this.globalWord]);
    document.querySelector('.img-block').insertAdjacentHTML('beforeend', `<img class="answer-image" src="${this.wordsArray[this.globalWord].image}" alt="answer">`);
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
    document.querySelector('.dont-know').removeEventListener('click', this.dontKnowButtonBinded);
    document.querySelector('.dont-know').addEventListener('click', () => {
      document.querySelector('.audio-call-container').classList.add('move');
      setTimeout(() => {
        this.init();
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
    this.roundState = 'game';
    this.enterCount = 0;
    this.keyCount = 0;
    this.progress += 10;
    document.querySelector('.progress-bar').style.width = `${this.progress}%`;
    document.querySelector('.words-block').innerHTML = '';
    for (let i = 0; i < 5; i++) {
      document.querySelector('.words-block').insertAdjacentHTML('beforeend', `
                <div class="word word-${i}"><span class="number number-${i + 1}">${i + 1}</span><span class="rus-word-${i}">${res[this.word].wordTranslate}</span></div>
                `);
      this.word += 1;
    }
    document.querySelectorAll('.word').forEach((el) => {
      el.addEventListener('click', this.wordsClickHandlerBinded);
    });
    document.querySelector('.dont-know').addEventListener('click', this.dontKnowButtonBinded);
    this.globalWord = Math.round(1 - 0.5 + Math.random() * (5 - 1 + 1)) - 1 + this.round * 5;

    this.round += 1;
    this.currentWord = this.globalWord - (this.round - 1) * 5;
    if (this.round % 3 === 0 && this.round < 9) {
      this.getNewData();
    }
    const audio = new Audio(res[this.globalWord].audio);
    document.querySelector('.speaker-block').classList.add('speaker-block-active');
    audio.play();
    audio.onended = () => {
      document.querySelector('.speaker-block').classList.remove('speaker-block-active');
      document.querySelector('.dont-know').addEventListener('click', this.dontKnowButtonBinded);
    };
  }

  unmount () {
    document.body.classList.remove('audio-call-wrapper');
    document.onkeydown = null;
  }

}

const audioCallInit = new AudioCall();

audioCallInit.init1();

const audioCallStartScreen = () => {
  document.querySelector('body').classList.add('audio-call-wrapper');
  audioCallInit.startScreen();
};

const audioCallUnmount = () => {
  audioCallInit.unmount();
}

export { audioCallStartScreen, audioCallUnmount };
