import { CLASS_NAMES } from '../../../../common/speakit.constants';
import { createCard, createCardWithTranslation } from '../../../../common/speakit.utils';

export default class PageCard {
  constructor(container, cardData) {
    this.container = container;
    this.cardData = cardData;
  }

  render() {
    const card = document.createElement('li');
    card.className = CLASS_NAMES.CARD;
    // card.innerHTML = this.translationData // todo innerHTML
    // ? createCardWithTranslation(this.cardData)
    // : createCard(this.cardData);
    card.innerHTML = createCardWithTranslation(this.cardData); // todo innerHTML
    this.container.append(card);
  }
}
