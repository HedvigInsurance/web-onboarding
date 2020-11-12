const path = require('path')
const webpack = require('webpack')
const { StatsWriterPlugin } = require('webpack-stats-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
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
      },
    }),
    new StatsWriterPlugin({ filename: 'stats.json' }),
    // new BundleAnalyzerPlugin(),
  ].filter(Boolean),
})
