import * as test from "./declarations/test";
import * as user from "./declarations/user";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import SuccessPage from "./pages/Success";
// @ts-ignore
import { IC_HOST, INTERNET_IDENTITY_URL } from "@env";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Client } from "icp-connect-core/client";
import { InternetIdentityReactNative } from "icp-connect-react-native/identity-providers";
import { IcpConnectContextProvider } from "icp-connect-react/context";
import { useEffect, useState } from "react";
import { Text } from "react-native";

const canisters = {
  test,
  user,
};

type CanisterTypes = typeof canisters;

export default function App() {
  const [client, setClient] = useState<Client<CanisterTypes> | undefined>();

  useEffect(() => {
    initClient();
  }, []);

  async function initClient() {
    const internetIdentity = new InternetIdentityReactNative({
      providerUrl: INTERNET_IDENTITY_URL,
      appLink: "exp://192.168.0.125:8081", //TODO: Get this dinamically
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

  const Stack = createNativeStackNavigator();

  return client ? (
    <IcpConnectContextProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
          {/* TODO: add tabs */}
          {/* <Stack.Screen name="home" component={Home} /> */}
          <Stack.Screen name="success" component={SuccessPage} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </IcpConnectContextProvider>
  ) : (
    <Text>Loading...</Text>
  );
}
