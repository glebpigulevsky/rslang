const getLoginComponent = () => `<div class="login__container" id="js-login-container">
    <div>

      <form class="login">
      <span class="login__close" id="js-loginCloseBtn">×</span>
          <div class="login__title login-mb-3">Welcome</div>
          <div class="login__title_switch">
            <span class="login__mode login__mode_selected login-mb-3" id="js-switchLabelSignIn">Sign In</span>
            
            <label class="switch">
              <input type="checkbox" id="js-trainSwitch">
              <span class="slider round"></span>
            </label>

            <span class="login__mode  login-mb-3" id="js-switchLabelSignUp">Sign Up</span>
          </div>
          <div>
            <input type="email" id="js-inputEmail" class="login__input form-control" placeholder="EMAIL" maxlength="30" autocomplete="off">
          </div>
          <div>
            <input type="password" id="js-inputPassword" class="login__input form-control" placeholder="PASSWORD" maxlength="30" autocomplete="off">
          </div>
          <button class="login__send login-mb-3" type="submit" id="js-loginCreateBtn" disabled>Sign In</button>
          <div id="js-loginCreateInfo" class="login__info login-mb-3"></div>   
        </form>      
      
        </div>
        
  </div>`;

export { getLoginComponent };
