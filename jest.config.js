module.exports = {
  verbose: true,
  testEnvironment: "jsdom",
  moduleDirectories: ["node_modules", "src"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transformIgnorePatterns: ["node_modules/(?!(axios|@reduxjs/toolkit)/)"],
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1"
  }
};