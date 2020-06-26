import { LocalStorageService } from '../../common/utils/common.utils.local_storage_service';
import { ERRORS_DESCRIPTION } from './services.common.constants';

class ApiError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ApiError';
  }
}

const errorTokenEvent = new Event(ERRORS_DESCRIPTION.ERROR_TOKEN, { bubbles: true });

const checkUserInfo = () => {
  try {
    const storage = new LocalStorageService();
    const userInfo = storage.getUserInfo();
    if (!userInfo) {
      console.info('no userInfo in LocalStorage');
      throw new Error();
    }
    const { userId, token, expiredTime } = userInfo;
    const now = Date.now();
    if (expiredTime < now) {
      console.info(`expiredTimeUTC${new Date(expiredTime).toUTCString()}, nowUTC${new Date(now).toUTCString()}`);
      throw new Error();
    }
    return { userId, token };
  } catch (e) {
    document.dispatchEvent(errorTokenEvent);
    throw new Error(ERRORS_DESCRIPTION.ERROR_TOKEN);
  }
};

export { ApiError, checkUserInfo, errorTokenEvent };
