"use client"

import { useRef, useState } from "react"
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
  SafeAreaView,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import AccountButton from "../_components/AccountButton"
import theme from "../../theme"

const { width } = Dimensions.get("window")

// Datos de las máquinas
const machines = [
  {
    id: 1,
    name: "BARRAS",
    image: require("../../../assets/machineimages/barras.png"),
    function:
      "Desarrollo de la fuerza y flexibilidad de los miembros superiores, musculatura de hombros y pectorales. Mejora de la condición muscular de abdomen y espalda.",
    usage: "Sujete las barras con las manos, extienda los brazos totalmente y realice flexiones.",
    note: "Se trata de un ejercicio de fuerza que debe realizarse de forma no violenta. En caso de dolor articular, suspender la realización del mismo.",
  },
  {
    id: 2,
    name: "BANCA ABDOMINAL",
    image: require("../../../assets/machineimages/bancaabdominal.png"),
    function:
      "Fortalecimiento de la musculatura abdominal y lumbar. Aumenta la eliminación de grasa abdominal, obteniendo una mejor figura.",
    usage:
      "La postura correcta de los brazos es o bien sobre el pecho o detrás de la cabeza, pero nunca deben ejercer fuerza sobre el cuello ni la nuca. Una vez bien colocado sobre el banco, las repeticiones tienen que ser constantes y controladas.",
    note: "Una mala postura afectaría tu zona lumbar, debes ser cuidadoso.",
  },
  {
    id: 3,
    name: "REMO",
    image: require("../../../assets/machineimages/remo.png"),
    function:
      "Fortalece la musculatura de brazos, piernas, cintura, abdomen, espalda y pecho, permitiendo un completo movimiento de las extremidades. Mejora la capacidad cardio-pulmonar y la coordinación entre los miembros superior e inferior.",
    usage:
      "Colóquese sobre el asiento, agarre las asas con ambas manos y empuje los pedales hacia delante llegando a una posición de espalda derecha. El movimiento debe ser acompasado.",
    note: "Se trata de un ejercicio de fuerza en extremidades superiores e inferiores. Si nota alguna molestia, pare el ejercicio.",
  },
  {
    id: 4,
    name: "TIMÓN O VOLANTE",
    image: require("../../../assets/machineimages/timon.png"),
    function:
      "Potencia, desarrolla y mejora la musculación de los hombros. Mejora la flexibilidad general de las articulaciones de hombros, muñecas, codos y clavículas.",
    usage:
      "Sujete cada manilla con una mano y gire la rueda en el sentido de las agujas del reloj. Cambie de sentido en cada serie.",
    note: "Se trata de un movimiento completo de la articulación del hombro, por lo que su realización debe ser pausada, prestando atención al ejercicio y a la colocación del cuerpo respecto al aparato.",
  },
  {
    id: 5,
    name: "CAMINADOR AÉREO",
    image: require("../../../assets/machineimages/caminador.png"),
    function:
      "Mejora la movilidad, flexibilidad y coordinación de los miembros inferiores. Aumenta la capacidad cardiaca y pulmonar, reforzando la musculatura de piernas y glúteos.",
    usage:
      "Agarre el asa y colóquese sobre los pedales. Ajuste su centro de gravedad y realice el movimiento de andar con la espalda recta, moviendo los pedales hacia delante y hacia atrás sin forzar el movimiento.",
    note: "Agarre el asa con fuerza para evitar accidentes y no se baje del aparato hasta que los dos pedales estén en paralelo y parados.",
  },
  {
    id: 6,
    name: "CINTURA O GIRO",
    image: require("../../../assets/machineimages/cintura.png"),
    function:
      "Ejercita la cintura y ayuda a relajar los músculos de cintura, cadera y espalda. Refuerzo de la musculatura abdominal y lumbar.",
    usage:
      "Tome las manillas con ambas manos, mantenga el equilibrio y gire la cadera de lado a lado sin mover los hombros y de forma acompasada.",
    note: "No fuerce el giro de la cadera, la medida de la amplitud es llevar los pies, sin mover los hombros, de manilla a manilla. No suelte la manilla hasta el final del ejercicio.",
  },
  {
    id: 7,
    name: "PRESS DE PIERNA",
    image: require("../../../assets/machineimages/presspierna.png"),
    function:
      "Desarrolla y refuerza la musculatura de piernas y cintura, en concreto de cuadriceps, gemelos, glúteos y músculos abdominales inferiores.",
    usage:
      "Colóquese sobre el asiento con la espalda perfectamente apoyada y doble ambas piernas. Sitúe las manos en las rodillas y empuje con las piernas sobre los pedales, hasta estirar completamente las piernas.",
    note: "Se trata de un ejercicio de fuerza, en caso de problemas articulares no se debe forzar.",
  },
  {
    id: 8,
    name: "SURF",
    image: require("../../../assets/machineimages/surf.png"),
    function:
      "Refuerza la musculatura de la cintura, mejora la flexibilidad y coordinación del cuerpo. Recomendado para personas de todas las edades. Ejercita la columna y la cadera.",
    usage:
      "Agarre las asas con ambas manos, coloque sus pies sobre el pedal y realice movimientos oscilantes de un lado a otro, sin realizar grandes amplitudes en el balanceo.",
    note: "Se trata de un ejercicio que requiere un estado de forma de la cadera adecuado. Si tiene problemas de articulaciones de cadera o espalda, consulte al médico antes de realizarlo.",
  },
  {
    id: 9,
    name: "PRESS DE PECHO",
    image: require("../../../assets/machineimages/presspecho.png"),
    function:
      "Desarrollo de la musculatura de los miembros superiores, pecho, hombros y espalda. Mejora de la flexibilidad y agilidad de la articulación de hombro y codo. Mejora la capacidad cardio-pulmonar.",
    usage:
      "Colóquese en el asiento con la espalda apoyada en el respaldo y agarre las asas con ambas manos, tirando de ellas y volviendo a la posición inicial.",
    note: "Se trata de un ejercicio de fuerza que debe realizarse de forma no violenta y acompasada. En caso de notar alguna molestia, interrumpir el ejercicio.",
  },
  {
    id: 10,
    name: "ELÍPTICA O ESQUÍ DE FONDO",
    image: require("../../../assets/machineimages/eliptica.png"),
    function:
      "Refuerzo de la musculatura abdominal y lumbar. Mejora la flexibilidad y agilidad de la columna vertebral y de la cadera. Mejora la movilidad de los miembros superiores e inferiores.",
    usage:
      "Subido en los estribos y sujetándose a las manillas, mueva las piernas y los brazos como si estuviese caminando. Al disponer el aparato de partes móviles, tenga mucho cuidado al subir y bajar del mismo.",
    note: "Al disponer el aparato de partes móviles, tenga mucho cuidado al subir y bajar del mismo.",
  },
  {
    id: 11,
    name: "BARRA PARALELA",
    image: require("../../../assets/machineimages/barraparalela.png"),
    function:
      "Proporcionan un entrenamiento completo para el cuerpo: brazos, pecho, espalda, músculos estabilizadores del tronco, etc. Utilizando sólo el peso corporal.",
    usage:
      "Sujete las barras con las manos, extienda los brazos totalmente y luego dóblelos para realizar las flexiones.",
    note: "Se trata de un ejercicio de fuerza que debe realizarse de forma no violenta. En caso de dolor articular, suspender la realización del mismo.",
  },
]

