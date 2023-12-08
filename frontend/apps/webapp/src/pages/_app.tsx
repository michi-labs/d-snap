import type { AppProps } from "next/app";
import "../app/globals.css";

import { Client } from "../packages/icp/client";
import { IcpContextProvider } from "../packages/icp/context";

// @ts-ignore
import { idlFactory as testIdlFactory } from "../declarations/test/test.did.js";
// @ts-ignore
import { idlFactory as userIdlFactory } from "../declarations/user/user.did.js";
import { useEffect, useState } from "react";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [client, setClient] = useState<Client | undefined>(undefined);

  useEffect(() => {
    const client = Client.createClient({
      host: process.env.NEXT_PUBLIC_IC_HOST!,
      canisters: {
        test: {
          idlFactory: testIdlFactory,
          canisterId: process.env.NEXT_PUBLIC_TEST_CANISTER_ID!,
        },
        user: {
          idlFactory: userIdlFactory,
          canisterId: process.env.NEXT_PUBLIC_USER_CANISTER_ID!,
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
