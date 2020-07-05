import { ERRORS_DESCRIPTION, LINK_TYPE } from './services.common.constants';
import { ApiError, errorTokenEvent } from './services.common.api_service.helper';

export default class ApiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getResource({
    url, hasToken, token = null, type = null,
  }) {
    try {
      const res = await fetch(`${this.baseUrl}${url}`, {
        method: 'GET',
        withCredentials: !!hasToken,
        headers: {
          Authorization: hasToken ? `Bearer ${token}` : null,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        if (res.status === 404 && type === LINK_TYPE.Settings) {
          return LINK_TYPE.Settings[404];
        }
        if (res.status === 404 && type === LINK_TYPE.Statictics) {
          return LINK_TYPE.Statictics[404];
        }
        if (res.status === 404 && type === LINK_TYPE.UserAggregatedWords) {
          return LINK_TYPE.UserAggregatedWords[404];
        }
        await this._checkResponse(res);
      }
      return res.json();
    } catch (e) {
      this.errorHandler(e);
      return null;
    }
  }

  async postResourse({
    url, params, hasToken, token = null, type = null,
  }) {
    try {
      const res = await fetch(`${this.baseUrl}${url}`, {
        method: 'POST',
        withCredentials: !!hasToken,
        headers: {
          Authorization: hasToken ? `Bearer ${token}` : null,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
      if (!res.ok) {
        if ((res.status === 403 || res.status === 404) && type === LINK_TYPE.Authenticate) {
          this.getError(0, LINK_TYPE.Authenticate[403], LINK_TYPE.Authenticate[403]);
        }
        if (res.status === 417 && type === LINK_TYPE.User) {
          this.getError(0, LINK_TYPE.User[417], LINK_TYPE.User[417]);
        }
        await this._checkResponse(res);
      }
      return res.json();
    } catch (e) {
      this.errorHandler(e);
      return null;
    }
  }

  async putResourse({
    url, params, hasToken, token = null,
  }) {
    try {
      const res = await fetch(`${this.baseUrl}${url}`, {
        method: 'PUT',
        withCredentials: !!hasToken,
        headers: {
          Authorization: hasToken ? `Bearer ${token}` : null,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
      if (!res.ok) {
        await this._checkResponse(res);
      }
      return res.json();
    } catch (e) {
      this.errorHandler(e);
      return null;
    }
  }

  async deleteResourse({ url, hasToken, token = null }) {
    try {
      const res = await fetch(`${this.baseUrl}${url}`, {
        method: 'DELETE',
        withCredentials: !!hasToken,
        headers: {
          Authorization: hasToken ? `Bearer ${token}` : null,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        await this._checkResponse(res);
      }
      if (res.status === 204 || res.status === 200) {
        return true;
      }
      return false;
    } catch (e) {
      this.errorHandler(e);
      return null;
    }
  }

  getError(status, apiMessage, techMessage) {
    console.info(techMessage);
    switch (status) {
      case 0:
        throw new ApiError(apiMessage);
      case 400:
        throw new ApiError(ERRORS_DESCRIPTION[400]);
      case 401:
        document.dispatchEvent(errorTokenEvent);
        throw new ApiError(ERRORS_DESCRIPTION[401]);
      case 404:
        throw new ApiError(ERRORS_DESCRIPTION[404]);
      case 408:
        throw new ApiError(ERRORS_DESCRIPTION[408]);
      case 410:
        throw new ApiError(ERRORS_DESCRIPTION[410]);
      case 422:
        throw new ApiError(ERRORS_DESCRIPTION[422]);
      default:
        throw new ApiError(ERRORS_DESCRIPTION.DEFAULT);
    }
  }

  errorHandler(e) {
    if (e instanceof ApiError) {
      throw new Error(e.message);
    }
    throw new Error(ERRORS_DESCRIPTION.DEFAULT);
  }

  async _checkResponse(res) {
    const cloned = await res.clone();
    let status = '';
    let errorDescription = '';
    try {
      const errorRes = await res.json();
      errorDescription = errorRes.error !== undefined ? errorRes.error.errors.map((x) => x.message).join(', ') : null;
      status = errorRes.error !== undefined ? 0 : res.status;
    } catch (e) {
      status = cloned.status;
      errorDescription = '';
    } finally {
      this.getError(status, errorDescription, `${status} ${res.statusText} ${errorDescription}`);
    }
  }
}
