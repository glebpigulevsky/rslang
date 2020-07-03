import savannahApp from '../../savannah/savannah.app';

export const savannahComponent = {
  init: savannahApp,
  render: () => `
<div class="savannah__container" id="js-savannah-container">
    <div>
      <div>on/off sound<div> 
      <div><span>+</span><span>+</span><span>+</span><span>+</span><span>+</span></div>
      <div>word</div>
      <div><span>слово</span><span>предложение</span><span>заголовок</span><span>парараф</span></div>
      <div class="savannah__end">end</div>
    </div>
</div> `,
};

/* <div class "savannah__start" id="js-start_block disabled">
<span class="savannah__start_title">savannah</span>
<span class="savannah__start_phar">Coaching 'Savannah' develops vocabulary.</span>
<span class="savannah__start_phar">You will receive experience points.</span>
<button class="savannah__start_button" id="start_btn" onclick="this.blur();">Start</button>
</div> */
