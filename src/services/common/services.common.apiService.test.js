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

describe('post request any site with token', () => {
  it('should return correct response', async () => {
    const res = await service.postResourse({ url: '/post/json', params: { login: 'login', password: 'password' }, hasToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZTRmODI3MmU2ZjgxMDAxNzI5NjNiNyIsImlhdCI6MTU5MjA2NDExMiwiZXhwIjoxNTkyMDc4NTEyfQ.cRDXnE67EZnYor03vrBhPDVMbzXf8YPBVWQQ4qc1SzY' });
    expect(res).toBeDefined();
    expect(res.success).toBe('true');
  });
});

describe('put request any site with token', () => {
  it('should return correct response', async () => {
    const res = await service.putResourse({ url: '/put/json', params: { login: 'login2', password: 'password' }, hasToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZTRmODI3MmU2ZjgxMDAxNzI5NjNiNyIsImlhdCI6MTU5MjA2NDExMiwiZXhwIjoxNTkyMDc4NTEyfQ.cRDXnE67EZnYor03vrBhPDVMbzXf8YPBVWQQ4qc1SzY' });
    expect(res).toBeDefined();
    expect(res.success).toBe('true');
  });
});

describe('delete request any site with token', () => {
  it('should return correct response', async () => {
    const res = await service.deleteResourse({ url: '/delete/json', hasToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZTRmODI3MmU2ZjgxMDAxNzI5NjNiNyIsImlhdCI6MTU5MjA2NDExMiwiZXhwIjoxNTkyMDc4NTEyfQ.cRDXnE67EZnYor03vrBhPDVMbzXf8YPBVWQQ4qc1SzY' });
    expect(res).toBeDefined();
    expect(res).toBe(true);
  });
});

/* describe('get request any site', () => {
  it('should return error', async () => {
    try {
      await service.getResource('https://www.omdbapi.com', '/error');
    } catch (e) {
      expect(e.message).toEqual('404');
    }
  });
});

describe('get page imdb', () => {
  it('should return the array of ids', async () => {
    const { ids, totalResReq, page } = await service
      .getPage({ searchBy: 'conan the', curPage: 1 });
    expect(totalResReq).toBeDefined();
    expect(Number(totalResReq)).toBeGreaterThanOrEqual(40);
    expect(ids).toBeInstanceOf(Array);
    expect(ids.length).toEqual(20);
    expect(page).toEqual(2);
  });
}); */
