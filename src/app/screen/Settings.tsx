import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import OptionsSettings from "../_components/OptionsSettings";

export default function Settings() {
  const [isEnabled, setIsEnabled] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(false);
  const toggleDarkMode = () => setDarkMode((previousState) => !previousState);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={styles.container}>
      <OptionsSettings
        isEnabled={isEnabled}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        toggleSwitch={toggleSwitch}
      />
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
});
