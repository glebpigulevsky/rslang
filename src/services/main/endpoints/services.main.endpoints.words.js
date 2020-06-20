import ApiService from '../../common/services.common.api_service';
import { MAIN_API_URL, TOKEN, MEDIA_LINK } from '../../common/services.common.constants';

const WORDS_REQUEST = { Group: { min: 0, max: 5 }, Page: { min: 0, max: 29 } };

export default class WordsApi {
  constructor() {
    this.apiService = new ApiService(MAIN_API_URL, TOKEN);
  }

  async getWordsCollection({
    group, page, wordsPerExampleSentence = null, wordsPerPage = null,
  }) {
    this._wordsGroupValidator(group);
    this._wordsPageValidator(page);
    this._wordsPerPageValidator({ wordsPerExampleSentence, wordsPerPage });

    let url = `/words?group=${group}&page=${page}`;
    if (wordsPerExampleSentence !== null) {
      url += `&wordsPerExampleSentenceLTE=${wordsPerExampleSentence}`;
    }
    if (wordsPerPage !== null) {
      url += `&wordsPerPage=${wordsPerPage}`;
    }
    const res = await this.apiService.getResource({ url, hasToken: false });
    return res.map(this._transformWord);
  }

  async getWordsCount({ group, wordsPerExampleSentence = null, wordsPerPage = null }) {
    this._wordsGroupValidator(group);
    this._wordsPerPageValidator({ wordsPerExampleSentence, wordsPerPage });

    let url = `/words/count?group=${group}`;
    if (wordsPerExampleSentence !== null) {
      url += `&wordsPerExampleSentenceLTE=${wordsPerExampleSentence}`;
    }
    if (wordsPerPage !== null) {
      url += `&wordsPerPage=${wordsPerPage}`;
    }
    const res = await this.apiService.getResource({ url, hasToken: false });
    return this._transformWordsCount(res);
  }

  async getWord({ id }) {
    const res = await this.apiService.getResource({ url: `/words/${id}`, hasToken: false });
    return this._transformWord(res);
  }

  _wordsGroupValidator(group) {
    const isErrorGroup = group < WORDS_REQUEST.Group.min || group > WORDS_REQUEST.Group.max;
    if (isErrorGroup) {
      console.info(`Words: 'group' must be in range (${WORDS_REQUEST.Group.min}, ${WORDS_REQUEST.Group.max})`);
    }
  }

  _wordsPageValidator(page) {
    const isErrorPage = page < WORDS_REQUEST.Page.min || page > WORDS_REQUEST.Page.max;
    if (isErrorPage) {
      console.info(`Words: 'page' must be in range (${WORDS_REQUEST.Page.min}, ${WORDS_REQUEST.Page.max})`);
    }
  }

  _wordsPerPageValidator({ wordsPerExampleSentence, wordsPerPage }) {
    if (wordsPerExampleSentence < 1 && wordsPerPage > 0) {
      console.info("Words: 'wordsPerPage' works if 'wordsPerExampleSentenceLTE' is specified");
    }
  }

  _wordsPerPageCountValidator({ wordsPerExampleSentence, wordsPerPage }) {
    if (wordsPerExampleSentence < 1 && wordsPerPage > 0) {
      console.info("Words: 'wordsPerPage' works if 'wordsPerExampleSentenceLTE' is specified");
    }
  }

  _transformWord({
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
  }) {
    return {
      id,
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
    };
  }

  _transformWordsCount({ count }) {
    return {
      count,
    };
  }
}
