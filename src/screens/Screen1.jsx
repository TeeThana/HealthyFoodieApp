import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Screen1 = ({ navigation }) => (
  <View style={styles.container}>
    <Text>Screen 1</Text>
    <Button title="Go to Splash" onPress={() => navigation.navigate('SplashScreen')} />
    <Button title="Go to Screen 2" onPress={() => navigation.navigate('Screen2')} />
  </View>
);

export default Screen1;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });