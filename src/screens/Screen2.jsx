import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Screen2 = ({ navigation }) => (
  <View style={styles.container}>
    <Text>Screen 2</Text>
    <Button title="Go back to SplashScreen" onPress={() => navigation.navigate('SplashScreen')} />
    <Button title="Go back to Screen 1" onPress={() => navigation.navigate('Screen 1')} />
  </View>
);

export default Screen2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});