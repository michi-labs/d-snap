import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { AuthButton } from "../src/components/auth/auth-button";

const IndexPage = () => {
  return (
    <View style={styles.container}>
      <Text className="text-lg bg-red-400">Open up App.tsx to start working on your app!</Text>
      <AuthButton />
      <StatusBar style="auto" />
      <Link replace href="/success">
        <Text>Success</Text>
      </Link>
      <Link replace href="/home/profile">
        <Text>Profile</Text>
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
