import type {Config} from 'jest';

const config: Config = {
	// ... your existing config properties

	// Indicates whether the coverage information should be collected while executing the test
	collectCoverage: true,

	// The directory where Jest should output its coverage files
	coverageDirectory: "coverage",

	// Indicates which provider should be used to instrument code for coverage
	coverageProvider: "v8",

	// A preset that is used as a base for Jest's configuration
	preset: 'ts-jest',

	// The glob patterns Jest uses to detect test files
	// Add or modify this property to include the pattern to ignore the dist folder
	testPathIgnorePatterns: [
		"/node_modules/",
		"/dist/" // This pattern ignores any files in the dist folder
	],

	// Whether to use watchman for file crawling
	// watchman: true,
};

export default config;
