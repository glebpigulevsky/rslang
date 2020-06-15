/* eslint-disable no-undef */
import 'isomorphic-fetch';
import SettingsApi from './services.main.endpoints.settings';
import UsersApi from './services.main.endpoints.users';
import { MAIN_API_URL } from '../../common/services.common.constants';
import ApiService from '../../common/services.common.api_service';

const settings = new SettingsApi();
const user = new UsersApi();

describe('get settings if settings did not update early', () => {
  const userDefault = {
    email: 'jest_settings_one@mail.com',
    password: '12345678Aa@',
    id: '5ee79d7d439c470017c4e612',
  };
  it('should return error', async () => {
    try {
      const auth = await user.authenticateUser({
        email: userDefault.email,
        password: userDefault.password,
      });
      settings.apiService = new ApiService(MAIN_API_URL, auth.token);
      await settings.getSettings({ userId: userDefault.id });
    } catch (e) {
      expect(e.message).toEqual('404: Not Found');
    }
  });
});

describe('get settings', () => {
  const userDefault = {
    email: 'jest_settings_two@mail.com',
    password: '12345678Aa@',
    id: '5ee79ff4439c470017c4e62b',
  };
  it('should return correct object', async () => {
    const auth = await user.authenticateUser({
      email: userDefault.email,
      password: userDefault.password,
    });
    settings.apiService = new ApiService(MAIN_API_URL, auth.token);
    const res = await settings.getSettings({ userId: userDefault.id });
    expect(res).toBeDefined();
    expect(res).toStrictEqual({
      id: '5ee7a23df566156e2045962f',
      wordsPerDay: 1,
      optional: null,
    });
  });
});

describe('update settings', () => {
  const userDefault = {
    email: 'jest_settings_three@mail.com',
    password: '12345678Aa@',
    id: '5ee7a3ac439c470017c4e630',
  };
  it('should return correct object', async () => {
    const auth = await user.authenticateUser({
      email: userDefault.email,
      password: userDefault.password,
    });
    settings.apiService = new ApiService(MAIN_API_URL, auth.token);
    const res = await settings.updateSettings({ userId: userDefault.id, wordsPerDay: 100, optional: { score: '1000' } });
    expect(res).toStrictEqual({
      id: '5ee7a763f566156e204a0a1b',
      wordsPerDay: 100,
      optional: { score: '1000' },
    });
  });
});
