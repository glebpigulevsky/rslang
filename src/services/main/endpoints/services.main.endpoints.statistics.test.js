/* eslint-disable no-undef */
import 'isomorphic-fetch';
import StatisticsApi from './services.main.endpoints.statistics';
import UsersApi from './services.main.endpoints.users';
import { MAIN_API_URL } from '../../common/services.common.constants';
import ApiService from '../../common/services.common.api_service';

const statistics = new StatisticsApi();
const user = new UsersApi();

describe('get statistics if statistics was not updated early', () => {
  const userDefault = {
    email: 'jest_statistics_one@mail.com',
    password: '12345678Aa@',
    id: '5ee8c9df12daba0017bdc9c9',
  };
  it('should return error', async () => {
    try {
      const auth = await user.authenticateUser({
        email: userDefault.email,
        password: userDefault.password,
      });
      statistics.apiService = new ApiService(MAIN_API_URL, auth.token);
      await statistics.getStatictics({ userId: userDefault.id });
    } catch (e) {
      expect(e.message).toEqual('404: Not Found');
    }
  });
});

describe('get statistics', () => {
  const userDefault = {
    email: 'jest_statistics_two@mail.com',
    password: '12345678Aa@',
    id: '5ee8cca112daba0017bdc9d2',
  };
  it('should return correct object', async () => {
    const auth = await user.authenticateUser({
      email: userDefault.email,
      password: userDefault.password,
    });
    statistics.apiService = new ApiService(MAIN_API_URL, auth.token);
    const res = await statistics.getStatictics({ userId: userDefault.id });
    expect(res).toBeDefined();
    expect(res).toMatchObject({
      // id: '5e9f5ee35eb9e72bc21af4b4', recordId is created with different value in data base
      learnedWords: 0,
      optional: {
        score: '100',
      },
    });
  });
});

describe('update settings', () => {
  const userDefault = {
    email: 'jest_statistics_three@mail.com',
    password: '12345678Aa@',
    id: '5ee8d2ea12daba0017bdc9e6',
  };
  it('should return correct object', async () => {
    const auth = await user.authenticateUser({
      email: userDefault.email,
      password: userDefault.password,
    });
    statistics.apiService = new ApiService(MAIN_API_URL, auth.token);
    const res = await statistics.updateStatistics({ userId: userDefault.id, learnedWords: 1, optional: { score: '100', langs: 'en' } });
    expect(res).toMatchObject({
      // id: '5e9f5ee35eb9e72bc21af4b4', recordId is created with different value in data base
      learnedWords: 1,
      optional: {
        score: '100',
        langs: 'en',
      },
    });
  });
});
