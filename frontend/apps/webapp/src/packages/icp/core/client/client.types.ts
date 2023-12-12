import {
  ActorConfig,
  ActorMethod,
  ActorSubclass,
  Agent,
  HttpAgentOptions,
} from "@dfinity/agent";
import { IDL } from "@dfinity/candid";
import { Principal } from "@dfinity/principal";

import { IdentityProvider } from "../identity-providers/identity-provider.interface";

export type CreateActorOptions = {
  /**
   * @see {@link Agent}
   */
  agent?: Agent;
  /**
   * @see {@link HttpAgentOptions}
   */
  agentOptions?: HttpAgentOptions;
  /**
   * @see {@link ActorConfig}
   */
  actorOptions?: ActorConfig;
};

export type Canister = {
  canisterId: string | Principal;
  createActor: <T = Record<string, ActorMethod<any[], any>>>(
    canisterId: string | Principal,
    options?: CreateActorOptions
  ) => ActorSubclass<T>;
  idlFactory: IDL.InterfaceFactory;
  configuration?: ActorConfig;
};

export type Canisters = { [key: string]: Canister };

export type CreateClientOptions = {
  host: string;
  canisters: Canisters;
  providers: IdentityProviders;
};

export type IdentityProviders = { [key: string]: IdentityProvider };
