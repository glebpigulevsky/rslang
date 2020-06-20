import './scss/results.scss';

import { CLASS_NAMES } from '../../../data/helper';
import StatisticCard from '../statisticCard/statisticCard';

export default class ResultsList {
  constructor(
    container,
    roundData,
    listenersList,
    // translationMap,
    iDontKnowList,
    time,
    additionalClass = null,
  ) {
    this.container = container;
    this.roundData = roundData;
    this.listenersList = listenersList;
    // this.translationMap = new Map(translationMap);
    this.iDontKnowList = iDontKnowList;
    this.time = time;
    this.additionalClass = additionalClass;

    this.sliderItem = null;
    this.correctContainer = null;
    this.errorsContainer = null;
    this.correctList = null;
    this.errorsList = null;

    this.init();
  }

  addHandlers() {
    this.listenersList.forEach((listener) => {
      this.container.addEventListener(listener.event, listener.handler);
    });
  }

  removeHandlers() {
    this.listenersList.forEach((listener) => {
      this.container.removeEventListener(listener.event, listener.handler);
    });
  }

  render() {
    debugger;
    this.roundData.forEach((wordData) => {
      let card;
      if (this.iDontKnowList.includes(wordData)) {
        card = new StatisticCard(this.errorsList, wordData);
      } else {
        card = new StatisticCard(this.correctList, wordData);
      }
      card.render();
    });

    this.correctContainer.append(this.correctList);
    const correctCount = this.statisticsContainer.querySelector(`.${CLASS_NAMES.STATISTIC.CORRECT.COUNT}`);
    correctCount.innerText = this.correctList.childElementCount;

    this.errorsContainer.append(this.errorsList);
    const errorsCount = this.statisticsContainer.querySelector(`.${CLASS_NAMES.STATISTIC.ERRORS.COUNT}`);
    errorsCount.innerText = this.errorsList.childElementCount;

    this.statisticsContainer.append(this.correctContainer);
    this.statisticsContainer.append(this.errorsContainer);
    this.container.append(this.statisticsContainer);
  }

  remove() {
    this.removeHandlers();
    this.container.innerHTML = '';
  }

  init() {
    this.statisticsContainer = document.querySelector(`.${CLASS_NAMES.STATISTIC.TEMPLATE}`).content.cloneNode(true).querySelector(`.${CLASS_NAMES.STATISTIC.CONTAINER}`);
    if (this.additionalClass) this.statisticsContainer.classList.add(this.additionalClass);

    this.statisticsContainer.querySelector(`.${CLASS_NAMES.STATISTIC.TIME}`).innerText = this.time;

    this.correctContainer = this.statisticsContainer.querySelector(`.${CLASS_NAMES.STATISTIC.CORRECT.CONTAINER}`);
    this.errorsContainer = this.statisticsContainer.querySelector(`.${CLASS_NAMES.STATISTIC.ERRORS.CONTAINER}`);

    this.correctList = document.createElement('ul');
    this.correctList.className = CLASS_NAMES.STATISTIC.CORRECT.LIST;

    this.errorsList = document.createElement('ul');
    this.errorsList.className = CLASS_NAMES.STATISTIC.ERRORS.LIST;

    this.addHandlers();
  }
}
