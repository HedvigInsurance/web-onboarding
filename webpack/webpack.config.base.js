const webpack = require('webpack')
const threadLoader = require('thread-loader')
const path = require('path')
const babelrc = require('../.babelrc')

threadLoader.warmup({}, ['babel-loader'])

module.exports = ({
  mode,
  entry,
  target,
  plugins,
  output,
  context,
  ...rest
}) => ({
  mode,
  resolve: {
    extensions: ['.ts', '.tsx', '.mjs', '.js', '.json'],
    modules: ['node_modules', path.resolve(context, 'src/client')],
    alias: {
      shared: path.resolve(context, 'src/shared'),
    },
  },
  entry,
  module: {
    rules: [
      {
        test: /\.(tsx?|js)$/,
        use: [
          'thread-loader',
          {
            loader: 'babel-loader',
            options: { ...babelrc, cacheDirectory: true },
          },
        ],
      },
    ],
  },
  devtool: 'cheap-source-map',
  target,
  context,
  stats: {
    colors: true,
    chunks: false,
    chunkModules: false,
    children: false,
  },
  output,
  plugins,
  bail: true,
  ...rest,
})
