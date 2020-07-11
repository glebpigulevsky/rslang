import ApiService from '../../common/services.common.api_service';
import { MAIN_API_URL, MEDIA_LINK, LINK_TYPE } from '../../common/services.common.constants';
import { checkUserInfo } from '../../common/services.common.api_service.helper';

export default class UserAggregatedWords {
  constructor() {
    this._apiService = new ApiService(MAIN_API_URL);
  }

  async getAllUserAggregatedWords({ group, wordsPerPage = null, filter = null },
    { token, userId } = checkUserInfo()) {
    let url = `/users/${userId}/aggregatedWords?group=${group}`;
    if (wordsPerPage) {
      url += `&wordsPerPage=${wordsPerPage}`;
    }
    if (filter) {
      url += `&filter=${filter}`;
    }
    const res = await this._apiService.getResource({
      url,
      hasToken: true,
      token,
      type: LINK_TYPE.UserAggregatedWords,
    });
    if (res[0].length < 1 || res[0].paginatedResults.length < 1) {
      return null;
    }
    const wordsArray = {};
    wordsArray.paginatedResults = res[0].paginatedResults.map(this._transformUserAggregatedWord);
    wordsArray.totalCount = res[0].totalCount[0].count;
    return wordsArray;
  }

  async getUserAggregatedWord({ wordId }, { token, userId } = checkUserInfo()) {
    const res = await this._apiService.getResource({
      url: `/users/${userId}/aggregatedWords/${wordId}`,
      hasToken: true,
      token,
      type: LINK_TYPE.UserAggregatedWords,
    });
    return res.length < 1 ? null : this._transformUserAggregatedWord(res[0]);
  }

  _transformUserAggregatedWord({
    _id,
    group,
    page,
    word,
    image,
    audio,
    audioMeaning,
    audioExample,
    textMeaning,
    textExample,
    transcription,
    textMeaningTranslate,
    textExampleTranslate,
    wordTranslate,
    wordsPerExampleSentence,
    userWord,
  }) {
    return {
      id: _id,
      group,
      page,
      word,
      image: `${MEDIA_LINK}${image}`,
      audio: `${MEDIA_LINK}${audio}`,
      audioMeaning: `${MEDIA_LINK}${audioMeaning}`,
      audioExample: `${MEDIA_LINK}${audioExample}`,
      textMeaning,
      textExample,
      transcription,
      textMeaningTranslate,
      textExampleTranslate,
      wordTranslate,
      wordsPerExampleSentence,
      userWord: userWord
        ? {
          difficulty: userWord.difficulty,
          optional: userWord.optional || null,
        }
        : null,
    };
  }
}
