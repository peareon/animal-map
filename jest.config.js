module.exports = {
  verbose: true,
  testEnvironment: "jsdom",
  moduleDirectories: ["node_modules", "src"],
  transformIgnorePatterns: ["node_modules/(?!(axios|@reduxjs/toolkit)/)"],
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1"
  },
  testMatch: [
    "<rootDir>/__tests__/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}"
  ],
};