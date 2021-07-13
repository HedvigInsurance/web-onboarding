const path = require('path')
const webpack = require('webpack')
const { StatsWriterPlugin } = require('webpack-stats-plugin')
const SentryWebpackPlugin = require('@sentry/webpack-plugin')
const webpackConfig = require('./webpack.config.base')

const root = path.resolve(__dirname, '..')

module.exports = webpackConfig({
  entry: {
    app: [path.resolve(root, 'src/client/clientEntry.tsx')],
  },
  target: ['web', 'es5'],
  mode: 'production',
  context: root,
  output: {
    filename: '[name]-[contenthash].js',
    publicPath: '/new-member-assets/',
    path: path.resolve(root, 'build/new-member-assets'),
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'common',
    },
  },
  devtool: 'source-map',
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        SENTRY_DSN: JSON.stringify(process.env.SENTRY_DSN),
        SENTRY_ENVIRONMENT: JSON.stringify(process.env.SENTRY_ENVIRONMENT),
        SENTRY_RELEASE: JSON.stringify(process.env.HEROKU_SLUG_COMMIT),
      },
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new StatsWriterPlugin({ filename: 'stats.json' }),
    process.env.SENTRY_AUTH_TOKEN
      ? new SentryWebpackPlugin({
          authToken: process.env.SENTRY_AUTH_TOKEN,
          org: 'hedvig',
          project: 'web-onboarding',
          release: process.env.HEROKU_SLUG_COMMIT,
          include: './build/new-member-assets',
          ignore: ['node_modules', 'webpack.*.js'],
        })
      : null,
    // new BundleAnalyzerPlugin(),
  ].filter(Boolean),
})
