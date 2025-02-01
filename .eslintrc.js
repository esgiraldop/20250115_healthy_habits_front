module.exports = {
  root: true,
  extends: [
    '@react-native',
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['import', '@typescript-eslint', 'prettier'],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  ignorePatterns: ['node_modules/'],
  rules: {
    //Docs --> https://eslint.org/docs/latest/rules/
    'import/no-commonjs': 'off',
    'formik/no-missing-name': 'off',
    quotes: ['error', 'single'],
    'no-console': 'off',
    'no-unused-vars': 'error',
    'prettier/prettier': 'error',
    'import/namespace': 'off', // Had to deactivate it since it was causing problems with node_modules packages
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always', // Enforce newlines between import groups
        alphabetize: {
          order: 'asc', // Enforce alphabetical order within each group
          caseInsensitive: true, // Case-insensitive sorting
        },
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'], // Add any file extensions you use
      },
    },
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      rules: {},
    },
  ],
};
