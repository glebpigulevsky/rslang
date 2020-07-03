// import { GAME_BLOCK, TEMPLATE_MAIN_GAME } from '../../common/main.constants';
import {
  MAIN_API_URL,
} from '../../../../services/common/services.common.constants';
import {
  UserWordsApi, WordsApi,
} from '../../../../services/services.methods';
import ErrorInput from '../errorInput/errorInput';
// import introMainGame from '../introMainGame/introMainGame';
import { LocalStorageService } from '../../../../common/common.helper';
import ApiService from '../../../../services/common/services.common.api_service';

// import { defaultData } from './data'; // todo это без Интернета

const userWords = new UserWordsApi();
const service = new LocalStorageService();
const errorInput = new ErrorInput();
const wordsApi = new WordsApi();

class MainGame {
  constructor() {
    this.elements = {
      gameButtons: {
        next: null,
        prev: null,
        clicked: null,
      },
    };

    this.settings = null;
    this.level = null;
    this.page = 0;
    this.difficult = null;

    this.currentCard = {};
    this.previousCard = {};
    this.collection = [];
    this.indexCard = 0;
    this.inputArea = null;
    // this.url = 'https://raw.githubusercontent.com/caspercarver/rslang-data/master/';

    this.inputModeEnterBinded = this.inputModeEnter.bind(this);
    this.inputModeArrowBinded = this.inputModeArrow.bind(this);
    this.inputModeArrowPrevBinded = this.inputModeArrowPrev.bind(this);
    this.playAudioBinded = this.playAudio.bind(this);

    this.clickHadnlerDeleteUserWord = this.clickHadnlerDeleteUserWord.bind(this);
    this.clickHadnlerAddUserWordEasy = this.clickHadnlerAddUserWordEasy.bind(this);
    this.clickHadnlerAddUserWordDiff = this.clickHadnlerAddUserWordDiff.bind(this);
    this.clickHadnlerDeleteUserWord = this.clickHadnlerDeleteUserWord.bind(this);
  }

  render() {
    return `
      <div class="card-container">
        <div class="navigate prev hidden"></div>

        <div class="card">
          <div class="card-header">
            <div class="card-header__block">
              <div class="card-header__move-diff">
              </div>
              <div class="card-header__delete-word">
              </div>
              <div class="card-header__again-word">
              </div>
            </div>

            <div class="card-header__block">
              <div class="card-header__diff-diff">
              </div>
              <div class="card-header__diff-good">
              </div>
              <div class="card-header__diff-easy">
              </div>
            </div>
          </div>

          <div class="card-main">
            <div class="learn-content">
              <div class="learn-content__container">
              </div>
            </div>

            <div class="learn-content__translation">
            </div>
            <div class="learn-content__meaning">
            </div>
          </div>

          <div class="card-footer">
            <div class="card-footer__answer-button">
            </div>
          </div>
        </div>

        <div class="navigate next"></div>
      </div>

      <div class="card-helper">
        <div class="translate"></div>
        <div class="text-example"></div>
        <div class="transcription"></div>
        <div class="card-image"></div>
      </div>
    `;
  }

  async addMdGameScreen() {
    // GAME_BLOCK.innerHTML = '';
    // GAME_BLOCK.append(TEMPLATE_MAIN_GAME.content.cloneNode(true));
    // const mainGameTemplate = document.getElementById('template-main__game')
    // .content.cloneNode(true);
    const mainElement = document.querySelector('.main');
    mainElement.innerHTML = '';
    mainElement.insertAdjacentHTML('afterbegin', this.render());
    await this.fetchWords(); // todo это с Интернетом
    // this.collection = defaultData; // todo это без Интернета
    this.playMode(this.indexCard);
  }

  async fetchWords() {
    this.collection = null; // для чего эта строка?
    this.collection = await wordsApi.getWordsCollection({ group: this.level, page: this.page });
    console.info(this.collection);
    this.currentCard = this.collection[this.indexCard];
  }

  init(settingsFetch, englishLevel) {
    this.level = englishLevel;
    this.settings = settingsFetch;
    // document.addEventListener('keyup', (e) => {
    //   if (e.key === 'Escape') {
    //     introMainGame.appendIntoDom();
    //     introMainGame.init();
    //   }
    // });
    this.addMdGameScreen();
  }

