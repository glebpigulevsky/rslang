import { TOKEN_LIFETIME_MS, LOCALSTORAGE_USER_INFO_KEY } from './common.utils.constants';

class LocalStorageService {
  setUserInfo({ userId, token }) {
    const tokenExpiredMs = (Date.now() + TOKEN_LIFETIME_MS);
    this.setLocalStorageData(
      LOCALSTORAGE_USER_INFO_KEY,
      { userId, token, expiredTime: tokenExpiredMs },
    );
  }

  getUserInfo() {
    return this.getFromLocalStorage(LOCALSTORAGE_USER_INFO_KEY);
  }

  setLocalStorageData(key, value) { localStorage.setItem(key, JSON.stringify(value)); }

  getFromLocalStorage(key) {
    return (localStorage.getItem(key)) ? JSON.parse(localStorage.getItem(key)) : null;
  }
}

export {
  LocalStorageService,
};
