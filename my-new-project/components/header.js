import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Header(props) {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>{props.title}</Text>
      <Ionicons name="ios-information-circle-outline" size={32} color="white" style={styles.icon}/>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 100,
    paddingTop: 55,
    backgroundColor: '#ff5757',
    width: 400,
    marginLeft: -20, 
    marginTop: -50,
  },
  text: {
      color: '#fff',
      fontSize: 33,
      textAlign: 'center',
      fontFamily: 'Futura',
      fontWeight: 'bold',
  },
  icon: {
      position: "absolute",
      right: 43,
      top: 59,
  }
});
