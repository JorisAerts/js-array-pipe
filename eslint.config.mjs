import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'


export default [
  {files: ['**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}'], ignores: ["dist/*", ".yarn/**/*"]},
  {languageOptions: {globals: {...globals.browser, ...globals.node}}},
  eslintPluginPrettierRecommended,
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      'prefer-template': "warn",

      '@typescript-eslint/no-explicit-any': 1,
      '@typescript-eslint/consistent-type-imports': ['error', {'fixStyle': 'separate-type-imports'}],
    },
  },
]
