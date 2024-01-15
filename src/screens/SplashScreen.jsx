import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Screen1');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View>
      <Text style={styles.font}>HealthyGen</Text>
      </View>
      <View style={styles.buttontext}>
      <Text>Develop by TFG</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // จัดให้ตรงกลางแนวตั้ง
    alignItems: 'center', // จัดให้ตรงกลางแนวนอน
  },
  font: {
    color: "#00D49D",
    fontWeight: "bold",
    fontSize: 40,
  },
  buttontext: {
    position: 'absolute',
    bottom: 50,
  },
});

export default SplashScreen;