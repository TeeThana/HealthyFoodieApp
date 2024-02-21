import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Button } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';

const RewardsScreen = ({navigation}) => {

    const handleBack = () => {
        navigation.navigate('Account');
    }

    const handleMyRewards = () => {
        navigation.navigate('MyRewards');
    }

    return (
        <LinearGradient
        colors={["#00D49D", "#FFFFFF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        locations={[0, 1]}
        style={tw`flex-1`}
        >
            <View style={tw`flex-1 `}>
                <View style={tw` flex flex-row items-center mt-15 mb-20 `}>
                    <TouchableOpacity  onPress={handleBack}>
                        <Text style={tw`text-base pl-5`}>back</Text>
                    </TouchableOpacity>
                    <Text style={tw`font-bold text-2xl flex-1 text-center justify-center pr-12`}>Rewards</Text>
                </View>
                <View style={tw` flex flex-row items-center justify-between px-5`}>
                    <Text style={tw`font-bold`}>0 Point</Text>
                    <TouchableOpacity  style={tw`bg-white p-2 rounded-xl`} onPress={handleMyRewards}>
                        <Text style={tw`text-base font-bold`}>My rewards</Text>
                    </TouchableOpacity>
                </View>
                <View style={tw`bg-white h-4/6 mt-auto`}>
 
                </View>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    contianer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default RewardsScreen;