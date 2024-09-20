import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { View, Pressable, StyleSheet, Text, Alert } from "react-native";

export default function AccountButton() {
    const handleAccountPress = () => {
        Alert.alert("Cuenta", "¡Bienvenido a tu cuenta!");
}
    
    
  return (
    <View style={styles.container}>
      <Pressable style={styles.accountButton} onPress={handleAccountPress}>
        <Ionicons
          style={styles.iconAccount}
          name="person-outline"
          size={32}
          color="white"
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 10,
    top: 10,
    zIndex: 10,
  },
  accountButton: {
    backgroundColor: "#000",
    borderRadius: 100,
    padding: 10,
    display: "flex",
    
  },
  iconAccount: {
    color: "white",
    fontSize: 32,
  },
});
