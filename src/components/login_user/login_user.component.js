const LoginPopup = `<div class="container" data-container="container-create">
    <div>
      <form class="login">
          <div class="login__title mb-3">Welcome</div>
          <div>
            <span class="login__mode mb-3">Sign Up</span>
            <div class=" custom-control custom-switch mb-3">
              <input type="checkbox" class="custom-control-input" id="trainSwitch" onclick="this.blur();"> 
              <label class="custom-control-label trainSwitch" for="trainSwitch"></label>
            </div>
          </div>
          <div>
          <label for="inputEmail" class="login__label sr-only mb-3">Email address</label>
          <input type="email" id="inputEmail" class="login__input form-control mb-3" placeholder="E-MAIL" required="" autofocus="" autocomplete="off" style="background-image: url(&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAYAAABSO15qAAAAAXNSR0IArs4c6QAAAPhJREFUOBHlU70KgzAQPlMhEvoQTg6OPoOjT+JWOnRqkUKHgqWP4OQbOPokTk6OTkVULNSLVc62oJmbIdzd95NcuGjX2/3YVI/Ts+t0WLE2ut5xsQ0O+90F6UxFjAI8qNcEGONia08e6MNONYwCS7EQAizLmtGUDEzTBNd1fxsYhjEBnHPQNG3KKTYV34F8ec/zwHEciOMYyrIE3/ehKAqIoggo9inGXKmFXwbyBkmSQJqmUNe15IRhCG3byphitm1/eUzDM4qR0TTNjEixGdAnSi3keS5vSk2UDKqqgizLqB4YzvassiKhGtZ/jDMtLOnHz7TE+yf8BaDZXA509yeBAAAAAElFTkSuQmCC&quot;); background-repeat: no-repeat; background-attachment: scroll; background-size: 16px 18px; background-position: 98% 50%; cursor: auto;">
          </div>
          <div>
          <label for="inputPassword" class="login__label sr-only mb-3">Password</label>
          <input type="password" id="inputPassword" class="login__input form-control mb-3" placeholder="YOUR PASSWORD" required="" autocomplete="off" style="background-image: url(&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAYAAABSO15qAAAAAXNSR0IArs4c6QAAAPhJREFUOBHlU70KgzAQPlMhEvoQTg6OPoOjT+JWOnRqkUKHgqWP4OQbOPokTk6OTkVULNSLVc62oJmbIdzd95NcuGjX2/3YVI/Ts+t0WLE2ut5xsQ0O+90F6UxFjAI8qNcEGONia08e6MNONYwCS7EQAizLmtGUDEzTBNd1fxsYhjEBnHPQNG3KKTYV34F8ec/zwHEciOMYyrIE3/ehKAqIoggo9inGXKmFXwbyBkmSQJqmUNe15IRhCG3byphitm1/eUzDM4qR0TTNjEixGdAnSi3keS5vSk2UDKqqgizLqB4YzvassiKhGtZ/jDMtLOnHz7TE+yf8BaDZXA509yeBAAAAAElFTkSuQmCC&quot;); background-repeat: no-repeat; background-attachment: scroll; background-size: 16px 18px; background-position: 98% 50%; cursor: pointer;">
          </div>
          <button class="login__send mb-3" type="submit" id="create_btn">Sign up</button>
            <div id="create_info" class="login__info mb-3">Oh no!!!vvvvvvvvvvvvvvvvvvvvv</div>   
        </form>      
      
        </div>
        
  </div>`;

export { LoginPopup };
