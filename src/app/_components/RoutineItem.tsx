import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import {RoutineItemProps} from '../util/types'
const RoutineItem: React.FC<RoutineItemProps> = ({ routine }) => {
  return (
    <TouchableOpacity style={styles.routineItem}>
      <Image source={routine.image} style={styles.routineImage} />
      <Text style={styles.routineText}>{routine.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
});

export default RoutineItem;
