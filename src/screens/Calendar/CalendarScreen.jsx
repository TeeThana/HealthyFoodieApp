import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { LinearGradient } from "expo-linear-gradient";
import { format } from "date-fns";
import tw from "twrnc";

const CalenderScreen = () => {
  const [selected, setSelected] = useState("");
  const currentDate = new Date();
  const month = { month: "long" };
  const year = currentDate.getFullYear();
  const formattedDate = currentDate.toLocaleDateString("en-US", month);

  return (
    <LinearGradient
      colors={["#FEDF03", "#FFEC66"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 0.3 }}
      locations={[0.6, 1]}
      style={{ flex: 1 }}
    >
      <View>
        <Text style={tw`uppercase font-bold text-2xl text-center my-15`}>
          {formattedDate} {year}
        </Text>
        <View style={tw`mt-10 bg-white h-full`}>
          <Calendar
            onDayPress={(day) => {
              setSelected(day.dateString);
            }}
            style={tw`m-5`}
            markedDates={{
              [selected]: {
                selected: true,
                disableTouchEvent: true,
                selectedDotColor: "orange",
              },
            }}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    alignItems: "center",
    marginTop: "20%",
  },
  text: {
    color: "#313047",
    fontSize: 16,
    textTransform: "uppercase",
    marginBottom: 30,
    fontWeight: "bold",
    fontSize: "25px",
  },
});

export default CalenderScreen;
