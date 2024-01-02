const path = require("path");
const fs = require("fs");

/**
 * Sets variables needed to interact with canisters
 *
 * @param {String[]} canisterNames
 * @param {String} relativeRootPath
 */
function setCanisterVariables(canisterNames, relativeRootPath) {
  try {
    const network = process.env.DFX_NETWORK || "local";

    const canisters = require(path.resolve(relativeRootPath, ".dfx", network, "canister_ids.json"));

    const variables = [];

    for (const name of canisterNames) {
      const variableName = `NEXT_PUBLIC_${name.toUpperCase()}_CANISTER_ID`;

      process.env[variableName] = canisters[name][network];

      variables.push(variableName);
    }

    console.log("Variables set: ", variables);
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Copies declarations from root project
 *
 * @param {String[]} canisterNames
 * @param {String} relativeRootPath
 */
function copyDeclarations(canisterNames, relativeRootPath) {
  const DIRECTORY_PATH = path.resolve(relativeRootPath, "src/declarations");

  const dirents = fs.readdirSync(DIRECTORY_PATH, { withFileTypes: true });

  dirents
    .filter((dirent) => canisterNames.includes(dirent.name))
    .forEach((dirent) => {
      const source = path.resolve(dirent.path, dirent.name);
      const dest = path.resolve("./src/declarations", dirent.name);
      fs.cpSync(source, dest, { recursive: true });
    });

  console.log("Declarations copied", canisterNames);
}

function fixFiles(canisterNames) {
  const DECLARATIONS_DIRECTORY_PATH = path.resolve("./src/declarations");

  for (const name of canisterNames) {
    const CANISTER_DECLARATIONS_PATH = path.resolve(DECLARATIONS_DIRECTORY_PATH, name, "index.js");
    fs.readFile(CANISTER_DECLARATIONS_PATH, "utf8", function (err, data) {
      if (err) {
        throw new Error(`Read file index.js error`);
      }

      const ENV_NAME = `process.env.${name.toUpperCase()}_CANISTER_ID`;
      const NEXT_ENV_NAME = `process.env.NEXT_PUBLIC_${name.toUpperCase()}_CANISTER_ID`;
      const CREATE_ACTOR_TEXT = `export const ${name} = createActor(canisterId);`;

      const result = data.replace(ENV_NAME, NEXT_ENV_NAME).replace(CREATE_ACTOR_TEXT, "");

      fs.writeFile(CANISTER_DECLARATIONS_PATH, result, "utf8", function (error) {
        if (error) throw new Error("File can't be replaced");
      });
    });
  }
}

/**
 *
 *
 * @param {String} relativeRootPath Relative path to root project
 */
function bootstrap(relativeRootPath) {
  const dfx = require(path.resolve(relativeRootPath, "dfx.json"));

  const canisterNames = Object.keys(dfx.canisters)
    .filter((key) => key !== "internet-identity")
    .filter((key) => dfx.canisters[key].type !== "assets");

  setCanisterVariables(canisterNames, relativeRootPath);
  copyDeclarations(canisterNames, relativeRootPath);
  fixFiles(canisterNames);
}

module.exports = {
  bootstrap: bootstrap,
};
