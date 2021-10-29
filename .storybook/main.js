const path = require('path')

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: ['storybook-addon-paddings', '@storybook/addon-essentials'],
  webpackFinal: async (config) => {
    config.resolve.modules.push(path.resolve(__dirname, '../src/client'))
    config.resolve.alias = {
      ...config.resolve.alias,
      shared: path.resolve(__dirname, '../src/shared'),
    }
    config.module.rules.push({
      test: /\.tsx?$/,
      use: [
        {
          loader: require.resolve('babel-loader'),
        },
      ],
    })
    config.resolve.extensions.push('.ts', '.tsx')

    return config
  },
}
