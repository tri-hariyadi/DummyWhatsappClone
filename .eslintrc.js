module.exports = {
    root: true,
    extends: '@react-native',
    rules: {
        'react-native/no-inline-styles': 0,
        'react-hooks/exhaustive-deps': 0,
        'prettier/prettier': [
            'error',
            {
                'no-inline-styles': false,
                endOfLine: 'auto',
            },
        ],
        'no-unexpected-multiline': 'error',
        'no-unused-vars': ['error', {argsIgnorePattern: '^_'}],
        'react/jsx-no-target-blank': 'off',
        semi: 'error',
        curly: 'off',
        'no-duplicate-imports': 'error',
        'no-dupe-else-if': 'warn',
        'no-multi-spaces': 'error',
        'no-multiple-empty-lines': 'error',
        'no-trailing-spaces': 'error',
        'no-dupe-keys': 'error',
        'no-return-assign': 'error',
        'semi-style': ['error', 'last'],
        'eol-last': ['error', 'always'],
        'no-empty': [
            'error',
            {
                allowEmptyCatch: true,
            },
        ],
    },
};
