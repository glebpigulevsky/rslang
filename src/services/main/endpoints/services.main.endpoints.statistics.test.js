/* eslint-disable no-undef */
import 'isomorphic-fetch';
import StatisticsApi from './services.main.endpoints.statistics';
import UsersApi from './services.main.endpoints.users';
import { MAIN_API_URL, ERRORS_DESCRIPTION } from '../../common/services.common.constants';
import ApiService from '../../common/services.common.api_service';

const statistics = new StatisticsApi();
const user = new UsersApi();

describe('get statistics if statistics was not updated early', () => {
  const userDefault = {
    email: 'jest_statistics_one@mail.com',
    password: '12345678Aa@',
  };
  it('should return correct object', async () => {
    const auth = await user.authenticateUser({
      email: userDefault.email,
      password: userDefault.password,
    });
    statistics._apiService = new ApiService(MAIN_API_URL);
    const res = await statistics.getStatictics({ userId: auth.userId, token: auth.token });
    expect(res).toBeDefined();
    expect(res).toBe(null);
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
    statistics._apiService = new ApiService(MAIN_API_URL);
    const res = await statistics.getStatictics({ userId: userDefault.id, token: auth.token });
    expect(res).toBeDefined();
    expect(res).toMatchObject({
      id: expect.any(String),
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
    statistics._apiService = new ApiService(MAIN_API_URL);
    const res = await statistics.updateStatistics(
      {
        learnedWords: 1,
        optional: { score: '100', langs: 'en' },
      },
      { userId: auth.userId, token: auth.token },
    );
    expect(res).toMatchObject({
      id: expect.any(String),
      learnedWords: 1,
      optional: {
        score: '100',
        langs: 'en',
      },
    });
  });
});
