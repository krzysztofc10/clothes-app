module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 0,
    'vue/no-reserved-component-names': 0,
    'no-loss-of-precision': 0,
    'no-nonoctal-decimal-escape': 0,
    'no-unsafe-optional-chaining': 0,
    'no-trailing-spaces': 1,
    'no-useless-backreference': 0,
    'space-before-function-paren': ['error', {
      anonymous: 'always',
      named: 'never',
      asyncArrow: 'always'
    }],
    'indent': 1,
    'semi': 1,
    'no-unused-vars': 1,
    'space-in-parens': 1,
    'no-return-assign': 0,
    'quotes': 0,
    'template-curly-spacing': 0,
  }
}
