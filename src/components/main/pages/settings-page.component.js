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
              <div class="raw__container-descr">Number of the new words per day</div>
              <div class="raw__container-input">
                <div class="switch-btn switch-on"></div>
              </div>
            </div>
          </div>

          <div class="settings_raw">
            <div class="raw__container">
              <div class="raw__container-descr">Number of the new words per day</div>
              <div class="raw__container-input">
              <div class="switch-btn"></div>
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

  init() {
    settings.init();
  },
};
