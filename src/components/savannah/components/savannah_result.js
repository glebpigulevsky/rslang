import { getSavannahStartControls } from './savannah_start';

export const getSavannahResult = ({ correct, wrong }) => `
<div class="savannah__start" id="js-start_block">
  <span class="savannah__start_title">savannah</span>
  <span class="savannah__start_stat">I need to learn: ${wrong}. I know: ${correct}.</span>
  <div class="savannah__close_btn"></div>
  ${getSavannahStartControls()}
  <div class="savannah__start_paginator id="js-savannah__start_paginator">
    <div class="savannah__start_page savannah__start_page_select" id="js-savannah_start_page_result"></div>
    <div class="savannah__start_page" id="js-savannah_start_page_statistics"></div>
    <div class="savannah__start_page"></div>
  </div>
    <div class="savannah__start_final" id="js-savannah_start_final">
      <div class="savannah__start_final_answears">
      </div>
    </div>
  </div>
  `;
