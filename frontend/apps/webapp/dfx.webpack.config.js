const path = require("path")

function initCanisterIds() {
    let canisters;

    try {
        canisters = require(path.resolve("../../../.dfx", "local", "canister_ids.json"));
    } catch (error) {
        throw new Error("No canister_ids.json found");
    }

    const network = process.env.DFX_NETWORK || 'local';

    console.info(`initCanisterIds: network=${network}`);
    console.info(`initCanisterIds: DFX_NETWORK=${process.env.DFX_NETWORK}`);

    for (const canister in canisters) {
        process.env[`NEXT_PUBLIC_${canister.toUpperCase()}_CANISTER_ID`] =
            canisters[canister][network]
    }
}

module.exports = {
    initCanisterIds: initCanisterIds
}