import "../app/globals.css";
import type { AppProps } from "next/app";

import { Client } from "../icp/client";
import { IcpContextProvider } from "../icp/context";

import * as test from "../declarations/test";
import { useEffect, useState } from "react";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [client, setClient] = useState<Client | undefined>(undefined);

  useEffect(() => {
    const client = Client.createClient({
      canisters: {
        test: {
          idlFactory: test.idlFactory,
          canisterId: process.env.NEXT_PUBLIC_TEST_CANISTER_ID!,
        },
      },
    });

    setClient(client);
  }, []);

  return client ? (
    <IcpContextProvider client={client}>
      <Component {...pageProps} />
    </IcpContextProvider>
  ) : (
    <div>Loading</div>
  );
}
