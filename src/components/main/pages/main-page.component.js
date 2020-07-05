import menu from '../components/menu/menu';

export const mainPageComponent = {
  init: menu.init,
  render: () => `
    <div class="wrapper">
      <div class="main__game">
        <h1 class="main__title">Learn anytime and anywhere</h1>
        <p class="main__subtitle">You will find a fascinating and interesting way.<br>
          Together with RSlang you will learn more than 3600 words</p>
        <div class="main-button">
          <button class="main-button__start" id="js-main-button"><img src="./assets/main/img/icon/rocket.svg" alt="get started">get
            started</button>
        </div>
      </div>
    </div>
    `,
};
