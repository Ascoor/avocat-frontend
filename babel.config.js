module.exports = function (api) {
  api.cache(true);

  const presets = ['@babel/preset-env', '@babel/preset-react'];
  const plugins = [
    '@babel/plugin-transform-class-properties',
    '@babel/plugin-transform-object-rest-spread',
    '@babel/plugin-syntax-class-properties',
  ];

  return {
    presets,
    plugins,
  };
};
