import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FriendScreen = () => {
    return (
        <View style= {styles.contianer}>
            <Text>Friend</Text>
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

export default FriendScreen;