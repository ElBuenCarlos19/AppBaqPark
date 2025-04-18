import type React from "react"
import { StyleSheet, View, Text, Modal, ScrollView, TouchableOpacity } from "react-native"
import { Button, Card, Divider } from "react-native-paper"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import theme from "../../theme.js"

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

interface ParkInfoModalProps {
  visible: boolean
  park: Park | null
  onClose: () => void
  onShowRoute: (park: Park) => void
}

export const ParkInfoModal: React.FC<ParkInfoModalProps> = ({ visible, park, onClose, onShowRoute }) => {
  if (!park) return null

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <Card style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>

          <View style={styles.imagePlaceholder}>
            <MaterialIcons name="place" size={50} color={theme.colors.primary} />
            <Text style={styles.placeholderText}>No hay imagen disponible</Text>
          </View>

          <Card.Content>
            <Text style={styles.parkName}>{park.column2}</Text>
            <Text style={styles.parkSector}>
              <MaterialIcons name="location-on" size={16} color={theme.colors.primary} /> {park.column3}
            </Text>

            <Divider style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Dirección:</Text>
              <Text style={styles.infoValue}>{park.column4 || "No disponible"}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Barrio:</Text>
              <Text style={styles.infoValue}>{park.column5 || "No disponible"}</Text>
            </View>

            <Divider style={styles.divider} />

            <Text style={styles.sectionTitle}>Información</Text>
            <ScrollView style={styles.infoContainer}>
              <Text style={styles.infoText}>
                Este parque está ubicado en el sector {park.column3}. Para obtener más información sobre las
                instalaciones y servicios disponibles, visite el parque o contacte con la administración local.
              </Text>
            </ScrollView>
          </Card.Content>

          <Card.Actions style={styles.actions}>
            <Button
              mode="contained"
              icon={({ size, color }) => <MaterialIcons name="navigation" size={size} color={color} />}
              onPress={() => onShowRoute(park)}
              style={styles.routeButton}
            >
              Iniciar Ruta
            </Button>
          </Card.Actions>
        </Card>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%",
  },
  closeButton: {
    position: "absolute",
    right: 15,
    top: 15,
    zIndex: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  imagePlaceholder: {
    width: "100%",
    height: 200,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  placeholderText: {
    marginTop: 10,
    color: "#666",
  },
  parkName: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
  },
  parkSector: {
    fontSize: 16,
    color: "#666",
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  infoLabel: {
    fontWeight: "bold",
    width: 80,
  },
  infoValue: {
    flex: 1,
  },
  divider: {
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoContainer: {
    maxHeight: 100,
  },
  infoText: {
    color: "#666",
    lineHeight: 20,
  },
  actions: {
    justifyContent: "center",
    paddingVertical: 15,
  },
  routeButton: {
    width: "80%",
    backgroundColor: theme.colors.primary,
  },
})
