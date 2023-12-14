import { IdentityProvider } from "../identity-provider.interface";
import { InternetIdentityConfig } from "./internet-identity.types";
import { Identity } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { Principal } from "@dfinity/principal";

const defaultConfig: InternetIdentityConfig = {
  providerUrl: "https://identity.ic0.app",
};

export class InternetIdentity implements IdentityProvider {
  private config: InternetIdentityConfig = defaultConfig;
  private client!: AuthClient;
  private isAuth!: boolean;
  private identity!: Identity;
  private principal!: Principal;

  constructor(config: InternetIdentityConfig = {}) {
    this.config = {
      ...this.config,
      ...config,
    };
  }

  public async init(): Promise<void> {
    this.client = await AuthClient.create();
    this.isAuth = await this.client.isAuthenticated();
    this.identity = this.client.getIdentity();
    this.principal = this.identity?.getPrincipal();
  }

  private async setData(): Promise<void> {
    if (!this.client) throw new Error("init must be called before this method");

    try {
      this.isAuth = await this.client.isAuthenticated();
      this.identity = this.client.getIdentity();
      this.principal = this.identity?.getPrincipal();
    } catch (error) {
      throw error;
    }
  }

  public connect(): Promise<void> {
    if (!this.client) throw new Error("init must be called before this method");

    return new Promise<void>((resolve, reject) => {
      this.client.login({
        identityProvider: this.config.providerUrl,
        onSuccess: async () => {
          await this.setData();
          resolve();
        },
        onError: reject,
      });
    });
  }

  public async disconnect(): Promise<void> {
    if (!this.client) throw new Error("init must be called before this method");

    try {
      await this.client.logout();
      await this.setData();
    } catch (error) {
      throw error;
    }
  }

  public isAuthenticated(): boolean {
    if (!this.client) throw new Error("init must be called before this method");

    return this.isAuth;
  }

  public getIdentity(): Identity {
    if (!this.client) throw new Error("init must be called before this method");

    return this.identity;
  }

  public getPrincipal(): Principal {
    if (!this.client) throw new Error("init must be called before this method");

    return this.principal;
  }
}
