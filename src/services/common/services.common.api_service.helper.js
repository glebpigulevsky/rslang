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
      throw new Error();
    }
    const { userId, token, expiredTime } = userInfo;
    const now = Date.now();
    if (expiredTime < now) {
      throw new Error();
    }
    return { userId, token };
  } catch (e) {
    document.dispatchEvent(errorTokenEvent);
    throw new Error(ERRORS_DESCRIPTION.ERROR_TOKEN);
  }
};

export { ApiError, checkUserInfo, errorTokenEvent };
