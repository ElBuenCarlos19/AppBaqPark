import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Alert, Pressable, StyleSheet, Text } from "react-native";

export default function TabsBar() {
  return (
    <Tabs
    detachInactiveScreens={true}
    initialRouteName="SearchMaps"
    backBehavior="initialRoute"
    
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "SearchMaps") {
            iconName = focused ? "earth" : "earth-outline";
          } else if (route.name === "Rutines") {
            iconName = focused ? "barbell" : "barbell-outline";
          } else if (route.name === "MachineInfo") {
            iconName = focused ? "bicycle" : "bicycle-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,

      })}
    >
      <Tabs.Screen
        name="SearchMaps"
        options={{
          title: "Encuentra Tu Parque",
        }}
      />
      <Tabs.Screen
        name="Rutines"
        options={{
          title: "Rutinas De Ejecicio",
          
        }}
      />
      <Tabs.Screen
        name="MachineInfo"
        options={{
          title: "Informacion De Las Maquinas",
        }}
      />
      <Tabs.Screen
        name="Settings"
        options={{
          title: "Configuracion",
        }}
      />
    </Tabs>
  );
}
const styles = StyleSheet.create({
  accountButton: {
    color: "white",
    fontSize: 16,
    marginRight: 10,
  },
});