"use client"

import { useEffect, useState, useRef, useCallback, useMemo } from "react"
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
  ScrollView,
} from "react-native"
import MapView, { PROVIDER_DEFAULT, Marker, Polyline } from "react-native-maps"
import { StatusBar } from "expo-status-bar"
import { ActivityIndicator, MD2Colors, Button, IconButton, Card, Chip, Searchbar } from "react-native-paper"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import theme from "../../theme.js"
import AccountButton from "../_components/AccountButton"
import { InfoParks } from "../_components/InfoParks"
import { tips } from "../util/messages.js"
import {
  operationPoints,
  operationPanResponder,
  operationRequestLocation,
  operationHaverSineDistance,
  operationFindNearestPark,
  operationFetchRouter,
  operationHandleNearestParkPress,
  operationGetParques,
} from "../util/functions"
import { DRAWER_MIN_HEIGHT, DRAWER_MAX_HEIGHT } from "../util/constants.js"
import { SkeletonItem } from "../_components/SkeletonItem"
import { ParkInfoModal } from "../_components/ParkInfoModal"

// Define the park type based on the actual data structure
interface Park {
  id: number
  column2: string // Park name
  column3: string // Sector
  column4: string // Address
  column5: string | number // Neighborhood
  latitude: string | number
  longitude: string | number
}

// Define sector options based on the actual sectors in the data
const sectorOptions = [
  { id: "RIOMAR", label: "Riomar", color: "#4CAF50" },
  { id: "METROPOLITANA", label: "Metropolitana", color: "#2196F3" },
  { id: "SUROCCIDENTE", label: "Suroccidente", color: "#FF9800" },
  { id: "SURORIENTE", label: "Suroriente", color: "#9C27B0" },
  { id: "NORTE CENTRO HISTORICO", label: "Norte Centro Histórico", color: "#F44336" },
]

