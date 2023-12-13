const webpack = require("webpack");
const transpileModules = require('next-transpile-modules');

const DFXWebPackConfig = require("./dfx.webpack.config");
DFXWebPackConfig.bootstrap("../../..");

const withTM = transpileModules(['icp-connect-core', 'icp-connect-react']);

// Make DFX_NETWORK available to Web Browser with default "local" if DFX_NETWORK is undefined
const EnvPlugin = new webpack.EnvironmentPlugin({
    DFX_NETWORK: "local",
});

module.exports = withTM({
    webpack: (config) => {
        // Plugin
        config.plugins.push(EnvPlugin);

        return config;
    },
    output: "export",
    distDir: "build",
});
