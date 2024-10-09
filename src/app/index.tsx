import React from "react";
import { View } from "react-native";
import { Link } from "expo-router";
import { StyleSheet } from "react-native";

export default function Page() {
  return (
    <View style={styles.container}>
      <Link style={styles.text} href="/screen/SearchMaps">
        Continuar
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
});
