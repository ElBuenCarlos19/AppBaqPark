import React from "react";
import MapView from "react-native-maps";
import { useState } from "react";
import { StyleSheet, View, Pressable, Text, Alert } from "react-native";
import AccountButton from "../_components/AccountButton";
export default function SearchMaps() {
  const [showInfoContainer, setShowInfoContainer] = useState(false);

  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.infoContainer,
          display: showInfoContainer ? "flex" : "none",
        }}
      >
        <Pressable
          style={{
            position: "absolute",
            top: 10, 
            right: 10, 
            padding: 10,
          }}
          onPress={() => setShowInfoContainer(!showInfoContainer)}
        >
          <Text style={{ color: "white", fontSize: 20 }}>X</Text>
        </Pressable>
        <Text style={styles.buttonText}>Titulo del parque</Text>
        <Pressable
          style={{
            width: 250,
            height: 50,
            backgroundColor: "#5B8C11",
            position: "absolute",
            top: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => {
            Alert.alert("Rutina iniciada");
          }}
        >
          <Text style={styles.buttonText}>Iniciar Rutina</Text>
        </Pressable>
      </View>
      <AccountButton />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 10.9878,
          longitude: -74.7889,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0298,
        }}
      />
      <View
        style={{
          ...styles.container,
          marginTop: 30,
          flexDirection: "row",
          gap: 30,
        }}
      >
        <Pressable
          style={styles.button}
          onPress={() => setShowInfoContainer(!showInfoContainer)}
        >
          <Text style={styles.buttonText}>Buscar</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Buscar</Text>
        </Pressable>
      </View>
      <View style={{ marginTop: 30 }}>
        <Pressable style={styles.buttonList}>
          <Text style={styles.buttonText}>Ver listado de parques</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
  },
  infoContainer: {
    width: 300,
    height: 400,
    position: "absolute",
    zIndex: 5,
    top: 100,
    left: "auto",
    borderRadius: 12,
    backgroundColor: "#022601",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "65%",
    borderRadius: 10,
    zIndex: 0,
  },
  button: {
    backgroundColor: "#022601",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    height: 100,
    width: 100,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  buttonList: {
    backgroundColor: "#022601",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    height: 50,
    width: 220,
  },
});
