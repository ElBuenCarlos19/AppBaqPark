import { FC } from 'react';
import { RutinePropsWithChildren } from '../util/types';
import ExcerciseItem from './ExcerciseItem';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const RutineScrollItem: FC<RutinePropsWithChildren> = ({ excerciseItems }) => {
  if (!excerciseItems?.ejercicios || excerciseItems.ejercicios.length === 0) {
    return null;
  }

  const { nombre, ejercicios } = excerciseItems;

  return (
    <>
    <Text style={styles.title}>{nombre}</Text>
    <ScrollView style={styles.container}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        nestedScrollEnabled={true}
        scrollEventThrottle={16}
    >
    <View style={styles.grid}>
      {ejercicios.map((excercise, index) => (
        <View key={index} style={{ marginRight: 12 }}>
        <ExcerciseItem excercises={excercise} />
        </View>
      ))}
    </View>
  </ScrollView>
  </>
  );
};

const styles = StyleSheet.create({
    container: {
      marginBottom: 24,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 12,
      marginLeft: 16,
    },
    grid: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
  

export default RutineScrollItem;
