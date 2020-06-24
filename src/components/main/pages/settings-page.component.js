import settings from '../components/settings/settings.app';

export const settingsPageComponent = {
  render: () => `
        <div class="settings">

          <div class="settings_raw">
            <div class="raw__container">
              <div class="raw__container-descr">Number of the new words per day</div>
              <div class="raw__container-input">
                <input type="text" class="input-words__day">
              </div>
            </div>
          </div>
          
          <div class="settings_raw">
            <div class="raw__container">
              <div class="raw__container-descr">Number of the new cards per day</div>
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
              <div class="raw__container-descr">Number of the new words per day</div>
              <div class="raw__container-input"></div>
            </div>
          </div>

          <div class="settings_raw">
            <div class="raw__container">
              <div class="raw__container-descr">Number of the new words per day</div>
              <div class="raw__container-input"></div>
            </div>
          </div>

          <div class="settings_raw">
            <div class="raw__container">
              <div class="raw__container-descr">Number of the new words per day</div>
              <div class="raw__container-input"></div>
            </div>
          </div>

          <div class="settings_raw">
            <div class="raw__container">
              <div class="raw__container-descr">Number of the new words per day</div>
              <div class="raw__container-input"></div>
            </div>
          </div>

          <div class="settings_raw">
            <div class="raw__container">
              <div class="raw__container-descr">Number of the new words per day</div>
              <div class="raw__container-input"></div>
            </div>
          </div>

          <div class="settings_raw">
            <div class="raw__container">
              <div class="raw__container-descr">Number of the new words per day</div>
              <div class="raw__container-input"></div>
            </div>
          </div>

          <div class="settings_raw">
            <div class="raw__container">
              <div class="raw__container-descr">Number of the new words per day</div>
              <div class="raw__container-input"></div>
            </div>
          </div>

          <div class="settings_raw">
            <div class="raw__container">
              <div class="raw__container-descr">Number of the new words per day</div>
              <div class="raw__container-input"></div>
            </div>
          </div>

          <div class="settings_raw no-border">
            <div class="raw__container">
              <div class="raw__container-descr">Number of the new words per day</div>
              <div class="raw__container-input"></div>
            </div>
          </div>

        </div>
    `,
};
