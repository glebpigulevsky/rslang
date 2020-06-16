/* eslint-disable no-undef */
import 'isomorphic-fetch';
import UserWordsApi from './services.main.endpoints.user_words';
import UsersApi from './services.main.endpoints.users';
import { MAIN_API_URL } from '../../common/services.common.constants';
import ApiService from '../../common/services.common.api_service';

const userWords = new UserWordsApi();
const user = new UsersApi();

describe('get user words if user words did not update early', () => {
  const userDefault = {
    email: 'jest_userwords_one@mail.com',
    password: '12345678Aa@',
    id: '5ee7eca6439c470017c4e705',
  };
  it('should return empty array', async () => {
    const auth = await user.authenticateUser({
      email: userDefault.email,
      password: userDefault.password,
    });
    userWords.apiService = new ApiService(MAIN_API_URL, auth.token);
    const res = await userWords.getAllUserWords({ userId: userDefault.id });
    expect(res).toBeDefined();
    expect(res).toStrictEqual([]);
  });
});

describe('get user words', () => {
  const userDefault = {
    email: 'jest_userwords_two@mail.com',
    password: '12345678Aa@',
    id: '5ee7f098439c470017c4e707',
  };
  it('should return correct array', async () => {
    const auth = await user.authenticateUser({
      email: userDefault.email,
      password: userDefault.password,
    });
    userWords.apiService = new ApiService(MAIN_API_URL, auth.token);
    const res = await userWords.getAllUserWords({ userId: userDefault.id });
    expect(res).toBeDefined();
    expect(res).toMatchObject([
      {
        id: '5ee88bec12daba0017bdc949',
        difficulty: 'weak',
        wordId: '5e9f5ee35eb9e72bc21af4b4'
      },
      {
        id: '5ee88c4c12daba0017bdc94a',
        difficulty: 'difficult',
        optional: {
          score: '100'
        },
        wordId: '5e9f5ee35eb9e72bc21b00a8'
      }
    ]);
  });
});
// If this test is crashed, you need to delete user words with this userId and wordId
describe('create user word', () => {
  const userDefault = {
    email: 'jest_userwords_three@mail.com',
    password: '12345678Aa@',
    id: '5ee7f1d8439c470017c4e708',
  };
  const wordId = '5e9f5ee35eb9e72bc21af4b4';
  it('should return correct object', async () => {
    const auth = await user.authenticateUser({
      email: userDefault.email,
      password: userDefault.password,
    });
    userWords.apiService = new ApiService(MAIN_API_URL, auth.token);
    const res = await userWords.createUserWord({ 
      userId: userDefault.id, 
      wordId,
      difficulty: 'weak', 
    });
    expect(res).toBeDefined();
    expect(res).toMatchObject({
      difficulty: 'weak', 
      optional: null, 
      wordId: '5e9f5ee35eb9e72bc21af4b4',
      //id: '5e9f5ee35eb9e72bc21af4b4', it's recordId, which create with different value in data base
    });
    await userWords.deleteUserWord({ userId: userDefault.id, wordId });
  });
});

describe('get user word', () => {
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
        score: '100'
      }
    });
  });
}); 

const getRandom = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

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
      //id: '5e9f5ee35eb9e72bc21af4b4', it's recordId, which create with different value in data base
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
    const x = await userWords.createUserWord({ userId: userDefault.id, wordId, difficulty: 'easy'});
    const res = await userWords.deleteUserWord({ userId: userDefault.id, wordId });
    expect(res).toBeDefined();
    expect(res).toMatchObject({
      isDeleted: true,
    });
  });
});
