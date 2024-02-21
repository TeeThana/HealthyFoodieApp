import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MyRewardsScreen = () => {
    return (
        <View style= {styles.contianer}>
            <Text>My Rewards</Text>
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

export default MyRewardsScreen;