const path = require('path')
const webpack = require('webpack')
const { StatsWriterPlugin } = require('webpack-stats-plugin')
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
    minimize: true,
    splitChunks: {
      chunks: 'all',
      name: 'common',
    },
  },
  devtool: false,
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      noSources: false,
      filename: '[file].map',
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new StatsWriterPlugin({ filename: 'stats.json' }),
    // new BundleAnalyzerPlugin(),
  ].filter(Boolean),
})
