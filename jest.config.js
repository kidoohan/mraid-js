/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  collectCoverageFrom: ["src/**/*.ts"],
  modulePaths: ["<rootDir>/node_modules", "<rootDir>/src"],
  testPathIgnorePatterns: ["/node_modules/"],
};
