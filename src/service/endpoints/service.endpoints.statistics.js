export default class Statistics {
    constructor() {
        this._apiService = new ApiService();
    }

    async getUserStatistics({userId}) {
        const res = await this._apiService.getResource({url: `/users/${userId}/statistics`, hasToken: true});
        return this._transformUserStatistics(res);
    }

    async updateUserStatistics({userId, learnedWords, optional = {}}) {
        const res = await this._apiService.putResourse({
            url: `/users/${userId}/statistics`, 
            params: {'learnedWords': learnedWords, 'optional': optional}, 
            hasToken: true
        });
        return this._transformUserStatistics(res);
    }

    _transformUserStatistics({id, learnedWords, optional}) {
        return {
            id,
            learnedWords,
            optional
        }
    }
}