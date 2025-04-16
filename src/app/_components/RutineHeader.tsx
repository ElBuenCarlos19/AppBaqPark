import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';

const Header = ({router, header}) => (
  <View style={styles.header}>
    <Text style={styles.title}>{header.toUpperCase()}</Text>
    <View style={styles.buttons}>
      <TouchableOpacity style={styles.button} onPress={()=>router.push('/screen/Rutines')}><Text style={styles.buttonText}>Volver</Text></TouchableOpacity>
      <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Filtrar</Text></TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  header: { alignItems: 'center', marginVertical: 16 },
  title: { fontWeight: 'bold', fontSize: 20 },
  buttons: { flexDirection: 'row', marginTop: 10, gap: 10 },
  button: {
    backgroundColor: '#cddc39',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  buttonText: { fontWeight: 'bold' },
});

export default Header;
