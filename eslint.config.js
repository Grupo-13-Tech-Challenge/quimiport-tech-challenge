import neostandard from 'neostandard'
import prettierRecommended from 'eslint-plugin-prettier/recommended'
import tseslint from 'typescript-eslint'

const prettierOptions = {
  printWidth: 80,
  tabWidth: 2,
  singleQuote: true,
  trailingComma: 'all',
  arrowParens: 'always',
  semi: false,
  camelCase: false,
  endOfLine: 'auto',
}

export default [
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  ...neostandard({
    ts: true,
    noJsx: true,
    env: ['node', 'es2020'],
    ignores: ['dist/**', 'build/**'],
  }),

  ...tseslint.configs.recommended,

  prettierRecommended,

  {
    rules: {
      camelcase: 'off',
      'prettier/prettier': ['error', prettierOptions],
    },
  },
]
