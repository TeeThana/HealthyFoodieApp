import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const HomeScreen = ({navigation}) => {

    const handleIncrease = () => {
      navigation.navigate("Increase");
    };

    const handleDecrease = () => {
      navigation.navigate("Increase");
    };

    return (
        
        <View style={styles.container}>
          <TouchableOpacity style={styles.whiteContainer} onPress={handleIncrease}>
            <Text style={styles.increseText}> increase your weight</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.greenContainer} onPress={handleDecrease}>
            <Text style={styles.decreseText}> decrease your weight</Text>
          </TouchableOpacity>
        </View>
      );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    whiteContainer: {
        flex: 1,
        backgroundColor: 'white', // สีส่วนบน
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      },
      greenContainer: {
        flex: 1,
        backgroundColor: '#00D49D',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      },
      increseText: {
        textTransform: 'uppercase',
        color: '#00D49D',
        fontSize: 25,
        fontWeight: 'bold',
      },
      decreseText: {
        textTransform: 'uppercase',
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        
      },
  });
  
  export default HomeScreen;