export default function MachineInfo() {
  const [selectedMachine, setSelectedMachine] = useState(null)
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(width)).current
  const scrollY = useRef(new Animated.Value(0)).current

  const handleMachinePress = (machine) => {
    setSelectedMachine(machine)
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start()
  }

  const handleBackPress = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: width,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setSelectedMachine(null)
    })
  }

  // Animación para las tarjetas al hacer scroll
  const renderMachineCard = (machine, index) => {
    const inputRange = [-1, 0, index * 160, (index + 2) * 160]

    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0.9],
      extrapolate: "clamp",
    })

    const opacity = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0.5],
      extrapolate: "clamp",
    })

    return (
      <Animated.View
        key={machine.id}
        style={[
          styles.machineCard,
          {
            transform: [{ scale }],
            opacity,
          },
        ]}
      >
        <TouchableOpacity style={styles.cardContent} onPress={() => handleMachinePress(machine)} activeOpacity={0.8}>
          <Image style={styles.machineImage} source={machine.image} />
          <View style={styles.machineInfo}>
            <Text style={styles.machineName}>{machine.name}</Text>
            <Text style={styles.machinePreview} numberOfLines={2}>
              {machine.function.substring(0, 70)}...
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={theme.colors.secondary} style={styles.arrowIcon} />
        </TouchableOpacity>
      </Animated.View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Máquinas Biosaludables</Text>
        <AccountButton />
      </View>

      {!selectedMachine ? (
        <Animated.ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
          scrollEventThrottle={16}
        >
          <Text style={styles.sectionTitle}>Selecciona una máquina</Text>
          {machines.map(renderMachineCard)}
        </Animated.ScrollView>
      ) : (
        <Animated.View
          style={[
            styles.machineDetailContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateX: slideAnim }],
            },
          ]}
        >
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
            <Text style={styles.backButtonText}>Volver</Text>
          </TouchableOpacity>

          <ScrollView
            style={styles.detailScrollView}
            contentContainerStyle={styles.detailContent}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.detailTitle}>{selectedMachine.name}</Text>
            <Image style={styles.detailImage} source={selectedMachine.image} />

            <View style={styles.infoSection}>
              <Text style={styles.infoTitle}>Función:</Text>
              <Text style={styles.infoText}>{selectedMachine.function}</Text>
            </View>

            <View style={styles.infoSection}>
              <Text style={styles.infoTitle}>Uso:</Text>
              <Text style={styles.infoText}>{selectedMachine.usage}</Text>
            </View>

            <View style={styles.infoSection}>
              <Text style={styles.infoTitle}>Nota:</Text>
              <Text style={styles.infoText}>{selectedMachine.note}</Text>
            </View>
          </ScrollView>
        </Animated.View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.medium,
    paddingTop: theme.spacing.large,
    paddingBottom: theme.spacing.medium,
    backgroundColor: theme.colors.primary,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.colors.text,
    marginLeft: 105,    
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.medium,
    paddingBottom: theme.spacing.large * 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: theme.spacing.medium,
    color: theme.colors.primary,
  },
  machineCard: {
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: theme.spacing.medium,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: "hidden",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing.medium,
  },
  machineImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#e1e1e1",
  },
  machineInfo: {
    flex: 1,
    marginLeft: theme.spacing.medium,
  },
  machineName: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.primary,
    marginBottom: 4,
  },
  machinePreview: {
    fontSize: 14,
    color: "#666",
  },
  arrowIcon: {
    marginLeft: theme.spacing.small,
  },
  machineDetailContainer: {
    flex: 1,
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.primary,
  },
  backButtonText: {
    marginLeft: theme.spacing.small,
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.text,
  },
  detailScrollView: {
    flex: 1,
  },
  detailContent: {
    padding: theme.spacing.medium,
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.colors.primary,
    marginBottom: theme.spacing.medium,
    textAlign: "center",
  },
  detailImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: theme.spacing.large,
    backgroundColor: "#e1e1e1",
  },
  infoSection: {
    marginBottom: theme.spacing.large,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.secondary,
    marginBottom: theme.spacing.small,
  },
  infoText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
  },
})
