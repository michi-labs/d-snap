import { IdentityProvider } from "../identity-provider.interface";
import { InternetIdentityReactNativeConfig } from "./internet-identity-react-native.types";
import { AnonymousIdentity, Identity, SignIdentity, toHex } from "@dfinity/agent";
import {
  Ed25519KeyIdentity,
  DelegationChain,
  DelegationIdentity,
  isDelegationValid,
} from "@dfinity/identity";
import { Principal } from "@dfinity/principal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import * as WebBrowser from "expo-web-browser";

export const KEY_STORAGE_KEY = "identity";
export const KEY_STORAGE_DELEGATION = "delegation";

export type StoredKey = string | CryptoKeyPair;

export class InternetIdentityReactNative implements IdentityProvider {
  private _identity: Identity = new AnonymousIdentity();
  private _key: SignIdentity | null = null;
  private _chain: DelegationChain | null = null;

  constructor(private readonly config: InternetIdentityReactNativeConfig) {}

  public async init(): Promise<void> {
    const localKey = await this.getKey();
    const localChain = await this.getChain();

    if (localChain && !isDelegationValid(localChain)) {
      await this.deleteChain();
    }

    if (localKey) {
      if (localChain && isDelegationValid(localChain)) {
        const identity = DelegationIdentity.fromDelegation(localKey, localChain);
        this._identity = identity;
      }
    } else {
      const key = Ed25519KeyIdentity.generate();
      await this.saveKey(key);
    }
  }

  private async getKey(): Promise<Ed25519KeyIdentity | undefined> {
    const storedKey = await SecureStore.getItemAsync(KEY_STORAGE_KEY);

    if (storedKey) return Ed25519KeyIdentity.fromJSON(storedKey);
  }

  private saveKey(key: Ed25519KeyIdentity): Promise<void> {
    this._key = key;
    return SecureStore.setItemAsync(KEY_STORAGE_KEY, JSON.stringify(key));
  }

  private async getChain(): Promise<DelegationChain | undefined> {
    const storedDelegation = await AsyncStorage.getItem(KEY_STORAGE_DELEGATION);
    if (storedDelegation) return DelegationChain.fromJSON(JSON.parse(storedDelegation));
  }

  private saveChain(chain: DelegationChain): Promise<void> {
    this._chain = chain;
    return AsyncStorage.setItem(KEY_STORAGE_DELEGATION, JSON.stringify(chain.toJSON()));
  }

  private deleteChain(): Promise<void> {
    return SecureStore.deleteItemAsync("delegation");
  }

  public async successHandler(url: string): Promise<void> {
    if (!this.getPrincipal().isAnonymous()) return;

    const search = new URLSearchParams(url?.split("?")[1]);
    const delegations = search.get("delegations");
    const userPublicKey = search.get("userPublicKey");
    // TODO: validate this._key === userPublicKey

    if (delegations && userPublicKey) {
      const chain = DelegationChain.fromJSON(JSON.parse(decodeURIComponent(delegations)));

      await this.saveChain(chain);

      if (this._key && this._chain) {
        const identity: DelegationIdentity = DelegationIdentity.fromDelegation(this._key, this._chain);

        this._identity = identity;

        WebBrowser.dismissBrowser();
      } else {
        throw new Error("key or chain aren't defined");
      }
    }
  }

  public async connect(): Promise<void> {
    if (!this._key) throw new Error("Key not set");

    // If `connect` has been called previously, then close/remove any previous windows
    WebBrowser.dismissBrowser();

    const derKey = toHex(this._key.getPublicKey().toDer());

    // Open a new window with the IDP provider.
    const url = new URL(this.config.providerUrl);
    url.searchParams.set("redirect_uri", encodeURIComponent(this.config.appLink));

    url.searchParams.set("pubkey", derKey);
    await WebBrowser.openBrowserAsync(url.toString());
  }

  public async disconnect(): Promise<void> {
    this._identity = new AnonymousIdentity();
    this._chain = null;
  }

  public isAuthenticated(): boolean {
    return !this.getPrincipal().isAnonymous();
  }

  public getIdentity(): Identity {
    return this._identity;
  }

  public getPrincipal(): Principal {
    return this._identity.getPrincipal();
  }
}
