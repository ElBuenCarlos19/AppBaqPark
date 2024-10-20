import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, Dimensions, ScrollView } from 'react-native';
import AccountButton from '../_components/AccountButton';
import { useAuthentication } from '../auth/AuthenticationContext';
import { Ionicons } from '@expo/vector-icons';
const routineTypes = [
  { title: 'Rutinas Básicas', image: require('./assets/basic.png') },
  { title: 'Rutinas Intermedias', image: require('./assets/intermediate.png') },
  { title: 'Rutinas Avanzadas', image: require('./assets/advanced.png') },
  { title: 'Rutinas Personalizadas', image: require('./assets/customLock.png') },
];
const {height} = Dimensions.get('window');
export default function Rutines() {
  const { session } = useAuthentication();
  const [expanded, setExpanded] = useState(false); // Controla si el contenido está expandido

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <SafeAreaView style={styles.container}>
      <AccountButton />
      {/* Rutinas */}
      <View style={styles.routineGrid}>
        {routineTypes.map((routine, index) => (
          <TouchableOpacity key={index} style={styles.routineItem}>
            <Image source={routine.image} style={styles.routineImage} />
            <Text style={styles.routineText}>{routine.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Barra de Progreso + Detalles Combinados */}
      <TouchableOpacity style={styles.progressContainer} onPress={toggleExpand}>
        <View style={styles.progressBar}>
          <Text style={styles.progressText}>TU PROGRESO</Text>
          {!session && (<Ionicons name={"lock-closed"} size={24} color="white" />)}
          {session&&(<Ionicons 
            name={expanded ? "chevron-up" : "chevron-down"} 
            size={24} 
            color="white" 
          />)}
        </View>

        {/* Detalles si está expandido */}
        {session && expanded && (
          <View style={styles.detailsContainer}>
            <Text style={styles.detailText}>Días activos: 19</Text>
            <Text style={styles.detailText}>Consumo de agua: Frecuente</Text>
            <Text style={styles.detailText}>Días descansó: 10</Text>
            <Text style={styles.detailText}>Promedio Calorías: 340-200 Kcal/día</Text>
            <Text style={styles.detailText}>Condición física: Óptima</Text>
          </View>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  routineGrid: {
    marginTop: 50,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 16,
    paddingBottom: height*0.1,
  },
  routineItem: {
    width: '45%',
    aspectRatio: 1,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  routineImage: {
    width: '60%',
    height: '60%',
    resizeMode: 'contain',
  },
  routineText: {
    marginTop: 8,
    textAlign: 'center',
  },
  progressContainer: {
    position: 'absolute',
    top: height*0.50, // Ajusta esta posición para moverlo hacia arriba o abajo
    left: 16, 
    right: 16,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 16,
  },
  progressBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressText: {
    color: 'white',
    fontWeight: 'bold',
  },
  detailsContainer: {
    marginTop: 10,
  },
  detailText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
});
