import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, Dimensions, Animated, PanResponder } from 'react-native';
import AccountButton from '../_components/AccountButton';
import { useAuthentication } from '../auth/AuthenticationContext';
import { Ionicons } from '@expo/vector-icons';
import { useModalContext } from '../_components/userModalDisplayContext';
const routineTypes = [
  { title: 'Rutinas Básicas', image: require('../../../assets/basic.png') },
  { title: 'Rutinas Intermedias', image: require('../../../assets/intermediate.png') },
  { title: 'Rutinas Avanzadas', image: require('../../../assets/advanced.png') },
  { title: 'Rutinas Personalizadas', image: require('../../../assets/customLock.png') },
];

const { height } = Dimensions.get('window');
const COLLAPSED_HEIGHT = 60;
const EXPANDED_HEIGHT = 250;
export default function Rutines() {
  const { open } = useModalContext();
  const { session } = useAuthentication();
  const pan = useRef(new Animated.ValueXY()).current;
  const [expanded, setExpanded] = useState<boolean>(false);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      if (gestureState.dy < 0 || expanded) {
        pan.y.setValue(Math.max(gestureState.dy, COLLAPSED_HEIGHT - EXPANDED_HEIGHT));
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dy < -50 || (expanded && gestureState.dy > 50)) {
        setExpanded(!expanded);
        Animated.spring(pan.y, {
          toValue: expanded ? 0 : COLLAPSED_HEIGHT - EXPANDED_HEIGHT,
          useNativeDriver: false,
        }).start();
      } else {
        Animated.spring(pan.y, {
          toValue: expanded ? COLLAPSED_HEIGHT - EXPANDED_HEIGHT : 0,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  const animatedHeight = pan.y.interpolate({
    inputRange: [COLLAPSED_HEIGHT - EXPANDED_HEIGHT, 0],
    outputRange: [EXPANDED_HEIGHT, COLLAPSED_HEIGHT],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.container}>
      <AccountButton />
      <View style={styles.routineGrid}>
        {routineTypes.map((routine, index) => (
          <TouchableOpacity key={index} style={styles.routineItem}>
            <Image source={routine.image} style={styles.routineImage} />
            <Text style={styles.routineText}>{routine.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Animated.View
        style={[styles.progressContainer, { height: animatedHeight }]}
        {...panResponder.panHandlers}
        onTouchStart={!session?open:null}
      >
        <View style={styles.handle} />
        <View style={styles.progressBar}>
          <Text style={styles.progressText}>TU PROGRESO</Text>
          {!session && <Ionicons name="lock-closed" size={24} color="white" />}
          {session && (
            <Ionicons
              name={expanded ? "chevron-down" : "chevron-up"}
              size={24}
              color="white"
            />
          )}
        </View>

        {session && (
          <Animated.View
            style={[
              styles.detailsContainer,
              {
                opacity: pan.y.interpolate({
                  inputRange: [COLLAPSED_HEIGHT - EXPANDED_HEIGHT, 0],
                  outputRange: [1, 0],
                }),
              },
            ]}
          >
            <Text style={styles.detailText}>Días activos: 19</Text>
            <Text style={styles.detailText}>Consumo de agua: Frecuente</Text>
            <Text style={styles.detailText}>Días descansó: 10</Text>
            <Text style={styles.detailText}>Promedio Calorías: 340-200 Kcal/día</Text>
            <Text style={styles.detailText}>Condición física: Óptima</Text>
          </Animated.View>
        )}
      </Animated.View>
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
    paddingBottom: height * 0.1,
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
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#4CAF50',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: 'white',
    borderRadius: 3,
    alignSelf: 'center',
    marginTop: 10,
  },
  progressBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  progressText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  detailsContainer: {
    padding: 16,
    paddingTop: 0,
  },
  detailText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
});
