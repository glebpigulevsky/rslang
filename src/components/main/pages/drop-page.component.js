import dropApp from '../../drop/drop.app';

export const dropComponent = {
  init: dropApp,
  render: () => `
      <div class="body__game-drop overflow-hidden">
        <div div class = "drop-game__wrapper display-none" >
            <div class="navigation">
                <div class="navigation__box navigation__box_left">
                    <span class="navigation__description level__description">Level:</span>
                    <select id="level" class="navigation__level selector" name="select">
                        <option value="0">1</option>
                        <option value="1">2</option>
                        <option value="2">3</option>
                        <option value="3">4</option>
                        <option value="4">5</option>
                        <option value="5">6</option>
                    </select>
                </div>
                <div class="navigation__box navigation__box_right">
                    <span class="navigation__description round__description">Round:</span>
                     <select id="round" class = "navigation__level selector" name="select">
                        <option value="0">1</option>
                        <option value="1">2</option>
                        <option value="2">3</option>
                        <option value="3">4</option>
                        <option value="4">5</option>
                        <option value="5">6</option>
                        <option value="6">7</option>
                        <option value="7">8</option>
                        <option value="8">9</option>
                        <option value="9">10</option>
                        <option value="10">11</option>
                        <option value="11">12</option>
                        <option value="12">13</option>
                        <option value="13">14</option>
                        <option value="14">15</option>
                        <option value="15">16</option>
                        <option value="16">17</option>
                        <option value="17">18</option>
                        <option value="18">19</option>
                        <option value="19">20</option>
                        <option value="20">21</option>
                        <option value="21">22</option>
                        <option value="22">23</option>
                        <option value="23">24</option>
                        <option value="24">25</option>
                        <option value="25">26</option>
                        <option value="26">27</option>
                        <option value="27">28</option>
                        <option value="28">29</option>
                        <option value="29">30</option>
                    </select>
                </div>
            </div>
            <div class="drop-navigation__btn">
                <button class="drop__new drop-buttons">New Game</button>
                <button class="drop__statistics drop-buttons">Statistics</button>
                <button class="drop__instruction drop-buttons">Instruction</button>
            </div>
            <div class="drop-game__container">
              <div class = "drop__words">
                <div class="words__item">word</div>
                <div class="words__item">word</div>
                <div class="words__item">word</div>
                <div class="words__item">word</div>
                <div class="words__item">word</div>
                <div class="words__item">word</div>
                <div class="words__item">word</div>
                <div class="words__item">word</div>
                <div class="words__item">word</div>
                <div class="words__item">word</div>
                <div class="words__item">word</div>
                <div class="words__item">word</div>
              </div>
              <div class = "drop__descr"> <p> Drag and Drop <br> images<br> 
                according to the words</p>
              </div>
              <div class = "drop__img">
                <div class="img__item">img</div>
                <div class="img__item">img</div>
                <div class="img__item">img</div>
                <div class="img__item">img</div>
                <div class="img__item">img</div>
                <div class="img__item">img</div>
                <div class="img__item">img</div>
                <div class="img__item">img</div>
                <div class="img__item">img</div>
                <div class="img__item">img</div>
                <div class="img__item">img</div>
                <div class="img__item">img</div>
              </div>
            </div>
          <div class="statistics display-none">
            <div class="result__container">
                <div class="button__controller-result">
                    <button id="new" class="button-result__new sprint-button">New Game</button>
                    <button class="button-result__statistics sprint-button">Statistics</button>
                </div>
                <div class="result-correct"></div>
                <div class="result-errors"></div>
            </div>
            </div>
        </div>
        <div class="preview-drop">
            <div class="preview-drop__wrapper">
                <div class="preview-drop__descr">
                    <h1 class="preview-drop__title">Mini-game "Drop"</h1>
                    <p class = "preview-drop__content">This is a 100% visual game <br> You use images to link them to content</p>
                    <button class="preview-drop__btn">start</button>
                </div>
            </div>
        </div> 
</div>`,
};
