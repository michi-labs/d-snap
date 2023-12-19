import { useAuth } from "icp-connect-react/hooks";
import { useEffect } from "react";
import { Linking, Text, View } from "react-native";

const SuccessPage = () => {
  const { onAppLinkOpened } = useAuth();

  // TODO: Execute here onAppLinkOpened

  useEffect(() => {
    console.log("success");

    async function onLoad() {
      const urlString = await Linking.getInitialURL();

      if (urlString) {
        const url = new URL(urlString);
        const params = new URLSearchParams(url.search);
        await onAppLinkOpened(params);
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
    </View>
  );
};

export default SuccessPage;
