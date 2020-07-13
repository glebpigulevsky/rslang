// import spacedRepetitions from '../spacedRepetitions/spacedRepetitions';
import mainController from '../controller/main.controller';

import { EMPTY } from '../../../../common/common.constants';
import { DEFAULT_SETTINGS } from '../../../../services/common/services.common.constants';
import { WORD_CATEGORY_TO_INDEX } from '../spacedRepetitions/common/constants';

import './scss/difficultWords.styles.scss';

import ERROR_AUDIO from './assets/audio/server-error.mp3';

class DifficultWords {
  constructor() {
    this.elements = EMPTY;
    this.userSettings = EMPTY;
    this.difficultWords = EMPTY;

    this.targetButton = EMPTY;
    this.audio = EMPTY;
    this.errorAudio = new Audio(ERROR_AUDIO);

    this.init = this.init.bind(this);
    this.resetDifficultStatus = this.resetDifficultStatus.bind(this);

    this.playSpelling = this.playSpelling.bind(this);
    this.startSpellingAnimation = this.startSpellingAnimation.bind(this);
    this.stopSpellingAnimation = this.stopSpellingAnimation.bind(this);
    this.onEndSpellingHandler = this.onEndSpellingHandler.bind(this);
    this.onErrorSpellingHandler = this.onErrorSpellingHandler.bind(this);
    this.onEndErrorSpellingHandler = this.onEndErrorSpellingHandler.bind(this);
  }

  playSpelling(event) {
    if (!event.target.classList.contains('difficult-words-card__spell-button')) return;

    if (this.audio && !this.audio.ended) {
      this.audio.pause();
      this.onEndSpellingHandler(this.audio);
    }
    this.targetButton = event.target;

    this.audio = new Audio(this.targetButton.dataset.src);
    this.audio.addEventListener('ended', this.onEndSpellingHandler);
    this.audio.addEventListener('error', this.onErrorSpellingHandler);
    this.startSpellingAnimation();
    this.audio.play();
  }

  resetDifficultStatus(event) {
    if (!event.target.classList.contains('difficult-words-card__return-button')) return;

    const currentWord = this.difficultWords[event.target.dataset.wordIndex];

    currentWord.userWord.optional.isDifficult = false;
    currentWord.userWord.optional.toRepeat = true;
    currentWord.userWord.optional.repeatDate = Date.now();
    currentWord.userWord.optional.changed = true;

    mainController.updateUserWord(
      currentWord.id,
      currentWord.userWord.difficulty,
      currentWord.userWord.optional,
    );

    event.target.setAttribute('disabled', 'true'); // !! todo
    event.target.parentElement.querySelector('.difficult-words-status').innerText = 'not in difficult'; // !! todo
  }

  startSpellingAnimation() {
    this.targetButton.classList.add('difficult-words-animated');
  }

  stopSpellingAnimation() {
    this.targetButton.classList.remove('difficult-words-animated');
  }

  onEndSpellingHandler() {
    this.audio.removeEventListener('ended', this.onEndSpellingHandler);
    this.stopSpellingAnimation();
  }

  onErrorSpellingHandler() {
    this.audio.removeEventListener('error', this.onErrorSpellingHandler);
    this.errorAudio.addEventListener('ended', this.onEndErrorSpellingHandler);
    this.errorAudio.play();
    this.startSpellingAnimation();
  }

  onEndErrorSpellingHandler() {
    this.errorAudio.removeEventListener('ended', this.onEndErrorSpellingHandler);
    this.stopSpellingAnimation();
  }

  renderCards() {
    this.difficultWords.forEach((wordData, index) => {
      this.elements.containers.cardsWrapper.insertAdjacentHTML('afterBegin', this.renderCard(wordData, index));
    });
  }