  async playMode(queryIndex) {
    this.elements.gameButtons.next = document.querySelector('.next');
    this.elements.gameButtons.next.addEventListener('click', this.inputModeArrowBinded);
    this.elements.gameButtons.prev = document.querySelector('.prev');
    if (this.indexCard > 0) {
      this.elements.gameButtons.prev.classList.remove('hidden');
    }
    this.elements.gameButtons.prev.addEventListener('click', this.inputModeArrowPrevBinded);
    this.currentCard = await this.collection[queryIndex];
    this.currentCard.textExample = this.currentCard.textExample.replace(/<\/?[a-zA-Z]+>/gi, '');
    this.currentCard.textExample = this.currentCard.textExample.replace(',', ' ,').toLowerCase();
    const wordsArr = await this.currentCard.textExample.split(' ');
    if (wordsArr.indexOf(this.currentCard.word) === -1) {
      if (this.indexCard === 19) {
        this.page += 1;
        this.indexCard = 0;
        this.addMdGameScreen();
      }
      this.indexCard += 1;
      this.playMode(this.indexCard);
    }
    wordsArr[wordsArr.length - 1] = wordsArr[wordsArr.length - 1].slice(0, -1);
    wordsArr.find((element, index) => {
      if (element === this.currentCard.word) { // || element === this.currentCard.word + 's'
        wordsArr[index] = '';
        if (index === 0) {
          this.currentCard.word = this.currentCard.word[0]
            .toUpperCase() + this.currentCard.word.slice(1);
        }
        return true;
      }
      return false;
    });
    document.querySelector('.learn-content__container').innerHTML = '';
    wordsArr.forEach((element, index) => {
      if (index === 0 && element !== '') {
        wordsArr[index] = element[0].toUpperCase() + element.slice(1);
      }
      if (element !== '' || element === '.') {
        const divWord = document.createElement('div');
        divWord.classList.add('word');
        divWord.innerHTML = element;
        document.querySelector('.learn-content__container').append(divWord);
      } else {
        const inputDiv = document.createElement('span');
        const spanBg = document.createElement('span');
        spanBg.classList.add('background');
        spanBg.classList.add('hidden-vis');
        inputDiv.classList.add('input-container');
        const wordLetter = this.currentCard.word.split('');
        inputDiv.innerHTML = '';
        wordLetter.forEach((e, i) => {
          spanBg.innerHTML += `<span index=${i} class="opacityhidden errors">${e}</span>`;
        });
        const inputWord = document.createElement('input');
        this.buildCardSettings(this.settings);
        inputWord.classList.add('answer-input');
        inputDiv.append(spanBg);
        inputDiv.append(inputWord);
        document.querySelector('.learn-content__container').append(inputDiv);
      }
    });
    const dotBlock = document.createElement('span');
    dotBlock.classList.add('dotBlock');
    dotBlock.innerHTML = '.';
    document.querySelector('.answer-input').focus();
    document.querySelector('.learn-content__container').append(dotBlock);
    document.querySelector('.translate').innerHTML = this.currentCard.wordTranslate;
    document.addEventListener('keypress', this.inputModeEnterBinded);
  }

