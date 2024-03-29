import React from 'react';
import { View, ActivityIndicator } from "react-native";
import tw from 'twrnc';

const Loading = () => {
    return (
        <View style={tw`flex-row justify-center items-center h-full`}>
        <ActivityIndicator size="large" color="#00D49D" />
        </View> 
    )
}

export default Loading;