import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AccountScreen = () => {
    return (
        <View style= {styles.contianer}>
            <Text>Account</Text>
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
export default AccountScreen;
