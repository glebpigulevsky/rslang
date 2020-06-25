import introMainGame from '../components/introMainGame/introMainGame';

export const learnPageComponent = {
  render: () => `
  
  <div class="main__game-start">
    <div class="main__game-start__description">"English words" game.<br><span>Based on russian</span></div>
    <button class="main__game-start__button">Start lesson</button>
  </div>

  <div class="main__game-level">
    <div class="">Выберите свой уровень для тренировки:</div>
    
    <datalist id="levellist">
      <option value="0" label="A0">
      <option value="1" label="A1">
      <option value="2" label="A2">
      <option value="3" label="B1">
      <option value="4" label="B2">
      <option value="5" label="C1">
   </datalist>
    <input id="englishlevel" type="range" min="0" max="5" step="1" list="levellist">
    
    </div>
  </div>

  <div class="main__game-stat">
    <div class="main__game-stat__today">Today</div>
    <div class="main__game-stat__week">Weekly progress</div>
  </div>

  <template id="template-main__game">
    <div class="card-container">
      <div class="navigate prev hidden"></div>

      <div class="card">
        <div class="card-header">
          <div class="card-header__block">
            <div class="card-header__move-diff">
              
            </div>
            <div class="card-header__delete-word">
              
            </div>
            <div class="card-header__again-word">
              
            </div>
          </div>

          <div class="card-header__block">
            <div class="card-header__diff-diff">
              
            </div>
            <div class="card-header__diff-good">
              
            </div>
            <div class="card-header__diff-easy">
              
            </div>
          </div>
        </div>
        <div class="card-main">
          <div class="learn-content">
            <div class="learn-content__container">
              
            </div>
          </div>

          <div class="learn-content__translation">
            
          </div>
          <div class="learn-content__meaning">

          </div>
        </div>
        <div class="card-footer">
            <div class="card-footer__answer-button">
              
            </div>
        </div>
      </div>

      <div class="navigate next"></div>

    </div>
    <div class="card-helper">
      <div class="translate"></div>
      <div class="text-example">
      </div>
      <div class="transcription">
      </div>
      <div class="card-image">

      </div>
    </div>
 </template>

    `,
  init: () => {
    introMainGame.init();
  },
};