  renderCard(wordData, wordIndex) {
    const hideWordTranslationClass = (!this.userSettings.optional.isTranslation)
      ? 'display-none'
      : '';

    const hideMeaningClass = (!this.userSettings.optional.isMeaningSentence)
      ? 'display-none'
      : '';

    const hideExampleClass = (!this.userSettings.optional.isExampleSentence)
      ? 'display-none'
      : '';

    const hideTranscriptionClass = (!this.userSettings.optional.isTranscription)
      ? 'display-none'
      : '';

    const hidePictureClass = (!this.userSettings.optional.isPicture)
      ? 'display-none'
      : '';

    const stars = '&#9733;'.repeat(WORD_CATEGORY_TO_INDEX[wordData.userWord.difficulty])
      + '&#9734;'.repeat(6 - WORD_CATEGORY_TO_INDEX[wordData.userWord.difficulty]);
    const category = (wordData.userWord.difficulty === 'fetched')
      ? 'not learned'
      : wordData.userWord.difficulty;

    // let nextRepeat;
    // switch (wordData.userWord.difficulty) {
    //   case 'hard':
    //     nextRepeat = 'recommended after 25 seconds from last time';
    //     break;
    //   case 'normal':
    //     nextRepeat = 'recommended after 2 minutes from last time';
    //     break;
    //   case 'good':
    //     nextRepeat = 'recommended after 10 minutes from last time';
    //     break;
    //   case 'excellent':
    //     nextRepeat = 'recommended after 1 hour from last time';
    //     break;
    //   case 'learned':
    //     nextRepeat = 'you know this world';
    //     break;
    //   default:
    //     nextRepeat = 'in nearest training';
    //     break;
    // }

    const difficultStatus = (wordData.userWord.optional.isDifficult) ? 'difficult' : 'not in difficult';

    return `
      <div class="difficult-words-card">
        <button class="difficult-words-card__button difficult-words-card__return-button" data-wordIndex="${wordIndex}">Return to learning</button>
        <p class="difficult-words-card__word difficult-words-card__description">
          <button class="difficult-words-card__button difficult-words-card__spell-button" data-src="${wordData.audio}"></button>
          <span>${wordData.word}</span>
        </p>
        <p class="difficult-words-card__transcription difficult-words-card__description ${hideTranscriptionClass}">${wordData.transcription}</p>
        <p class="difficult-words-card__word_translate difficult-words-card__description ${hideWordTranslationClass}">${wordData.wordTranslate}</p>
        <p class="difficult-words-card__example difficult-words-card__description ${hideExampleClass}">
          <button class="difficult-words-card__button difficult-words-card__spell-button ${hideExampleClass}" data-src="${wordData.audioExample}"></button>
          <span>${wordData.textExample}</span>
        </p>
        <p class="difficult-words-card__example_translate difficult-words-card__description ${hideExampleClass}">${wordData.textExampleTranslate}</p>
        <p class="difficult-words-card__meaning difficult-words-card__description ${hideMeaningClass}">
          <button class="difficult-words-card__button difficult-words-card__spell-button ${hideMeaningClass}" data-src="${wordData.audioMeaning}"></button>
          <span>${wordData.textMeaning}</span>
        </p>
        <p class="difficult-words-card__meaning_translate difficult-words-card__description ${hideMeaningClass}">${wordData.textMeaningTranslate}</p>
        <img class="difficult-words-card__image ${hidePictureClass}" src="${wordData.image}">
        <div class="difficult-words-repetitions__container difficult-words-card__description">
          <span>
            Category: ${category} <sup class="difficult-words-stars">${stars}</sup>
          </span>
          <span> &#8634; Repeat times: ${wordData.userWord.optional.repeatTimes}</span>
          <span> &#10003; Last repeat: ${wordData.userWord.optional.lastRepeat}</span>
          <span> &#8986; Difficult status:
            <span class="difficult-words-status">${difficultStatus}</span> // !! todo + заменить юникод!
          </span>
        </div>
        <hr>
      </div>
    `;
  }

  render() {
    return `
      <div class="difficult-words__wrapper">
        <h3 class="difficult-words__title dictionary__title">Deleted words</h2>
        <p class="difficult-words__count-title dictionary__title">
          Total: <span class="difficult-words__count"></span>
        </p>
        <div class="difficult-words__main">
          <div class="difficult-words-cards__wrapper">
          </div>
        </div>
      </div>
    `;
  }

  async init() {
    if (!mainController.userSettings) {
      this.userSettings = DEFAULT_SETTINGS;
    } else this.userSettings = mainController.userSettings;

    this.elements = {
      containers: {
        cardsWrapper: document.querySelector('.difficult-words-cards__wrapper'),
        main: document.querySelector('.difficult-words__main'),
      },
      difficultWordsCount: document.querySelector('.difficult-words__count'),
    };

    this.difficultWords = await mainController.getAllUserDifficultWords;
    this.elements.difficultWordsCount.innerText = this.difficultWords.length || 0;
    debugger; // ! todo

    this.renderCards();
    this.elements.containers.cardsWrapper.addEventListener('click', this.playSpelling);
    this.elements.containers.cardsWrapper.addEventListener('click', this.resetDifficultStatus);
  }
}

export default new DifficultWords();
