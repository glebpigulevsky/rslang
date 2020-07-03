import savannahApp from '../../savannah/savannah.app';

export const savannahComponent = {
  init: savannahApp,
  render: () => `
<div class="savannah__container" id="js-savannah-container">
    <div>
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
        <span class="savannah__answear savannah__answear_select">слово</span>
        <span class="savannah__answear">предложение</span>
        <span class="savannah__answear">заголовок</span>
        <span class="savannah__answear">парагаф</span>
      </div>
    
    </>
</div> `,
};

/* <div class="savannah__end">end</div> */

/* <div class "savannah__start" id="js-start_block disabled">
<span class="savannah__start_title">savannah</span>
<span class="savannah__start_phar">Coaching 'Savannah' develops vocabulary.</span>
<span class="savannah__start_phar">You will receive experience points.</span>
<button class="savannah__start_button" id="start_btn" onclick="this.blur();">Start</button>
</div> */
