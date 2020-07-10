import mainController from '../controller/main.controller';
import spacedRepetitions from '../spacedRepetitions/spacedRepetitions';
import ErrorInput from '../errorInput/errorInput';

import { showElement, hideElement } from './common/mainGame.helper';
import { DEFAULT_SETTINGS } from '../../../../services/common/services.common.constants';

import './scss/mainGame.styles.scss';

class MainGame {
  constructor() {
    this.elements = null;
    this.currentCard = null;
    this.userSettings = null;
    this.timerId = null;

    this.hints = {
      isTranslationEnabled: null,
      isAutoSpellingEnabled: null,
    };

    this.onHintTranslationButtonClickHandler = this.onHintTranslationButtonClickHandler.bind(this);
    this.onHintAutoSpellingButtonClickHandler = this.onHintAutoSpellingButtonClickHandler.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.onInputHandler = this.onInputHandler.bind(this);
    this.checkAnswerByKey = this.checkAnswerByKey.bind(this);
  }


// const span = document.querySelector('.span');
// const { width } = span.getBoundingClientRect();

// const input = document.querySelector('.input');
// input.style.width = `${width}px`;

// const errorSpans = Array.from(span.querySelectorAll('.errors'));

// const onContainerClickHandler = () => {
//   clearInterval(timerID);

//   errorSpans.map((errorSpan) => {
//     errorSpan.classList.remove('green', 'red', 'opacity');
//   });

//   input.value = '';
//   input.classList.remove('visually-hidden');
//   input.focus();

//   container.removeEventListener('click', onContainerClickHandler);
// };

// const onInputChangeHandler = (event) => {
//   const inputLetters = event.target.value.split('');
//   errorSpans.map((errorSpan, index) => {
//     if (errorSpan.textContent === inputLetters[index]) {
//       errorSpan.classList.add('green');
//     } else {
//       errorSpan.classList.add('red');
//     }
//     errorSpan.classList.remove('hidden');
//     event.target.classList.add('visually-hidden');
//   });

//   timerID = setTimeout(() => errorSpans.map((errorSpan) => {
//     errorSpan.classList.add('opacity');
//   }), 1000);

//   container.addEventListener('click', onContainerClickHandler);
// };

// input.addEventListener('change', onInputChangeHandler);

  addCard(wordData = this.currentCard) {
    this.elements.containers.card.innerHTML = '';
    this.elements.containers.card.insertAdjacentHTML('afterBegin', this.renderCard(wordData));
    this.elements.picture.src = wordData.image;

    const wordElement = document.querySelector('.linguist-main-card__word');

    const inputElement = document.createElement('input');
    inputElement.className = 'linguist-main-card__input';
    inputElement.style.width = `${wordElement.getBoundingClientRect().width + 1}px`;

    wordElement.insertAdjacentElement('afterBegin', inputElement);

    this.elements.card = {
      example: document.querySelector('.linguist-main-card__example'),
      exampleTranslate: document.querySelector('.linguist-main-card__example_translate'),
      meaning: document.querySelector('.linguist-main-card__meaning'),
      meaningTranslate: document.querySelector('.linguist-main-card__meaning_translate'),
      word: document.querySelector('.linguist-main-card__word'),
      wordTranslate: document.querySelector('.linguist-main-card__word_translate'),
      transcription: document.querySelector('.linguist-main-card__transcription'),
      input: document.querySelector('.linguist-main-card__input'),
    };

    this.elements.card.input.focus();
  }

  renderCard(wordData = this.currentCard) {
    const hideTranslationClass = (!this.hints.isTranslationEnabled)
      ? 'linguist__hidden'
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

    const firstWord = wordData.word[0].toUpperCase() + wordData.word.slice(1);
    const textExample = wordData.textExample
      .replace(wordData.word, '[...]')
      .replace(firstWord, '[...]');

    const textMeaning = wordData.textMeaning
      .replace(wordData.word, '[...]')
      .replace(firstWord, '[...]');

    return `
      <p class="linguist-main-card__word">${this.renderWord(wordData.word)}</p>
      <p class="linguist-main-card__transcription linguist-main-card__description ${hideTranscriptionClass}">${wordData.transcription}</p>
      <p class="linguist-main-card__word_translate linguist-main-card__description ${hideTranslationClass}">${wordData.wordTranslate}</p>
      <p class="linguist-main-card__example linguist-main-card__description ${hideExampleClass}">${textExample}</p>
      <p class="linguist-main-card__example_translate linguist-main-card__description ${hideTranslationClass} ${hideExampleClass}">${wordData.textExampleTranslate}</p>
      <p class="linguist-main-card__meaning linguist-main-card__description ${hideMeaningClass}">${textMeaning}</p>
      <p class="linguist-main-card__meaning_translate linguist-main-card__description ${hideTranslationClass} ${hideMeaningClass}">${wordData.textMeaningTranslate}</p>
    `;
  }

