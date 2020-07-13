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
    return res ? this._transformUserInfo(res) : res;
  }

  deleteUserInfo() {
    this._deleteFromLocalStorage(this._keyUserInfo);
  }

  _setLocalStorageData(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  _getFromLocalStorage(key) {
    return JSON.parse(sessionStorage.getItem(key));
  }

  _deleteFromLocalStorage(key) {
    sessionStorage.removeItem(key);
  }

  _transformUserInfo({ userId, token, expiredTime }) {
    return { userId, token, expiredTime };
  }
}

export { LocalStorageService };
