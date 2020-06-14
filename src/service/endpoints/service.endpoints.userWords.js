export default class UserWords {
    constructor() {
        this._apiService = new ApiService();
    }

    async createUserWord({userId, wordId, difficulty, optional = {}}) {
        const res = await this._apiService.postResourse({
            url: `/users/${userId}/words/${wordId}`, 
            params: {'difficulty': difficulty, 'optional': optional}, 
            hasToken: true
        });
        return this._transformUserWord(res);
    }

    async getUserWordsCollection({userId}) {
        const res = await this._apiService.getResource({url: `/users/${userId}/words`, hasToken: true});
        return res.map(this._transformUserWord);
    }

    async getUserWord({userId, wordId}) {
        const res = await this._apiService.getResource({url: `/users/${userId}/words/${wordId}`, hasToken: true});
        return this._transformUserWord(res);
    }

    async updateUserWord({userId, wordId, difficulty, optional = {}}) {
        const res = await this._apiService.putResourse({
            url: `/users/${userId}/words/${wordId}`, 
            params: {'difficulty': difficulty, 'optional': optional}, 
            hasToken: true
        });
        return this._transformUserWord(res);
    }

    async deleteUserWord({userId, wordId}) {
        const res = await this._apiService.deleteResourse({url: `/users/${userId}/words/${wordId}`, hasToken: true});
        return res;
    }

    _transformUserWord({id, wordId, difficulty, optional}){
        return {
            id,
            wordId,
            difficulty,
            optional
        }
    }
}