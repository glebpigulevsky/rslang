import spacedRepetitions from '../spacedRepetitions/spacedRepetitions';
import mainController from '../controller/main.controller';

import { EMPTY } from '../../../../common/common.constants';
import { DEFAULT_SETTINGS } from '../../../../services/common/services.common.constants';
import { WORD_CATEGORY_TO_INDEX } from '../spacedRepetitions/common/constants';

import './scss/learningWords.styles.scss';

import ERROR_AUDIO from './assets/audio/server-error.mp3';

class LearningWords {
  constructor() {
    this.elements = EMPTY;
    this.userSettings = EMPTY;

    this.targetButton = EMPTY;
    this.audio = EMPTY;
    this.errorAudio = new Audio(ERROR_AUDIO);

    this.init = this.init.bind(this);
    this.playSpelling = this.playSpelling.bind(this);
    this.startSpellingAnimation = this.startSpellingAnimation.bind(this);
    this.stopSpellingAnimation = this.stopSpellingAnimation.bind(this);
    this.onEndSpellingHandler = this.onEndSpellingHandler.bind(this);
    this.onErrorSpellingHandler = this.onErrorSpellingHandler.bind(this);
    this.onEndErrorSpellingHandler = this.onEndErrorSpellingHandler.bind(this);
  }

  playSpelling(event) {
    if (!event.target.classList.contains('learning-words-card__spell-button')) return;

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

  startSpellingAnimation() {
    this.targetButton.classList.add('learning-words-animated');
  }

  stopSpellingAnimation() {
    this.targetButton.classList.remove('learning-words-animated');
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
    spacedRepetitions.userWordsCollection.forEach((wordData) => {
      this.elements.containers.cardsWrapper.insertAdjacentHTML('afterBegin', this.renderCard(wordData));
    });
  }

  renderCard(wordData) {
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

    let nextRepeat;
    switch (wordData.userWord.difficulty) {
      case 'hard':
        nextRepeat = 'recommended after 25 seconds from last time';
        break;
      case 'normal':
        nextRepeat = 'recommended after 2 minutes from last time';
        break;
      case 'good':
        nextRepeat = 'recommended after 10 minutes from last time';
        break;
      case 'excellent':
        nextRepeat = 'recommended after 1 hour from last time';
        break;
      case 'learned':
        nextRepeat = 'you know this world';
        break;
      default:
        nextRepeat = 'in nearest training';
        break;
    }

    return `
      <div class="learning-words-card">
        <p class="learning-words-card__word learning-words-card__description">
          <button class="learning-words-card__spell-button" data-src="${wordData.audio}"></button>
          <span>${wordData.word}</span>
        </p>
        <p class="learning-words-card__transcription learning-words-card__description ${hideTranscriptionClass}">${wordData.transcription}</p>
        <p class="learning-words-card__word_translate learning-words-card__description ${hideWordTranslationClass}">${wordData.wordTranslate}</p>
        <p class="learning-words-card__example learning-words-card__description ${hideExampleClass}">
          <button class="learning-words-card__spell-button ${hideExampleClass}" data-src="${wordData.audioExample}"></button>
          <span>${wordData.textExample}</span>
        </p>
        <p class="learning-words-card__example_translate learning-words-card__description ${hideExampleClass}">${wordData.textExampleTranslate}</p>
        <p class="learning-words-card__meaning learning-words-card__description ${hideMeaningClass}">
          <button class="learning-words-card__spell-button ${hideMeaningClass}" data-src="${wordData.audioMeaning}"></button>
          <span>${wordData.textMeaning}</span>
        </p>
        <p class="learning-words-card__meaning_translate learning-words-card__description ${hideMeaningClass}">${wordData.textMeaningTranslate}</p>
        <img class="learning-words-card__image ${hidePictureClass}" src="${wordData.image}">
        <div class="learning-words-repetitions__container learning-words-card__description">
          <span>
            Category: ${category} <sup class="learning-words-stars">${stars}</sup>
          </span>
          <span> &#8634; Repeat times: ${wordData.userWord.optional.repeatTimes}</span>
          <span> &#10003; Last repeat: ${wordData.userWord.optional.lastRepeat}</span>
          <span> &#8986; Next repeat: ${nextRepeat}</span>
        </div>
        <hr>
      </div>
    `;
  }

  render() {
    return `
      <div class="learning-words__wrapper">
        <h3 class="learning-words__title dictionary__title">Learning words</h2>
        <p class="learning-words__count-title dictionary__title">
          Total: <span class="learning-words__count">${spacedRepetitions.userWordsCollection.length}</span>
        </p>
        <div class="learning-words__main">
          <div class="learning-words-cards__wrapper">
          </div>
        </div>
      </div>
    `;
  }

  init() {
    if (!mainController.userSettings) {
      this.userSettings = DEFAULT_SETTINGS;
    } else this.userSettings = mainController.userSettings;

    this.elements = {
      containers: {
        cardsWrapper: document.querySelector('.learning-words-cards__wrapper'),
        main: document.querySelector('.learning-words__main'),
      },
    };

    this.renderCards();
    this.elements.containers.cardsWrapper.addEventListener('click', this.playSpelling);
  }
}

export default new LearningWords();
