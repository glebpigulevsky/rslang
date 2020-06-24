const TOKEN_LIFETIME_MS = (4 * 60 * 60 * 1000); // Token lifetime in milliseconds, default 4 hours
const TOKEN_EXPIRES_MS = () => (Date.now() + TOKEN_LIFETIME_MS);
const GET_HUMAN_DATE_UTC = (timestamp) => new Date(timestamp).toUTCString();

export { TOKEN_EXPIRES_MS, GET_HUMAN_DATE_UTC };