  buildCardSettings(settings) {
    if (settings.optional.isTranscription === 'true') {
      document.querySelector('.transcription').innerHTML = '';
      document.querySelector('.transcription').innerHTML = this.currentCard.transcription;
    }
    // if (settings.optional.isAddSentExplWord === 'true') {
    //   document.querySelector('.learn-content__meaning').innerHTML = '';
    //   document.querySelector('.learn-content__meaning').innerHTML = this.currentCard.textMeaning;
    // }
    if (this.settings.optional.isPicture === 'true') {
      document.querySelector('.card-image').innerHTML = '';
      document.querySelector('.card-image').innerHTML = `<img src="${this.currentCard.image}"></img>`;
    }
    if (this.settings.optional.isTranslation === 'true') {
      document.querySelector('.learn-content__translation').innerHTML = '';
      document.querySelector('.learn-content__translation').innerHTML = this.currentCard.textExampleTranslate;
    }
    // buttons
    if (this.settings.optional.isShowAnswerButton === 'true') {
      document.querySelector('.card-footer__answer-button').innerHTML = '';
      document.querySelector('.card-footer__answer-button').innerHTML = '<button class="show__answer-button">Ответ</button>';
      document.querySelector('.show__answer-button').addEventListener('click', this.showAnswerButton);
    }
    if (this.settings.optional.isShowDiffMoveButton === 'true') {
      document.querySelector('.card-header__move-diff').innerHTML = '';
      document.querySelector('.card-header__move-diff').innerHTML = '<button>Move D.</button>';
    }
    if (this.settings.optional.isShowDeleteButton === 'true') {
      document.querySelector('.card-header__delete-word').innerHTML = '';
      document.querySelector('.card-header__delete-word').innerHTML = '<button>Delete</button>';
      document.querySelector('.card-header__delete-word').addEventListener('click', this.clickHadnlerDeleteUserWord);
    }
    if (this.settings.optional.isShowAgainButton === 'true') {
      document.querySelector('.card-header__again-word').innerHTML = '';
      document.querySelector('.card-header__again-word').innerHTML = '<button>Again</button>';
    }
    if (this.settings.optional.isShowDiffButton === 'true') {
      document.querySelector('.card-header__diff-diff').innerHTML = '';
      document.querySelector('.card-header__diff-diff').innerHTML = '<button>Difficult</button>';
      document.querySelector('.card-header__diff-diff').addEventListener('click', this.clickHadnlerAddUserWordDiff);
    }
    if (this.settings.optional.isShowEasyButton === 'true') {
      document.querySelector('.card-header__diff-easy').innerHTML = '';
      document.querySelector('.card-header__diff-easy').innerHTML = '<button>Easy</button>';
      document.querySelector('.card-header__diff-easy').addEventListener('click', this.clickHadnlerAddUserWordEasy);
    }
  }

  clickHadnlerDeleteUserWord() {
    this.elements.gameButtons.clicked = document.querySelector('.card-header__diff-easy');
    this.deleteUsWords();
  }

  clickHadnlerAddUserWordEasy() {
    this.elements.gameButtons.clicked = document.querySelector('.card-header__diff-easy');
    this.difficult = 'easy';
    this.addUserWords();
  }

  clickHadnlerAddUserWordDiff() {
    this.elements.gameButtons.clicked = document.querySelector('.card-header__diff-diff');
    this.difficult = 'difficult';
    this.addUserWords();
  }

  showAnswerButton() {
    if (this.settings.optional.isAddSentExplWord === 'true') {
      document.querySelector('.learn-content__meaning').innerHTML = '';
      document.querySelector('.learn-content__meaning').innerHTML = this.currentCard.textMeaning;
    }
  }

  async deleteUsWords() {
    service.keyUserInfo = 'userInfo';
    const res = service.getUserInfo();
    userWords._apiService = new ApiService(MAIN_API_URL, res.token);
    userWords.deleteUserWord({ userId: res.userId, wordId: this.currentCard.id })
      .then()
      .catch((err) => {
        console.info(err);
      });
    this.elements.gameButtons.clicked.removeEventListener('click', this.clickHadnlerDeleteUserWord);
  }

  async addUserWords() {
    service.keyUserInfo = 'userInfo';
    const res = service.getUserInfo();
    userWords._apiService = new ApiService(MAIN_API_URL, res.token);
    userWords.createUserWord({
      userId: res.userId,
      wordId: this.currentCard.id,
      difficulty: this.difficult,
    })
      .then((answ) => {
        console.info(answ);
      })
      .catch(() => {
        userWords.updateUserWord({
          userId: res.userId,
          wordId: this.currentCard.id,
          difficulty: this.difficult,
        })
          .then(() => {
          })
          .catch((errr) => {
            console.info(errr);
          });
      });
    this.elements.gameButtons.clicked.removeEventListener('click', this.clickHadnlerAddUserWordEasy);
  }

  async inputModeEnter(e) {
    this.inputArea = document.querySelector('.answer-input');
    if (e.key === 'Enter') {
      if (this.settings.optional.isAudio === 'true') {
        if (this.inputArea.value === this.currentCard.word) {
          document.removeEventListener('keypress', () => {});
          const audio = new Audio();
          audio.src = this.currentCard.audio;
          audio.autoplay = true;
          audio.addEventListener('ended', () => {
            this.playAudioBinded(this.currentCard.audioExample);
          });
        } else {
          const audio = new Audio();
          audio.src = this.currentCard.audio;
          audio.autoplay = true;
          await errorInput.init();
        }
      } else if (this.inputArea.value === this.currentCard.word) {
        document.removeEventListener('keypress', () => {});
        this.playAudioBinded(this.currentCard.audio);
      } else {
        const audio = new Audio();
        audio.src = this.currentCard.audio;
        audio.autoplay = true;
        await errorInput.init();
      }
    }
  }

