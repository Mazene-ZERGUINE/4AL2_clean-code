module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'angular'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:angular/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/angular',
  ],
  rules: {
    "semi": ["error", "always"],
    "no-console": "warn",
    "no-unused-vars": ["error", { "args": "none" }],
    "@typescript-eslint/naming-convention": [
      "error",
      { "selector": "variable", "format": ["camelCase", "UPPER_CASE"] },
      { "selector": "function", "format": ["camelCase"] },
      { "selector": "interface", "format": ["PascalCase"] }
    ],
    "@typescript-eslint/no-unused-vars": ["error", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }],
    'no-console': 'warn',
    'angular/controller-as-vm': ['error', 'never'],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
};
