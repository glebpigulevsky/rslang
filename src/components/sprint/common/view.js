export default class View {
  renderDOM() {
    return `
      <div class="body__game-sprint overflow-hidden">
        <div class="sprint-game__wrapper display-none">
            <div class="navigation">
                <div class="controls__level"><span>Level</span></div>
                <button class="btn__my-words">repeat my words</button>
                <div class="controls__round"><span>Round</span></div>
            </div>
            <div class="sprint-game__container">
                <div class="inner__game-sprint">
                    <div class="game-sprint__header">
                        <div class="game-sprint__score">Score: <span id= "score" class="score__value"></span></div>
                        <div class="game-sprint__timer"></div>
                    </div>
                    <div id="rating" class="game-sprint__rating"></div>
                    <div class="game-sprint__field"></div>
                    <div class="game-sprint__controls">
                        <button type="button" id="false" class="false">wrong</button>
                        <button type="button" id="true" class="true">right</button>
                    </div>
                    <div class="game-sprint__footer">
                    <p class="game-sprint__instruction">You can use the keyboard to control it</p>
                    <img src="https://img.icons8.com/ultraviolet/40/000000/previous.png"/>
                    <img src="https://img.icons8.com/ultraviolet/40/000000/next.png"/>
                    </div>
                </div>
          </div>
        </div>
        <div class="preview">
            <div class="preview__wrapper">
                <div class="preview__descr">
                    <h1 class="preview__title">Mini-game "Sprint"</h1>
                    <p class = "preview__content"> Ability to select a round and level <br> Round duration 1 minute </p>
                    <p class = "preview__content"> Game progress: you see a word in English and a translation of the word, <br> you need to specify whether this translation belongs to this word</p>
                    <button class="preview__btn">start</button>
                </div>
            </div>
        </div>
      </div>`;
  }
}
