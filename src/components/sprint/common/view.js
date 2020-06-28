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
            <div id = "score" ></div>
            <div id = "right"></div>
        <div class='game__field' id = 'word-container'>
        </div>
        <div class='game__button' id='buttons'>
        <button type="button" class = 'false' id='false'>FALSE</button>
        <button type="button" class = 'true' id='true'>TRUE</button>
        </div>
    </div>
    <div class="wrapper-score hidden">
    <div class="score">
    <div class="container-answers">
      <div class ='know'></div><div class ='dntKnow'></div>
    </div> 
      <div class="button-wrapper">
        <button class="btn" id="start">New game</button><button class="btn statistic">Statistic</button>
      </div>
      </div>
    </div>
    `);
  }
}

export default new View();
