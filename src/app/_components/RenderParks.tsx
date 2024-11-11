import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const RenderParks = ({ item, mapRef }) => {
  return (
    <TouchableOpacity
      style={styles.parkItem}
      onPress={() => {
        if (mapRef.current) {
          mapRef.current.animateToRegion(
            {
              latitude: parseFloat(item.latitude),
              longitude: parseFloat(item.longitude),
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            },
            1000
          );
        }
      }}
    >
      <View style={styles.parkIcon}>
        <Ionicons name="leaf-outline" size={24} color="#4CAF50" />
      </View>
      <View style={styles.parkInfo}>
        <Text style={styles.parkName}>{item.Column2}</Text>
        <Text style={styles.parkDistance}>{item.Column3}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
});
