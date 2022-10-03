module.exports = {
    'root': true,
    'env': {
        'jest': true,
        'es6': true,
        'node': true
    },
    'globals': { 'Atomics': 'readonly', 'SharedArrayBuffer': 'readonly' },
    'parser': '@typescript-eslint/parser',
    'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    'plugins': [
        '@typescript-eslint',
        'import'
    ],
    'rules': {
        'indent': ['error', 4, { 'SwitchCase': 1 }],
        'react/prop-types': 0,
        'no-underscore-dangle': 0,
        'no-plusplus': 0,
        'no-unused-vars': ['error', { 'vars': 'all', 'args': 'after-used', 'ignoreRestSiblings': false }],
        'import/no-named-as-default': 0,
        'import/no-named-as-default-member': 0,
        'arrow-parens': 0,
        'comma-dangle': ['error', 'never'],
        'max-len': ['warning', { 'code': 160 }],
        'no-multiple-empty-lines': ['error', { 'max': 1, 'maxBOF': 0, 'maxEOF': 0 }],
        'no-console': 0,
        'semi': ['error', 'always'],
        'space-before-function-paren': 0,
        'no-trailing-spaces': 'error',
        'brace-style': 'error',
        'arrow-spacing': 'error',
        'space-infix-ops': 'error',
        'block-spacing': 'error',
        'comma-spacing': ['error', { 'before': false, 'after': true }],
        'comma-style': [2, 'last', { 'exceptions': { 'CallExpression': false } }],
        'lines-between-class-members': ['error', 'always', { 'exceptAfterSingleLine': true }],
        'no-var': 'error',
        'object-curly-spacing': [2, 'always'],
        'space-before-blocks': ['error', { 'functions': 'always', 'keywords': 'always', 'classes': 'always' }],
        'keyword-spacing': [2, { 'before': true, 'after': true }],
        'key-spacing': [2, { 'beforeColon': false, 'afterColon': true }],
        'camelcase': 2,
        'quotes': [2, 'single'],
        'linebreak-style': ['error', 'unix'],
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-inferrable-types': 'off',
        'space-in-parens': 'error',
        'array-bracket-spacing': ['error', 'never'],
        'no-multi-spaces': 'error',
        'import/no-unresolved': 0,
        'import/no-commonjs': 2,
        'import/extensions': [0, 'ignorePackages']
    },
    'parserOptions': {
        'ecmaVersion': 2021,
        'ecmaFeatures': {
            'arrowFunctions': true
        },
        'sourceType': 'module'
    }
};