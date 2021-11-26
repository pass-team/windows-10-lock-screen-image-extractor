module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '14',
        },
      },
    ],
  ],
  env: {
    test: {
      plugins: ['@babel/plugin-transform-modules-commonjs'],
    },

    development: {
      plugins: [
        '@babel/plugin-proposal-class-properties',
        [
          '@babel/plugin-transform-modules-commonjs',
          {
            allowTopLevelThis: true,
          },
        ],
      ],
    },

    production: {
      plugins: [
        '@babel/plugin-proposal-class-properties',
        [
          '@babel/plugin-transform-modules-commonjs',
          {
            allowTopLevelThis: true,
          },
        ],
      ],
    },
  },
};
