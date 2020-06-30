import LongStatisticCard from '../longStatisticCard/longStatisticCard';
import PageCard from '../pageCard/pageCard';
import { CLASS_NAMES, EMPTY } from '../../../../common/speakit.constants';

export default class ResultsList {
  constructor(
    container,
    pageData,
    listenersList,
    guessedList,
    time,
    longResults,
    additionalClass = EMPTY,
  ) {
    this.container = container;
    this.gallery = EMPTY;
    this.pageData = pageData;
    this.listenersList = listenersList;
    this.guessedList = guessedList;
    this.time = time;
    this.additionalClass = additionalClass;
    this.longResults = longResults;

    this.sliderItem = EMPTY;
    this.correctContainer = EMPTY;
    this.errorsContainer = EMPTY;
    this.correctList = EMPTY;
    this.errorsList = EMPTY;

    this.longStatisticsContainer = EMPTY;
    this.longStatisticList = EMPTY;

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
    if (this.pageData) {
      this.pageData.forEach((cardData) => {
        let card;
        if (this.guessedList.includes(cardData.word)) {
          card = new PageCard(this.correctList, cardData);
        } else {
          card = new PageCard(this.errorsList, cardData);
        }
        card.render();
      });
    }

    this.correctContainer.append(this.correctList);
    const correctCount = this.sliderItem.querySelector(`.${CLASS_NAMES.RESULT.CORRECT}`);
    correctCount.innerText = this.correctList.childElementCount;

    this.errorsContainer.append(this.errorsList);
    const errorsCount = this.sliderItem.querySelector(`.${CLASS_NAMES.RESULT.ERRORS}`);
    errorsCount.innerText = this.errorsList.childElementCount;

    this.sliderItem.append(this.correctContainer);
    this.sliderItem.append(this.errorsContainer);

    this.gallery.append(this.sliderItem);

    if (this.longResults) {
      this.longResults.forEach((resultItem, index) => {
        const card = new LongStatisticCard(this.longStatisticList, index, resultItem);
        card.render();
      });

      this.longStatisticsContainer.append(this.longStatisticList);
      this.container.append(this.longStatisticsContainer);
    }
  }

  remove() {
    this.removeHandlers();
    this.gallery.innerHTML = '';
    this.longStatisticsContainer.remove();
  }

  init() {
    this.gallery = this.container.querySelector(`.${CLASS_NAMES.SWIPER_WRAPPER}`);

    this.sliderItem = document.body.querySelector(`.${CLASS_NAMES.RESULT.TEMPLATE}`).content.cloneNode(true).querySelector(`.${CLASS_NAMES.SLIDER.ITEM}`);
    if (this.additionalClass) this.sliderItem.classList.add(this.additionalClass);

    this.sliderItem.querySelector(`.${CLASS_NAMES.TIME}`).innerText = this.time;

    this.correctContainer = this.sliderItem.querySelector(`.${CLASS_NAMES.RESULT.CORRECT_CONTAINER}`);
    this.errorsContainer = this.sliderItem.querySelector(`.${CLASS_NAMES.RESULT.ERRORS_CONTAINER}`);

    this.correctList = document.createElement('ul');
    this.correctList.className = CLASS_NAMES.RESULT.CORRECT__LIST;

    this.errorsList = document.createElement('ul');
    this.errorsList.className = CLASS_NAMES.RESULT.ERRORS__LIST;

    this.longStatisticsContainer = document.querySelector(`.${CLASS_NAMES.RESULT.TEMPLATE}`)
      .content.cloneNode(true).querySelector(`.${CLASS_NAMES.RESULT.LONG_STATISTIC_CONTAINER}`);
    this.longStatisticList = document.createElement('ul');
    this.longStatisticList.className = CLASS_NAMES.RESULT.LONG_STATISTIC_LIST;

    this.addHandlers();
  }
}
