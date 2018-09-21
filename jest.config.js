module.exports = {
  transform: {
    '\\.tsx?$': 'babel-jest',
  },
  testRegex: '\\.test\\.(ts|tsx|js)$',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  setupFiles: ['<rootDir>/test-setup-enzyme.js'],
}
