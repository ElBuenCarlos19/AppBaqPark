import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RutineProgress = () => (
  <View style={styles.container}>
    <Text style={styles.title}>TU PROGRESO</Text>
    <View style={styles.grid}>
      <Text style={styles.text}>
        Días activos: 19{"\n"}
        Días descanso: 10{"\n"}
        Condición física: Óptima
      </Text>
      <Text style={styles.text}>
        Consumo de agua: Frecuente{"\n"}
        Promedio Calorías:{"\n"}
        140–200 Kcal/día
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#003300',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 20,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 12,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: 'white',
  },
});

export default RutineProgress;
