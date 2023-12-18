import { ActorMap, CanisterMap, CreateClientOptions, IdentityProviders } from "./client.types";
import { Actor, AnonymousIdentity, HttpAgent, Identity } from "@dfinity/agent";

export class Client<T extends Record<string, any>> {
  private actors: ActorMap<T> = {} as ActorMap<T>;

  private constructor(
    private identity: Identity,
    private readonly agent: HttpAgent,
    private readonly _canisters: CanisterMap<T>,
    private readonly providers: IdentityProviders
  ) {
    this.init();
  }

  private init(): void {
    this.agent
      .fetchRootKey()
      .then((key) => {
        console.log("Root key fetched");
        console.log({ key });
      })
      .catch((err: any) => {
        console.warn("Unable to fetch root key. Check to ensure that your local replica is running");
        console.log({ err });
      });

    this.setActors();
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

    const identity = new AnonymousIdentity();

    const agent = new HttpAgent({
      host,
      identity: new AnonymousIdentity(),
    });

    return new Client<T>(identity, agent, canisters, providers);
  }
}
