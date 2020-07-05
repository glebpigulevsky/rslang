import savannahApp from '../../savannah/savannah.app';

export const savannahComponent = {
  init: savannahApp,
  render: () => `
<div class="savannah__container" id="js-savannah-container">
    <div class="savannah__main">
      <div class="savannah__sound"></div> 
      <div class="savannah__hearts">
        <div class="savannah__heart savannah__heart_kill"></div>
        <div class="savannah__heart"></div>
        <div class="savannah__heart"></div>
        <div class="savannah__heart"></div>
        <div class="savannah__heart"></div>
      </div>
      <div class="savannah__close_btn"></div> 
      <div span class="savannah__question">word</div>
      <div class="savannah__answears">
        <div class="savannah__answear savannah__answear_select">слово<span class="savannah__answear_number">1</span></div>
        <div class="savannah__answear">предложение<span class="savannah__answear_number">2</span></div>
        <div class="savannah__answear">рационализация<span class="savannah__answear_number">3</span></div>
        <div class="savannah__answear">какоетодлинное слово<span class="savannah__answear_number">4</span></div>
      </div>
    </div>
    <div class="wrap">
    <div class="base">
      <div class="flowerpot"></div>
      <div class="blade blade-center"></div>
      <div class="blade blade-left-s"></div>
      <div class="blade blade-right-s"></div>
      <div class="blade blade-left-l"></div>
      <div class="blade blade-right-l"></div>
    </div>
  </div>
</div> `,
};

/* <div class="savannah__end">end</div> */

/* <div class "savannah__start" id="js-start_block disabled">
<span class="savannah__start_title">savannah</span>
<span class="savannah__start_phar">Coaching 'Savannah' develops vocabulary.</span>
<span class="savannah__start_phar">You will receive experience points.</span>
<button class="savannah__start_button" id="start_btn" onclick="this.blur();">Start</button>
</div> */
