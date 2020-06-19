class LocalStorageService {
  setUserInfo({ userId, token }) {
    setLocalStorageData('userInfo', { userId, token, expiredTime: TOKEN_EXPIRED_MS });
  }

  getUserInfo() {
    if (localStorage.getItem('userId')) {
      return getFromLocalStorage('userId');
    }
    return null;
  }

  setLocalStorageData(key, value) { localStorage.setItem(key, JSON.stringify(value)); }

  getFromLocalStorage(key) { return JSON.parse(localStorage.getItem(key)); }

  TOKEN_LIFETIME_MS() { return (Date.now() + (3 * 60 * 60 * 1000)); } // Token lifetime in milliseconds, default 3 hours.

  TOKEN_EXPIRED_MS() { return (Date.now() + TOKEN_LIFETIME_MS); } // Timestamp when token will expired, milliseconds.
}

export {
  LocalStorageService,
};
