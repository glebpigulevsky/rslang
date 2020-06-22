class View {
  constructor() {}

  init() {
    this.renderDOM();
  }

  renderDOM() {
    document.querySelector('body').innerHTML = '';
    document.querySelector('body').insertAdjacentHTML('afterbegin',
      '<div id="app"></div>');
  }
}

export default new View();
