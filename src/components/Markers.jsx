import { View, Text, Image } from 'react-native'
import React, { useContext } from 'react'
import { Marker } from 'react-native-maps'
import tw from "twrnc";
//API
import { SelectMarkerContext } from '../contexts/SelectMarkerContext';
//Icons
import { Ionicons } from '@expo/vector-icons';

//Images



const Markers = ({index, place}) => {
  // console.log("Markers", place)
  const {selectedMarker, setSelectedMarker} = useContext(SelectMarkerContext);

  return place&&(
      <Marker
              coordinate={{
                latitude: place?.geometry?.location.lat,
                longitude: place?.geometry?.location.lng,
              }}
              onPress={() => {setSelectedMarker(index)}}
      >
        {/* <Ionicons name="restaurant" size={24} color="white" style={tw`bg-green-500 rounded-lg p-1 mb-3`}  /> */}
        <Image style={tw`w-10 h-12`} source={require('../../assets/location_res.png')}/>
      </Marker>
  )
}

export default Markers