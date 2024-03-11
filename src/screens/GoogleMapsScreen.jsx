import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, {
  PROVIDER_GOOGLE,
  enableLatestRenderer,
  Marker,
} from "react-native-maps";
import tw from "twrnc";
import { Entypo } from "@expo/vector-icons";

// enableLatestRenderer();

const GoogleMapsScreen = () => {
  return (
    <View style={tw`flex`}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={tw`h-full w-full`}
        zoomEnabled={true}
        initialRegion={{
          latitude: 13.7563,
          longitude: 100.5018,
          latitudeDelta: 1,
          longitudeDelta: 1,
        }}
      >
        {/* <Marker
          coordinate={{ latitude: 13.7563, longitude: 100.5018 }}
          title={"title"}
          description={"test"}
          icon={<Entypo name="location-pin" size={24} color="black" />}
        /> */}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  mapStyle: {
    height: "100%",
    width: "100%",
  },
});

export default GoogleMapsScreen;
