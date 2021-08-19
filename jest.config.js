module.exports = {
  transform: {
    '\\.tsx?$': 'babel-jest',
  },
  testRegex: '\\.test\\.(ts|tsx|js)$',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  moduleDirectories: ['node_modules', 'src/client', 'src'],
  setupFiles: ['<rootDir>/setup-mock-analytics.js'],
  setupFilesAfterEnv: ['<rootDir>/setup-testing-library.ts'],
}
