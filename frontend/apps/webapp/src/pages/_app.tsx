import "../app/globals.css";
import { AuthContextProvider } from "../lib/auth/auth-context";
import { CanisterTypes, Canisters } from "@/declarations";
import { Client } from "icp-connect-core/client";
import { InternetIdentity } from "icp-connect-core/identity-providers";
import { IcpConnectContextProvider } from "icp-connect-react/context";
import { AppProps } from "next/app";
import { useEffect, useState } from "react";

export type ClientCanisterType = Client<CanisterTypes>;

export default function MyApp({ Component, pageProps }: AppProps) {
  const [client, setClient] = useState<Client<CanisterTypes> | undefined>();

  useEffect(() => {
    initClient();
  }, []);

  async function initClient() {
    const internetIdentity = new InternetIdentity({
      providerUrl: process.env.NEXT_PUBLIC_INTERNET_IDENTITY_URL,
    });

    const client = await Client.create<CanisterTypes>({
      host: process.env.NEXT_PUBLIC_IC_HOST!,
      canisters: Canisters,
      providers: {
        "internet-identity": internetIdentity,
      },
    });

    setClient(client);
  }

  return client ? (
    <IcpConnectContextProvider client={client}>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </IcpConnectContextProvider>
  ) : (
    <div>Loading</div>
  );
}
