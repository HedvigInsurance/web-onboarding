module.exports = (api) => {
  api.cache(true)

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
          useBuiltIns: 'usage',
          corejs: 2,
          targets: {
            browsers: ['last 3 versions', 'ie >= 11'],
          },
          include: ['es6.promise', 'es6.array.iterator'],
          shippedProposals: true,
        },
      ],
      '@babel/preset-react',
      ['@babel/preset-typescript', { isTSX: true, allExtensions: true }],
    ],
    plugins: [
      'react-hot-loader/babel',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-nullish-coalescing-operator',
      'emotion',
    ],
    env: {
      test: {
        plugins: [
          '@babel/transform-modules-commonjs',
          'babel-plugin-dynamic-import-node',
        ],
      },
    },
  }
}
