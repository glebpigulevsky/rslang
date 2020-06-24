import { ERRORS_DESCRIPTION } from './services.common.constants';
import { ApiError } from './services.common.api_service.helper';

export default class ApiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getResource({ url, hasToken, token = null }) {
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
        await this._checkResponse(res);
      }
      return res.json();
    } catch (e) {
      this.errorHandler(e);
      return null;
    }
  }

  async postResourse({
    url, params, hasToken, token = null,
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
    let status = '';
    let errorDescription = '';
    try {
      const errorRes = await res.json();
      errorDescription = (errorRes.error !== undefined) ? errorRes.error.errors.map((x) => x.message).join(', ') : null;
      status = (errorRes.error !== undefined) ? 0 : res.status;
    } catch (e) {
      status = res.status;
      errorDescription = '';
    }
    this.getError(status, errorDescription, res.statusText);
  }
}
