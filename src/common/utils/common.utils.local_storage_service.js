class LocalStorageService {
  constructor() {
    this.keyUserInfo = 'userInfo';
  }

  setUserInfo({ userId, token, expiredTime }) {
    this.setLocalStorageData(this.keyUserInfo, { userId, token, expiredTime });
    return this.getUserInfo();
  }

  getUserInfo() {
    return this.getFromLocalStorage(this.keyUserInfo);
  }

  _setLocalStorageData(key, value) { localStorage.setItem(key, JSON.stringify(value)); }

  _getFromLocalStorage(key) {
    return (localStorage.getItem(key)) ? JSON.parse(localStorage.getItem(key)) : null;
  }

  _deleteFromLocalStorage(key) {
    localStorage.removeItem(key);
  }
}

export {
  LocalStorageService,
};
