import Select from '../select/select';

export default class Menu {
  constructor(onLevelChangeHandler, onRoundChangeHandler) {
    this.elements = {
      menu: null,
      select: {
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

  renderSelect(valuesCount, containerClass, name) {
    const container = this.elements.menu.querySelector(`.${containerClass}`);

    const values = new Array(valuesCount).fill(0).map((item, index) => index);
    const contents = values.map((item) => item + 1);
    this.elements.select[name] = new Select(values, contents, [{ event: 'change', handler: this.onChangHandlers[name] }], [`navigation__${name}`, name, 'select'], name);
    container.append(this.elements.select[name].render());
  }

  renderLevelSelect(levelsCount = 6) {
    this.renderSelect(levelsCount, 'navigation__box_left', 'level');
  }

  renderRoundSelect(roundsCount = 60) {
    this.renderSelect(roundsCount, 'navigation__box_right', 'round');
  }

  init() {
    this.elements.menu = document.querySelector('.navigation');

    this.renderLevelSelect();
  }
}