  renderFullSentences(wordData = this.currentCard) {
    this.elements.card.example.innerHTML = wordData.textExample;
    this.elements.card.meaning.innerHTML = wordData.textMeaning;
  }

  renderWord(word = this.currentCard.word) {
    return word
      .split('')
      .map((letter) => `<span class="linguist-main-card__letter" data-letter="${letter}">${letter}</span>`)
      .join('');
  }

  // hideCheckButton() {
  //   hideElement(this.elements.buttons.check);
  // }

  // showCheckButton() {
  //   showElement(this.elements.buttons.check);
  // }

  showNextCard() {
    this.currentCard = spacedRepetitions.getNextWord();
    this.addCard(this.currentCard);
  }

  correctAnswer() {
    this.showTranslation();
    this.renderFullSentences();
    this.showNextCard();
  }

  wrongAnswer(answer, errorColor) {
    this.elements.card.input.value = '';
    const etalonWordSpans = document.querySelectorAll('.linguist-main-card__letter');
    etalonWordSpans.forEach((etalonLetter, index) => {
      if (etalonLetter.dataset.letter !== answer[index] || !answer[index]) {
        etalonLetter.classList.add(`error-color-${errorColor}`, 'show-etalon-word');
      } else {
        etalonLetter.classList.add('correct-color', 'show-etalon-word');
      }
    });

    this.timerId = setTimeout(() => {
      etalonWordSpans.forEach((etalonLetter) => {
        etalonLetter.classList.remove('correct-color', `error-color-${errorColor}`);
        etalonLetter.classList.add('linguist-main-card-opacity');
      });
    }, 1000);

    this.elements.card.input.addEventListener('click', this.onInputHandler);
    this.elements.card.input.addEventListener('input', this.onInputHandler);
    this.elements.card.input.addEventListener('change', this.onInputHandler);
    this.elements.card.input.focus();
  }

  setDefaultEtalonWordSpanClass() {
    const etalonWordSpans = document.querySelectorAll('.linguist-main-card__letter');
    etalonWordSpans.forEach((etalonLetter) => {
      etalonLetter.className = 'linguist-main-card__letter';
    });
  }

  onInputHandler() {
    clearTimeout(this.timerId);
    this.setDefaultEtalonWordSpanClass();
    this.elements.card.input.removeEventListener('click', this.onInputHandler);
    this.elements.card.input.removeEventListener('input', this.onInputHandler);
    this.elements.card.input.removeEventListener('change', this.onInputHandler);
  }

  checkAnswerByKey(event) {
    if (event.key !== 'Enter') return;
    this.checkAnswer();
  }

  checkAnswer() {
    const answer = this.elements.card.input.value.trim().toLowerCase();
    const correctAnswer = this.currentCard.word.trim().toLowerCase();

    if (answer === correctAnswer) {
      this.correctAnswer();
    } else {
      let countErrors = 0;
      answer.split('').forEach((letter, index) => {
        if (letter !== correctAnswer[index]) countErrors += 1;
      });
      if (answer.length < correctAnswer.length) countErrors += correctAnswer.length - answer.length;
      const errorColor = (countErrors > correctAnswer.length / 2) ? 'red' : 'orange';

      this.wrongAnswer(answer, errorColor);
    }
  }

