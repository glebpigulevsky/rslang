export default class UserWords {
    constructor() {
        this._apiService = new ApiService();
    }

    async getWordsCollection({group, page, wordsPerExampleSentence = null, wordsPerPage = null}) {
        await this._wordsGroupValidator(group);
        await this._wordsPageValidator(page);
        await this._wordsPerPageValidator({wordsPerExampleSentence, wordsPerPage});

        let url = `/words?group=${group}&page=${page}`;
        if (wordsPerExampleSentence !== null) {
            url += `&wordsPerExampleSentenceLTE=${wordsPerExampleSentence}`;
        }
        if (wordsPerPage !== null) {
            url += `&wordsPerPage=${wordsPerPage}`;
        }
        const res = await this._apiService.getResource({url: url, hasToken: false});
        return res.map(this._transformWord);
    }

    async getWordsCount({group, wordsPerExampleSentence = null, wordsPerPage = null}) {
        await this._wordsGroupValidator(group);
        await this._wordsPerPageValidator({wordsPerExampleSentence, wordsPerPage});

        let url = `/words/count?group=${group}`;
        if (wordsPerExampleSentence !== null) {
        url += `&wordsPerExampleSentenceLTE=${wordsPerExampleSentence}`;
        }
        if (wordsPerPage !== null) {
            url += `&wordsPerPage=${wordsPerPage}`;
        }
        const res = await this._apiService.getResource({url: url, hasToken: false});
        return this._transformWordsCount(res);
    }

    async getWord({id}) {
        const res = await this._apiService.getResource({url: `/words/${id}`, hasToken: false});
        return this._transformWord(res);
    }

    async _wordsGroupValidator(group) {
        const isErrorGroup = (group < WORDS_REQUEST.Group.min || group > WORDS_REQUEST.Group.max);
        if (isErrorGroup) {
        console.info(`Words: 'group' must be in range (${WORDS_REQUEST.Group.min}, ${WORDS_REQUEST.Group.max})`);
        }
    }

    async _wordsPageValidator(page) {
        const isErrorPage = (page < WORDS_REQUEST.Page.min || page > WORDS_REQUEST.Page.max);
        if (isErrorPage) {
            console.info(`Words: 'page' must be in range (${WORDS_REQUEST.Page.min}, ${WORDS_REQUEST.Page.max})`);
        } 
    }

    async _wordsPerPageValidator({wordsPerExampleSentence, wordsPerPage}) {
        if (wordsPerExampleSentence < 1 && wordsPerPage > 0) {
            console.info(`Words: 'wordsPerPage' works if 'wordsPerExampleSentenceLTE' is specified`);
        }
    }

    _transformWord({
        id, 
        word, 
        image, 
        audio, 
        audioMeaning, 
        audioExample, 
        textMeaning, 
        textExample, 
        transcription, 
        wordTranslate, 
        textMeaningTranslate, 
        textExampleTranslate
        }) {
        return  {
            "id": id,
            "word": word,
            "image": image,
            "audio": audio,
            "audioMeaning": audioMeaning,
            "audioExample": audioExample,
            "textMeaning": textMeaning,
            "textExample": textExample,
            "transcription": transcription,
            "wordTranslate": wordTranslate,
            "textMeaningTranslate": textMeaningTranslate,
            "textExampleTranslate": textExampleTranslate
        }
    }

    _transformWordsCount({count}) {
        return {
            count
        }
    }
}