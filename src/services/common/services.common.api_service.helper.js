import LocalStorageService from '../../common/utils/common.utils.local_storage_service';
import { ERRORS_DESCRIPTION } from './services.common.constants';

class ApiError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ApiError';
  }
}

const GET_USER_DATA = () => {
  const storage = new LocalStorageService();
  const userInfo = storage.getUserInfo();
  if (!userInfo) {
    console.info('no userInfo in LocalStorage');
    throw new Error(ERRORS_DESCRIPTION.ERROR_TOKEN);
  }
  const { userId, token, expiredTime } = userInfo;
  const now = Date.now();
  if (new Date(expiredTime).toUTCString() < now) {
    console.info(`expiredTimeUTC${new Date(expiredTime).toUTCString()}, nowUTC${new Date(now).toUTCString()}`);
    throw new Error(ERRORS_DESCRIPTION.ERROR_TOKEN);
  }
  return { userId, token };
};

export { ApiError, GET_USER_DATA };
