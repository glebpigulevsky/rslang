export const MAX_WORDS_COUNT = 10;

export const LANGUAGE = 'en-US';

export const CLASS_NAMES = {
  NAVIGATION: 'navigation',
  SELECT: 'select',
  STAR: 'star',
  LINK: 'link',
  ACTIVE: 'active',
  DISABLED: 'disabled',
  BUTTON_ROUNDED: 'button-rounded',
  CARD: 'cards__item',
  HIDDEN: 'hidden',
  MAIN_LIST: 'cards__list list',
  OVERFLOW_HIDDEN: 'overflow-hidden',
  STATISTIC: {
    TEMPLATE: 'statistic-template',
    TIME: 'time',
    PAGE: 'result',
    CONTAINER: 'statistic__container',
    CORRECT: {
      CONTAINER: 'correct__container',
      LIST: 'correct__list list',
      CORRECT__ITEM: 'correct__item',
      COUNT: 'correct',
    },
    ERRORS: {
      CONTAINER: 'errors__container',
      LIST: 'errors__list list',
      CORRECT__ITEM: 'errors__item',
      COUNT: 'errors',
    },
  },
  // SLIDER: {
  //   ITEM: 'slider__item',
  //   ACTIVE: 'slider__active',
  // },
  DRAGABLE: 'dragable',
  PUZZLE: {
    CORRECT: 'correct__puzzle',
    WRONG: 'wrong__puzzle',
  },
  BG_PICTURE: 'background-picture',
  COMPLETED_ROUND: 'completed',
  ANIMATED: 'animated',
};

// export const ELEMENTS = {
//   CENTRALIZER: document.querySelector('.centralizer'),
//   INTRODUCTION: document.querySelector('.introduction'),
//   SPINNER: document.querySelector('.spinner'),
//   CARDS_CONTAINER: document.querySelector('.cards__container'),
//   PICTURE: document.querySelector('.main-card__picture'),
//   TRANSLATION: document.querySelector('.main-card__translation'),
//   SPEECH_INPUT: document.querySelector('.main-card__speech-input'),
//   STATUS_BAR: document.querySelector('.status-bar'),
//   RESULT: {
//     TEMPLATE: document.body.querySelector('.slider__item-template'),
//     CONTAINER: document.body.querySelector('.gallery'),
//   },
//   BUTTONS: {
//     INTRODUCTION: document.querySelector('.introduction__button'),
//     NEW: document.querySelector('.game__button-new'),
//     GAME: document.querySelector('.game__button-start'),
//     STOP: document.querySelector('.game__button-stop'),
//     RESULTS: document.querySelector('.game__button-results'),
//     DIFFICULTIES: document.querySelector('.difficulties'),
//     RESULTS_NEW_GAME: document.querySelector('.game__button-results_new'),
//     RESULTS_RESUME_GAME: document.querySelector('.game__button-results_return'),
//   },
// };

export const EVENTS = {
  CLICK: 'click',
  CHANGE: 'change',
  INPUT: 'input',
  BEFORE_UNLOAD: 'beforeunload',
  LOAD: 'load',
  ERROR: 'error',
  ENDED: 'ended',
};

export const DATA_PATH = 'https://raw.githubusercontent.com/musmen/rslang-data/master/data/';
