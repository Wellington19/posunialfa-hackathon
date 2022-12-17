module.exports = {
  env: {
    browser: true,
    node: true,
    jest: true
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'prettier'
  ],
  extends: [
    'next',
    'next/core-web-vitals',
    'airbnb-typescript',
    'airbnb/hooks',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  // Airbnb's ESLint config requires this
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname
  },
  rules: {
    // Include .prettierrc.js rules
    'prettier/prettier': [
      'error',
      {},
      {
        'usePrettierrc': true
      }
    ],
    // We will use TypeScript's types for component props instead
    'react/prop-types': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'import/prefer-default-export': 'off',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-shadow': 'off',
    '@typescript-eslint/naming-convention': 'off'
  }
}