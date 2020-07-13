import spacedRepetitions from '../spacedRepetitions/spacedRepetitions';
import mainController from '../controller/main.controller';

import { showElement, hideElement } from './common/mainGame.helper';

import { EMPTY } from '../../../../common/common.constants';
import { DEFAULT_SETTINGS } from '../../../../services/common/services.common.constants';

import './scss/mainGame.styles.scss';

import ERROR_AUDIO from './assets/audio/server-error.mp3';

class MainGame {
  constructor() {
    this.elements = EMPTY;
    this.currentCard = EMPTY;
    this.userSettings = EMPTY;
    this.timerId = EMPTY;

    this.hints = {
      isTranslationEnabled: EMPTY,
      isAutoSpellingEnabled: EMPTY,
    };

    this.combo = EMPTY;
    this.maxCombo = EMPTY;
    this.correctAnswers = EMPTY;
    this.errorAnswers = EMPTY;
    this.progress = EMPTY;

    this.audio = EMPTY;
    this.errorAudio = new Audio(ERROR_AUDIO);

    this.render = this.render.bind(this);
    this.onHintTranslationButtonClickHandler = this.onHintTranslationButtonClickHandler
      .bind(this);
    this.onHintAutoSpellingButtonClickHandler = this.onHintAutoSpellingButtonClickHandler
      .bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.onInputHandler = this.onInputHandler.bind(this);
    this.checkAnswerByKey = this.checkAnswerByKey.bind(this);
    this.showCorrectAnswer = this.showCorrectAnswer.bind(this);
    this.onCategoryButtonClickHandler = this.onCategoryButtonClickHandler
      .bind(this);
    this.showNextCard = this.showNextCard.bind(this);
    this.moveWordToDeleted = this.moveWordToDeleted.bind(this);
    this.moveWordToDifficulties = this.moveWordToDifficulties.bind(this);

    this.playSpelling = this.playSpelling.bind(this);
    this.startSpellingAnimation = this.startSpellingAnimation.bind(this);
    this.stopSpellingAnimation = this.stopSpellingAnimation.bind(this);
    this.onEndSpellingHandler = this.onEndSpellingHandler.bind(this);
    this.onErrorSpellingHandler = this.onErrorSpellingHandler.bind(this);
    this.onEndErrorSpellingHandler = this.onEndErrorSpellingHandler.bind(this);
  }

  showResults() {
    this.elements.results.cards.innerText = spacedRepetitions.cardsCount || 0;
    this.elements.results.correct.innerText = `${Math.round(
      ((this.correctAnswers - this.errorAnswers) * 100) / spacedRepetitions.cardsCount,
    ) || 0} %`;
    this.elements.results.new.innerText = spacedRepetitions.newWordsCount || 0;
    this.elements.results.combo.innerText = Math.max(this.combo, this.maxCombo) || 0;

    hideElement(this.elements.containers.main);
    showElement(this.elements.containers.statistic);
  }

  showNextCard() {
    this.updateProgressBar();

    this.isCorrect = false;
    if (spacedRepetitions.cardsCount >= this.userSettings.optional.cardsPerDay) {
      this.showResults();
      return;
    }

    this.currentCard = spacedRepetitions.getNextWord();
    if (!this.currentCard) {
      spacedRepetitions.cardsCount -= 1;
      this.showResults();
      return;
    }

    this.addCard(this.currentCard);
  }

  moveWordToDeleted() {
    this.currentCard.userWord.optional.toRepeat = false;
    this.currentCard.userWord.optional.isDifficult = false;
    this.currentCard.userWord.optional.isDeleted = true;
    this.currentCard.userWord.optional.changed = true;

    mainController.updateUserWord(
      this.currentCard.id,
      this.currentCard.userWord.difficulty,
      this.currentCard.userWord.optional,
    );
  }

  moveWordToDifficulties() {
    this.currentCard.userWord.optional.toRepeat = true;
    this.currentCard.userWord.optional.isDifficult = true;
    this.currentCard.userWord.optional.isDeleted = false;
    this.currentCard.userWord.optional.changed = true;

    mainController.updateUserWord(
      this.currentCard.id,
      this.currentCard.userWord.difficulty,
      this.currentCard.userWord.optional,
    );
  }

  correctAnswer(isShowAnswerButtonClicked = false) {
    this.isCorrect = true;
    this.elements.card.input.setAttribute('readonly', 'true');
    this.elements.card.input.classList.add('linguist__correct');

    if (!isShowAnswerButtonClicked) {
      this.correctAnswers += 1;
      this.combo += 1;
      spacedRepetitions.updateCorrectWord(this.currentCard);
    } else {
      this.maxCombo = Math.max(this.combo, this.maxCombo);
      this.combo = 0;
      spacedRepetitions.updateWrongWord(this.currentCard);
    }
    spacedRepetitions.updateUserWords();

    this.showTranslation();
    this.renderFullSentences();

    if (this.userSettings.optional.isCategoriesButtons) {
      hideElement(this.elements.containers.gameControls);
      showElement(this.elements.containers.categories);

      if (this.hints.isAutoSpellingEnabled) {
        this.playSpelling(this.currentCard.audio);
      }
      return;
    }

    if (this.hints.isAutoSpellingEnabled) {
      this.playSpelling(this.currentCard.audio);
    } else setTimeout(this.showNextCard, 1000);
  }

