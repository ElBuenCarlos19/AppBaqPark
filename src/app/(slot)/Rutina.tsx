import { useLocalSearchParams } from 'expo-router';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { FC } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import RutineHeader from '../_components/RutineHeader';
import RutineProgress from '../_components/RutineProgress';
import RutineScrollItem from '../_components/RutineScrollItem';

const rutinas = [
  {
    nombre: 'Rutina Básica 1',
    ejercicios: [
      { src: require('../../../assets/basic.png'), repeticiones: 'x16' },
      { src: require('../../../assets/intermediate.png'), repeticiones: 'x20' },
      { src: require('../../../assets/tip-icon.jpg'), repeticiones: 'x16' },
      { src: require('../../../assets/customLock.png'), repeticiones: 'x16' },
      { src: require('../../../assets/advanced.png'), repeticiones: 'x10' },
      { src: require('../../../assets/basic.png'), repeticiones: 'x16' },
      { src: require('../../../assets/intermediate.png'), repeticiones: 'x20' },
      { src: require('../../../assets/tip-icon.jpg'), repeticiones: 'x16' },
      { src: require('../../../assets/customLock.png'), repeticiones: 'x16' },
      { src: require('../../../assets/advanced.png'), repeticiones: 'x10' },
    ],
  },
  {
    nombre: "Rutina Basica 2",
    ejercicios: [
      { src: require('../../../assets/basic.png'), repeticiones: 'x16' },
      { src: require('../../../assets/intermediate.png'), repeticiones: 'x20' },
      { src: require('../../../assets/tip-icon.jpg'), repeticiones: 'x16' },
      { src: require('../../../assets/customLock.png'), repeticiones: 'x16' },
      { src: require('../../../assets/advanced.png'), repeticiones: 'x10' },
      { src: require('../../../assets/basic.png'), repeticiones: 'x16' },
      { src: require('../../../assets/intermediate.png'), repeticiones: 'x20' },
      { src: require('../../../assets/tip-icon.jpg'), repeticiones: 'x16' },
      { src: require('../../../assets/customLock.png'), repeticiones: 'x16' },
      { src: require('../../../assets/advanced.png'), repeticiones: 'x10' },
    ]
  }
];

const ModalRutine: FC = () => {
  const { title } = useLocalSearchParams();

  if (!title) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>No se encontró la rutina seleccionada.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <RutineHeader router={router} header={title} />
          {rutinas.map((rutina, idx) => (
            <RutineScrollItem key={idx} excerciseItems={rutina} />
          ))}
        </ScrollView>
        <RutineProgress />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 120, // espacio para que RutineProgress no tape contenido
  },
});

export default ModalRutine;
