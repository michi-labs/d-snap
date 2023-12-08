import type { AppProps } from "next/app";

import { Client } from "../icp/client";
import { IcpContextProvider } from "../icp/context";

import { idlFactory } from "../declarations/test/test.did.js";
import { useEffect, useState } from "react";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [client, setClient] = useState<Client | undefined>(undefined);

  useEffect(() => {
    const client = Client.createClient({
      host: process.env.NEXT_PUBLIC_IC_HOST || "http://127.0.0.1:4943",
      canisters: {
        test: {
          idlFactory: idlFactory,
          canisterId: process.env.NEXT_PUBLIC_TEST_CANISTER_ID!,
        },
      },
      providers: {
        "internet-identity": {
          url: process.env.NEXT_PUBLIC_INTERNET_IDENTITY_URL!,
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