  render() {
    return `
      <div class="linguist__wrapper">
        <div class="linguist__controls-wrapper">
          <div class="linguist__game-controls-wrapper">
            <button class="linguist__button linguist__game-controls-button linguist__game-controls-button_delete display-none">delete</button>
            <button class="linguist__button linguist__game-controls-button linguist__game-controls-button_hards display-none">Move to hards</button>
            <button class="linguist__button linguist__game-controls-button linguist__game-controls-button_show display-none">Show answer</button>
            <button class="linguist__button linguist__game-controls-button linguist__game-controls-button_check">Check</button>
          </div>
          <div class="linguist__categories-controls-wrapper display-none">
            <button class="linguist__button linguist__categories-button linguist__categories-button_again">again</button>
            <button class="linguist__button linguist__categories-button linguist__categories-button_hard">hard</button>
            <button class="linguist__button linguist__categories-button linguist__categories-button_good">good</button>
            <button class="linguist__button linguist__categories-button linguist__categories-button_easy">easy</button>
          </div>
        </div>
        <div class="linguist__hints-wrapper">
          <button class="linguist__button linguist__hints-button linguist__hints-button_translation" title="Show/hide translation"></button>
          <button class="linguist__button linguist__hints-button linguist__hints-button_auto-spelling" title="On/off auto-spelling"></button>
        </div>
        <div class="linguist-main-card__wrapper">
          <div class="linguist-main-card">
            
          </div>
        </div>
        <img class="linguist-main-card__image">
      </div>
    `;
  }

  showTranslation() {
    this.elements.card.exampleTranslate.classList.remove('linguist__hidden');
    this.elements.card.meaningTranslate.classList.remove('linguist__hidden');
    this.elements.card.wordTranslate.classList.remove('linguist__hidden');
  }

  onHintTranslationButtonClickHandler({ target }) {
    this.hints.isTranslationEnabled = !this.hints.isTranslationEnabled;
    target.classList.toggle('active');

    this.elements.card.exampleTranslate.classList.toggle('linguist__hidden');
    this.elements.card.meaningTranslate.classList.toggle('linguist__hidden');
    this.elements.card.wordTranslate.classList.toggle('linguist__hidden');
  }

  onHintAutoSpellingButtonClickHandler({ target }) {
    this.hints.isAutoSpellingEnabled = !this.hints.isAutoSpellingEnabled;
    target.classList.toggle('active');
  }

  init(userSettings) {
    debugger;
    if (!userSettings) {
      this.userSettings = DEFAULT_SETTINGS;
    } else this.userSettings = userSettings;

    this.elements = {
      picture: document.querySelector('.linguist-main-card__image'),
      containers: {
        card: document.querySelector('.linguist-main-card'),
        gameControls: document.querySelector('.linguist__game-controls-wrapper'),
        categories: document.querySelector('.linguist__categories-controls-wrapper'),
      },
      buttons: {
        delete: document.querySelector('.linguist__game-controls-button_delete'),
        hards: document.querySelector('.linguist__game-controls-button_hards'),
        show: document.querySelector('.linguist__game-controls-button_show'),
        check: document.querySelector('.linguist__game-controls-button_check'),
        again: document.querySelector('.linguist__game-controls-button_again'),
        hard: document.querySelector('.linguist__game-controls-button_hard'),
        good: document.querySelector('.linguist__game-controls-button_good'),
        easy: document.querySelector('.linguist__game-controls-button_easy'),
        translation: document.querySelector('.linguist__hints-button_translation'),
        autoSpelling: document.querySelector('.linguist__hints-button_auto-spelling'),
      },
    };

    if (this.userSettings.optional.isDeleteButton) {
      this.elements.buttons.delete.classList.remove('display-none');
    }
    this.elements.buttons.delete.addEventListener('click', () => {});

    if (this.userSettings.optional.isMoveToDifficultiesButton) {
      this.elements.buttons.hards.classList.remove('display-none');
    }
    this.elements.buttons.hards.addEventListener('click', () => {});

    if (this.userSettings.optional.isAnswerButton) {
      this.elements.buttons.show.classList.remove('display-none');
    }
    this.elements.buttons.show.addEventListener('click', () => {});

    this.elements.buttons.check.addEventListener('click', this.checkAnswer);
    document.body.addEventListener('keyup', this.checkAnswerByKey);

    this.hints.isTranslationEnabled = this.userSettings.optional.isTranslation;
    if (this.hints.isTranslationEnabled) {
      this.elements.buttons.translation.classList.add('active');
    }
    this.elements.buttons.translation.addEventListener('click', this.onHintTranslationButtonClickHandler);

    this.isAutoSpellingEnabled = this.userSettings.optional.isVoiceSpelling;
    if (this.isAutoSpellingEnabled) {
      this.elements.buttons.autoSpelling.classList.add('active');
    }
    this.elements.buttons.autoSpelling.addEventListener('click', this.onHintAutoSpellingButtonClickHandler);

    this.showNextCard();
  }
}

export default new MainGame();
