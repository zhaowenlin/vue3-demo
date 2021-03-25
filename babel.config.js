module.exports = {
  presets: [
    [
      '@babel/env',
      {
        loose: true,
        modules: false
      }
    ],
    '@babel/typescript'
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@vue/babel-plugin-jsx',
    '@babel/transform-runtime',
    'lodash'
  ],
  overrides: [
    {
      test: /\.vue$/,
      plugins: ['@babel/transform-typescript']
    }
  ],
  env: {
    utils: {
      ignore: ['**/*.test.ts', '**/*.spec.ts'],
      presets: [
        [
          '@babel/env',
          {
            loose: true,
            modules: false
          }
        ]
      ],
      plugins: [
        [
          'babel-plugin-module-resolver',
          {
            root: ['perfintech'],
            alias: {
              '@perfintech': 'perfintech/lib'
            }
          }
        ]
      ]
    }
  }
}
