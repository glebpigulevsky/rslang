const LOGIN_BUTTONS_NAME = { SignIn: 'Sign In', SignUp: 'Sign Up' };
const LOGIN_BUTTONS_COLOR_CLASS = 'login__mode_selected';
const PASSWORD_VALIDATION_MSG =
  'Password must contain as many as 8 characters including lower-case, upper-case, numeric characters and at least one special character: +-_@$!%*?&#.,;:[]{}';
const EMAIL_VALIDATION_MSG = 'Email address has the wrong format';
const PASSWORD_REG_EXP = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$&*+-?,.;:{}%])(?=.{8,})');
const EMAIL_REG_EXP = new RegExp('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$');

export {
  LOGIN_BUTTONS_NAME,
  LOGIN_BUTTONS_COLOR_CLASS,
  PASSWORD_VALIDATION_MSG,
  PASSWORD_REG_EXP,
  EMAIL_REG_EXP,
  EMAIL_VALIDATION_MSG,
};
