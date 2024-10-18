import React, { useEffect, useState } from "react";
import MapView, { PROVIDER_DEFAULT, PROVIDER_GOOGLE, Marker, Polyline } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import AccountButton from "../_components/AccountButton";
import * as Location from "expo-location";
import { OptionsMap } from "../_components/OptionsMap";
import { InfoParks } from "../_components/InfoParks";
import { StatusBar } from "expo-status-bar";
import parques from "parques.json";
import axios from "axios";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import Constants from "expo-constants";
//Constants.expoConfig.extra.GOOGLE_MAPS_API_KEY Esta mierda me serviria si no fuera por que aun no se como hacer que funcione
const GOOGLE_MAPS_APIKEY = process.env.EXPO_PUBLIC_PARKS_KEY;

export default function SearchMaps() {
  const [showInfoContainer, setShowInfoContainer] = useState(false);
  const [location, setLocation] = useState(null);
  const [nearestPark, setNearestPark] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permiso de ubicación denegado");
        return;
      }
      let locationWatcher = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 5,
        },
        async (newLocation) => {
          setLocation(newLocation);

          const closestPark = findNearestPark(newLocation.coords, parques);
          setNearestPark(closestPark);

          if (closestPark) {
            fetchRoute(newLocation.coords, closestPark);
          }
        }
      );

      return () => {
        locationWatcher.remove();
      };
    })();
  }, []);
  const haversineDistance = (coords1, coords2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Radio de la Tierra en km

    const dLat = toRad(coords2.latitude - coords1.latitude);
    const dLon = toRad(coords2.longitude - coords1.longitude);

    const lat1 = toRad(coords1.latitude);
    const lat2 = toRad(coords2.latitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };
  const findNearestPark = (userCoords, parks) => {
    let minDistance = Infinity;
    let closestPark = null;

    parks.forEach((park) => {
      if (park.latitude !== "notfound" && park.longitude !== "notfound") {
        const parkCoords = {
          latitude: parseFloat(park.latitude),
          longitude: parseFloat(park.longitude),
        };

        const distance = haversineDistance(userCoords, parkCoords);

        if (distance < minDistance) {
          minDistance = distance;
          closestPark = park;
        }
      }
    });

    return closestPark;
  };

  const fetchRoute = async (startCoords, park) => {
    const endCoords = {
      latitude: parseFloat(park.latitude),
      longitude: parseFloat(park.longitude),
    };

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startCoords.latitude},${startCoords.longitude}&destination=${endCoords.latitude},${endCoords.longitude}&key=${GOOGLE_MAPS_APIKEY}`
      );
      console.log(response.data);
      const points = decodePolyline(
        response.data.routes[0].overview_polyline.points
      );
      setRouteCoordinates(points);
    } catch (error) {
      console.error("Error al obtener la ruta:", error);
    }
  };

  // Decodificar la polyline recibida de la API de Google Directions
  const decodePolyline = (t) => {
    let points = [];
    let index = 0,
      len = t.length;
    let lat = 0,
      lng = 0;

    while (index < len) {
      let b,
        shift = 0,
        result = 0;
      do {
        b = t.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlat = result & 1 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = t.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlng = result & 1 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      points.push({
        latitude: lat / 1e5,
        longitude: lng / 1e5,
      });
    }

    return points;
  };

  if (!location || !nearestPark) {
    return (
      <View style={{...styles.container, flex: 1, justifyContent: "center"}}>
        <ActivityIndicator size={100} color={MD2Colors.green600} />
      </View>
    );
  }

  const initialRegion = {
    latitude: parseFloat(nearestPark.latitude),
    longitude: parseFloat(nearestPark.longitude),
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <InfoParks
        setShowInfoContainer={setShowInfoContainer}
        showInfoContainer={showInfoContainer}
      />
      <AccountButton />
      <MapView
        style={styles.map}
        showsUserLocation={true}
        provider={PROVIDER_DEFAULT}
        initialRegion={initialRegion}
      >
        {parques.map((parque, index) => {
          if (
            parque.latitude !== "notfound" &&
            parque.longitude !== "notfound"
          ) {
            return (
              <Marker
                key={index}
                coordinate={{
                  latitude: parseFloat(String(parque.latitude)),
                  longitude: parseFloat(String(parque.longitude)),
                }}
                title={parque.Column2}
                description={parque.Column3}
              />
            );
          }
          return null;
        })}
        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeWidth={4}
            strokeColor="blue"
          />
        )}
      </MapView>

      <OptionsMap
        setShowInfoContainer={setShowInfoContainer}
        showInfoContainer={showInfoContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    flex: 1,
  },
  map: {
    width: "100%",
    height: "65%",
    borderRadius: 10,
    zIndex: 0,
  },
});
