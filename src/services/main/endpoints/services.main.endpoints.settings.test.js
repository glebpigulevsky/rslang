/* eslint-disable no-undef */
import 'isomorphic-fetch';
import SettingsApi from './services.main.endpoints.settings';
import UsersApi from './services.main.endpoints.users';
import { MAIN_API_URL, ERRORS_DESCRIPTION } from '../../common/services.common.constants';
import ApiService from '../../common/services.common.api_service';

const settings = new SettingsApi();
const user = new UsersApi();

describe('get settings if settings was not updated early', () => {
  const userDefault = {
    email: 'jest_settings_one@mail.com',
    password: '12345678Aa@',
  };
  it('should return correct object', async () => {
    const auth = await user.authenticateUser({
      email: userDefault.email,
      password: userDefault.password,
    });
    settings._apiService = new ApiService(MAIN_API_URL);
    const res = await settings.getSettings({ userId: auth.userId, token: auth.token });
    expect(res).toBeDefined();
    expect(res).toBe(null);
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
    settings._apiService = new ApiService(MAIN_API_URL);
    const res = await settings.getSettings({ userId: userDefault.id, token: auth.token });
    expect(res).toBeDefined();
    expect(res).toMatchObject({
      // id: '5e9f5ee35eb9e72bc21af4b4', recordId is created with different value in data base
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
    settings._apiService = new ApiService(MAIN_API_URL);
    const res = await settings.updateSettings({ wordsPerDay: 1 }, { userId: userDefault.id, token: auth.token });
    expect(res).toMatchObject({
      // id: '5e9f5ee35eb9e72bc21af4b4', recordId is created with different value in data base
      wordsPerDay: 1,
    });
  });
});
