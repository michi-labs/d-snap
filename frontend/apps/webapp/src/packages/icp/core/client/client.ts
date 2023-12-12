import { Actor, HttpAgent, Identity } from "@dfinity/agent";

import { Actors, CreateClientOptions, IdentityProviders } from "./client.types";

export class Client {
  private actors: { [key: string]: Actor } = {};

  private constructor(
    private readonly agent: HttpAgent,
    private readonly _actors: Actors,
    private readonly providers: IdentityProviders
  ) {
    this.init(_actors);
  }

  private init(actors: Actors): void {
    this.agent.fetchRootKey().then((err: any) => {
      console.warn(
        "Unable to fetch root key. Check to ensure that your local replica is running"
      );
    });

    this.setActors(actors);
  }

  public setIdentity(identity?: Identity) {
    if (identity) this.agent.replaceIdentity(identity);
    else this.agent.invalidateIdentity();

    this.setActors(this._actors);
  }

  private setActors(canisters: Actors): void {
    const actors = Object.entries(canisters).reduce((reducer, current) => {
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

    this.actors = actors;
  }

  public getActor(name: string): Actor | undefined {
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
