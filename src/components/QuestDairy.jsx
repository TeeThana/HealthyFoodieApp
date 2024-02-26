import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import * as Progress from 'react-native-progress';
import ProgressDairy from './ProgressDairy';

const QuestDairy = () => {
    const [checked, setChecked] = useState(false);

    const handleChecked = () => {
        setChecked(!checked);
    };

    return (
        <View style={tw`bg-white w-5/6 h-20 mt-5 rounded-lg shadow-md `}>
            <View style={tw`flex flex-row justify-between mx-3 mt-5 items-baseline`}>
                <Text style={tw`text-black font-bold `}>
                    Breakfast
                </Text>
                <TouchableOpacity style={[tw`p-3 rounded-md`, { backgroundColor: checked ? '#D9D9D9' : '#00D49D' }]} onPress={() => {handleChecked();}}>
                    <Text style={tw`text-white font-bold `}>
                        {checked ? 'Checked' : 'Check'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default QuestDairy