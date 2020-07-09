import { GET_RANDOM } from '../../../services/services.methods';

export const getNextVariable = (lockedTranslations = [], answears) => {
  let res = '';
  do {
    res = answears[GET_RANDOM(0, answears.length - 1)];
  }
  while (lockedTranslations.includes(res));
  return res;
};
