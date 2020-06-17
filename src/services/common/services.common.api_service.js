import { ERRORS_DESCRIPTION } from './services.common.constants';
import { ApiError } from './services.common.api_service.helper';

export default class ApiService {
  constructor(baseUrl, token) {
    this.baseUrl = baseUrl;
    this.token = token;
  }

  async getResource({ url, hasToken }) {
    try {
      const res = await fetch(`${this.baseUrl}${url}`, {
        method: 'GET',
        withCredentials: !!hasToken,
        headers: {
          Authorization: hasToken ? `Bearer ${this.token}` : null,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        this.getError(res.status, `Could not fetch: ${url}, API message: ${res.status} ${res.statusText}`);
      }
      return res.json();
    } catch (e) {
      this.errorHandler(e);
      return null;
    }
  }

  async postResourse({ url, params, hasToken }) {
    try {
      const res = await fetch(`${this.baseUrl}${url}`, {
        method: 'POST',
        withCredentials: !!hasToken,
        headers: {
          Authorization: hasToken ? `Bearer ${this.token}` : null,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
      if (!res.ok) {
        this.getError(res.status, res.statusText);
      }
      return res.json();
    } catch (e) {
      this.errorHandler(e);
      return null;
    }
  }

  async putResourse({ url, params, hasToken }) {
    try {
      const res = await fetch(`${this.baseUrl}${url}`, {
        method: 'PUT',
        withCredentials: !!hasToken,
        headers: {
          Authorization: hasToken ? `Bearer ${this.token}` : null,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
      if (!res.ok) {
        this.getError(res.status, res.statusText);
      }
      return res.json();
    } catch (e) {
      this.errorHandler(e);
      return null;
    }
  }

  async deleteResourse({ url, hasToken }) {
    try {
      const res = await fetch(`${this.baseUrl}${url}`, {
        method: 'DELETE',
        withCredentials: !!hasToken,
        headers: {
          Authorization: hasToken ? `Bearer ${this.token}` : null,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        this.getError(res.status, res.statusText);
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

  getError(status, message) {
    console.info(message);
    switch (status) {
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
}
