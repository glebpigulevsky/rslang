import { startScreenTemplate } from './templates/templates';

export default class StartScreenClass {
  constructor(startGameClickHandler, startGameWithLearnedWords) {
    this.startGameClickHandler = startGameClickHandler;
    this.startGameWithLearnedWords = startGameWithLearnedWords;
  }

  render() {
    document.querySelector('.main__game').innerHTML = startScreenTemplate;

    document.querySelector('.with-select').addEventListener('click', this.startGameClickHandler);
    document.querySelector('.learn-my-words').addEventListener('click', this.startGameWithLearnedWords);
  }
}
