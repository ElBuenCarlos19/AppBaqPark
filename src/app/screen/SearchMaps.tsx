import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  FlatList,
  Modal,
  Alert,
  Image,
} from "react-native";
import MapView, { PROVIDER_DEFAULT, Marker, Polyline } from "react-native-maps";
import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  MD2Colors,
  Button,
  IconButton,
  Card,
} from "react-native-paper";
import theme from "../../theme.js";
import AccountButton from "../_components/AccountButton";
import { InfoParks } from "../_components/InfoParks";
//import parques from "parques.json";
import { tips } from "../util/messages.js";
import {
  operationPoints,
  operationPanResponder,
  operationToggleDrawer,
  operationRequestLocation,
  operationHaverSineDistance,
  operationFindNearestPark,
  operationFetchRouter,
  operationHandleNearestParkPress,
  operationGetParques,
} from "../util/functions";
import { RenderParks } from "../_components/RenderParks";
import { DRAWER_MIN_HEIGHT } from "../util/constants.js";
import { SkeletonItem } from "../_components/SkeletonItem";

export default function SearchMaps() {
  const [showInfoContainer, setShowInfoContainer] = useState(false);
  const [location, setLocation] = useState(null);
  const [nearestPark, setNearestPark] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedButton, setSelectedButton] = useState(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showTipModal, setShowTipModal] = useState(false);
  const [currentTip, setCurrentTip] = useState("");
  const [parques, setParques] = useState([]);
  const animation = useRef(new Animated.Value(DRAWER_MIN_HEIGHT)).current;
  const mapRef = useRef(null);

  const panResponder = useMemo(() => operationPanResponder(animation), []);
  const toggleDrawer = useCallback(
    () => operationToggleDrawer(animation),
    [animation]
  );

  const handlGetParques = useCallback(
    () => {
    operationGetParques(setParques);
  },[]);


  useEffect(() => {
    if (!location) {
      operationRequestLocation(setErrorMsg, setLocation, setIsLoading);
    }
    if (parques.length === 0) {
      handlGetParques();
    }
  }, [location, parques]);


  const haversineDistance = useCallback(
    (coords1, coords2) => operationHaverSineDistance(coords1, coords2),
    []
  );

  const findNearestPark = useCallback(
    (userCoords, parks) =>
      operationFindNearestPark(userCoords, parks, haversineDistance),
    [haversineDistance]
  );

  const fetchRoute = useCallback(async (startCoords, park) => {
    operationFetchRouter(
      startCoords,
      park,
      setRouteCoordinates,
      decodePolyline
    );
  }, []);

  const decodePolyline = useCallback(operationPoints, []);

  const renderParkItem = useCallback(
    ({ item }) => {
      if (isLoading || !item?.id) {
        return <SkeletonItem />;
      }
      return <RenderParks item={item} mapRef={mapRef} />;      
    },
    [isLoading]
  );

  const memorizedParques = useMemo(() => {
    if (!location?.coords || !parques) {
        return [];
    }

    return parques.filter((parque) => {
        const { latitude, longitude } = parque;

        if (isNaN(parseFloat(latitude)) || isNaN(parseFloat(longitude))) {
            return false;
        }

        const distance = haversineDistance(location.coords, {
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
        });

        return distance <= 5;
    });
}, [location, parques]);

  const handleNearestParkPress = useCallback(() => {
    operationHandleNearestParkPress(
      selectedButton,
      setSelectedButton,
      setNearestPark,
      setRouteCoordinates,
      findNearestPark,
      location,
      memorizedParques,
      fetchRoute
    );
  }, [location, memorizedParques, findNearestPark, fetchRoute, selectedButton]);

  const handleOptimalParkPress = useCallback(() => {
    if (selectedButton === "optimo") {
      setSelectedButton(null);
    } else {
      setSelectedButton("optimo");
      setNearestPark(null);
      setRouteCoordinates([]);
      Alert.alert(
        "Parque Óptimo",
        "Esta función aún no está implementada. Aquí se agregará el algoritmo para encontrar el parque óptimo en el futuro.",
        [{ text: "OK" }]
      );
    }
  }, [selectedButton]);

  const handleTipPress = useCallback(() => {
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setCurrentTip(randomTip);
    setShowTipModal(true);
  }, []);

  if (!location) {
    return (
      <View style={{ ...styles.container, flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size={100} color={MD2Colors.green600} />
      </View>
    );
  }

  const initialRegion = {
    ...location.coords,
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
        ref={mapRef}
        style={styles.map}
        showsUserLocation={true}
        provider={PROVIDER_DEFAULT}
        initialRegion={initialRegion}
      >
        {memorizedParques.map((parque, index) => {
          const { latitude, longitude, column2, column3 } = parque;
          if (
            !isNaN(latitude) && !isNaN(longitude)
          ) {
            return (
              <Marker
                key={index}
                coordinate={{
                  latitude: parseFloat(latitude),
                  longitude: parseFloat(longitude),
                }}
                title={column2}
                description={column3}
              />
            );
          }
          return null;
        })}
        {routeCoordinates.length > 0 && selectedButton === "cercano" && (
          <Polyline
            coordinates={routeCoordinates}
            strokeWidth={4}
            strokeColor="blue"
          />
        )}
      </MapView>
      <TouchableOpacity style={styles.tipButton} onPress={handleTipPress}>
        <Image
          source={require("../../../assets/tip-icon.jpg")}
          style={styles.tipIcon}
        />
      </TouchableOpacity>
      <Animated.View
        style={[styles.drawer, { height: animation }]}
        {...panResponder.panHandlers}
      >
        <TouchableOpacity onPress={toggleDrawer} style={styles.drawerHandle}>
          <View style={styles.handle} />
        </TouchableOpacity>
        <Text style={styles.drawerTitle}>Parques</Text>

        <View style={styles.buttonContainer}>
          <Button
            mode={selectedButton === "cercano" ? "contained" : "outlined"}
            onPress={handleNearestParkPress}
            icon="map-marker-radius"
            textColor={
              selectedButton === "cercano"
                ? theme.colors.text
                : theme.colors.primary
            }
            buttonColor={
              selectedButton === "cercano"
                ? theme.colors.primary
                : theme.colors.text
            }
            style={styles.button}
          >
            Cercano
          </Button>
          <Button
            mode={selectedButton === "optimo" ? "contained" : "outlined"}
            onPress={handleOptimalParkPress}
            icon="star"
            textColor={
              selectedButton === "optimo"
                ? theme.colors.text
                : theme.colors.primary
            }
            buttonColor={
              selectedButton === "optimo"
                ? theme.colors.primary
                : theme.colors.text
            }
            style={styles.button}
          >
            Optimo
          </Button>
          <IconButton
            icon="information"
            size={24}
            onPress={() => setShowInfoModal(true)}
          />
        </View>

        <FlatList
          data={isLoading ? Array(10).fill({}) : memorizedParques}
          renderItem={renderParkItem}
          keyExtractor={(item, index) =>
            item && item.id ? String(item.id) : `placeholder-${index}`
          }
          contentContainerStyle={styles.parkList}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
        />
      </Animated.View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showInfoModal}
        onRequestClose={() => setShowInfoModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Información</Text>
            <Text>
              Aquí puedes encontrar información sobre los tipos de parques:
            </Text>
            <Text>
              - Parque cercano: El parque más próximo a tu ubicación actual.
            </Text>
            <Text>
              - Parque óptimo: Un parque sugerido basado en tus preferencias y
              actividades populares (función aún no implementada).
            </Text>
            <Button onPress={() => setShowInfoModal(false)}>Cerrar</Button>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showTipModal}
        onRequestClose={() => setShowTipModal(false)}
      >
        <View style={styles.tipModalContainer}>
          <Card style={styles.tipModalContent}>
            <Card.Content>
              <Text style={styles.tipText}>{currentTip}</Text>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => setShowTipModal(false)}>Cerrar</Button>
            </Card.Actions>
          </Card>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
    zIndex: 0,
  },
  drawer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 9,
  },
  drawerHandle: {
    alignItems: "center",
    marginBottom: 10,
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 3,
  },
  drawerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
  parkList: {
    paddingBottom: 20,
  },
  parkItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  parkIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  parkInfo: {
    flex: 1,
  },
  parkName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  parkDistance: {
    fontSize: 14,
    color: "#666",
  },
  skeletonItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  skeletonIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E0E0E0",
    marginRight: 10,
  },
  skeletonInfo: {
    flex: 1,
  },
  skeletonText: {
    height: 16,
    backgroundColor: "#E0E0E0",
    marginBottom: 5,
    borderRadius: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  tipButton: {
    position: "absolute",
    bottom: 160,
    right: 10,
    backgroundColor: "white",
    borderRadius: 30,
    padding: 10,
    elevation: 5,
    zIndex: 2,
  },
  tipIcon: {
    width: 40,
    height: 40,
  },
  tipModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  tipModalContent: {
    width: "80%",
    padding: 20,
  },
  tipText: {
    fontSize: 16,
    marginBottom: 10,
  },
});
