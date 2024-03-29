import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Calendar, Agenda } from "react-native-calendars";
import { LinearGradient } from "expo-linear-gradient";
import tw from "twrnc";
import AsyncStorage from "@react-native-async-storage/async-storage";

//db
import { db } from "../../../firebaseConfig";
import { getDoc, doc } from "firebase/firestore";

const CalenderScreen = () => {
  const [press, setPress] = useState(false);
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const currentDate = new Date();
  const month = { month: "long" };
  const year = currentDate.getFullYear();
  const formattedDate = currentDate.toLocaleDateString("en-GB", month);

  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    getStartDate();
    // if (!selectedDate) {
    //   const today = new Date()
    //     .toLocaleDateString("en-GB")
    //     .split("/")
    //     .reverse()
    //     .join("-");
    //   const formattedToday = today.split("T")[0];
    //   getPlanData(formattedToday);
    //   setSelectedDate(formattedToday);
    // } else {
    //   getPlanData(selectedDate);
    // }
  }, []);

  const getStartDate = async () => {
    const username = await AsyncStorage.getItem("username");
    const docRef = doc(db, "UserPlan", username);
    const res = await getDoc(docRef);
    const start = res.data().start;
    const rangeStr = res.data().timeRange.split(" สัปดาห์")[0];
    const range = parseInt(rangeStr);

    let markDay = parseInt(start.split("-")[2]);
    let markMonth = parseInt(start.split("-")[1]);
    let markYear = parseInt(start.split("-")[0]);

    // Highlight the start date and range

    const marked = {};
    const formattedMonth = markMonth.toString().padStart(2, "0");
    const formattedDay = markDay.toString().padStart(2, "0");
    marked[`${markYear}-${formattedMonth}-${formattedDay}`] = {
      color: "lightblue",
    };

    for (let i = 1; i <= range * 7; i++) {
      markDay++;

      //Month change
      if (markDay > 31) {
        markDay = 1;
        markMonth++;

        // check date of month 30 or 31
        if (
          markMonth === 4 ||
          markMonth === 6 ||
          markMonth === 9 ||
          markMonth === 11
        ) {
          if (markDay > 30) {
            markDay = 1;
            markMonth++;
          }
        } else if (markMonth !== 2) {
          if (markDay > 31) {
            markDay = 1;
            markMonth++;
          }
        } else {
          // Feb month
          const isLeapYear =
            (markYear % 4 === 0 && markYear % 100 !== 0) ||
            markYear % 400 === 0;
          if (isLeapYear && markDay > 29) {
            markDay = 1;
            markMonth++;
          } else if (!isLeapYear && markDay > 28) {
            markDay = 1;
            markMonth++;
          }
        }
      }

      // Year change
      if (markMonth > 12) {
        markMonth = 1;
        markYear++;
      }

      const formattedMonth = markMonth.toString().padStart(2, "0");
      const formattedDay = markDay.toString().padStart(2, "0");

      marked[`${markYear}-${formattedMonth}-${formattedDay}`] = {
        color: "lightblue",
      };
    }

    setMarkedDates(marked);
  };

  const getPlanData = async (date) => {
    try {
      const username = await AsyncStorage.getItem("username");
      const docRef = doc(db, "UserPlan", username, "plan", date);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        const data = snapshot.data();
        const docId = snapshot.id;
        const exercisePlan = data.exercisePlan.map((plan) => ({
          exercise: plan.ประเภท + " - " + plan.ระยะเวลา,
        }));
        const mealPlan = data.mealPlan.map((plan) => ({
          meal: plan.มื้อ + ": " + plan.เมนู,
        }));
        const newData = {
          [date]: [...exercisePlan, ...mealPlan],
        };
        setData(newData);
        console.log(newData);
        return data;
      }
    } catch (error) {
      console.error("Error getting document:", error);
    }
  };

  return (
    <LinearGradient
      colors={["#FEDF03", "#FFEC66"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 0.3 }}
      locations={[0.6, 1]}
      style={{ flex: 1 }}
    >
      <View>
        <Text
          style={{
            fontFamily: "inter-bold",
            ...tw`uppercase font-bold text-2xl text-center my-15`,
          }}
        >
          {formattedDate} {year}
        </Text>
        <View style={tw`bg-white h-full`}>
          {!selectedDate ? ( // 1. เช็คว่าไม่มีวันที่ถูกเลือกหรือไม่
            <Calendar // 2. แสดงปฏิทิน (Calendar)
              onDayPress={(day) => {
                getPlanData(day.dateString);
                setSelectedDate(day.dateString);
                setData({});
              }}
              markingType="period"
              markedDates={markedDates}
            />
          ) : (
            <Agenda // 3. แสดง Agenda เมื่อมีวันที่ถูกเลือกแล้ว
              theme={{
                "stylesheet.calendar.header": {
                  dayTextAtIndex0: {
                    color: "red",
                  },
                  dayTextAtIndex6: {
                    color: "green",
                  },
                },
              }}
              selected={selectedDate}
              onDayPress={(day) => {
                getPlanData(day.dateString);
                setSelectedDate(day.dateString);
                setData({});
              }}
              items={data}
              style={tw``}
              markingType="period"
              markedDates={markedDates}
              renderItem={(item, firstItemInDay) => (
                <TouchableOpacity
                  style={tw`flex bg-white rounded-lg p-5 mr-5 mt-5`}
                >
                  {console.log("item: ", item)}
                  {item ? (
                    <>
                      {item.exercise ? (
                        <Text style={{ fontFamily: "inter-medium" }}>
                          {item.exercise} นาที
                        </Text>
                      ) : null}
                      {item.meal ? <Text>{item.meal}</Text> : null}
                    </>
                  ) : (
                    <Text style={{ fontFamily: "inter-medium" }}>
                      Coming Soon
                    </Text>
                  )}
                </TouchableOpacity>
              )}
            />
          )}
          {console.log("selectDate: ", selectedDate)}
          {/* <View style={tw`absolute z-10 bg-red-500 justify-center`}>
          <TouchableOpacity>
          <Text >
            GGGGGGGGG
          </Text>
          </TouchableOpacity>
          </View> */}
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
