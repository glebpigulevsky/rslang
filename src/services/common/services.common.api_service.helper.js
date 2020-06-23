import { LocalStorageService } from '../../common/utils/common.utils.local_storage_service';
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
    throw new Error(ERRORS_DESCRIPTION.ERROR_TOKEN);
  }
  const { userId, token, expiredTime } = userInfo;
  const now = new Date(Date.now() - (4 * 60 * 60 * 1000)).toUTCString();
  console.log(new Date(now).toUTCString());
  console.log(new Date(expiredTime).toUTCString());
  if (new Date(expiredTime).toUTCString() < now) {
    console.log('less');
    throw new Error(ERRORS_DESCRIPTION.ERROR_TOKEN);
  }
  return { userId, token };
};

export { ApiError, GET_USER_DATA };
