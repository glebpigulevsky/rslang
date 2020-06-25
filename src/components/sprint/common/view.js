class View {
  init() {
    this.renderDOM();
  }

  renderDOM() {
    document.querySelector('body').innerHTML = '';
    document.querySelector('body').insertAdjacentHTML(
      'afterbegin',
      `<div class="body__game-sprint body__game-sprint--background">
        <div class="wrapper wrapper__sprint-game">
          <div class="inner__game-sprint">
            <div class="game-sprint__header">
                <div class="game-sprint__score">Score: <span class="score__value"></span></div>
                <div class="game-sprint__timer"></div>
            </div>
            <div class="game-sprint__rating"></div>
            <div class="game-sprint__field"></div>
            <div class="game-sprint__controls">
                <button class="sprint__btn sprint__btn--wrong">wrong</button>
                <button class="sprint__btn sprint__btn--right">right</button>
              </div>
            <div class="game-sprint__footer">
              <p class="game-sprint__instruction">You can use the keyboard to control it</p>
              <img src="https://img.icons8.com/ultraviolet/40/000000/previous.png"/>
              <img src="https://img.icons8.com/ultraviolet/40/000000/next.png"/>
            </div>
          </div>
        </div>
      </div>`,
    );
  }
}

export default new View();
// <img src="https://img.icons8.com/nolan/50/goal.png"/>
// <img src="https://img.icons8.com/nolan/50/goal.png"/>
// <img src="https://img.icons8.com/nolan/50/goal.png"/>
// <img src="https://img.icons8.com/nolan/50/goal.png"/>
