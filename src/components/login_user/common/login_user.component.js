const getLoginComponent = () => `<div class="login__container" id="js-login-container">
    <div>

      <form class="login">
      <span class="login__close" id="js-loginCloseBtn">×</span>
          <div class="login__title mb-3">Welcome</div>
          <div class="login__title_switch">
            <span class="login__mode login__mode_selected mb-3" id="js-switchLabelSignIn">Sign In</span>
            
            <label class="switch">
              <input type="checkbox" id="js-trainSwitch">
              <span class="slider round"></span>
            </label>

            <span class="login__mode  mb-3" id="js-switchLabelSignUp">Sign Up</span>
          </div>
          <div>
            <input type="email" id="js-inputEmail" class="login__input form-control" placeholder="EMAIL"  autocomplete="off">
          </div>
          <div>
            <input type="password" id="js-inputPassword" class="login__input form-control" placeholder="PASSWORD" autocomplete="off">
          </div>
          <button class="login__send mb-3" type="submit" id="js-loginCreateBtn" disabled>Sign In</button>
          <div id="js-loginCreateInfo" class="login__info mb-3"></div>   
        </form>      
      
        </div>
        
  </div>`;

export { getLoginComponent };
