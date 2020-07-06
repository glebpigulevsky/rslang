import { FOUR_HOURES_IN_MS } from '../common.constants';

const getHumanDateUtc = (timestamp) => new Date(timestamp).toUTCString();
const getTokenExpiresMs = () => Date.now() + FOUR_HOURES_IN_MS;

export { getTokenExpiresMs, getHumanDateUtc };
