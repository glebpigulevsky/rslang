export const MAX_SENTENCES_IN_ROUND = 10;
export const MAX_WORDS_IN_SENTENCE = 10;
export const MAX_LEVELS_COUNT = 6;
export const MAX_ROUNDS_COUNT = 60;

export const TABLET_WIDTH = 768;
export const IMAGE_GAP = 10;

export const DEBOUNCING_COORDINATE_DELTA = 10;
export const LEFT_MARGIN_PUZZLE_GAP = 8;

export const EVENTS = {
  CLICK: 'click',
  CHANGE: 'change',
  INPUT: 'input',
  LOAD: 'load',
  ERROR: 'error',
  ENDED: 'ended',
  MOUSE_MOVE: 'mousemove',
  MOUSE_UP: 'mouseup',
  MOUSE_DOWN: 'mousedown',
  BEFORE_UNLOAD: 'beforeunload',
};

export const CLASS_NAMES = {
  NAVIGATION: 'navigation',
  NAVIGATION_BOX: {
    LEFT: 'navigation__box_left',
    RIGHT: 'navigation__box_right',
  },
  SELECT: 'select',
  LINK: 'link',
  ACTIVE: 'active',
  DISABLED: 'disabled',
  HIDDEN: 'hidden',
  SHADOW: 'shadow',
  BUTTON_ROUNDED: 'button-rounded',
  CARD: 'cards__item-english-for-puzzle',
  DISPLAY_NONE: 'display-none',
  MAIN_LIST: 'cards__list list',
  OVERFLOW_HIDDEN: 'overflow-hidden',
  STATISTIC: {
    TEMPLATE: 'statistic-template',
    TIME: 'time',
    PAGE: 'result',
    LONG: 'long-statistic',
    CONTAINERS: {
      CURRENT: 'current-statistic__container',
      LONG: 'long-statistic__container',
    },
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
    LONG_STATISTIC: {
      LIST: 'long-statistic__list list',
    },
  },
  DRAGABLE: 'dragable',
  MOVEABLE: 'moveable',
  BG_PICTURE: 'background-picture',
  COMPLETED_ROUND: 'completed',
  ANIMATED: 'animated',
  SPINNER: 'spinner',
  DROP_PLACE: 'drop-place',
  DROP_PLACE_SENTENCE: 'drop-place sentence',
  GAME_FILED: 'game__field',
  GAME_FILED_CONTAINER: 'game__field_container',
  DATA_CONTAINER: 'data__container',
  FIELD_CONTAINER: 'field__container',
  CANVAS_ITEM: 'canvas-item',
  SENTENCE: 'sentence',
  SENTENCE_CLEAR: 'sentence-clear',
  CANVAS_ROW: 'canvas-row',
  SELECTOR: 'selector',
  PICTURE_CONTAINER: 'picture__container',
};

export const PUZZLE = {
  COLORS: {
    BORDER: {
      DEFAULT: '#00fffa',
      SHADOW: '#fffffa',
    },
    FILL: {
      DEFAULT: '#2d4fc8',
      WITHOUT_IMAGE: '#085364',
    },
    LIGHT: '#ffffff',
    DARK: '#000000',
    CORRECT: '#008000',
    WRONG: '#ff0000',
    TRANSPARENT: 'transparent',
  },
  FONT: {
    NAME: 'Segoe',
    TYPE: 'bold',
    STYLE: 'fillText',
    RATIO: {
      DESKTOP: 1,
      TABLET: 0.8,
      MOBILE: 0.6,
    },
  },
  SIZES: {
    BORDER: 5,
    BORDER_TEXT: 2,
    WINDOW: {
      DESKTOP: 1024,
      TABLET: 768,
    },
    PICTURE: {
      TABLET: 900,
      MOBILE: 700,
    },
    SHADOW: {
      BORDER: 2,
      TEXT: 10,
    },
  },
  PARTS: {
    CANVAS_VERTICAL: 3,
    CANVAS_FONT: 4,
    HALF: 2,
  },
  TEXT_ALIGN: 'center',
  EXTRA_WIDTH_VALUE: 10,
  MATH_PI_RATIO: 1.5,
};