export default function SearchMaps() {
  const [showInfoContainer, setShowInfoContainer] = useState(false)
  const [location, setLocation] = useState(null)
  const [nearestPark, setNearestPark] = useState(null)
  const [routeCoordinates, setRouteCoordinates] = useState([])
  const [errorMsg, setErrorMsg] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedButton, setSelectedButton] = useState(null)
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [showTipModal, setShowTipModal] = useState(false)
  const [currentTip, setCurrentTip] = useState("")
  const [parques, setParques] = useState<Park[]>([])
  const [selectedPark, setSelectedPark] = useState<Park | null>(null)
  const [showParkModal, setShowParkModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isDrawerExpanded, setIsDrawerExpanded] = useState(false)
  const [activeSectorFilter, setActiveSectorFilter] = useState<string | null>(null)
  const animation = useRef(new Animated.Value(DRAWER_MIN_HEIGHT)).current
  const mapRef = useRef(null)

  const panResponder = useMemo(() => {
    const customPanResponder = operationPanResponder(animation)

    // Add listener to animation value to detect when drawer is expanded
    animation.addListener(({ value }) => {
      // Consider drawer expanded if it's more than halfway to max height
      setIsDrawerExpanded(value > (DRAWER_MIN_HEIGHT + DRAWER_MAX_HEIGHT) / 2)
    })

    return customPanResponder
  }, [animation])

  // Custom toggle drawer that updates isDrawerExpanded state
  const toggleDrawer = useCallback(() => {
    const newState = !isDrawerExpanded
    setIsDrawerExpanded(newState)

    // Animate to appropriate height
    Animated.spring(animation, {
      toValue: newState ? DRAWER_MAX_HEIGHT : DRAWER_MIN_HEIGHT,
      useNativeDriver: false,
    }).start()
  }, [isDrawerExpanded, animation])

  // Function to minimize the drawer
  const minimizeDrawer = useCallback(() => {
    setIsDrawerExpanded(false)
    Animated.spring(animation, {
      toValue: DRAWER_MIN_HEIGHT,
      useNativeDriver: false,
    }).start()
  }, [animation])

  const handlGetParques = useCallback(() => {
    operationGetParques(setParques)
  }, [])

  const haversineDistance = useCallback((coords1, coords2) => operationHaverSineDistance(coords1, coords2), [])

  const memorizedParques = useMemo(() => {
    if (!location?.coords || !parques) {
      return []
    }

    return parques.filter((parque) => {
      const { latitude, longitude } = parque

      if (isNaN(Number.parseFloat(String(latitude))) || isNaN(Number.parseFloat(String(longitude)))) {
        return false
      }

      // Apply sector filter if active
      if (activeSectorFilter && parque.column3 !== activeSectorFilter) {
        return false
      }

      const distance = haversineDistance(location.coords, {
        latitude: Number.parseFloat(String(latitude)),
        longitude: Number.parseFloat(String(longitude)),
      })

      return distance <= 5
    })
  }, [location, parques, activeSectorFilter, haversineDistance])

  // Filter parks based on search query and sector
  const filteredParks = useMemo(() => {
    if (!parques || parques.length === 0) return []

    return parques.filter((park) => {
      // Skip parks with invalid coordinates
      if (isNaN(Number.parseFloat(String(park.latitude))) || isNaN(Number.parseFloat(String(park.longitude)))) {
        return false
      }

      // Apply search query filter to park name (column2)
      const matchesSearch =
        searchQuery === "" || (park.column2 && park.column2.toLowerCase().includes(searchQuery.toLowerCase()))

      // Apply sector filter if active
      const matchesSector = !activeSectorFilter || park.column3 === activeSectorFilter

      return matchesSearch && matchesSector
    })
  }, [parques, searchQuery, activeSectorFilter])

  const findNearestPark = useCallback(
    (userCoords, parks) => operationFindNearestPark(userCoords, parks, haversineDistance),
    [haversineDistance],
  )

  const fetchRoute = useCallback(async (startCoords, park) => {
    operationFetchRouter(startCoords, park, setRouteCoordinates, decodePolyline)
  }, [])

  const decodePolyline = useCallback(operationPoints, [])

  useEffect(() => {
    if (!location) {
      operationRequestLocation(setErrorMsg, setLocation, setIsLoading)
    }
    if (parques.length === 0) {
      handlGetParques()
    }
  }, [location, parques, handlGetParques])

  // Agregar un console.log para depurar los datos que estamos recibiendo
  useEffect(() => {
    if (parques.length > 0) {
      console.log("Parques cargados:", parques.length)
      console.log("Primer parque:", parques[0])
      console.log("Parques filtrados:", filteredParks.length)
      console.log("Parques memorizados:", memorizedParques.length)
    }
  }, [parques, filteredParks, memorizedParques])

  // Function to center the map on a specific park
  const centerMapOnPark = useCallback(
    (park: Park) => {
      if (mapRef.current && park) {
        const latitude = Number.parseFloat(String(park.latitude))
        const longitude = Number.parseFloat(String(park.longitude))

        if (!isNaN(latitude) && !isNaN(longitude)) {
          mapRef.current.animateToRegion(
            {
              latitude,
              longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            },
            500,
          ) // 500ms animation duration
        }
      }
    },
    [mapRef],
  )

  // Updated function to handle park press with the complete sequence
  const handleParkPress = useCallback(
    (park: Park) => {
      // 1. Minimize the drawer first
      minimizeDrawer()

      // 2. Center the map on the selected park (with a slight delay to allow drawer animation)
      setTimeout(() => {
        centerMapOnPark(park)

        // 3. Open the park modal (with a slight delay for better UX)
        setTimeout(() => {
          setSelectedPark(park)
          setShowParkModal(true)
        }, 300)
      }, 300)
    },
    [minimizeDrawer, centerMapOnPark],
  )

  // Function to handle marker press (directly from map)
  const handleMarkerPress = useCallback((park: Park) => {
    setSelectedPark(park)
    setShowParkModal(true)
  }, [])

  const renderParkItem = useCallback(
    ({ item }) => {
      if (isLoading || !item?.id) {
        return <SkeletonItem />
      }

      return (
        <TouchableOpacity onPress={() => handleParkPress(item)}>
          <View style={styles.parkItem}>
            <View style={styles.parkIcon}>
              <MaterialIcons name="park" size={24} color="#4CAF50" />
            </View>
            <View style={styles.parkInfo}>
              <Text style={styles.parkName}>{item.column2}</Text>
              <Text style={styles.parkDescription} numberOfLines={1}>
                {item.column3}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )
    },
    [isLoading, handleParkPress],
  )

  const handleNearestParkPress = useCallback(() => {
    operationHandleNearestParkPress(
      selectedButton,
      setSelectedButton,
      setNearestPark,
      setRouteCoordinates,
      findNearestPark,
      location,
      memorizedParques,
      fetchRoute,
    )
  }, [location, memorizedParques, findNearestPark, fetchRoute, selectedButton])

  const handleOptimalParkPress = useCallback(() => {
    if (selectedButton === "optimo") {
      setSelectedButton(null)
    } else {
      setSelectedButton("optimo")
      setNearestPark(null)
      setRouteCoordinates([])
      Alert.alert(
        "Parque Óptimo",
        "Esta función aún no está implementada. Aquí se agregará el algoritmo para encontrar el parque óptimo en el futuro.",
        [{ text: "OK" }],
      )
    }
  }, [selectedButton])

  const handleTipPress = useCallback(() => {
    const randomTip = tips[Math.floor(Math.random() * tips.length)]
    setCurrentTip(randomTip)
    setShowTipModal(true)
  }, [])

  // Function to toggle sector filter
  const toggleSectorFilter = useCallback((sectorId: string) => {
    setActiveSectorFilter((prevSector) => (prevSector === sectorId ? null : sectorId))
  }, [])

  // Function to clear all filters
  const clearFilters = useCallback(() => {
    setActiveSectorFilter(null)
    setSearchQuery("")
  }, [])

  // Function to handle showing route to selected park
  const handleShowRoute = useCallback(
    (park) => {
      if (location && park) {
        setShowParkModal(false)

        // Set the selected button to show we're in route mode
        setSelectedButton("custom")

        // Calculate and show the route
        fetchRoute(
          {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
          {
            latitude: Number.parseFloat(String(park.latitude)),
            longitude: Number.parseFloat(String(park.longitude)),
          },
        )

        // Animate to show both the user and the park
        mapRef.current?.fitToCoordinates(
          [
            {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            },
            {
              latitude: Number.parseFloat(String(park.latitude)),
              longitude: Number.parseFloat(String(park.longitude)),
            },
          ],
          {
            edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
            animated: true,
          },
        )
      }
    },
    [location, fetchRoute, mapRef],
  )

  // Get marker color based on sector
  const getMarkerColor = useCallback((park: Park) => {
    const sectorOption = sectorOptions.find((option) => option.id === park.column3)
    return sectorOption ? sectorOption.color : "#4CAF50" // Default to green if not found
  }, [])

  if (!location) {
    return (
      <View style={{ ...styles.container, flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size={100} color={MD2Colors.green600} />
      </View>
    )
  }

  const initialRegion = {
    ...location.coords,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <InfoParks setShowInfoContainer={setShowInfoContainer} showInfoContainer={showInfoContainer} />
      <AccountButton />
      <MapView
        ref={mapRef}
        style={styles.map}
        showsUserLocation={true}
        provider={PROVIDER_DEFAULT}
        initialRegion={initialRegion}
      >
        {memorizedParques.map((parque, index) => {
          const { latitude, longitude, column2, column3 } = parque
          if (!isNaN(Number.parseFloat(String(latitude))) && !isNaN(Number.parseFloat(String(longitude)))) {
            return (
              <Marker
                key={index}
                coordinate={{
                  latitude: Number.parseFloat(String(latitude)),
                  longitude: Number.parseFloat(String(longitude)),
                }}
                title={column2}
                description={column3}
                onPress={() => handleMarkerPress(parque)}
                pinColor={getMarkerColor(parque)}
              />
            )
          }
          return null
        })}
        {routeCoordinates.length > 0 && (selectedButton === "cercano" || selectedButton === "custom") && (
          <Polyline coordinates={routeCoordinates} strokeWidth={4} strokeColor="blue" />
        )}
      </MapView>
      <TouchableOpacity style={styles.tipButton} onPress={handleTipPress}>
        <Image source={require("../../../assets/tip-icon.jpg")} style={styles.tipIcon} />
      </TouchableOpacity>
      <Animated.View style={[styles.drawer, { height: animation }]} {...panResponder.panHandlers}>
        <TouchableOpacity onPress={toggleDrawer} style={styles.drawerHandle}>
          <View style={styles.handle} />
        </TouchableOpacity>
        <Text style={styles.drawerTitle}>Parques</Text>

        <View style={styles.buttonContainer}>
          <Button
            mode={selectedButton === "cercano" ? "contained" : "outlined"}
            onPress={handleNearestParkPress}
            icon="map-marker-radius"
            textColor={selectedButton === "cercano" ? theme.colors.text : theme.colors.primary}
            buttonColor={selectedButton === "cercano" ? theme.colors.primary : theme.colors.text}
            style={styles.button}
          >
            Cercano
          </Button>
          <Button
            mode={selectedButton === "optimo" ? "contained" : "outlined"}
            onPress={handleOptimalParkPress}
            icon="star"
            textColor={selectedButton === "optimo" ? theme.colors.text : theme.colors.primary}
            buttonColor={selectedButton === "optimo" ? theme.colors.primary : theme.colors.text}
            style={styles.button}
          >
            Optimo
          </Button>
          <IconButton icon="information" size={24} onPress={() => setShowInfoModal(true)} />
        </View>

        {/* Search and Filter UI - Only visible when drawer is expanded */}
        {isDrawerExpanded && (
          <View style={styles.searchFilterContainer}>
            <Searchbar
              placeholder="Buscar parque..."
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={styles.searchBar}
              icon={() => <MaterialIcons name="search" size={24} color={theme.colors.primary} />}
              clearIcon={() => <MaterialIcons name="clear" size={24} color={theme.colors.primary} />}
            />

            {/* Sector filters */}
            <Text style={styles.filterSectionTitle}>Sectores</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filtersScrollView}
            >
              {sectorOptions.map((sector) => (
                <Chip
                  key={sector.id}
                  selected={activeSectorFilter === sector.id}
                  onPress={() => toggleSectorFilter(sector.id)}
                  style={[styles.sectorChip, activeSectorFilter === sector.id && { backgroundColor: sector.color }]}
                  selectedColor={activeSectorFilter === sector.id ? "#fff" : undefined}
                  mode={activeSectorFilter === sector.id ? "flat" : "outlined"}
                >
                  {sector.label}
                </Chip>
              ))}
            </ScrollView>

            {/* Results count and clear filters */}
            <View style={styles.resultsContainer}>
              <Text style={styles.resultsCount}>
                {filteredParks.length} {filteredParks.length === 1 ? "parque encontrado" : "parques encontrados"}
              </Text>

              {(activeSectorFilter || searchQuery) && (
                <Chip
                  onPress={clearFilters}
                  style={styles.clearFilterChip}
                  icon={() => <MaterialIcons name="refresh" size={18} color="#fff" />}
                  textStyle={{ color: "#fff" }}
                >
                  Limpiar
                </Chip>
              )}
            </View>
          </View>
        )}

        <FlatList
          data={isLoading ? Array(10).fill({}) : filteredParks.length > 0 ? filteredParks : memorizedParques}
          renderItem={renderParkItem}
          keyExtractor={(item, index) => (item && item.id ? String(item.id) : `placeholder-${index}`)}
          contentContainerStyle={styles.parkList}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
        />
      </Animated.View>

      {/* Park Information Modal */}
      <ParkInfoModal
        visible={showParkModal}
        park={selectedPark}
        onClose={() => setShowParkModal(false)}
        onShowRoute={handleShowRoute}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={showInfoModal}
        onRequestClose={() => setShowInfoModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Información</Text>
            <Text>Aquí puedes encontrar información sobre los tipos de parques:</Text>
            <Text>- Parque cercano: El parque más próximo a tu ubicación actual.</Text>
            <Text>
              - Parque óptimo: Un parque sugerido basado en tus preferencias y actividades populares (función aún no
              implementada).
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
  )
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
  searchFilterContainer: {
    marginBottom: 15,
  },
  searchBar: {
    marginBottom: 10,
    elevation: 0,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
  },
  filterSectionTitle: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 5,
    marginBottom: 5,
    color: "#666",
  },
  filtersScrollView: {
    paddingVertical: 5,
  },
  sectorChip: {
    marginRight: 8,
    marginBottom: 5,
  },
  clearFilterChip: {
    marginRight: 8,
    marginBottom: 5,
    backgroundColor: theme.colors.error,
  },
  resultsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  resultsCount: {
    fontSize: 12,
    color: "#666",
    marginBottom: 5,
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
  parkDescription: {
    fontSize: 14,
    color: "#666",
  },
})
