import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import AccountButton from '../_components/AccountButton';
export default function Rutines() {

  
  return (
    <View style={styles.container}>
      <AccountButton />
      <Text style={styles.text}>Búsqueda</Text>
      <TextInput
        style={styles.input}
        placeholder="Buscar..."
        placeholderTextColor="#888"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
});