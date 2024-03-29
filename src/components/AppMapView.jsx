import React, { useState, useEffect, useContext } from "react";
import { View } from "react-native";
import tw from "twrnc";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MapViewStyle from "../utils/MapViewStyle";
import { UserLocationContext } from "../contexts/UserLocationContext";
import Markers from "./Markers";
import MapViewDirections from "react-native-maps-directions";
import { SelectDirectionContext } from "../contexts/SelectDirectionContext";
import GlobalApi from "../utils/GlobalApi";

const AppMapView = ({ placeList }) => {
  const { location, setLocation } = useContext(UserLocationContext);
  const [origin, setOrigin] = useState();
  const { direction, setDirection } = useContext(SelectDirectionContext);
  console.log("Direction", direction);
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    if (direction) {
      setOrigin({
        latitude: location?.coords.latitude,
        longitude: location?.coords.longitude,
      });
      setDestination({
        latitude: direction.lat,
        longitude: direction.lng,
      });
    }
    console.log("Origin", origin);
    console.log("Destination", destination);
  }, [direction]);
  // console.log("AppMapView", placeList);

  return (
    location?.coords.latitude && (
      <View style={tw`flex`}>
        <MapView
          // zoomControlEnabled={true}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          style={tw`w-full h-full`}
          customMapStyle={MapViewStyle}
          minZoomLevel={13}
          initialRegion={{
            latitude: location?.coords.latitude,
            longitude: location?.coords.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          {location ? (
            <Marker
              coordinate={{
                latitude: location?.coords.latitude,
                longitude: location?.coords.longitude,
              }}
            >
              {/* <MaterialIcons name="my-location" size={35} color="#3b82f6" /> */}
            </Marker>
          ) : null}
          {destination && (
            <MapViewDirections
              origin={origin}
              destination={destination}
              apikey={GlobalApi.API_KEY}
              strokeWidth={5}
              strokeColor="#FF005D"
            />
          )}
          {placeList &&
            placeList.map((item, index) => (
              <Markers key={index} index={index} place={item} />
            ))}
        </MapView>
      </View>
    )
  );
};

export default AppMapView;
