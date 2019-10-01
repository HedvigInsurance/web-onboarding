const path = require('path')

module.exports = {
  clientEntry: path.resolve(__dirname, 'src/clientEntry.tsx'),
  serverEntry: path.resolve(__dirname, 'src/serverEntry.tsx'),
  context: __dirname, // Where webpack should work
  clientPath: path.resolve(__dirname, 'build/assets/'), // Build asset path
  serverPath: path.resolve(__dirname, 'build/'), // Build asset path
  port: 8038, // The WDS port
  developmentPublicPath: 'http://0.0.0.0:8038/', // Client public path during development, i.e. "http://0.0.0.0:8081/". Port must match the port directive
  productionPublicPath: '/new-member-assets/', //  Client public path in production, i.e. "/assets/"
  envVars: [
    'USE_AUTH',
    'AUTH_NAME',
    'AUTH_PASS',
    'CSP_REPORT_ENDPOINT',
    'GIRAFFE_ENDPOINT',
    'GIRAFFE_WS_ENDPOINT',
    'USE_HELMET',
    'FORCE_HOST',
    'SEGMENT_API_KEY',
    'SENTRY_DSN',
    'SENTRY_ENVIRONMENT',
    'HEROKU_SLUG_COMMIT',
    'HEROKU_DYNO_ID',
    'FIREBASE_LINK_DOMAIN',
    'ANDROID_PACKAGE_NAME',
    'ANDROID_MINIMUM_VERSION',
    'APPLE_BUNDLE_ID',
    'APP_STORE_ID',
    'IOS_MINIMUM_VERSION',
    'BRANCH_API_KEY',
  ],
}
