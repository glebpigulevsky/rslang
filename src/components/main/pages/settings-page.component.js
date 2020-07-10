import settingsPage from '../components/settingsPage/settingsPage';

export const settingsPageComponent = {
  init: settingsPage.init,
  render: () => `
    <div class="settings">

      <div class="settings_raw">
        <div class="raw__container">
          <div class="raw__container-descr">Words number per day</div>
          <div class="raw__container-input">
            <input type="text" class="input-words__day">
          </div>
        </div>
      </div>

      <div class="settings_raw">
        <div class="raw__container">
          <div class="raw__container-descr">Cards number per day</div>
          <div class="raw__container-input">
            <input type="text" class="input-cards__day">
          </div>
        </div>
      </div>

      <div class="settings_raw">
        <div class="raw__container">
          <div class="raw__container-descr">Show translation</div>
          <div class="raw__container-input">
            <div class="switch-btn" id="isTranslation">
            </div>
          </div>
        </div>
      </div>

      <div class="settings_raw">
        <div class="raw__container">
          <div class="raw__container-descr">Show transcription</div>
          <div class="raw__container-input">
          <div class="switch-btn" id="isTranscription"></div>
          </div>
        </div>
      </div>

      <div class="settings_raw">
        <div class="raw__container">
          <div class="raw__container-descr">Show picture</div>
          <div class="raw__container-input">
            <div class="switch-btn" id="isPicture"></div>
          </div>
        </div>
      </div>

      <div class="settings_raw">
        <div class="raw__container">
          <div class="raw__container-descr">Meaning explaining sentence</div>
          <div class="raw__container-input">
            <div class="switch-btn" id="isAddSentExplWord"></div>
          </div>
        </div>
      </div>

      <div class="settings_raw">
        <div class="raw__container">
          <div class="raw__container-descr">Add button "Show answer"</div>
          <div class="raw__container-input">
            <div class="switch-btn" id="isShowAnswerButton"></div>
          </div>
        </div>
      </div>

      <div class="settings_raw">
        <div class="raw__container">
          <div class="raw__container-descr">Add button "Move to difficult"</div>
          <div class="raw__container-input">
            <div class="switch-btn" id="isShowDiffMoveButton"></div>
          </div>
        </div>
      </div>

      <div class="settings_raw">
        <div class="raw__container">
          <div class="raw__container-descr">Add button "Delete"</div>
          <div class="raw__container-input">
            <div class="switch-btn" id="isShowDeleteButton"></div>
          </div>
        </div>
      </div>

      <div class="settings_raw">
        <div class="raw__container">
          <div class="raw__container-descr">Add button "Again"</div>
          <div class="raw__container-input">
            <div class="switch-btn" id="isShowAgainButton"></div>
          </div>
        </div>
      </div>

      <div class="settings_raw">
        <div class="raw__container">
          <div class="raw__container-descr">Add button "Difficult"</div>
          <div class="raw__container-input">
            <div class="switch-btn" id="isShowDiffButton"></div>
          </div>
        </div>
      </div>

      <div class="settings_raw">
        <div class="raw__container">
          <div class="raw__container-descr">Add button "Good"</div>
          <div class="raw__container-input">
            <div class="switch-btn" id="isShowGoodButton"></div>
          </div>
        </div>
      </div>

      <div class="settings_raw">
        <div class="raw__container">
          <div class="raw__container-descr">Add button "Easy"</div>
          <div class="raw__container-input">
            <div class="switch-btn" id="isShowEasyButton"></div>
          </div>
        </div>
      </div>

      <div class="settings_raw no-border">
        <div class="raw__container">
          <div class="raw__container-descr">Listen audio answer</div>
          <div class="raw__container-input">
            <div class="switch-btn" id="isAudio"></div>
          </div>
        </div>
      </div>

    </div>

    <div class="save__settings">save</div>
  `,
};
