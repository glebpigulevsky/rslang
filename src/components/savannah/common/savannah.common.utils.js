import { GET_RANDOM } from '../../../services/services.methods';

export const getNextVariable = (lockedTranslations = [], answers) => {
  let res = '';
  do {
    res = answers[GET_RANDOM(0, answers.length - 1)];
  }
  while (lockedTranslations.includes(res));
  return res;
};

export const getFinalCountdown = (id, start, end, duration) => {
  const range = end - start;
  let current = start;
  const increment = end > start ? 1 : -1;
  const stepTime = Math.abs(Math.floor(duration / range));
  const obj = document.getElementById(id);
  const timer = setInterval(() => {
    current += increment;
    obj.innerHTML = current;
    if (current === end) {
      clearInterval(timer);
    }
  }, stepTime);
};