  async inputModeArrow() {
    this.inputArea = document.querySelector('.answer-input');
    if (this.settings.optional.isAudio === 'true') {
      if (this.inputArea.value === this.currentCard.word) {
        this.playAudioBinded(this.currentCard.audioExample);
      } else {
        const audio = new Audio();
        audio.src = this.currentCard.audio;
        audio.autoplay = true;
        await errorInput.init();
      }
    } else if (this.inputArea.value === this.currentCard.word) {
      this.playAudioBinded(this.currentCard.audio);
    } else {
      const audio = new Audio();
      audio.src = this.currentCard.audio;
      audio.autoplay = true;
      await errorInput.init();
    }
  }

  inputModeArrowPrev() {
    this.indexCard -= 1;
    this.playMode(this.indexCard);
    if (this.indexCard === 0) {
      this.gameButtons.prev.classList.add('hidden');
    }
  }

  playAudio(path) {
    const audio = new Audio();
    audio.src = path;
    audio.autoplay = true;
    audio.addEventListener('ended', () => {
      if (this.indexCard === (this.collection.length - 1)) {
        document.querySelector('.learn-content__meaning').innerHTML = '';
        this.page += 1;
        this.indexCard = 0;
        this.addMdGameScreen();
      } else {
        document.querySelector('.learn-content__meaning').innerHTML = '';
        this.indexCard += 1;
        this.playMode(this.indexCard);
      }
    });
  }
}

// async function inputModeEnter(e) {
//   this.inputArea = document.querySelector('.answer-input');
//   if (e.key === 'Enter') {
//     debugger;
//     if (this.settings.optional.isAudio === 'true') {
//       if (this.inputArea.value === this.currentCard.word) {
//         document.removeEventListener('keypress', () => {});
//         const audio = new Audio();
//         audio.src = this.currentCard.audio;
//         audio.autoplay = true;
//         audio.addEventListener('ended', () => {
//           playAudioBinded(this.currentCard.audioExample);
//         });
//       } else {
//         const audio = new Audio();
//         audio.src = this.currentCard.audio;
//         audio.autoplay = true;
//         await errorInput.init();
//       }
//     } else if (this.inputArea.value === this.currentCard.word) {
//       document.removeEventListener('keypress', () => {});
//       playAudioBinded(this.currentCard.audio);
//     } else {
//       const audio = new Audio();
//       audio.src = this.currentCard.audio;
//       audio.autoplay = true;
//       await errorInput.init();
//     }
//   }
// }

// async function inputModeArrow() {
//   this.inputArea = document.querySelector('.answer-input');
//   if (this.settings.optional.isAudio === 'true') {
//     if (this.inputArea.value === this.currentCard.word) {
//       playAudioBinded(this.currentCard.audioExample);
//     } else {
//       const audio = new Audio();
//       audio.src = this.currentCard.audio;
//       audio.autoplay = true;
//       await errorInput.init();
//     }
//   } else if (this.inputArea.value === this.currentCard.word) {
//     playAudioBinded(this.currentCard.audio);
//   } else {
//     const audio = new Audio();
//     audio.src = this.currentCard.audio;
//     audio.autoplay = true;
//     await errorInput.init();
//   }
// }

// function inputModeArrowPrev() {
//   this.indexCard -= 1;
//   this.playMode(this.indexCard);
//   if (this.indexCard === 0) {
//     this.gameButtons.prev.classList.add('hidden');
//   }
// }

// function playAudio(path) {
//   const audio = new Audio();
//   audio.src = path;
//   audio.autoplay = true;
//   audio.addEventListener('ended', () => {
//     if (this.indexCard === (this.collection.length - 1)) {
//       document.querySelector('.learn-content__meaning').innerHTML = '';
//       this.page += 1;
//       this.indexCard = 0;
//       this.addMdGameScreen();
//     } else {
//       document.querySelector('.learn-content__meaning').innerHTML = '';
//       this.indexCard += 1;
//       this.playMode(this.indexCard);
//     }
//   });
// }

export default new MainGame();
