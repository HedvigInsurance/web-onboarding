const path = require('path')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config.base')

const root = path.resolve(__dirname, '..')

module.exports = webpackConfig({
  entry: {
    app: [path.resolve(root, 'src/client/clientEntry.tsx')],
  },
  target: ['web', 'es5'],
  mode: 'development',
  devServer: {
    compress: true,
    hot: true,
    inline: true,
    host: '0.0.0.0',
    disableHostCheck: true,
    port: 8041,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    transportMode: 'ws',
    publicPath: '/new-member-assets/',
  },
  devtool: 'eval-source-map',
  output: {
    filename: '[name].js',
    publicPath: '/new-member-assets/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        SENTRY_DSN: JSON.stringify(process.env.SENTRY_DSN),
        SENTRY_ENVIRONMENT: JSON.stringify('local'),
        ENABLE_QUOTE_CART_API: JSON.stringify(
          process.env.ENABLE_QUOTE_CART_API,
        ),
      },
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
  context: root,
})
