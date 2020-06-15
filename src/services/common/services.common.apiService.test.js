/* eslint-disable no-undef */
import ApiService from './services.common.apiService';
import 'isomorphic-fetch';

const service = new ApiService('https://reqbin.com/sample');

describe('get request any site with token', () => {
  it('should return correct response', async () => {
    const res = await service.getResource({ url: '/get/json', hasToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZTRmODI3MmU2ZjgxMDAxNzI5NjNiNyIsImlhdCI6MTU5MjA2NDExMiwiZXhwIjoxNTkyMDc4NTEyfQ.cRDXnE67EZnYor03vrBhPDVMbzXf8YPBVWQQ4qc1SzY' });
    expect(res).toBeDefined();
    expect(res.success).toBe('true');
  });
});

describe('get request any site', () => {
  it('should return error', async () => {
    try {
      await service.getResource({ url: '/get/error', hasToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZTRmODI3MmU2ZjgxMDAxNzI5NjNiNyIsImlhdCI6MTU5MjA2NDExMiwiZXhwIjoxNTkyMDc4NTEyfQ.cRDXnE67EZnYor03vrBhPDVMbzXf8YPBVWQQ4qc1SzY' });
    } catch (e) {
      expect(e.message).toEqual('404: Not Found');
    }
  });
});

describe('post request any site with token', () => {
  it('should return correct response', async () => {
    const res = await service.postResourse({ url: '/post/json', params: { login: 'login', password: 'password' }, hasToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZTRmODI3MmU2ZjgxMDAxNzI5NjNiNyIsImlhdCI6MTU5MjA2NDExMiwiZXhwIjoxNTkyMDc4NTEyfQ.cRDXnE67EZnYor03vrBhPDVMbzXf8YPBVWQQ4qc1SzY' });
    expect(res).toBeDefined();
    expect(res.success).toBe('true');
  });
});

describe('post request any site', () => {
  it('should return error', async () => {
    try {
      await service.postResourse({ url: '/post/error', hasToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZTRmODI3MmU2ZjgxMDAxNzI5NjNiNyIsImlhdCI6MTU5MjA2NDExMiwiZXhwIjoxNTkyMDc4NTEyfQ.cRDXnE67EZnYor03vrBhPDVMbzXf8YPBVWQQ4qc1SzY' });
    } catch (e) {
      expect(e.message).toEqual('404: Not Found');
    }
  });
});

describe('put request any site with token', () => {
  it('should return correct response', async () => {
    const res = await service.putResourse({ url: '/put/json', params: { login: 'login2', password: 'password' }, hasToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZTRmODI3MmU2ZjgxMDAxNzI5NjNiNyIsImlhdCI6MTU5MjA2NDExMiwiZXhwIjoxNTkyMDc4NTEyfQ.cRDXnE67EZnYor03vrBhPDVMbzXf8YPBVWQQ4qc1SzY' });
    expect(res).toBeDefined();
    expect(res.success).toBe('true');
  });
});

describe('put request any site', () => {
  it('should return error', async () => {
    try {
      await service.putResourse({ url: '/put/error', hasToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZTRmODI3MmU2ZjgxMDAxNzI5NjNiNyIsImlhdCI6MTU5MjA2NDExMiwiZXhwIjoxNTkyMDc4NTEyfQ.cRDXnE67EZnYor03vrBhPDVMbzXf8YPBVWQQ4qc1SzY' });
    } catch (e) {
      expect(e.message).toEqual('404: Not Found');
    }
  });
});

describe('delete request any site with token', () => {
  it('should return correct response', async () => {
    const res = await service.deleteResourse({ url: '/delete/json', hasToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZTRmODI3MmU2ZjgxMDAxNzI5NjNiNyIsImlhdCI6MTU5MjA2NDExMiwiZXhwIjoxNTkyMDc4NTEyfQ.cRDXnE67EZnYor03vrBhPDVMbzXf8YPBVWQQ4qc1SzY' });
    expect(res).toBeDefined();
    expect(res).toBe(true);
  });
});

describe('delete request any site', () => {
  it('should return error', async () => {
    try {
      await service.deleteResourse({ url: '/delete/error', hasToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZTRmODI3MmU2ZjgxMDAxNzI5NjNiNyIsImlhdCI6MTU5MjA2NDExMiwiZXhwIjoxNTkyMDc4NTEyfQ.cRDXnE67EZnYor03vrBhPDVMbzXf8YPBVWQQ4qc1SzY' });
    } catch (e) {
      expect(e.message).toEqual('404: Not Found');
    }
  });
});
