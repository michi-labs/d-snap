import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

import { useAuth } from "icp-connect-react/hooks";

export function AuthButton() {
  const { isAuthenticated, connect, disconnect } = useAuth();

  return !isAuthenticated ? <LoginButton login={connect} /> : <LogoutButton logout={disconnect} />;
}

type LoginButtonProps = {
  readonly login: () => void;
};

function LoginButton(props: LoginButtonProps) {
  return (
    <Pressable style={styles.button} onPress={() => props.login()}>
      <Text style={styles.text}>Login</Text>
    </Pressable>
  );
}

type LogoutButtonProps = {
  readonly logout: () => void;
};

function LogoutButton(props: LogoutButtonProps) {
  return (
    <Pressable style={styles.button} onPress={() => props.logout()}>
      <Text style={styles.text}>Logout</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
