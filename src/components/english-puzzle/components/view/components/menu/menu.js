import Selector from '../selector/selector';

export default class Menu {
  constructor(onLevelChangeHandler, onRoundChangeHandler) {
    this.elements = {
      menu: null,
      selectors: {
        level: null,
        round: null,
      },
    };

    this.onChangHandlers = {
      level: onLevelChangeHandler,
      round: onRoundChangeHandler,
    };

    this.init();
  }

  renderSelector(valuesCount, containerClass, name, currentOption, visitedOptions) {
    const container = this.elements.menu.querySelector(`.${containerClass}`);
    const values = new Array(valuesCount).fill(0).map((item, index) => index);
    const contents = values.map((item) => item + 1);
    this.elements.selectors[name] = new Selector(values, contents, [{ event: 'change', handler: this.onChangHandlers[name] }], [`navigation__${name}`, name, 'selector'], name, currentOption, visitedOptions);
    container.append(this.elements.selectors[name].render());
  } // todo поснимать эти листенеры

  renderLevelSelector(currentLevel, levelsCount = 6) {
    this.renderSelector(levelsCount, 'navigation__box_left', 'level', currentLevel);
  }

  renderRoundSelector(roundsCount = 60, currentRound, completedRounds) {
    this.renderSelector(roundsCount, 'navigation__box_right', 'round', currentRound, completedRounds);
  }

  init() {
    this.elements.menu = document.querySelector('.navigation');

    // this.renderLevelSelector();
  }
}
