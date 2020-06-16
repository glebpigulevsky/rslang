const MAIN_API_URL = 'https://afternoon-falls-25894.herokuapp.com';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZTRmODI3MmU2ZjgxMDAxNzI5NjNiNyIsImlhdCI6MTU5MjIzMDUzNiwiZXhwIjoxNTkyMjQ0OTM2fQ.ea1lTt3VX9R5JjUOgq6E4Ppb08kQhkWjAKuDbqy2ZKg';
const ERRORS_DESCRIPTION = {
  400: '400: Bad Request',
  401: '401: Access Token Is Missing or Invalid',
  404: '404: Not Found',
  408: '408: Request Time-out',
  410: '410: Gone',
  422: '422: Incorrect request',
  DEFAULT: 'Something Goes Wrong',
  EMAIL_ERROR: 'e-mail must contain a standard signature',
  PASSWORD_ERROR: 'Password must contain as many as 6 characters including lower-case, upper-case and numeric characters',
};
const GET_RANDOM = (min, max) => {
  const x = Math.ceil(min);
  const y = Math.floor(max);
  return Math.floor(Math.random() * (y - x + 1)) + x;
};
export { MAIN_API_URL, TOKEN, GET_RANDOM, ERRORS_DESCRIPTION };
