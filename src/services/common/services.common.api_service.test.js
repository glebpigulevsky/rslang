/* eslint-disable no-undef */
import 'isomorphic-fetch';
import ApiService from './services.common.api_service';
import { ERRORS_DESCRIPTION } from './services.common.constants';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZTRmODI3MmU2ZjgxMDAxNzI5NjNiNyIsImlhdCI6MTU5MjA2NDExMiwiZXhwIjoxNTkyMDc4NTEyfQ.cRDXnE67EZnYor03vrBhPDVMbzXf8YPBVWQQ4qc1SzY';
const service = new ApiService('https://reqbin.com/sample', token);

describe('get request any site with token', () => {
  it('should return correct response', async () => {
    const res = await service.getResource({ url: '/get/json', hasToken: true });
    expect(res).toBeDefined();
    expect(res.success).toBe('true');
  });
});

describe('get request any site', () => {
  it('should return error', async () => {
    try {
      await service.getResource({ url: '/get/error', hasToken: true });
    } catch (e) {
      expect(e.message).toEqual('404: Not Found');
    }
  });
});

describe('post request any site with token', () => {
  it('should return correct response', async () => {
    const res = await service.postResourse({
      url: '/post/json',
      params: { login: 'login', password: 'password' },
      hasToken: true,
    });
    expect(res).toBeDefined();
    expect(res.success).toBe('true');
  });
});

describe('post request any site', () => {
  it('should return error', async () => {
    try {
      await service.postResourse({ url: '/post/error', hasToken: true });
    } catch (e) {
      expect(e.message).toEqual(ERRORS_DESCRIPTION[404]);
    }
  });
});

describe('put request any site with token', () => {
  it('should return correct response', async () => {
    const res = await service.putResourse({
      url: '/put/json',
      params: { login: 'login2', password: 'password' },
      hasToken: true,
    });
    expect(res).toBeDefined();
    expect(res.success).toBe('true');
  });
});

describe('put request any site', () => {
  it('should return error', async () => {
    try {
      await service.putResourse({ url: '/put/error', hasToken: true });
    } catch (e) {
      expect(e.message).toEqual(ERRORS_DESCRIPTION[404]);
    }
  });
});

describe('delete request any site with token', () => {
  it('should return correct response', async () => {
    const res = await service.deleteResourse({ url: '/delete/json', hasToken: true });
    expect(res).toBeDefined();
    expect(res).toBe(true);
  });
});

describe('delete request any site', () => {
  it('should return error', async () => {
    try {
      await service.deleteResourse({ url: '/delete/error', hasToken: true });
    } catch (e) {
      expect(e.message).toEqual(ERRORS_DESCRIPTION[404]);
    }
  });
});
