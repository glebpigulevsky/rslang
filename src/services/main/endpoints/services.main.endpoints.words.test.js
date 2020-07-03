/* eslint-disable no-undef */
import 'isomorphic-fetch';
import  WordsApi  from './services.main.endpoints.words';
import { ERRORS_DESCRIPTION, MEDIA_LINK } from '../../common/services.common.constants';

const wordsApi = new WordsApi();

describe('get word by Id', () => {
  it('should return error', async () => {
    try {
      await wordsApi.getWord({ id: '1' });
    } catch (e) {
      expect(e.message).toEqual(ERRORS_DESCRIPTION.DEFAULT);
    }
  });
});

describe('get word by Id', () => {
  it('should return correct object', async () => {
    const res = await wordsApi.getWord({ id: '5e9f5ee35eb9e72bc21af4b4' });
    expect(res).toBeDefined();
    expect(res).toStrictEqual({
      id: '5e9f5ee35eb9e72bc21af4b4',
      group: 0,
      page: 1,
      word: 'adventure',
      image: expect.any(String),
      audio: expect.any(String),
      audioMeaning: expect.any(String),
      audioExample: expect.any(String),
      textMeaning: 'An <i>adventure</i> is a fun or exciting thing that you do.',
      textExample: 'Riding in the rough water was an <b>adventure</b>.',
      transcription: '[ədvéntʃər]',
      textExampleTranslate: 'Езда в бурной воде была приключением',
      textMeaningTranslate: 'Приключение - это забавная или захватывающая вещь, которую ты делаешь',
      wordTranslate: 'приключение',
      wordsPerExampleSentence: 8,
    });
  });
});

describe('get words count with group, wordsPerExampleSentence, wordsPerPage', () => {
  it('should return correct object', async () => {
    const res = await wordsApi.getWordsCount({
      group: 5,
      wordsPerExampleSentence: 5,
      wordsPerPage: 2,
    });
    expect(res).toBeDefined();
    expect(res).toStrictEqual({
      count: 2,
    });
  });
});

describe('get words collection with group and page', () => {
  it('should return correct array', async () => {
    const res = await wordsApi.getWordsCollection({ group: 0, page: 1 });
    expect(res).toBeDefined();
    expect(res.length).toBe(20);
    expect(res.find((x) => x.id === '5e9f5ee35eb9e72bc21af4b4')).toStrictEqual({
      id: '5e9f5ee35eb9e72bc21af4b4',
      group: 0,
      page: 1,
      word: 'adventure',
      image: `${MEDIA_LINK}${'files/02_0021.jpg'}`,
      audio: `${MEDIA_LINK}${'files/02_0021.mp3'}`,
      audioMeaning: `${MEDIA_LINK}${'files/02_0021_meaning.mp3'}`,
      audioExample: `${MEDIA_LINK}${'files/02_0021_example.mp3'}`,
      textMeaning: 'An <i>adventure</i> is a fun or exciting thing that you do.',
      textExample: 'Riding in the rough water was an <b>adventure</b>.',
      transcription: '[ədvéntʃər]',
      textExampleTranslate: 'Езда в бурной воде была приключением',
      textMeaningTranslate: 'Приключение - это забавная или захватывающая вещь, которую ты делаешь',
      wordTranslate: 'приключение',
      wordsPerExampleSentence: 8,
    });
  });
});

describe('get words collection with group, page, wordsPerExampleSentence', () => {
  it('should return empty array', async () => {
    const res = await wordsApi.getWordsCollection({
      group: 1,
      page: 3,
      wordsPerExampleSentence: 5,
    });
    expect(res).toBeDefined();
    expect(res).toStrictEqual([]);
  });
});

describe('get words collection with group, page, wordsPerExampleSentence', () => {
  it('should return correct array', async () => {
    const res = await wordsApi.getWordsCollection({
      group: 5,
      page: 1,
      wordsPerExampleSentence: 7,
      wordsPerPage: 2,
    });
    expect(res).toBeDefined();
    expect(res.length).toBe(2);
    expect(res.find((x) => x.id === '5e9f5ee35eb9e72bc21b00a0')).toStrictEqual({
      id: '5e9f5ee35eb9e72bc21b00a0',
      group: 5,
      page: 3,
      word: 'inland',
      image: `${MEDIA_LINK}${'files/04_3073.jpg'}`,
      audio: `${MEDIA_LINK}${'files/04_3073.mp3'}`,
      audioMeaning: `${MEDIA_LINK}${'files/04_3073_meaning.mp3'}`,
      audioExample: `${MEDIA_LINK}${'files/04_3073_example.mp3'}`,
      textMeaning: 'If someone goes <i>inland</i>, they travel into the center of a country or land.',
      textExample: 'The river curved <b>inland</b> near the campground.',
      transcription: '[ínlənd]',
      textExampleTranslate: 'Река изогнута внутри страны возле кемпинга',
      textMeaningTranslate: 'Если кто-то отправляется вглубь страны, он путешествует в центр страны или земли',
      wordTranslate: 'вглубь',
      wordsPerExampleSentence: 7,
    });
  });
});
