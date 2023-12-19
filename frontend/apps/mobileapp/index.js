import "./globals.js";
import App from "./src/App";
import { registerRootComponent } from "expo";
import "fast-text-encoding";
import "react-native-url-polyfill/auto";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
