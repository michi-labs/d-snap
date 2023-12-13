const webpack = require("webpack");

const DFXWebPackConfig = require("./dfx.webpack.config");
DFXWebPackConfig.bootstrap("../../..");

// Make DFX_NETWORK available to Web Browser with default "local" if DFX_NETWORK is undefined
const EnvPlugin = new webpack.EnvironmentPlugin({
    DFX_NETWORK: "local",
});

module.exports = {
    webpack: (config) => {
        // Plugin
        config.plugins.push(EnvPlugin);

        return config;
    },
    transpilePackages: ["icp-connect-core", "icp-connect-react"],
    output: "export",
    distDir: "build",
};
