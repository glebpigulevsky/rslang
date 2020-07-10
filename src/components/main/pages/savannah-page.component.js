import savannahApp from '../../savannah/savannah.app';

export const savannahComponent = {
  init: savannahApp,
  render: () => `
  <div class="savannah__container" id="js-savannah-container">
  </div> `,
  unmount: savannahApp.unmount,
};
