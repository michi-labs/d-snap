import { AuthButton } from "../components/auth/auth-button";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export function Login() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <AuthButton />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
