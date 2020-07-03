/* eslint-disable no-undef */
import 'isomorphic-fetch';
import UserAggregatedWords from './services.main.endpoints.user_aggregated_words';
import UsersApi from './services.main.endpoints.users';
import { MAIN_API_URL, GET_RANDOM, ERRORS_DESCRIPTION, USER_AGGREGATED_WORDS_FILTER } from '../../common/services.common.constants';
import ApiService from '../../common/services.common.api_service';

const userAggregatedWords = new UserAggregatedWords();
const user = new UsersApi();

  describe('get user aggregated words by group', () => {
    const userDefault = {
      email: 'jest_useraggregatedwords_two@mail.com',
      password: '12345678Aa@',
    };
    it('should return words collection"', async () => {
      const auth = await user.authenticateUser({
        email: userDefault.email,
        password: userDefault.password,
      });
      userAggregatedWords._apiService = new ApiService(MAIN_API_URL);
      const res = await userAggregatedWords.getAllUserAggregatedWords({ group: 1 },{ userId: auth.userId, token: auth.token });
      expect(res).toBeDefined();
      expect(res.paginatedResults.length).toBe(10);
      expect(res.totalCount).toBe(600);
    });
  });

  describe('get user aggregated words by group and wordsPerPage', () => {
    const userDefault = {
      email: 'jest_useraggregatedwords_three@mail.com',
      password: '12345678Aa@',
    };
    it('should return words collection"', async () => {
      const auth = await user.authenticateUser({
        email: userDefault.email,
        password: userDefault.password,
      });
      userAggregatedWords._apiService = new ApiService(MAIN_API_URL);
      const res = await userAggregatedWords.getAllUserAggregatedWords({ group: 1, wordsPerPage: 30 },{ userId: auth.userId, token: auth.token });
      expect(res).toBeDefined();
      expect(res.paginatedResults.length).toBe(30);
      expect(res.totalCount).toBe(600);
    });
  }); 

   describe('get user aggregated words with filter difficulty = hard', () => {
    const userDefault = {
      email: 'jest_useraggregatedwords_four@mail.com',
      password: '12345678Aa@',
    };
    it('should return words collection"', async () => {
      const auth = await user.authenticateUser({
        email: userDefault.email,
        password: userDefault.password,
      });
      userAggregatedWords._apiService = new ApiService(MAIN_API_URL);
      const res = await userAggregatedWords.getAllUserAggregatedWords({group: 0, filter:USER_AGGREGATED_WORDS_FILTER.byDifficultyHard},{ userId: auth.userId, token: auth.token });
      expect(res).toBeDefined();
      expect(res.paginatedResults.length).toBe(2);
      expect(res.totalCount).toBe(2);
    });
  }); 

   describe('get user aggregated words with filter difficulty = easy and optional.repeat = true', () => {
    const userDefault = {
      email: 'jest_useraggregatedwords_five@mail.com',
      password: '12345678Aa@',
    };
    it('should return words collection"', async () => {
      const auth = await user.authenticateUser({
        email: userDefault.email,
        password: userDefault.password,
      });
      userAggregatedWords._apiService = new ApiService(MAIN_API_URL);
      const res = await userAggregatedWords.getAllUserAggregatedWords({group: 0, filter: USER_AGGREGATED_WORDS_FILTER.byDifficultyHardAndRepeat},{ userId: auth.userId, token: auth.token });
      expect(res).toBeDefined();
      expect(res.paginatedResults.length).toBe(1);
      expect(res.totalCount).toBe(1);
    });
  }); 

  describe('get user aggregated words with filter difficulty = easy and optional.repeat = true', () => {
    const userDefault = {
      email: 'jest_useraggregatedwords_five@mail.com',
      password: '12345678Aa@',
    };
    it('should return words collection"', async () => {
      const auth = await user.authenticateUser({
        email: userDefault.email,
        password: userDefault.password,
      });
      userAggregatedWords._apiService = new ApiService(MAIN_API_URL);
      const res = await userAggregatedWords.getUserAggregatedWord({wordId: '5e9f5ee35eb9e72bc21af4a0'},{ userId: auth.userId, token: auth.token });
      expect(res).toBeDefined();
      expect(res).toMatchObject({
        id: '5e9f5ee35eb9e72bc21af4a0',
        group: 0,
        page: 0,
        word: 'alcohol',
        image: 'https://raw.githubusercontent.com/caspercarver/rslang-data/master/files/01_0002.jpg',
        audio: 'https://raw.githubusercontent.com/caspercarver/rslang-data/master/files/01_0002.mp3',
        audioMeaning: 'https://raw.githubusercontent.com/caspercarver/rslang-data/master/files/01_0002_meaning.mp3',
        audioExample: 'https://raw.githubusercontent.com/caspercarver/rslang-data/master/files/01_0002_example.mp3',
        textMeaning: '<i>Alcohol</i> is a type of drink that can make people drunk.',
        textExample: 'A person should not drive a car after he ' +
          'or she has been drinking <b>alcohol</b>.',
        transcription: '[ǽlkəhɔ̀ːl]',
        textMeaningTranslate: 'Алкоголь - это тип напитка, который может сделать людей пьяными',
        textExampleTranslate: 'Человек не должен водить машину после того, как он выпил алкоголь',
        wordTranslate: 'алкоголь',
        wordsPerExampleSentence: 15,
        userWord: { difficulty: 'hard', optional: { repeat: true } }});
    });
  }); 

 



