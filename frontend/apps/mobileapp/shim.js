import 'react-native-url-polyfill/auto';
import { polyfill as polyfillEncoding } from 'react-native-polyfill-globals/src/encoding';
import { polyfill as polyfillURL } from 'react-native-polyfill-globals/src/url';

polyfillEncoding();
polyfillURL();

/**
 * Polify BigInt.toJSON for react-native
 * @returns {number}
 */
BigInt.prototype.toJSON = function() { return Number(this.toString()) }
