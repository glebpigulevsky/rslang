/* eslint-disable no-undef */
import 'isomorphic-fetch';
import SettingsApi from './services.main.endpoints.settings';
import User from './services.main.endpoints.users';
import { MAIN_API_URL } from '../../common/services.common.constants';
import ApiService from '../../common/services.common.api_service';

const settings = new SettingsApi();
const user = new User();

const userDefault = {
  email: 'rslang_jest_test@mail.com',
  password: '12345678Aa@',
  id: '5ee7783b439c470017c4e564',
};

describe('get settings', () => {
  it('should return correct object', async () => {
    const auth = await user.authenticateUser({
      email: userDefault.email,
      password: userDefault.password,
    });
    settings.apiService = new ApiService(MAIN_API_URL, auth.token);
    const res = await settings.getSettings({ userId: userDefault.id });
    expect(res).toBeDefined();
    expect(res.id).toBe('5ee78722f566156e20396206');
    expect(res.optional).toBe(null);
    expect(res.wordsPerDay).toBe(1);
  });
});
