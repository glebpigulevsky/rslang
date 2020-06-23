class View {
  init() {
    this.renderDOM();
  }

  renderDOM() {
    document.querySelector('body').innerHTML = '';
    document.querySelector('body').insertAdjacentHTML('afterbegin',
      `<div class="body__game-sprint">
        <div class="wrapper wrapper__sprint-game">
          <div class="inner__game-sprint"></div>
        </div>
      </div>`);
  }
}

export default new View();
