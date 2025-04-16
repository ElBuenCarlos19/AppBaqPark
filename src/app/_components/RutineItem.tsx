import React from 'react';
import { useRouter } from 'expo-router';
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { RoutineItemProps, RutinePropsWithChildren } from '../util/types';
import { useAuthentication } from '../auth/AuthenticationContext';
import { useModalContext } from './userModalDisplayContext';

const RutineItem: React.FC<RoutineItemProps & RutinePropsWithChildren> = ({ routine, SessionRequired }) => {
  const { session } = useAuthentication();
  const { open } = useModalContext();
  const router = useRouter();

  const handlePress = () => {
    if (SessionRequired && !session) {
      open();
    } else {
      router.push({ pathname: '/Rutina', params: { title: routine.title } });
    }
  };

  return (
    <TouchableOpacity style={styles.routineItem} onPress={handlePress}>
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

export default RutineItem;
