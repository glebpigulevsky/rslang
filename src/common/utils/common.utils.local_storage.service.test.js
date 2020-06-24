import 'isomorphic-fetch';
import LocalStorageService from './common.utils.local_storage_service';
import { TOKEN_EXPIRES_MS } from './common.utils.helper';

const service = new LocalStorageService();

describe('set userinfo into local storage', () => {
  it('should set correct data', async () => {
    const userId = '5ee8f65f12daba0017bdca98';
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZTdhM2FjNDM5YzQ3MDAxN2M0ZTYzMCIsImlhdCI6MTU5MjM1MjMwMywiZXhwIjoxNTkyMzY2NzAzfQ.OakuZlZUBRUlZKtvRdvLl5-w7YLSMY2esQCjsPxImcs';
    service.keyUserInfo = `userInfo_TEST`;
    const res = service.setUserInfo({ userId, token, expiredTime: TOKEN_EXPIRES_MS() });
    expect(res).toBeDefined();
    expect(res).toMatchObject({
      userId: userId,
      token: token,
      expiredTime: expect.any(Number),
    });
    localStorage.removeItem(service.keyUserInfo);
  });
});

describe('get userinfo into local storage', () => {
  it('should set correct data', async () => {
    const userId = '5ee8f65f12daba0017bdca98';
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZTdhM2FjNDM5YzQ3MDAxN2M0ZTYzMCIsImlhdCI6MTU5MjM1MjMwMywiZXhwIjoxNTkyMzY2NzAzfQ.OakuZlZUBRUlZKtvRdvLl5-w7YLSMY2esQCjsPxImcs';
    service.keyUserInfo = `userInfo_TEST`;
    service.setUserInfo({ userId, token, expiredTime: TOKEN_EXPIRES_MS() });
    const res = service.getUserInfo();
    expect(res).toBeDefined();
    expect(res).toMatchObject({
      userId: userId,
      token: token,
      expiredTime: expect.any(Number),
    });
    localStorage.removeItem(service.keyUserInfo);
  });
});
