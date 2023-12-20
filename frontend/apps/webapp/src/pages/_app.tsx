import "../app/globals.css";
import { AppLoader } from "../components/app-loader";
import { AuthContextProvider } from "../lib/auth/auth-context";
import { canisters, CanisterTypes } from "dsnap/lib/canisters";
import { Client } from "icp-connect-core/client";
import { InternetIdentity } from "icp-connect-core/identity-providers";
import { IcpConnectContextProvider } from "icp-connect-react/context";
import { AppProps } from "next/app";
import { useEffect, useState } from "react";

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
      canisters,
      providers: {
        "internet-identity": internetIdentity,
      },
    });

    setClient(client);
  }

  return client ? (
    // @ts-ignore
    <IcpConnectContextProvider client={client}>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </IcpConnectContextProvider>
  ) : (
    <AppLoader />
  );
}
