import React, {useState} from 'react';
import { View, Text, TextInput} from 'react-native';
import tw from 'twrnc';
import * as Progress from 'react-native-progress';

const ProgressDairy = ({weight}) => {
    const [percent, setPercent] = useState(weight);

    const handleWeightChange = (percent) => {
        setPercent(percent);
    };

    return (
    <View style={tw`bg-white w-5/6 h-20 mt-5 rounded-lg shadow-md`}>
        <View style={tw`items-center`}>
            <Text style={tw`uppercase text-black font-bold mt-5`}>
                dairy
            </Text>
        </View>
        <View style={tw`mt-5 items-center`}> 
            <Progress.Bar progress={percent/100} width={250}  color={'#00D49D'} unfilledColor={'#D9D9D9'} borderWidth={0} height={8}/>
        </View>
    </View>
    )
}

export default ProgressDairy