const path = require('path')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config.base')

const root = path.resolve(__dirname, '..')

module.exports = webpackConfig({
  entry: {
    app: [
      '@babel/polyfill',
      'webpack-dev-server/client?http://0.0.0.0:8040/',
      'webpack/hot/dev-server',
      path.resolve(root, 'src/clientEntry.tsx'),
    ],
  },
  target: 'web',
  mode: 'development',
  optimization: {
    useNamedModules: true,
  },
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
  },
  output: {
    filename: '[name].js',
    publicPath: '/static/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
  context: root,
  watch: true,
})
