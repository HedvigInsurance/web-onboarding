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
        ENABLE_QUOTE_CART_API: JSON.stringify(
          process.env.ENABLE_QUOTE_CART_API,
        ),
      },
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new StatsWriterPlugin({ filename: 'stats.json' }),
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
    // new BundleAnalyzerPlugin(),
  ].filter(Boolean),
})
