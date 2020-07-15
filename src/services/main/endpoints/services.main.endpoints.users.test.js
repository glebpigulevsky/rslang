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
    email: 'jest_user_five@mail.com',
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
      id: expect.any(String),
    });
    const auth = await user.authenticateUser({
      email: userDefault.email,
      password: userDefault.password,
    });
    const dEnd = await user.deleteUser({ userId: auth.userId, token: auth.token });
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

    const res = await user.getUser({ userId: userDefault.id, token: auth.token });
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
    const newEmail = `jest_user_threeTEST@mail.com`;
    const res = await user.updateUser(
      {
        email: newEmail,
        password: userDefault.password,
      },
      { userId: auth.userId, token: auth.token },
    );
    expect(res).toBeDefined();
    expect(res).toMatchObject({
      id: expect.any(String),
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
    try {
      const auth = await user.authenticateUser({
        email: userDefault.email,
        password: userDefault.password,
      });
      const dStart = await user.deleteUser({ userId: auth.userId, token: auth.token });
    } catch (e) {
      const created = await user.createUser({ email: userDefault.email, password: userDefault.password });
    }
    const auth = await user.authenticateUser({
      email: userDefault.email,
      password: userDefault.password,
    });
    const res = await user.deleteUser({ userId: auth.userId, token: auth.token });
    expect(res).toBeDefined();
    expect(res).toMatchObject({
      isDeleted: true,
    });
  });
});
