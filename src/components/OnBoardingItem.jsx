import React from "react";
import {View, Text, StyleSheet, useWindowDimensions} from "react-native";
import TestBoarding from "./TestBoarding";

const OnBoardingItem = ({item}) => {

    const { width } = useWindowDimensions();

    return (
        <View style={[styles.container, { width }]}>
            <View style={{ flex: 0.3}}>
                <Text style={[styles.title]}>{item.title}</Text>
                <Text style={[styles.text]}>{item.text}</Text>
            </View>
        </View>
    ) 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        flex: 0.7,
        textAlign: 'center',
        marginBottom: 10,
        fontWeight: '800',
        fontSize: 28,
    },
    title: {
        textAlign: 'center',
        marginBottom: 10,
        fontWeight: '800',
        fontSize: 28,
    },
})

export default OnBoardingItem
