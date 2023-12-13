const DFXWebPackConfig = require("./dfx.webpack.config");
DFXWebPackConfig.bootstrap("../../..");

const webpack = require("webpack");

// Make DFX_NETWORK available to Web Browser with default "local" if DFX_NETWORK is undefined
const EnvPlugin = new webpack.EnvironmentPlugin({
  DFX_NETWORK: "local",
});

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Plugin
    config.plugins.push(EnvPlugin);

    return config;
  },
  output: "export",
  distDir: "build",
};
