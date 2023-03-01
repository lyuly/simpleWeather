module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'standard-with-typescript'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking'
      ],
      parserOptions: {
        project: ['./tsconfig.json']
      }
    }
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off'
  }
}
