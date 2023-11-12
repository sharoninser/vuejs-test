module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
		'linebreak-style': 'off',
		'no-console': 'off',
		'no-unused-vars': 'off',
		'no-trailing-spaces': 'off',
		'arrow-body-style': 'off',
	},
};