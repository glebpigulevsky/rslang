import englishPuzzleApp from '../../english-puzzle/english-puzzle.app';

export const englishPuzzleComponent = {
  init: englishPuzzleApp,
  render: () => `
  <div class="overflow-hidden english-puzzle-body">
    <div class="english-puzzle-wrapper display-none">
     
      <div class="english-puzzle-main">
        <div class="main-game__container">
          <nav class="navigation">
            <div class="navigation__box navigation__box_left">
              <span class="navigation__description level__description">Level:</span>
              <!-- <select class="navigation__level level select" name="level"> // todo
                <option value="0">1</option>
                <option value="1">2</option>
              </select> -->
            </div>
            <div class="navigation__box navigation__box_right">
              <span class="navigation__description round__description">Round:</span>
              <!-- <select class="navigation__round round select" name="round"> // todo
                <option value="0">1</option>
                <option value="1">2</option>
              </select> -->
            </div>
          </nav>
          <div class="game__controls">
            <div class="hints__controls">
              <button class="game-hints__button game-hints_bg button" title="Show/hide puzzle background"></button>
              <button class="game-hints__button game-hints_translation button" title="Show/hide translation"></button>
              <button class="game-hints__button game-hints_spelling button" title="On/off spelling hint"></button>
              <button class="game-hints__button game-hints_auto-spelling button" title="On/off auto-spelling"></button>
            </div>
            <button class="button-repeat-spelling button" title="Spell it"></button>
          </div>

          <p class="translation__description description"></p>
          
          <div class="game__field">
            <div class="field__container game__field_container">
              <div class="drop-place sentence">
              </div>
            </div>
            <div class="data__container game__field_container">
              <div class="drop-place sentence">
              </div>
            </div>
          </div>

          <p class="picture__description description"></p>

          <div class="field__controls">
            <button class="game__button game__button_check button display-none">Check</button>
            <button class="game__button game__button_dont-know button">I don\`t know</button>
            <button class="game__button game__button_continue button display-none">Continue</button>
            <button class="game__button game__button_results button display-none">Results</button>
          </div>
        </div>

        <div class="results__container">
          <div class="button__container-results">
            <button class="game__button_results game__button_results-continue button">Continue</button>
            <button class="game__button_results game__button_results-statistic button">Statistics</button>
          </div>

          <div class="statistics__container">
          </div>
        </div>
      </div>
    </div>

    <div class="spinner display-none">
      <div class="spinner__gear">
        <div class="spinner__inner">
          <div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
      <span class="spinner__description">loading...</span>
    </div>

    <div class="introduction">
      <div class="introduction__container">
        <div class="introduction__description-container">
          <h1 class="introduction__logo">Mini-game "English-Puzzle"</h1>
          <button class="introduction__button button">start</button>
          <p class="introduction__description">Click on words, collect phrases, select levels, rounds, tooltips.</p>
          <p class="introduction__description">In desktop view words can be drag and drop</p>
        </div>
      </div>
    </div>

    <template class="statistic-template">
      <div class="current-statistic__container">
        <p class="time"></p>
        <div class="correct__container">
          <p class="correct__title">
            <span class="correct__lead">I know:
              <span class="correct"></span>
            </span>
          </p>
        </div>
        <div class="errors__container">
          <p class="errors__title">
            <span class="errors__lead">I don\`t know:
              <span class="errors"></span>
            </span>
          </p>
        </div>
      </div>
      <div class="long-statistic__container">
      </div>
    </template>
  </div>
  `,
};
