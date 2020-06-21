import Selector from '../selector/selector';

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
      level: onLevelChangeHandler,
      round: onRoundChangeHandler,
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
      [{ event: 'change', handler: this.onChangeHandlers[name] }],
      [`navigation__${name}`, name, 'selector'],
      name,
      currentOption,
      visitedOptions,
    );
    container.append(this.ELEMENTS.SELECTORS[name].render());
  } // todo поснимать эти листенеры

  renderLevelSelector(currentLevel, levelsCount = 6) {
    this.renderSelector(levelsCount, 'navigation__box_left', 'LEVEL', currentLevel);
  }

  renderRoundSelector(roundsCount = 60, currentRound, completedRounds) {
    this.renderSelector(roundsCount, 'navigation__box_right', 'ROUND', currentRound, completedRounds);
  }

  init() {
    this.ELEMENTS.MENU = document.querySelector('.navigation');
  }
}
