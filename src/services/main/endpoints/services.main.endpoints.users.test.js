/* eslint-disable no-undef */
import 'isomorphic-fetch';
import UsersApi from './services.main.endpoints.users';
import { MAIN_API_URL, GET_RANDOM } from '../../common/services.common.constants';
import ApiService from '../../common/services.common.api_service';

const user = new UsersApi();

/*  If this test is crashed, you need to delete user words with this userId 
(to receive id in Authenticate()) */
describe('create user', () => {
  const userDefault = {
    email: 'jest_user_one@mail.com',
    password: '12345678Aa@',
  };
  it('should return correct object', async () => {
    const res = await user.createUser({
      email: userDefault.email,
      password: userDefault.password,
    });
    expect(res).toBeDefined();
    expect(res).toMatchObject({
      email: userDefault.email,
      //id: '5e9f5ee35eb9e72bc21af4b4', recordId is created with different value in data base
    });
    const auth = await user.authenticateUser({
      email: userDefault.email,
      password: userDefault.password,
    });
    user._apiService.token = auth.token;
    await user.deleteUser({ id: res.id });
  });
});

describe('get user', () => {
  const userDefault = {
    email: 'jest_user_two@mail.com',
    password: '12345678Aa@',
    id: '5ee8f65f12daba0017bdca98',
  };
  it('should return correct object', async () => {
    const auth = await user.authenticateUser({
      email: userDefault.email,
      password: userDefault.password,
    });
    user._apiService.token = auth.token;
    const res = await user.getUser({ id: userDefault.id });
    expect(res).toBeDefined();
    expect(res).toMatchObject({
      id: userDefault.id,
      email: userDefault.email,
    });
  });
});

describe('update user', () => {
  const userDefault = {
    email: 'jest_user_threeTEST@mail.com',
    password: '12345678Aa@',
  };
  it('should return correct object', async () => {
    const auth = await user.authenticateUser({ email: userDefault.email, password: userDefault.password });
    user._apiService.token = auth.token;
    const newEmail = `jest_user_threeTEST@mail.com`;
    const res = await user.updateUser({
      id: auth.userId,
      email: newEmail,
      password: userDefault.password
    });
    expect(res).toBeDefined();
    expect(res).toMatchObject({
      //id: '5e9f5ee35eb9e72bc21af4b4', recordId is created with different value in data base
      email: newEmail,
    });
  });
});

describe('delete user', () => {
  const userDefault = {
    email: 'jest_user_four@mail.com',
    password: '12345678Aa@',
  };
  it('should return true', async () => {
    let auth = null;
    user
      .authenticateUser({
        email: userDefault.email,
        password: userDefault.password,
      })
      .then((res) => {
        auth = res;
      })
      .catch(() => {
        auth = null;
      });
    if (auth === null) {
      await user.createUser({ email: userDefault.email, password: userDefault.password });
      auth = await user.authenticateUser({
        email: userDefault.email,
        password: userDefault.password,
      });
    }
    user._apiService.token = auth.token;
    const res = await user.deleteUser({ id: auth.userId });
    expect(res).toBeDefined();
    expect(res).toMatchObject({
      isDeleted: true,
    });
  });
});
