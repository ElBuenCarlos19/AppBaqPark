import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import ButtonsSettings from "./ButtonsSettings";

export default function OptionsSettings({
  isEnabled,
  darkMode,
  toggleDarkMode,
  toggleSwitch,
}) {
  return (
    <>
      <View style={styles.setting}>
        <Text style={styles.subTitle}>Notificaciones</Text>
        <Switch
          trackColor={{ false: "#d12121", true: "#C1D96C" }}
          thumbColor={"white"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <View style={styles.setting}>
        <Text style={styles.subTitle}>Modo Oscuro</Text>
        <Switch
          trackColor={{ false: "#d12121", true: "#C1D96C" }}
          thumbColor={"white"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleDarkMode}
          value={darkMode}
        />
      </View>
      <View style={styles.setting}>
        <Text style={styles.subTitle}>configuracion #4</Text>
        <Switch
          trackColor={{ false: "#d12121", true: "#C1D96C" }}
          thumbColor={"white"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleDarkMode}
          value={darkMode}
        />
      </View>
      <View style={styles.setting}>
        <Text style={styles.subTitle}>configuracion #5</Text>
        <Switch
          trackColor={{ false: "#d12121", true: "#C1D96C" }}
          thumbColor={"white"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleDarkMode}
          value={darkMode}
        />
      </View>
      <View style={styles.setting}>
        <Text style={styles.subTitle}>configuracion #6</Text>
        <Switch
          trackColor={{ false: "#d12121", true: "#C1D96C" }}
          thumbColor={"white"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleDarkMode}
          value={darkMode}
        />
      </View>
      <ButtonsSettings />
    </>
  );
}
const styles = StyleSheet.create({
  subTitle: {
    fontSize: 18,
    textAlign: "center",
  },
  setting: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "70%",
    marginTop: 20,
  },
});
