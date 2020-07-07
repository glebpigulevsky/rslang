import sprintApp from '../../sprint/sprint.app';

export const sprintComponent = {
  init: sprintApp,
  render: () => `
      <div class="body__game-sprint overflow-hidden">
        <div class="sprint-game__wrapper display-none">
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
                <button class="btn__my-words">repeat my words</button>
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
            <div class="sprint-game__container">
                <div class="inner__game-sprint">
                    <div id="header" class="game-sprint__header">
                        <div class="game-sprint__score">Score: <span id= "score" class="score__value"></span></div>
                        <div class="game-sprint__timer"></div>
                    </div>
                    <div id="rating" class="game-sprint__rating"></div>
                    <div class="game-sprint__field"></div>
                    <div class="game-sprint__controls">
                        <button type="button" id="false" class="false">wrong</button>
                        <button type="button" id="true" class="true">right</button>
                    </div>
                    <div class="game-sprint__footer">
                    <p class="game-sprint__instruction">You can use the keyboard to control it</p>
                    <img src="https://img.icons8.com/ultraviolet/40/000000/previous.png"/>
                    <img src="https://img.icons8.com/ultraviolet/40/000000/next.png"/>
                    </div>
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
        <div class="spinner display-none">
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
        <div class="preview">
            <div class="preview__wrapper">
                <div class="preview__descr">
                    <h1 class="preview__title">Mini-game "Sprint"</h1>
                    <p class = "preview__content"> Ability to select a round and level <br> Round duration 1 minute </p>
                    <p class = "preview__content"> Game progress: you see a word in English and a translation of the word, <br> you need to specify whether this translation belongs to this word</p>
                    <button class="preview__btn">start</button>
                </div>
            </div>
        </div> 
</div>`,
};
