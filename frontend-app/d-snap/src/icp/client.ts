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
  canisters: Canisters;
  options?: CreateClientOptions;
};

export type CreateClientOptions = {
  host: string;
};

export class Client {
  private actors: Map<string, Actor> = new Map();

  constructor(
    private readonly agent: HttpAgent,
    canisters: Canisters,
    private readonly options: CreateClientOptions
  ) {
    this.init(canisters);
  }

  private init(canisters: Canisters): void {
    this.agent.fetchRootKey().then((err: any) => {
      console.warn(
        "Unable to fetch root key. Check to ensure that your local replica is running"
      );
    });

    this.setActors(canisters);
  }

  private setActors(canisters: Canisters) {
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

  public getActor(name: string) {
    return this.actors.get(name);
  }

  static createClient(params: CreateClientParams) {
    const { canisters, options } = params;

    const config = {
      host: options?.host || "http://127.0.0.1:4943",
    };

    const agent = new HttpAgent({
      host: config.host,
      verifyQuerySignatures: false,
    });

    return new Client(agent, canisters, config);
  }
}
