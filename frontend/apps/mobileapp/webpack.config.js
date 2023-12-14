const createExpoWebpackConfigAsync = require('@expo/webpack-config');

const DFXWebPackConfig = require("./dfx.webpack.config");
DFXWebPackConfig.bootstrap("../../..");

module.exports = async function (env, argv) {
    const config = await createExpoWebpackConfigAsync(env, argv);
    // Customize the config before returning it.
    return config;
};
