/* eslint-disable no-undef */
import 'isomorphic-fetch';
import UsersApi from './services.main.endpoints.users';
import { MAIN_API_URL } from '../../common/services.common.constants';
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
      password: userDefault.password 
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
    user.apiService.token = auth.token;
    await user.deleteUser({ id: res.id }); 
  });
});

/* describe('get user word', () => {
  const userDefault = {
    email: 'jest_userwords_four@mail.com',
    password: '12345678Aa@',
    id: '5ee8b98912daba0017bdc98e',
  };
  it('should return correct object', async () => {
    const auth = await user.authenticateUser({
      email: userDefault.email,
      password: userDefault.password,
    });
    userWords.apiService = new ApiService(MAIN_API_URL, auth.token);
    const res = await userWords.getUserWord({
      userId: userDefault.id,
      wordId: '5e9f5ee35eb9e72bc21af4b4',
      difficulty: 'weak',
    });
    expect(res).toBeDefined();
    expect(res).toMatchObject({
      id: '5ee8ba5c12daba0017bdc993',
      difficulty: 'easy',
      wordId: '5e9f5ee35eb9e72bc21af4b4',
      optional: {
        score: '100',
      },
    });
  });
});

const getRandom = (min, max) => {
  const x = Math.ceil(min);
  const y = Math.floor(max);
  return Math.floor(Math.random() * (y - x + 1)) + x;
};

describe('update user word', () => {
  const userDefault = {
    email: 'jest_userwords_five@mail.com',
    password: '12345678Aa@',
    id: '5ee8bb8712daba0017bdc996',
  };
  const randomVal = getRandom(1, 10).toString();
  it('should return correct object', async () => {
    const auth = await user.authenticateUser({
      email: userDefault.email,
      password: userDefault.password,
    });
    userWords.apiService = new ApiService(MAIN_API_URL, auth.token);
    const res = await userWords.updateUserWord({
      userId: userDefault.id,
      wordId: '5e9f5ee35eb9e72bc21af4b4',
      difficulty: randomVal,
    });
    expect(res).toBeDefined();
    expect(res).toMatchObject({
      difficulty: randomVal,
      optional: null,
      wordId: '5e9f5ee35eb9e72bc21af4b4',
      // id: '5e9f5ee35eb9e72bc21af4b4', recordId is created with different value in data base
    });
  });
});

describe('delete user word', () => {
  const userDefault = {
    email: 'jest_userwords_six@mail.com',
    password: '12345678Aa@',
    id: '5ee8bfaa12daba0017bdc9ae',
  };
  const wordId = '5e9f5ee35eb9e72bc21af4b4';
  it('should return true', async () => {
    const auth = await user.authenticateUser({
      email: userDefault.email,
      password: userDefault.password,
    });
    userWords.apiService = new ApiService(MAIN_API_URL, auth.token);
    await userWords.createUserWord({ userId: userDefault.id, wordId, difficulty: 'easy' });
    const res = await userWords.deleteUserWord({ userId: userDefault.id, wordId });
    expect(res).toBeDefined();
    expect(res).toMatchObject({
      isDeleted: true,
    });
  });
}); */