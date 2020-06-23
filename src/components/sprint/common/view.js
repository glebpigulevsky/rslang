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
                <div class="game-sprint__score">Score: <span class="score__value">120</span></div>
                <div class="game-sprint__timer"></div>
            </div>
          </div>
        </div>
      </div>`,
    );
  }
}

export default new View();
