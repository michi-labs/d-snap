import { Actor, HttpAgent, Identity } from "@dfinity/agent";

import {
  ActorMap,
  ActorType,
  CanisterMap,
  CreateClientOptions,
  IdentityProviders,
} from "./client.types";

export class Client {
  private actors: ActorMap = {};

  private constructor(
    private readonly agent: HttpAgent,
    private readonly _canisters: CanisterMap,
    private readonly providers: IdentityProviders
  ) {
    this.init();
  }

  private init(): void {
    this.agent.fetchRootKey().then((err: any) => {
      console.warn(
        "Unable to fetch root key. Check to ensure that your local replica is running"
      );
    });

    this.setActors();
  }

  public setIdentity(identity?: Identity) {
    if (identity) this.agent.replaceIdentity(identity);
    else this.agent.invalidateIdentity();

    this.setActors();
  }

  private setActors(): void {
    const actors = Object.entries(this._canisters).reduce(
      (reducer, current) => {
        const [name, canister] = current;
        const { idlFactory, canisterId, configuration = {} } = canister;

        const actor: ActorType = Actor.createActor(idlFactory, {
          agent: this.agent,
          canisterId,
          ...configuration,
        });

        return {
          ...reducer,
          [name]: actor,
        };
      },
      {}
    );

    this.actors = actors;
  }

  public getActor(name: string): ActorType {
    return this.actors[name];
  }

  public getProviders(): IdentityProviders {
    return this.providers;
  }

  public static async create(options: CreateClientOptions) {
    const { host, canisters, providers } = options;

    Object.keys(providers).forEach(async (key) => {
      await providers[key].init();
    });

    const agent = new HttpAgent({
      host,
      verifyQuerySignatures: false,
    });

    return new Client(agent, canisters, providers);
  }
}
