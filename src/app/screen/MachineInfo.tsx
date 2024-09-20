import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import AccountButton from '../_components/AccountButton';
export default function MachineInfo() {
  return ( 
    <View style={styles.container}>
      <AccountButton />
      <Image
        style={styles.profileImage}
        source={{uri: 'https://via.placeholder.com/150'}}
      />
      <Text style={styles.name}>Nombre de Usuario</Text>
      <Text style={styles.bio}>Esta es una breve biografía del usuario.</Text>
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
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bio: {
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
  },
});