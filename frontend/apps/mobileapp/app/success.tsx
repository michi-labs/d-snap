import { useEffect, useState } from "react";
import { Linking, Text, View } from "react-native";

import { useAuth } from "icp-connect-react/hooks";

const SuccessPage = () => {
  const { onAppLinkOpened } = useAuth();
  const [params, setParams] = useState<URLSearchParams | undefined>(undefined);

  useEffect(() => {
    console.log("success");

    async function onLoad() {
      const urlString = await Linking.getInitialURL();

      if (urlString) {
        const url = new URL(urlString);
        const params = new URLSearchParams(url.search);
        await onAppLinkOpened(params);
        setParams(params);
        // TODO: Navigate Profile
      } else {
        console.warn("No initial URL found");
      }
    }

    onLoad();
  }, []);

  return (
    <View>
      <Text>Mobile App</Text>
      <Text>Coming soon...</Text>
      <Text>{params && JSON.stringify(params)}</Text>
    </View>
  );
};

export default SuccessPage;
