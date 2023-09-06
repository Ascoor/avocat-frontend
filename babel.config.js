module.exports = function (api) {
    api.cache(true);
  
    const presets = [
      "@babel/preset-env",    // Handle modern JavaScript features
      "@babel/preset-react"   // Handle React JSX syntax
    ];
  
    const plugins = [
      "@babel/plugin-transform-object-rest-spread"  // Add any additional plugins you need here
    ];
  
    return {
      presets,
      plugins
    };
  };
  