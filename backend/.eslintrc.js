module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
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
		'@typescript-eslint/explicit-module-boundary-types': 'off',
	},
};
