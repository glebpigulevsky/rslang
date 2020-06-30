import { CLASS_NAMES } from '../../../../common/speakit.constants';

export default class PageCard {
  constructor(container, cardData) {
    this.container = container;
    this.cardData = cardData;
  }

  createCardWithTranslation({
    word,
    image,
    audio,
    transcription,
    wordTranslate,
  }) {
    return `
      <a class="speakit-card__link link" href="#" data-word="${word}" data-audio="${audio}" data-image="${image}" data-translation="${wordTranslate}">
        <p class="card__word">${word}</p>
        <p class="card__transcription">${transcription}</p>
        <p class="card__translation">${wordTranslate}</p>
      </a>
    `;
  }

  render() {
    const card = document.createElement('li');
    card.className = CLASS_NAMES.CARD;
    card.insertAdjacentHTML('afterbegin', this.createCardWithTranslation(this.cardData));
    this.container.append(card);
  }
}
