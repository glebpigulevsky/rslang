import { CLASS_NAMES } from '../../../../common/speakit.constants';

export default class Select {
  constructor(
    valueList,
    contentList,
    listenersList,
    classList,
    name,
    currentOption,
    visitedOptions,
  ) {
    this.selectElement = null;
    this.valueList = valueList;
    this.contentList = contentList;
    this.listenersList = listenersList;

    this.currentOption = currentOption;
    this.visitedOptions = visitedOptions;

    this.createElement(classList, name);
  }

  addHandler(listener) {
    this.listenersList.push(listener);
    this.selectElement.addEventListener(listener.event, listener.handler);
  }

  addHandlers() {
    if (!this.listenersList || !this.listenersList.length) return;

    this.listenersList.forEach((listener) => {
      this.selectElement.addEventListener(listener.event, listener.handler);
    });
  }

  removeHandlers() {
    this.listenersList.forEach((listener) => {
      this.selectElement.removeEventListener(listener.event, listener.handler);
    });
  }

  render() {
    this.valueList.forEach((value, index) => {
      const optionElement = document.createElement('option');
      optionElement.value = value;
      optionElement.selected = (value === this.currentOption);
      optionElement.textContent = this.contentList[index];
      if (this.visitedOptions && this.visitedOptions.includes(index)) {
        optionElement.classList.add(CLASS_NAMES.COMPLETED_ROUND);
      }
      this.selectElement.append(optionElement);
    });

    return this.selectElement;
  }

  remove() {
    this.removeHandlers();
    this.selectElement.remove();
  }

  createElement(classList, name) {
    this.selectElement = document.createElement('select');
    this.selectElement.className = classList.join(' ');
    this.selectElement.name = name;
    this.addHandlers();
  }
}
