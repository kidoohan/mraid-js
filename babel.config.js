module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        modules: false,
        useBuiltIns: false,
        targets: {
          browsers: ["> 1%", "last 2 versions", "not dead"],
        },
      },
    ],
    "@babel/preset-typescript",
  ],
  plugins: [
    [
      "@babel/plugin-transform-runtime",
      {
        regenerator: false,
        corejs: 3,
      },
    ],
  ],
};
