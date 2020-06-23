import { LocalStorageService } from '../../common/utils/common.utils.local_storage_service';

class ApiError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ApiError';
  }
}

const GET_TOKEN = () => {
  const storage = new LocalStorageService();
  const userInfo = storage.getUserInfo();
  if (userInfo) {
    return userInfo.token;
  } else {
    throw new Error('');
  }
};

export { ApiError, GET_TOKEN };
