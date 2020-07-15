import { CLASS_NAMES, MAX_SENTENCES_IN_ROUND } from '../../../../common/english-puzzle.constants';

export default class StatisticCard {
  constructor(container, index, longStatisticItem) {
    this.container = container;
    this.index = index;
    this.longStatisticItem = longStatisticItem;
  }

  render() {
    const card = document.createElement('li');
    card.className = CLASS_NAMES.CARD;
    card.insertAdjacentHTML('afterbegin', this.renderCardContent(this.index, this.longStatisticItem));
    this.container.append(card);
  }

  renderCardContent(index, { guessedListLength, finalTime }) {
    return `
      <p class="card__content">
        <span>${index + 1}. </span>
        <span class="time">${finalTime} </span>
        <span class="correct__title">
          <span class="correct__lead">I know: </span>
          <span class="correct">${guessedListLength} </span>
        </span>
        <span class="errors__title">
          <span class="errors__lead">I don\`t know: </span>
          <span class="errors">${MAX_SENTENCES_IN_ROUND - guessedListLength}</span>
        </span>
      </p>
    `;
  }
}
