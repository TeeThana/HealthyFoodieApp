import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CalenderScreen = () => {
    return (
        <View style= {styles.contianer}>
            <Text>Calendar</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    contianer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default CalenderScreen;