  wrongAnswer(answer, errorColor) {
    if (this.combo > 0) this.errorAnswers += 1;
    this.maxCombo = Math.max(this.combo, this.maxCombo);
    this.combo = 0;

    spacedRepetitions.updateWrongWord(this.currentCard);
    spacedRepetitions.updateUserWords();

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
    if (this.isCorrect) return;
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

  showCorrectAnswer() {
    this.elements.card.input.value = this.currentCard.word.trim().toLowerCase();
    this.correctAnswer(true);
  }

  playSpelling(currentAudio) {
    if (this.audio && !this.audio.ended) {
      this.audio.pause();
      this.onEndSpellingHandler(this.audio);
    }

    this.audio = new Audio(currentAudio);
    this.audio.addEventListener('ended', this.onEndSpellingHandler);
    this.audio.addEventListener('error', this.onErrorSpellingHandler);
    this.startSpellingAnimation();
    this.audio.play();
  }

  startSpellingAnimation() {
    this.elements.buttons.autoSpelling.classList.add('linguist-animated');
  }

  stopSpellingAnimation() {
    this.elements.buttons.autoSpelling.classList.remove('linguist-animated');
  }

  onEndSpellingHandler() {
    this.audio.removeEventListener('ended', this.onEndSpellingHandler);
    this.stopSpellingAnimation();

    if (this.audio.src === this.currentCard.audio) {
      if (this.userSettings.optional.isExampleSentence) {
        this.playSpelling(this.currentCard.audioExample);
        return;
      }
      if (this.userSettings.optional.isMeaningSentence) {
        this.playSpelling(this.currentCard.audioMeaning);
        return;
      }
    }

    if (this.audio.src === this.currentCard.audioExample) {
      if (this.userSettings.optional.isMeaningSentence) {
        this.playSpelling(this.currentCard.audioMeaning);
        return;
      }
    }

    if (!this.userSettings.optional.isCategoriesButtons) this.showNextCard();
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

  updateProgressBar() {
    this.elements.progress.passed.innerText = spacedRepetitions.cardsCount || 0;
    this.elements.progress.count.innerText = this.userSettings.optional.cardsPerDay || 0;
    this.progress = Math.round(
      (spacedRepetitions.cardsCount * 100) / this.userSettings.optional.cardsPerDay,
    );
    this.elements.progress.bar.style.width = `${this.progress}%`;
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

    if (
      !this.userSettings.optional.isMeaningSentence
        && !this.userSettings.optional.isExampleSentence
    ) {
      this.elements.card.wordTranslate.classList.remove('linguist__hidden');
    }
  }

  onHintAutoSpellingButtonClickHandler({ target }) {
    this.hints.isAutoSpellingEnabled = !this.hints.isAutoSpellingEnabled;
    target.classList.toggle('active');
  }

  onCategoryButtonClickHandler({ target }) {
    if (this.audio && !this.audio.ended) return;
    if (!target.classList.contains('linguist__categories-button')) return;
    const newCategory = target.dataset.category;

    spacedRepetitions.updateCategory(this.currentCard, newCategory);
    spacedRepetitions.updateUserWords();

    showElement(this.elements.containers.gameControls);
    hideElement(this.elements.containers.categories);

    this.showNextCard();
  }

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
      <p class="linguist-main-card__word_translate linguist-main-card__description ${hideTranslationClass} ${hideWordTranslationClass}">${wordData.wordTranslate}</p>
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

  render() {
    return `
      <div class="linguist__wrapper">
        <div class="linguist__main">
          <div class="linguist__controls-wrapper">
            <div class="linguist__game-controls-wrapper">
              <button class="linguist__button linguist__game-controls-button linguist__game-controls-button_delete display-none">delete</button>
              <button class="linguist__button linguist__game-controls-button linguist__game-controls-button_hards display-none">To difficult</button>
              <button class="linguist__button linguist__game-controls-button linguist__game-controls-button_show display-none">Show answer</button>
              <button class="linguist__button linguist__game-controls-button linguist__game-controls-button_check">Check</button>
            </div>
            <div class="linguist__categories-controls-wrapper display-none">
              <button class="linguist__button linguist__categories-button linguist__categories-button_again" data-category="new">again</button>
              <button class="linguist__button linguist__categories-button linguist__categories-button_hard" data-category="hard">hard</button>
              <button class="linguist__button linguist__categories-button linguist__categories-button_good" data-category="normal">normal</button>
              <button class="linguist__button linguist__categories-button linguist__categories-button_easy" data-category="good">good</button>
            </div>
          </div>
          <div class="linguist__hints-wrapper">
            <button class="linguist__button linguist__hints-button linguist__hints-button_translation" title="Show/hide translation"></button>
            <button class="linguist__button linguist__hints-button linguist__hints-button_auto-spelling" title="On/off auto-spelling"></button>
          </div>
          <div class="linguist-progress-wrapper">
            <span class="linguist-progress-passed">0</span>
            <div class="linguist-progress-bar">
              <div class="linguist-progress-bar-display"></div>
            </div>
            <span class="linguist-progress-count">50</span>
          </div>
          <div class="linguist-main-card__wrapper">
            <div class="linguist-main-card">
            </div>
          </div>
          <img class="linguist-main-card__image display-none">
        </div>
        <div class="linguist__statistic display-none">
          <div class="linguist__statistic-description-container">
            <h3 class="linguist__statistic-title">Stage statistics:</h3>
            <p class="linguist__statistic-cards-finished">
              <span class="statistic-cards-finished__title">Cards finished: </span>
              <span class="statistic-cards-finished__result"></span>
            </p>
            <hr class="linguist__statistic-line">
            <p class="linguist__statistic-correct">
              <span class="statistic-correct__title">Correct answers: </span>
              <span class="statistic-correct__result"></span>
            </p>
            <hr class="linguist__statistic-line">
            <p class="linguist__statistic-new">
              <span class="statistic-new__title">New words: </span>
              <span class="statistic-new__result"></span>
            </p>
            <hr class="linguist__statistic-line">
            <p class="linguist__statistic-combo">
              <span class="statistic-combo__title">Longest correct combo: </span>
              <span class="statistic-combo__result"></span>
            </p>
            <hr class="linguist__statistic-line">
            <p class="linguist__statistic-description">
              It's enough for today. But, if you want, you can repeat it again or change settings.
            </p>
          </div>
          <div class="linguist__statistic-controls">
            <button class="linguist__button" onclick="location.href = '#/settings'">Settings</button>
            <button class="linguist__button" onclick="location.href = '#/'">Main page</button>
          </div>
        </div>
      </div>
    `;
  }

  init(userSettings, englishLevel) {
    if (!userSettings) {
      this.userSettings = DEFAULT_SETTINGS;
      this.userSettings.optional.englishLevel = englishLevel;
    } else this.userSettings = userSettings;

    this.combo = 0;
    this.maxCombo = 0;
    this.correctAnswers = 0;
    this.errorAnswers = 0;
    this.progress = 0;

    this.elements = {
      picture: document.querySelector('.linguist-main-card__image'),
      containers: {
        card: document.querySelector('.linguist-main-card'),
        gameControls: document.querySelector('.linguist__game-controls-wrapper'),
        categories: document.querySelector('.linguist__categories-controls-wrapper'),
        statistic: document.querySelector('.linguist__statistic'),
        main: document.querySelector('.linguist__main'),
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
      results: {
        cards: document.querySelector('.statistic-cards-finished__result'),
        correct: document.querySelector('.statistic-correct__result'),
        new: document.querySelector('.statistic-new__result'),
        combo: document.querySelector('.statistic-combo__result'),
      },
      progress: {
        passed: document.querySelector('.linguist-progress-passed'),
        count: document.querySelector('.linguist-progress-count'),
        bar: document.querySelector('.linguist-progress-bar-display'),
      },
    };

    if (this.userSettings.optional.isPicture) {
      this.elements.picture.classList.remove('display-none');
    }

    if (this.userSettings.optional.isDeleteButton) {
      this.elements.buttons.delete.classList.remove('display-none');
    }
    this.elements.buttons.delete.addEventListener('click', this.moveWordToDeleted);

    if (this.userSettings.optional.isMoveToDifficultiesButton) {
      this.elements.buttons.hards.classList.remove('display-none');
    }
    this.elements.buttons.hards.addEventListener('click', this.moveWordToDifficulties);

    if (this.userSettings.optional.isAnswerButton) {
      this.elements.buttons.show.classList.remove('display-none');
    }
    this.elements.buttons.show.addEventListener('click', this.showCorrectAnswer);

    this.elements.buttons.check.addEventListener('click', this.checkAnswer);
    document.body.addEventListener('keyup', this.checkAnswerByKey);

    this.hints.isTranslationEnabled = this.userSettings.optional.isTranslation;
    if (this.hints.isTranslationEnabled) {
      this.elements.buttons.translation.classList.add('active');
    }
    this.elements.buttons.translation.addEventListener('click', this.onHintTranslationButtonClickHandler);

    this.hints.isAutoSpellingEnabled = this.userSettings.optional.isVoiceSpelling;
    if (this.hints.isAutoSpellingEnabled) {
      this.elements.buttons.autoSpelling.classList.add('active');
    }
    this.elements.buttons.autoSpelling.addEventListener('click', this.onHintAutoSpellingButtonClickHandler);

    if (this.userSettings.optional.isPicture) {
      this.elements.picture.classList.remove('display-none');
    }

    if (this.userSettings.optional.isCategoriesButtons) {
      this.elements.containers.categories.addEventListener('click', this.onCategoryButtonClickHandler);
    }

    this.showNextCard();
  }
}

export default new MainGame();
