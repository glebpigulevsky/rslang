import { AuthenticateUserService, LocalStorageService } from '../../../common/common.helper';
import { mainHeaderLogout } from '../components/main_header_logout';

const auth = new AuthenticateUserService();
const localStorage = new LocalStorageService();

const logoutUser = () => {
  localStorage.deleteUserInfo();
  document.querySelector('.main-header__navigation').style.removeProperty('display');
  let mainHeaderLogoutNode = document.querySelector('.main-header__logout');
  if (mainHeaderLogoutNode) {
    mainHeaderLogoutNode.parentNode.removeChild(mainHeaderLogoutNode);
    mainHeaderLogoutNode = null;
  }
  if (window.location.hash !== '') {
    window.location.replace(`${window.location.origin}${window.location.pathname}#`);
  }
  console.info('logout');
};

const hasAccessUser = () => {
  if (auth.checkUserAccess()) {
    console.info('userHasAccess');
    const wrapperNode = document.querySelector('.wrapper');
    const mainHeaderLogoutNode = document.querySelector('.main-header__logout');
    if (document.querySelector('.main-header__navigation').style.display !== 'flex') {
      document.querySelector('.main-header__navigation').style.display = 'flex';
    }
    if (!mainHeaderLogoutNode) {
      wrapperNode.insertAdjacentHTML('beforeend', mainHeaderLogout.render());
      document.querySelector('.main-header__logout').addEventListener('click', logoutUser);
    }
    return true;
  }
  logoutUser();
  return false;
};

export { hasAccessUser, logoutUser };
