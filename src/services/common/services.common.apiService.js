const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZTU1MDc1MmU2ZjgxMDAxNzI5NjUzMiIsImlhdCI6MTU5MjE2NDQ2MywiZXhwIjoxNTkyMTc4ODYzfQ.VCnD4MySmiHT-MB1DhWL2CO-y5_RHsC3w38oym-vTAQ';

export default class ApiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getResource({ url, hasToken }) {
    const res = await fetch(`${this.baseUrl}${url}`, {
      method: 'GET',
      withCredentials: !!hasToken,
      headers: {
        Authorization: hasToken ? `Bearer ${TOKEN}` : null,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) {
      await this.getError(res.status, `Could not fetch: ${url}, API message: ${res.status} ${res.statusText}`);
    } else {
      return res.json();
    }
  }

  async postResourse({ url, params, hasToken }) {
    const res = await fetch(`${this.baseUrl}${url}`, {
      method: 'POST',
      withCredentials: !!hasToken,
      headers: {
        Authorization: hasToken ? `Bearer ${TOKEN}` : null,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    if (!res.ok) {
      await this.getError(res.status, res.statusText);
    }
    return res.json();
  }

  async putResourse({ url, params, hasToken }) {
    const res = await fetch(`${this.baseUrl}${url}`, {
      method: 'PUT',
      withCredentials: !!hasToken,
      headers: {
        Authorization: hasToken ? `Bearer ${TOKEN}` : null,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    if (!res.ok) {
      await this.getError(res.status, res.statusText);
    }
    return res.json();
  }

  async deleteResourse({ url, hasToken }) {
    const res = await fetch(`${this.baseUrl}${url}`, {
      method: 'DELETE',
      withCredentials: !!hasToken,
      headers: {
        Authorization: hasToken ? `Bearer ${TOKEN}` : null,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) {
      await this.getError(res.status, res.statusText);
    }
    if (res.status === 204) {
      return true;
    }
    return false;
  }

  async getError(status, message) {
    console.info(message);
    switch (status) {
      case 400:
        throw new Error('400: Bad Request');
      case 401:
        throw new Error('401: Access Token Is Missing or Invalid');
      case 404:
        throw new Error('404: Not Found');
      case 408:
        throw new Error('408: Request Time-out');
      case 410:
        throw new Error('410: Gone');
      case 422:
        throw new Error('422: Incorrect request');
      default:
        throw new Error('Something Goes Wrong');
    }
  }
}
