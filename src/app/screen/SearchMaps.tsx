import React, { useEffect } from "react";
import MapView, { PROVIDER_DEFAULT, PROVIDER_GOOGLE } from "react-native-maps";
import { useState } from "react";
import { StyleSheet, View, Pressable, Text, Alert } from "react-native";
import AccountButton from "../_components/AccountButton";
import { locationPermission } from "../util/locationPermission";
import * as Location from "expo-location";
import { OptionsMap } from "../_components/OptionsMap";
import { InfoParks } from "../_components/InfoParks";

export default function SearchMaps() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showInfoContainer, setShowInfoContainer] = useState(false);
  useEffect(() => {
    locationPermission(Location, setLocation, setErrorMsg);
  }, []);

  const initialRegion = {
    latitude: 10.9878,
    longitude: -74.7889,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0298,
  };

  return (
    <View style={styles.container}>
      <InfoParks setShowInfoContainer={setShowInfoContainer} showInfoContainer={showInfoContainer} />
      <AccountButton />
      <MapView
        style={styles.map}
        showsUserLocation={true}
        provider={PROVIDER_DEFAULT}
        initialRegion={initialRegion}
      />
      <OptionsMap setShowInfoContainer={setShowInfoContainer} showInfoContainer={showInfoContainer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "65%",
    borderRadius: 10,
    zIndex: 0,
  }
});
