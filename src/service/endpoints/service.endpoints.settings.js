import ApiService from '../common/service.common.apiService';

export default class Settings {
    constructor() {
        this._apiService = new ApiService();
    }

    async getUserSettings({userId}) {
        const res = await this._apiService.getResource({url: `/users/${userId}/settings`, hasToken: true});
        return this._transformUserSettings(res);
    }

    async updateUserSettings({userId, wordsPerDay, optional = {}}) {
        this._wordsPerDayValidator(wordsPerDay);
        const res = await this._apiService.putResourse({
            url: `/users/${userId}/settings`, 
            params: {'wordsPerDay': wordsPerDay, 'optional': optional}, 
            hasToken: true
        });
        return this._transformUserSettings(res);
    }

    _wordsPerDayValidator({wordsPerDay}){
        if (wordsPerDay < 1) {
            console.info(`'wordsPerDay' should be greather then 0`);
        }
    }

    _transformUserSettings({id, wordsPerDay, optional}) {
        return {
            id,
            wordsPerDay,
            optional
        }
    }
}