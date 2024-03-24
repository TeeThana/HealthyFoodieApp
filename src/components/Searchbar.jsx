import { View, Text } from 'react-native'
import React from 'react'
import tw from "twrnc";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const Searchbar = ({searchedLocation}) => {
  return (
    <View style={tw`shadow-2xl`}>
    <GooglePlacesAutocomplete
      placeholder='Search'
      fetchDetails={true}
      enablePoweredByContainer={false}
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        searchedLocation(details?.geometry?.location)
      }}
      query={{
        key: 'AIzaSyCNJgXSKjkQshhZQZFE0S491H-T9mRYb3Q',
        language: 'en',
      }}
    />
    </View>
  )
}

export default Searchbar