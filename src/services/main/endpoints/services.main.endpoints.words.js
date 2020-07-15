import ApiService from '../../common/services.common.api_service';
import { MAIN_API_URL, MEDIA_LINK } from '../../common/services.common.constants';

export default class WordsApi {
  constructor() {
    this._apiService = new ApiService(MAIN_API_URL);
  }

  async getWordsCollection({
    group, page, wordsPerExampleSentence = null, wordsPerPage = null,
  }) {
    let url = `/words?group=${group}&page=${page}`;
    if (wordsPerExampleSentence !== null) {
      url += `&wordsPerExampleSentenceLTE=${wordsPerExampleSentence}`;
    }
    if (wordsPerPage !== null) {
      url += `&wordsPerPage=${wordsPerPage}`;
    }
    const res = await this._apiService.getResource({ url, hasToken: false });
    return res.map((word) => this._transformWord(word, false));
  }

  async getWordsCount({ group, wordsPerExampleSentence = null, wordsPerPage = null }) {
    let url = `/words/count?group=${group}`;
    if (wordsPerExampleSentence !== null) {
      url += `&wordsPerExampleSentenceLTE=${wordsPerExampleSentence}`;
    }
    if (wordsPerPage !== null) {
      url += `&wordsPerPage=${wordsPerPage}`;
    }
    const res = await this._apiService.getResource({ url, hasToken: false });
    return this._transformWordsCount(res);
  }

  async getWord({ id }) {
    const res = await this._apiService.getResource({ url: `/words/${id}`, hasToken: false });
    return this._transformWord(res, true);
  }

  _transformWord(
    {
      id,
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
    },
    isSingleWord,
  ) {
    return {
      id,
      group,
      page,
      word,
      image: isSingleWord ? `data:image/jpg;base64,${image}` : `${MEDIA_LINK}${image}`,
      audio: isSingleWord ? `data:audio/mpeg;base64,${audio}` : `${MEDIA_LINK}${audio}`,
      audioMeaning: isSingleWord ? `data:audio/mpeg;base64,${audioMeaning}` : `${MEDIA_LINK}${audioMeaning}`,
      audioExample: isSingleWord ? `data:audio/mpeg;base64,${audioExample}` : `${MEDIA_LINK}${audioExample}`,
      textMeaning,
      textExample,
      textExampleTranslate,
      transcription,
      textMeaningTranslate,
      wordTranslate,
      wordsPerExampleSentence,
    };
  }

  _transformWordsCount({ count }) {
    return {
      count,
    };
  }
}
