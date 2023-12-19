import { AuthButton } from "../src/components/auth/auth-button";
import * as test from "./../src/declarations/test";
import * as user from "./../src/declarations/user";
import { IC_HOST, INTERNET_IDENTITY_URL } from "@env";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Client } from "icp-connect-core/client";
import { InternetIdentityReactNative } from "icp-connect-react-native/identity-providers";
import { IcpConnectContextProvider } from "icp-connect-react/context";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const canisters = {
  test,
  user,
};

type CanisterTypes = typeof canisters;

const IndexPage = () => {
  const [client, setClient] = useState<Client<CanisterTypes> | undefined>();

  useEffect(() => {
    console.log("init client");
    initClient();
  }, []);

  async function initClient() {
    const internetIdentity = new InternetIdentityReactNative({
      providerUrl: "https://7abc-177-228-109-161.ngrok-free.app?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai",
      appLink: "exp://192.168.0.125:8081", //TODO: Get this dynamically
    });

    const client = await Client.create<CanisterTypes>({
      host: IC_HOST,
      canisters,
      providers: {
        "internet-identity": internetIdentity,
      },
    });

    setClient(client);
  }
  return client ? (
    <IcpConnectContextProvider client={client}>
      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
        <AuthButton />
        <StatusBar style="auto" />
        <Link replace href="/success">
          <Text>Success</Text>
        </Link>
      </View>
    </IcpConnectContextProvider>
  ) : (
    <Text>Loading...</Text>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default IndexPage;
