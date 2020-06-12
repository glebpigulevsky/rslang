import { CLASS_NAMES } from '../../../data/helper';
import PageCard from '../pageCard/pageCard';

export default class PageList {
  constructor(container, pageData, listenersList) {
    this.container = container;
    this.pageData = pageData;
    this.listenersList = listenersList;
    this.list = null;

    this.init();
  }

  addHandlers() {
    this.listenersList.forEach((listener) => {
      this.list.addEventListener(listener.event, listener.handler);
    });
  }

  removeHandlers() {
    this.listenersList.forEach((listener) => {
      this.list.removeEventListener(listener.event, listener.handler);
    });
  }

  render() {
    this.pageData.forEach((cardData) => {
      const card = new PageCard(this.list, cardData);
      card.render();
    });

    this.container.prepend(this.list);
  }

  remove() {
    this.removeHandlers();
    this.list.remove();
  }

  init() {
    const list = document.createElement('ul');
    list.className = CLASS_NAMES.MAIN_LIST;
    this.list = list;
    this.addHandlers();
  }
}
