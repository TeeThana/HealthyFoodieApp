import { View, FlatList, Dimensions } from "react-native";
import React, { useRef, useEffect, useContext } from "react";
import PlaceItem from "./PlaceItem";
import { SelectMarkerContext } from "../contexts/SelectMarkerContext";

const PlaceListView = ({ placeList }) => {
  const flatListRef = useRef(null);
  const { selectedMarker, setSelectedMarker } = useContext(SelectMarkerContext);

  useEffect(() => {
    selectedMarker && scrollToIndex(selectedMarker);
  }, [selectedMarker]);

  const scrollToIndex = (index) => {
    console.log("ScrollToIndex", index);
    flatListRef.current?.scrollToIndex({ animated: true, index });
  };
  const getItemLayout = (_, index) => ({
    length: Dimensions.get("window").width,
    offset: Dimensions.get("window").width * index,
    index,
  });

  return (
    <View>
      <FlatList
        data={placeList}
        horizontal={true}
        pagingEnabled
        ref={flatListRef}
        getItemLayout={getItemLayout}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View key={index}>
            <PlaceItem place={item} />
          </View>
        )}
      />
    </View>
  );
};

export default PlaceListView;
