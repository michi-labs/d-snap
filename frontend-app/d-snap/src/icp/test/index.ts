import { Actor, HttpAgent } from "@dfinity/agent";

import { idlFactory } from "../../declarations/test/test.did.js";
export { idlFactory } from "../../declarations/test/test.did.js";

export const canisterId = process.env.NEXT_PUBLIC_TEST_CANISTER_ID!;

type CreateActorOptions = {
  agentOptions?: any;
  agent?: any;
  actorOptions?: any;
};

export const createActor = (
  canisterId: string,
  options: CreateActorOptions = {}
) => {
  const agent = options.agent || new HttpAgent({ ...options.agentOptions });

  if (options.agent && options.agentOptions) {
    console.warn(
      "Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent."
    );
  }

  // Fetch root key for certificate validation during development
  if (process.env.DFX_NETWORK !== "ic") {
    agent.fetchRootKey().catch((err: any) => {
      console.warn(
        "Unable to fetch root key. Check to ensure that your local replica is running"
      );
      console.error(err);
    });
  }

  // Creates an actor with using the candid interface and the HttpAgent
  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
    ...options.actorOptions,
  });
};

export const test = createActor(canisterId, {
  agentOptions: {
    host: process.env.NEXT_PUBLIC_IC_HOST,
  },
});
