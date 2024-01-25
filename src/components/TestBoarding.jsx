import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import OnBoardingItem from "./OnBoardingItem";

const slides = [
    {
        key: 1,
        title: 'Title 1',
        text: 'Description.\nSay something cool',
        backgroundColor: '#59b2ab',
    },
    {
        key: 2,
        title: 'Title 2',
        text: 'Other cool stuff',
        backgroundColor: '#febe29',
    },
    {
        key: 3,
        title: 'Rocket guy',
        text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
        backgroundColor: '#22bcb5',
    }
];

const TestBoarding = () => {
    return (
        <View style={styles.container}>
            <FlatList 
            data={slides} 
            renderItem={({ item }) => <OnBoardingItem item={item} />} 
            horizontal 
            showsHorizontalScrollIndicator 
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default TestBoarding

