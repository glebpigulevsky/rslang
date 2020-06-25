import Selector from '../selector/selector';

import {
  EVENTS,
  CLASS_NAMES,
  MAX_LEVELS_COUNT,
  MAX_ROUNDS_COUNT,
} from '../../../../common/english-puzzle.constants';

const SELECT_NAMES = {
  LEVEL: 'LEVEL',
  ROUND: 'ROUND',
};

export default class Menu {
  constructor(onLevelChangeHandler, onRoundChangeHandler) {
    this.ELEMENTS = {
      MENU: null,
      SELECTORS: {
        LEVEL: null,
        ROUND: null,
      },
    };

    this.onChangeHandlers = {
      LEVEL: onLevelChangeHandler,
      ROUND: onRoundChangeHandler,
    };

    this.init();
  }

  renderSelector(valuesCount, containerClass, name, currentOption, visitedOptions) {
    const container = this.ELEMENTS.MENU.querySelector(`.${containerClass}`);
    const values = new Array(valuesCount).fill(0).map((item, index) => index);
    const contents = values.map((item) => item + 1);
    this.ELEMENTS.SELECTORS[name] = new Selector(
      values,
      contents,
      [{ event: EVENTS.CHANGE, handler: this.onChangeHandlers[name] }],
      [`${CLASS_NAMES.NAVIGATION}__${name}`, name, CLASS_NAMES.SELECTOR],
      name,
      currentOption,
      visitedOptions,
    );
    container.append(this.ELEMENTS.SELECTORS[name].render());
  }

  renderLevelSelector(currentLevel, levelsCount = MAX_LEVELS_COUNT) {
    this.renderSelector(
      levelsCount,
      CLASS_NAMES.NAVIGATION_BOX.LEFT,
      SELECT_NAMES.LEVEL,
      currentLevel,
    );
  }

  renderRoundSelector(roundsCount = MAX_ROUNDS_COUNT, currentRound, completedRounds) {
    this.renderSelector(
      roundsCount,
      CLASS_NAMES.NAVIGATION_BOX.RIGHT,
      SELECT_NAMES.ROUND,
      currentRound,
      completedRounds,
    );
  }

  init() {
    this.ELEMENTS.MENU = document.querySelector(`.${CLASS_NAMES.NAVIGATION}`);
  }
}
