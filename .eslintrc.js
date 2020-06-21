module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['prettier', 'airbnb-base'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    'no-param-reassign': [2, { props: false }],
    'no-plusplus': 'off',
    'default-case': 'off',
    'no-multi-assign': 'off',
    'no-console': ['error', { allow: [ 'info'] }],
  },
  // settings: {
  //   'import/extensions': [
  //     '.js', '.jsx', '.ts', '.tsx',
  //   ],
  // },
  root: true,
};