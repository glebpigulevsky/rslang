class LocalStorageService {
  constructor() {
    this._keyUserInfo = 'userInfo';
  }

  setUserInfo({ userId, token, expiredTime }) {
    this._setLocalStorageData(this._keyUserInfo, { userId, token, expiredTime });
    return this.getUserInfo();
  }

  getUserInfo() {
    const res = this._getFromLocalStorage(this._keyUserInfo);
    return this._transformUserInfo(res);
  }

  _setLocalStorageData(key, value) { localStorage.setItem(key, JSON.stringify(value)); }

  _getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  _deleteFromLocalStorage(key) {
    localStorage.removeItem(key);
  }

  _transformUserInfo({ userId, token, expiredTime }) {
    return { userId, token, expiredTime };
  }
}

export {
  LocalStorageService,
};
