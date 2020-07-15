export const MAX_WORDS_IN_ROUND = 10;
export const MAX_WORDS_PER_EXAMPLE = 100;
export const MAX_LEVELS_COUNT = 6;
export const MAX_ROUNDS_COUNT = 60;

export const DEFAULT_START_LEVEL = 0;
export const DEFAULT_START_ROUND = 0;

export const LANGUAGE = 'en-US';
export const EMPTY = null;

export const SLIDER_ITEM_CHANGE_DELAY = 0;
export const FIRST_SLIDER_ITEM_INDEX = 0;

export const SWIPER_CONFIG = {
  updateOnWindowResize: true,
  grabCursor: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
  simulateTouch: true,
  centerInsufficientSlides: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
};

export const LOCAL_STORAGE = {
  CURRENT_RESULTS: 'speakit-currentResults',
  LONG_RESULTS: 'speakit-longResults',
  COMPLETED_ROUNDS_DATA: 'speakit-completedRoundsData',
};

export const EVENTS = {
  CLICK: 'click',
  CHANGE: 'change',
  INPUT: 'input',
  BEFORE_UNLOAD: 'beforeunload',
  ERROR: 'error',
  LOAD: 'load',
};

export const CLASS_NAMES = {
  STAR: 'star',
  TIME: 'time',
  LINK: 'link',
  ACTIVE: 'speakit-active',
  DISABLED: 'disabled',
  BUTTON_ROUNDED: 'button-rounded',
  CARD: 'speakit-cards__item',
  HIDDEN: 'hidden',
  MAIN_LIST: 'speakit-cards__list list',
  OVERFLOW_HIDDEN: 'overflow-hidden',
  RESULT: {
    PAGE: 'result',
    CORRECT_CONTAINER: 'results__correct',
    ERRORS_CONTAINER: 'results__errors',
    CORRECT__LIST: 'correct__list list',
    ERRORS__LIST: 'errors__list list',
    CORRECT__ITEM: 'correct__item',
    ERRORS__ITEM: 'errors__item',
    CORRECT: 'correct',
    ERRORS: 'errors',
    TEMPLATE: 'statistic-template',
    LONG_STATISTIC: 'long-statistic',
    LONG_STATISTIC_CONTAINER: 'long-statistic__container',
    LONG_STATISTIC_LIST: 'long-statistic__list list',
    CONTAINER: 'statistics__container',
    GALLERY: 'gallery',
  },
  SLIDER: {
    ITEM: 'slider__item',
    ACTIVE: 'slider__active',
  },
  COMPLETED_ROUND: 'completed',
  NAVIGATION: 'navigation',
  NAVIGATION_BOX: {
    LEFT: 'navigation__box_left',
    RIGHT: 'navigation__box_right',
  },
  SELECTOR: 'selector',
  SWIPER_WRAPPER: 'swiper-wrapper',
};
