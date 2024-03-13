import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import tw from "twrnc";
import MapViewStyle from "../../utils/MapViewStyle";
import { UserLocationContext } from "../../contexts/UserLocationContext";

//Icon
import { MaterialIcons } from "@expo/vector-icons";

const MapScreen = () => {
  const { location, setLocation } = useContext(UserLocationContext);

  return (
    location?.coords.latitude && (
      <View style={tw`flex`}>
        <MapView
          zoomControlEnabled={true}
          provider={PROVIDER_GOOGLE}
          style={tw`w-full h-full`}
          customMapStyle={MapViewStyle}
          region={{
            latitude: location?.coords.latitude,
            longitude: location?.coords.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          <Marker
            coordinate={{
              latitude: location?.coords.latitude,
              longitude: location?.coords.longitude,
            }}
          >
            <MaterialIcons name="my-location" size={35} color="#3b82f6" />
          </Marker>
        </MapView>
      </View>
    )
  );
};

export default MapScreen;
