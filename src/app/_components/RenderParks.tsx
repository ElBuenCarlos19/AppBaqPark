import type React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"

interface RenderParksProps {
  item: any
  mapRef: any
  onPress?: (item: any) => void
}

export const RenderParks: React.FC<RenderParksProps> = ({ item, mapRef, onPress }) => {
  // Assuming this is similar to your existing RenderParks component
  const handlePress = () => {
    // First, handle any existing functionality like centering the map
    if (mapRef && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: Number.parseFloat(String(item.latitude)),
        longitude: Number.parseFloat(String(item.longitude)),
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      })
    }

    // Then call the onPress handler if provided
    if (onPress) {
      onPress(item)
    }
  }

  return (
    <TouchableOpacity style={styles.parkItem} onPress={handlePress}>
      <View style={styles.parkIcon}>
        <MaterialIcons name="park" size={24} color="#4CAF50" />
      </View>
      <View style={styles.parkInfo}>
        <Text style={styles.parkName}>{item.Column2}</Text>
        <Text style={styles.parkDescription} numberOfLines={1}>
          {item.Column3}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
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
  parkDescription: {
    fontSize: 14,
    color: "#666",
  },
})
