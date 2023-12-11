import { AuthClient } from "@dfinity/auth-client";
import { Identity } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";

import { IdentityProvider } from "../identity-provider.interface";
import { InternetIdentityConfig } from "./internet-identity.types";

const defaultConfig: InternetIdentityConfig = {
  providerUrl: "https://identity.ic0.app",
};

export class InternetIdentity implements IdentityProvider {
  private config: InternetIdentityConfig = defaultConfig;
  private identity: Identity;
  private principal: Principal;

  private constructor(
    private readonly client: AuthClient,
    private isAuth: boolean,
    config: InternetIdentityConfig = {}
  ) {
    this.identity = this.client.getIdentity();
    this.principal = this.identity?.getPrincipal();
    this.config = {
      ...this.config,
      ...config,
    };
  }

  public static async create(config: InternetIdentityConfig = {}) {
    try {
      const client = await AuthClient.create();

      const isAuth = await client.isAuthenticated();

      return new InternetIdentity(client, isAuth, config);
    } catch (error) {
      throw error;
    }
  }

  public async init(): Promise<void> {}

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
    try {
      await this.client.logout();
      await this.setData();
    } catch (error) {
      throw error;
    }
  }

  public isAuthenticated(): boolean {
    return this.isAuth;
  }

  public getIdentity(): Identity {
    return this.identity;
  }

  public getPrincipal(): Principal {
    return this.principal;
  }
}
