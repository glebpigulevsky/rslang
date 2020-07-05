import savannahApp from '../../savannah/savannah.app';

export const savannahComponent = {
  init: savannahApp,
  render: () => `
  <div class="savannah__container" id="js-savannah-container">
    <div class="savannah__start" id="js-start_block">
      <span class="savannah__start_title">savannah</span>
      <span class="savannah__start_phar">Coaching 'Savannah' develops vocabulary.</span>
      <span class="savannah__start_phar">You will receive experience points.</span>
      <div class="savannah__start_controls">
        <label for="savannah__level">Level:</label>
        <select id="savannah__level" name="savannah__level">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
        <label for="savannah__round">Round:</label>
        <select id="savannah__round" name="savannah__round">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
        <option value="13">13</option>
        <option value="14">14</option>
        <option value="15">15</option>
        <option value="16">16</option>
        <option value="17">17</option>
        <option value="18">18</option>
        <option value="19">19</option>
        <option value="20">20</option>
        <option value="21">21</option>
        <option value="22">22</option>
        <option value="23">23</option>
        <option value="24">24</option>
        <option value="25">25</option>
        <option value="26">26</option>
        <option value="27">27</option>
        <option value="28">28</option>
        <option value="29">29</option>
        <option value="30">30</option>
      </select>
        <button class="savannah__start_button" id="start_btn" onclick="this.blur();">Start</button>
      </div> 
      <button class="savannah__start_learning" id="start_btn" onclick="this.blur();">Learn my words</button>
    </div>
  </div> `,
};
/* 
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
<div class="savannah__question">word</div>
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
</div> */

