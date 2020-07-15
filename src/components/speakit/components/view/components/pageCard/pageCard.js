import { CLASS_NAMES } from '../../../../common/speakit.constants';

export default class PageCard {
  constructor(container, cardData, hasTranslation = false) {
    this.container = container;
    this.cardData = cardData;
    this.hasTranslation = hasTranslation;
  }

  createCard({
    word, image, audio, transcription, wordTranslate,
  }, hasTranslation) {
    return `
      <a class="speakit-card__link link" href="#" data-word="${word}" data-audio="${audio}" data-image="${image}" data-translation="${wordTranslate}">
        <p class="card__word">${word}</p>
        <p class="card__transcription">${transcription}</p>
        <p class="card__translation">${hasTranslation ? wordTranslate : ''}</p>
      </a>
    `;
  }

  render() {
    const card = document.createElement('li');
    card.className = CLASS_NAMES.CARD;
    card.insertAdjacentHTML('afterbegin', this.createCard(this.cardData, this.hasTranslation));
    this.container.append(card);
  }
}
