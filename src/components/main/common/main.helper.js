import { AuthenticateUserService, LocalStorageService } from '../../../common/common.helper';

const auth = new AuthenticateUserService();
const localStorage = new LocalStorageService();

const logoutUser = () => {
  localStorage.deleteUserInfo();
  document.querySelector('.main-header__navigation').style.removeProperty('display');
  document.querySelector('.main-header__logout').style.removeProperty('display');
  if (window.location.hash !== '') {
    window.location.replace(`${window.location.origin}${window.location.pathname}#`);
  }
  console.info('logout');
};

const hasAccessUser = () => {
  if (auth.checkUserAccess()) {
    console.info('userHasAccess');
    if (document.querySelector('.main-header__navigation').style.display !== 'flex') {
      document.querySelector('.main-header__navigation').style.display = 'flex';
    }
    if (document.querySelector('.main-header__logout').style.display !== 'block') {
      document.querySelector('.main-header__logout').style.display = 'block';
    }
    return true;
  }
  logoutUser();
  return false;
};

export { hasAccessUser, logoutUser };
