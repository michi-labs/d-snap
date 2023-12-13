const DFXWebPackConfig = require("./dfx.webpack.config");
DFXWebPackConfig.bootstrap("../../..");

const { withExpo } = require("@expo/next-adapter");
const webpack = require("webpack");

// Make DFX_NETWORK available to Web Browser with default "local" if DFX_NETWORK is undefined
const EnvPlugin = new webpack.EnvironmentPlugin({
  DFX_NETWORK: "local",
});

module.exports = withExpo({
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Plugin
    config.plugins.push(EnvPlugin);

    return config;
  },
  transpilePackages: ["expo-web-browser", "expo-secure-store"],
  output: "export",
  distDir: "build",
});
