import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FriendsScreen = () => {
    return (
        <View style= {styles.contianer}>
            <Text>Friends</Text>
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

export default FriendsScreen;