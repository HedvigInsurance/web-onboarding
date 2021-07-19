const path = require('path')
const webpack = require('webpack')
const SentryWebpackPlugin = require('@sentry/webpack-plugin')
const webpackConfig = require('./webpack.config.base')

const root = path.resolve(__dirname, '..')

const whiteListedEnvVars = [
  'PORT',
  'USE_AUTH',
  'AUTH_NAME',
  'AUTH_PASS',
  'CSP_REPORT_ENDPOINT',
  'GIRAFFE_HOST',
  'GIRAFFE_WS_ENDPOINT',
  'CONTENT_SERVICE_ENDPOINT',
  'USE_HELMET',
  'FORCE_HOST',
  'SEGMENT_API_KEY',
  'SENTRY_DSN',
  'SENTRY_ENVIRONMENT',
  'HEROKU_SLUG_COMMIT',
  'HEROKU_DYNO_ID',
  'ADYEN_ORIGIN_KEY',
  'ADYEN_ENVIRONMENT',
  'NODE_ENV',
]

module.exports = webpackConfig({
  entry: {
    server: [path.resolve(root, 'src/server/serverEntry.tsx')],
  },
  target: 'node',
  node: {
    __dirname: true,
  },
  mode: process.env.NODE_ENV || 'development',
  bail: process.env.NODE_ENV !== 'development',
  context: root,
  output: {
    filename: '[name].js',
    path: path.resolve(root, 'build'),
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      ...whiteListedEnvVars.reduce(
        (acc, curr) => ({
          ...acc,
          [`process.env.${curr}`]: `process.env.${curr}`,
        }),
        {},
      ),
    }),
    ...(process.env.SENTRY_AUTH_TOKEN
      ? [
          new SentryWebpackPlugin({
            release: process.env.HEROKU_SLUG_COMMIT,
            include: './build',
            org: 'hedvig',
            project: 'web-onboarding',
            ignore: ['node_modules', 'webpack.*.js'],
          }),
        ]
      : []),
  ],
})
