class LocalStorageService {
  constructor() {
    this.keyUserInfo = 'userInfo';
  }

  setUserInfo({ userId, token, expiredTime }) {
    this._setLocalStorageData(this.keyUserInfo, { userId, token, expiredTime });
    return this.getUserInfo();
  }

  getUserInfo() {
    return this._getFromLocalStorage(this.keyUserInfo);
  }

  _setLocalStorageData(key, value) { localStorage.setItem(key, JSON.stringify(value)); }

  _getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  _deleteFromLocalStorage(key) {
    localStorage.removeItem(key);
  }
}

export {
  LocalStorageService,
};
