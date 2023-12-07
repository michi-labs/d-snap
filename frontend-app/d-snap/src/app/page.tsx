"use client";

import { createClient } from "@connect2ic/core";
import { InternetIdentity } from "@connect2ic/core/providers/internet-identity";
import {
  ConnectButton,
  ConnectDialog,
  Connect2ICProvider,
  useConnect,
} from "@connect2ic/react";
import "@connect2ic/core/style.css";
import { createActor } from "../../../../src/declarations/test";

const test = createActor(process.env.NEXT_PUBLIC_TEST_CANISTER_ID, {
  agentOptions: {
    host: process.env.NEXT_PUBLIC_IC_HOST,
  },
});

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  );
}

const client = createClient({
  canisters: {
    test,
  },
  providers: [
    new InternetIdentity({
      providerUrl:
        "http://127.0.0.1:4943/?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai",
    }),
  ],
  globalProviderConfig: {
    /*
     * Disables dev mode in production
     * Should be enabled when using local canisters
     */
    dev: true,
  },
});
