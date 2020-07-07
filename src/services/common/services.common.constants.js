const MAIN_API_URL = 'https://afternoon-falls-25894.herokuapp.com';
const MEDIA_LINK = 'https://raw.githubusercontent.com/caspercarver/rslang-data/master/';
const ERRORS_DESCRIPTION = {
  400: '400: Bad Request',
  401: 'ERROR_TOKEN',
  404: '404: Not Found',
  408: '408: Request Time-out',
  410: '410: Gone',
  422: '422: Incorrect request',
  DEFAULT: 'Something Goes Wrong',
  EMAIL_ERROR: 'e-mail must contain a standard signature',
  PASSWORD_ERROR:
    'Password must contain as many as 6 characters including lower-case, upper-case and numeric characters',
  ERROR_TOKEN: 'ERROR_TOKEN',
};
const GET_RANDOM = (min, max) => {
  const x = Math.ceil(min);
  const y = Math.floor(max);
  return Math.floor(Math.random() * (y - x + 1)) + x;
};

const LINK_TYPE = {
  Settings: { 404: null },
  Statictics: { 404: null },
  Authenticate: { 403: 'Incorrect e-mail or password' },
  User: { 417: 'This user already exists' },
  UserAggregatedWords: { 404: [] },
};

const DEFAULT_SETTINGS = {
  wordsPerDay: 7,
  optional: {
    isTranslation: 'true',
    isTranscription: 'true',
    isPicture: 'true',
    isAddSentExplWord: 'true',
    isShowAnswerButton: 'false',
    isShowDiffMoveButton: 'true',
    isShowDeleteButton: 'true',
    isShowAgainButton: 'true',
    isShowDiffButton: 'true',
    isShowGoodButton: 'true',
    isShowEasyButton: 'true',
    isAudio: 'false',
  },
};

const DEFAULT_USER_WORD_OPTIONS = {
  difficulty: 'fetched',
  optional: {
    repeatTimes: '0',
    lastRepeat: 'no repeat',
  },
};

const DEFAULT_STATISTICS = {
  learnedWords: 0,
  optional: {
    englishPuzzle: '[]',
    speakIt: '[]',
    savanna: '[]',
    audioCall: '[]',
    sprint: '[]',
    drop: '[]',
  },
};

const USER_AGGREGATED_WORDS_FILTER = {
  byDifficultyHard: '{"userWord.difficulty":"hard"}',
  byDifficultyHardAndRepeat: '{"$and":[{"userWord.difficulty":"hard", "userWord.optional.repeat":true}]}',
  allUserWords: '{"userWord":{"$ne":null}}',
};

export {
  MAIN_API_URL,
  GET_RANDOM,
  ERRORS_DESCRIPTION,
  MEDIA_LINK,
  LINK_TYPE,
  DEFAULT_SETTINGS,
  DEFAULT_USER_WORD_OPTIONS,
  DEFAULT_STATISTICS,
  USER_AGGREGATED_WORDS_FILTER,
};
