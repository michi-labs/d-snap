import { Actor, AnonymousIdentity, HttpAgent, Identity } from "@dfinity/agent";

import { FetchRootKeyError } from "../errors";
import { ActorMap, CanisterMap, CreateClientOptions, IdentityProviders } from "./client.types";

export class Client<T extends Record<string, any>> {
  private readonly host: URL;
  private readonly agent: HttpAgent;
  private identity: Identity;
  private actors: ActorMap<T> = {} as ActorMap<T>;

  private constructor(
    host: string,
    private readonly _canisters: CanisterMap<T>,
    private readonly providers: IdentityProviders
  ) {
    this.identity = new AnonymousIdentity();

    this.host = new URL(host);

    this.agent = new HttpAgent({
      host: this.host.origin,
      identity: new AnonymousIdentity(),
    });

    this.init();
  }

  private init(): void {
    if (this.isLocal()) {
      this.agent
        .fetchRootKey()
        .then((key) => {
          console.log("Root key fetched");
          console.log({ key });
        })
        .catch((err: any) => {
          throw new FetchRootKeyError(err);
        });
    }

    this.setActors();
  }

  private isLocal(): boolean {
    const { hostname } = this.host;
    const localHostNames = ["127.0.0.1", "localhost"];
    // TODO: wildcard for ngrok free and premium
    const ngrokHostName = /^.*\.ngrok-free\.app$/;

    return localHostNames.includes(hostname) || ngrokHostName.test(hostname);
  }

  public setIdentity(identity: Identity) {
    if (identity) this.agent.replaceIdentity(identity);
    else this.agent.invalidateIdentity();

    this.identity = identity;

    this.setActors();
  }

  public getIdentity(): Identity {
    return this.identity;
  }

  private setActors(): void {
    const actors = Object.entries(this._canisters).reduce((reducer, current) => {
      const [name, canister] = current;
      const { idlFactory, canisterId, configuration = {} } = canister;

      const actor = Actor.createActor(idlFactory, {
        agent: this.agent,
        canisterId,
        ...configuration,
      });

      return {
        ...reducer,
        [name]: actor,
      };
    }, {});

    this.actors = actors as ActorMap<T>;
  }

  public getActor<K extends keyof T>(name: K): ActorMap<T>[K] {
    return this.actors[name];
  }

  public getProviders(): IdentityProviders {
    return this.providers;
  }

  public static async create<T extends Record<string, any>>(options: CreateClientOptions<T>) {
    const { host, canisters, providers } = options;

    const inits = Object.entries(providers).map(async (current) => current[1].init());

    // TODO: donn't initialize inits here
    try {
      await Promise.all(inits);
    } catch (error) {
      throw error;
    }

    return new Client<T>(host, canisters, providers);
  }
}
