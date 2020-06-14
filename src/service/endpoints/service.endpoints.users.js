export default class Users {
    constructor() {
        this._apiService = new ApiService();
    }

    async getUser({id}) {
        const res = await this._apiService.getResource({url: `/users/${id}`, hasToken});
        return this._transformUser(res);
    }

    async editUser({id, email, password}) {
        const res = await this._apiService.putResourse({url: `/users/${id}`, params: {'email': email, 'password': password}, hasToken: false});
        return this._transformUser(res);
    }

    async createUser({email, password}) {
        const res = await this._apiService.postResourse({url: `/users`,  params: {'email': email, 'password': password}, hasToken: false});
        return this._transformUser(res);
    }

    async deleteUser({id}) {
        const res = await this._apiService.deleteResourse({url: `/users/${id}`, hasToken: false});
        return res;
    }

    async authenticateUser({email, password}) {
        const res = await this._apiService.postResourse({url: `/signin`, params: {'email': email, 'password': password}});
        return this._transformAuthentication(res);
    }

    _transformUser({id, email}) {
        return {
            'id': id,
            'email': email
        }
    }

    _transformAuthentication({message, token, userId}) {
        return {
            'message': message,
            'token': token,
            'userId': userId
        }
    }

}