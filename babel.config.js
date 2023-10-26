module.exports = {
  presets: [['@babel/preset-env', { targets: { node: 'current' }, loose: true }], '@babel/preset-typescript'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@shared': './src/shared',
          '@admin': './src/admin',
        }
      }
    ],
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }]
  ]
};
