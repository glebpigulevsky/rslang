class View {
  constructor() {}

  init() {
    this.renderDOM();
  }

  renderDOM() {
    document.querySelector('body').innerHTML = '';
    document.querySelector('body').insertAdjacentHTML('afterbegin',
      `<div class = 'game__container'>
            <div id="app"></div>
        <div class = 'game__field' id = 'word-container'>
        </div>
        <div class = 'game__button'>
        <button type="button" class = 'button false-result' id ='button-false' >FALSE</button>
        <button type="button" class = 'button true-result' id ='button-true'>TRUE</button>
        </div>
    </div>`);
  }
}

export default new View();
