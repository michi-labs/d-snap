import { Actor, ActorConfig, HttpAgent } from "@dfinity/agent";
import { IDL } from "@dfinity/candid";
import { Principal } from "@dfinity/principal";

export type Canister = {
  idlFactory: IDL.InterfaceFactory;
  canisterId: string | Principal;
  options?: ActorConfig;
};
export type Canisters = { [key: string]: Canister };

export type CreateClientParams = {
  host: string;
  canisters: Canisters;
  providers: IdentityProviders;
};

export type IdentityProvider = { url: string };

export type IdentityProviders = { [key: string]: IdentityProvider };

export class Client {
  private actors: Map<string, Actor> = new Map();
  private providers: Map<string, IdentityProvider> = new Map();

  constructor(
    private readonly agent: HttpAgent,
    canisters: Canisters,
    providers: IdentityProviders
  ) {
    this.init(canisters, providers);
  }

  private init(canisters: Canisters, providers: IdentityProviders): void {
    this.agent.fetchRootKey().then((err: any) => {
      console.warn(
        "Unable to fetch root key. Check to ensure that your local replica is running"
      );
    });

    this.setActors(canisters);
    this.setProviders(providers);
  }

  private setActors(canisters: Canisters): void {
    Object.entries(canisters).forEach(([key, canister]) => {
      const { idlFactory, canisterId, options = {} } = canister;

      const actor = Actor.createActor(idlFactory, {
        agent: this.agent,
        canisterId,
        ...options,
      });

      this.actors.set(key, actor);
    });
  }

  private setProviders(providers: IdentityProviders): void {
    Object.entries(providers).forEach(([key, providers]) => {
      const { url } = providers;

      const provider = {
        url,
      };

      this.providers.set(key, provider);
    });
  }

  public getActor(name: string): Actor | undefined {
    return this.actors.get(name);
  }

  public getProvider(name: string): IdentityProvider | undefined {
    return this.providers.get(name);
  }

  static createClient(params: CreateClientParams) {
    const { host, canisters, providers } = params;

    const agent = new HttpAgent({
      host,
      verifyQuerySignatures: false,
    });

    return new Client(agent, canisters, providers);
  }
}
