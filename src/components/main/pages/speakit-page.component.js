import speakItApp from '../../speakit/speakit.app';

export const speakItPageComponent = {
  render: () => `
    <div class="speakit-body overflow-hidden">
      <div class="speakit-centralizer hidden">
        <div class="speakit-main">
          <nav class="navigation">
            <div class="navigation__box navigation__box_left">
              <span class="navigation__description level__description">Level:</span>
            </div>
            <div class="navigation__box navigation__box_right">
              <span class="navigation__description round__description">Round:</span>
            </div>
          </nav>
          <div class="game__controls">
            <div class="buttons__wrapper">
              <div class="difficulties">
                <span class="difficult__description">Level:</span>
                <button class="game__difficult game__difficult-1 speakit-button active">1</button>
                <button class="game__difficult game__difficult-2 speakit-button">2</button>
                <button class="game__difficult game__difficult-3 speakit-button">3</button>
                <button class="game__difficult game__difficult-4 speakit-button">4</button>
                <button class="game__difficult game__difficult-5 speakit-button">5</button>
                <button class="game__difficult game__difficult-6 speakit-button">6</button>
              </div>
              <div class="button__container">
                <button class="game__button game__button-new speakit-button">New game</button>
                <button class="game__button game__button-start speakit-button">Start game</button>
                <button class="game__button game__button-stop speakit-button">Stop game</button>
                <button class="game__button game__button-results speakit-button">Results</button>
              </div>
            </div>
            <p class="status-bar"></p>
          </div>

          <div class="main-card">
            <div>
              <p class="main-card__translation"></p>
              <input class="main-card__speech-input input" type="text" readonly>
            </div>
            <div class="picture__container">
              <img class="main-card__picture" alt="current word picture">
            </div>
          </div>

          <div class="cards__container">
          </div>

          <div class="results__container">
            <div class="button__container-results">
              <button class="game__button game__button-results_return speakit-button">Return</button>
              <button class="game__button game__button-results_new speakit-button">New game</button>
            </div>

            <div class="slider__wrapper wrapper">
              <div class="button__container-slider button__container_left">
                <button class="slider__button slider__button_previous">
                  <span class="slider__button-icon"></span>
                </button>
              </div>
              <div class="button__container-slider button__container_right">
                <button class="slider__button slider__button_next">
                  <span class="slider__button-icon"></span>
                </button>
              </div>

              <div class="gallery">
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="spinner hidden">
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
          <button class="introduction__button speakit-button">start</button>
        </div>
      </div>

      <template class="slider__item-template">
        <div class="slider__item">
          <p class="time"></p>
          <div class="results__correct">
            <p class="correct__title">
            <span class="correct__lead">Guessed:
                <span class="correct"></span>
            </span>
            </p>
          </div>
          <div class="results__errors">
            <p class="errors__title">
            <span class="errors__lead">Errors:
                <span class="errors"></span>
            </span>
            </p>
          </div>
        </div>
      </template>
    </div>
    `,
  init: speakItApp,
};
