const WORDS_REQUEST = {Group: {min: 0, max: 5}, Page: {min: 0, max: 29} };
const WORDS_DIFFICULTY = { easy: 'easy', difficult: 'difficult' };
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZTU1MDc1MmU2ZjgxMDAxNzI5NjUzMiIsImlhdCI6MTU5MjEzNTI5MiwiZXhwIjoxNTkyMTQ5NjkyfQ.5jfISQe3NNHvo3wScYaezZRY-gIqdkeiJRtkKlTNDJw';

export default class ApiService {
    constructor() {
        this._baseUrl = `https://afternoon-falls-25894.herokuapp.com`;
    }

    async getResource ({url, hasToken}) {
        const res = await fetch(`${this._baseUrl}${url}`, {
            method: 'GET',
            withCredentials: hasToken ? true : false,
            headers: {
                'Authorization': hasToken ? `Bearer ${TOKEN}` : null,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        if (!res.ok) {
            this._getError(res.status, `Could not fetch: ${url}, API message: ${res.statusText}`);
         } 
         return await res.json();      
    }

    async postResourse ({url, params, hasToken}) {
            const res = await fetch(`${this._baseUrl}${url}`, {
            method: 'POST',
            withCredentials: hasToken ? true : false,
            headers: {
                'Authorization': hasToken ? `Bearer ${TOKEN}` : null,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        });
        if (!res.ok) {
            this._getError(res.status, res.statusText);
         } 
         return await res.json();
    }

    async putResourse ({url, params, hasToken}) {
        const res = await fetch(`${this._baseUrl}${url}`, {
            method: 'PUT',
            withCredentials: hasToken ? true : false,
            headers: {
                'Authorization': hasToken ? `Bearer ${TOKEN}` : null,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        });
        if (!res.ok) {
            this._getError(res.status, res.statusText);
         } 
         return await res.json();
    }

    async deleteResourse ({url, hasToken}) {
        const res = await fetch(`${this._baseUrl}${url}`, {
            method: 'DELETE',
            withCredentials: hasToken ? true : false,
            headers: {
                'Authorization': hasToken ? `Bearer ${TOKEN}` : null,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        if (!res.ok) {
            this._getError(res.status, res.statusText);
         } 
         if (res.status === 204) {
            return true; 
         } 
         return false;
    }

    _getError(status, message) {
        console.info(message);
        switch (status) {
            case 400: 
                throw new Error(`400: Bad Request`);
            case 401:
                throw new Error(`401: Access Token Is Missing or Invalid`);
            case 404: 
                throw new Error(`404: Not Found`);
            case 408: 
                throw new Error(`408: Request Time-out`);
            case 410: 
                throw new Error(`410: Gone`);
            case 422:
                throw new Error(`422: Incorrect E-mail or Password`);
            default:
                throw new Error(`Something Goes Wrong`);
        }
    }
}