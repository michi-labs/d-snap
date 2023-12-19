import { AuthButton } from "../src/components/auth/auth-button";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

const IndexPage = () => {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <AuthButton />
      <StatusBar style="auto" />
      <Link replace href="/success">
        <Text>Success</Text>
      </Link>
    </View>
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
