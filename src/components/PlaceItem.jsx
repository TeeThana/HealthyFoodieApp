import { View, Text, Image, Dimensions } from 'react-native'
import React, {useContext, useState} from 'react'
import tw from "twrnc";
import GlobalApi from '../utils/GlobalApi';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SelectDirectionContext } from '../contexts/SelectDirectionContext';

const PlaceItem = ({ place }) => {
    // console.log("Place", place)
    const PLACE_PHOTO_BASE_URL = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=";
    // console.log("Ref", place.photos[0].photo_reference);
    // console.log("Direction", place.geometry.location)
    const { direction, setDirection } = useContext(SelectDirectionContext)

    const handleSelectDirection = () => {
        setDirection(place.geometry.location)
    }

    return (
        <View style={[tw`bg-white m-5 rounded-lg shadow-lg`, { width: Dimensions.get('screen').width*0.9}]}>
            <Image source={
                place?.photos ?
                    {
                        uri: PLACE_PHOTO_BASE_URL + place.photos[0].photo_reference + "&key=" + GlobalApi.API_KEY
                    }
                    : require('../../assets/splash.png')}
                style={tw`w-full h-50 rounded-lg z-10`} />
            <View style={tw`p-5`}>
                <Text style={tw`font-bold text-base mb-2`}>{place.name}</Text>
                <Text style={tw`text-sm text-gray-500`}>{place?.formatted_address}</Text>
            </View>
            <TouchableOpacity onPress={handleSelectDirection}>
            <FontAwesome 
                name="location-arrow" 
                size={24} color="white" 
                style={tw`p-3 bg-green-500 rounded-b-lg`}
            />
            </TouchableOpacity>
        </View>
    )
}

export default PlaceItem