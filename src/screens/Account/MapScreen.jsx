import React, { useState, useEffect, useContext } from "react";
import { TouchableOpacity, View, Text, Linking, ActivityIndicator } from "react-native";
import tw from "twrnc";
import axios from "axios";
import AppMapView from "../../components/AppMapView";
import { UserLocationContext } from "../../contexts/UserLocationContext";
import GlobalApi from "../../utils/GlobalApi";
import PlaceListView from "../../components/PlaceListView";
import { SelectMarkerContext } from "../../contexts/SelectMarkerContext";
import { SelectDirectionContext } from "../../contexts/SelectDirectionContext";

//Icons
import { AntDesign } from "@expo/vector-icons";

const MapScreen = ({ navigation, route }) => {
  const FilterMenu = route.params.menu.split(/[\s,]+/);
  const Filter = FilterMenu[0];
  console.log("Menu", route.params.menu);
  const [filter, setFilter] = useState(Filter);
  console.log("Filter", filter);
  const { location, setLocation } = useContext(UserLocationContext);
  const [placeList, setPlaceList] = useState();
  const [selectedMarker, setSelectedMarker] = useState([]);
  const [direction, setDirection] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    location &&
      fetchPlaces(location?.coords?.latitude, location?.coords?.longitude);
    
  }, [location]);

  const fetchPlaces = async (latitude, longitude) => {
    console.log("FetchPlaces", latitude, longitude);
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${filter}&location=${latitude},${longitude}&radius=5000&key=${GlobalApi.API_KEY}`;
    console.log("URL", url);
    try {
      const response = await axios.get(url);
      const filterPlace = response.data.results.filter((place) => {
        console.log(place.geometry.location);
      });
      if (response.data.results.length === 0) {
        console.log("No result");
        setPlaceList(null)
      } else {
        setPlaceList(response.data.results);
      }
    } catch (error) {
      console.error("Error fetching places: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleHowToDo = () => {
    Linking.openURL(`https://www.google.co.th/search?q=วิธีทำ${FilterMenu}`);
  }

  return (
    <SelectMarkerContext.Provider value={{ selectedMarker, setSelectedMarker }}>
      <SelectDirectionContext.Provider value={{ direction, setDirection }}>
        <View>
          <TouchableOpacity
            style={tw`absolute z-10 top-10 mx-3 bg-white rounded-2 p-2 shadow-md`}
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="arrowleft" size={25} color="#313047" solid />
          </TouchableOpacity>
          {!loading ? (
              <>
          {placeList ? (
              <AppMapView placeList={placeList} />
            ) : (
              <View style={tw`mt-100 items-center `}>
              <Text style={tw`font-bold text-lg`}>Sorry, No restaurant for this menu :(</Text>
              <TouchableOpacity onPress={handleHowToDo} style={tw`mt-3 bg-green-400 p-3 rounded-md shadow-md`} >
                <Text style={tw`font-bold text-white `}> How to Do: {FilterMenu}</Text>
              </TouchableOpacity>
              </View>
            )}

          <View style={tw`absolute z-10 bottom-0 w-full`}>
              <TouchableOpacity onPress={handleHowToDo} style={tw`mx-5 bg-white p-3 rounded-md shadow-md`} >
                <Text style={tw`font-bold`}> How to Do: {FilterMenu}</Text>
              </TouchableOpacity>
            {placeList && <PlaceListView placeList={placeList} />}
          </View>
            </> ) : (
            <View style={tw`bg-gray-100 w-full h-full mt-20 items-center`}>
            <ActivityIndicator />
          </View>
          )}
        </View>
      </SelectDirectionContext.Provider>
    </SelectMarkerContext.Provider>
  );
};

export default MapScreen;
