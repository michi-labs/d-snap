import {
  ActorConfig,
  ActorMethod,
  ActorSubclass,
  Agent,
  HttpAgent,
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

export type CanisterType = {
  canisterId: string | Principal;
  createActor: <T = Record<string, ActorMethod<any[], any>>>(
    canisterId: string | Principal,
    options?: CreateActorOptions
  ) => ActorSubclass<T>;
  idlFactory: IDL.InterfaceFactory;
  configuration?: ActorConfig;
};

export type CanisterMap = { [key: string]: CanisterType };

export type CreateClientOptions = {
  host: string;
  canisters: CanisterMap;
  providers: IdentityProviders;
};

export type ActorType = ActorSubclass<Record<string, ActorMethod<any[], any>>>;

export type ActorMap = { [key: string]: ActorType };

export type IdentityProviders = { [key: string]: IdentityProvider };
