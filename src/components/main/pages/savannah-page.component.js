import savannahApp from '../../savannah/savannah.app';

export const savannahComponent = {
  init: savannahApp,
  render: () => `
  <div class="savannah__container background_animation" id="js-savannah-container">
    <div id="js-savannah-background-wrap">
    </div>
    <div class="clouds background_animation"></div>
    <div id="js-savannah-game-wrap">
  </div> `,
  unmount: savannahApp.unmount,
};
