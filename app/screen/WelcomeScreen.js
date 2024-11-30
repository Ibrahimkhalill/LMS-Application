import React, { useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { FontAwesome } from "@expo/vector-icons";

import {
  Image,
  Text,
  View,
  TouchableOpacity,
  Platform,
  StyleSheet,
  ScrollView,
} from "react-native";
import axios from "axios";
import Footer from "./Footer";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

function WelcomeScreen({ navigation }) {
  const theme = "dark";
  const imageUrls = [
    require("../assets/math.jpg"),
    require("../assets/physic.jpg"),
    require("../assets/biology.jpg"),
    require("../assets/chemistry.jpg"),
    require("../assets/sql.jpg"),
    require("../assets/java.png"),
  ];

  const [visible, setVisible] = useState(false);
  // const { theme } = useTheme();
  const [feedBackData, setFeedBack] = useState([]);
  const containerRef = useRef(null);
  const [visibleButton, setvisibleButton] = useState(false);

  const handleReview = () => {
    setVisible(true);
  };
  const fetchReveiw = async () => {
    try {
      const response = await axiosInstance.get("/feedbacks/getAll");

      setFeedBack(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchReveiw();
  }, []);

  console.log(feedBackData);

  return (
    <>
      <View
        style={[
          styles.container,
          theme === "dark" ? styles.bgDark : styles.bgLight,
        ]}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View className="w-full max-w-screen-lg px-4 py-2 flex items-start">
            <View className="bg-coching-nav_color rounded-full p-2">
              <Image
                source={require("../assets/banner.png")}
                className="w-64 h-48 rounded-full"
              />
            </View>
            <View className="mt-6 flex items-start">
              <Text
                className={`text-4xl font-bold text-left mb-3 text-coching-text_color`}
              >
                Improve Your Online Learning Experience Instantly
              </Text>
              <Text
                className={`text-base text-left mb-6 ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                We have 7+ Online Courses and more than 1000+ Registered
                Students. Find your desired course today.
              </Text>

              <View className="flex flex-row items-center ml-4 mb-4">
                <View className="flex flex-row -ml-4">
                  <Image
                    source={require("../assets/img1.png")}
                    className="w-8 h-8 bg-gray-300 rounded-full"
                  />
                  <Image
                    source={require("../assets/img2.jpg")}
                    className="w-8 h-8 bg-gray-300 rounded-full -ml-4"
                  />
                  <Image
                    source={require("../assets/img3.png")}
                    className="w-8 h-8 bg-gray-300 rounded-full -ml-4"
                  />
                  <Text
                    className={`text-base w-32 ml-2 ${
                      theme === "dark" ? "text-white" : "text-black"
                    }`}
                  >
                    1000+ Students Trust Us
                  </Text>
                </View>
                <TouchableOpacity>
                  <Text className="text-coching-text_color font-bold">
                    View Courses
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View className="w-full flex items-center py-4">
            <Text className="text-4xl font-bold text-coching-text_color mb-4">
              Our Courses
            </Text>
            <View className="w-full flex flex-wrap items-center justify-center">
              {imageUrls.map((source, index) => (
                <TouchableOpacity
                  key={index}
                  className="bg-coching-nav_color p-1 m-2"
                >
                  <Image source={source} className="w-80 h-40 object-cover" />
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View id="Feedback" className="divide-y-4 divide-green-200">
            <Text className="text-[40px] font-bold flex justify-center items-center mt-8 text-coching-text_color divide-y divide-yellow-300 ">
              Student Feedback
            </Text>
            <View className="grid sm:grid-cols-12 mt-10">
              <View className="col-span-5 items-center">
                <Image
                  source={require("../assets/feedback.png")} // Adjust the path as needed
                  className="w-60 h-52 object-cover"
                />
              </View>
              <View className="col-span-5 mt-3 mb-3 px-4 flex flex-col justify-center">
                <Text
                  className={`${
                    theme === "light" ? "text-black" : "text-violet-100"
                  } text-3xl  font-bold sm:mb-3`}
                >
                  Our Students Are
                  <Text className="text-coching-text_color">
                    {" "}
                    Our Strength{" "}
                  </Text>
                  See What They Say About Us.
                </Text>
                <Text
                  className={`${
                    theme === "light" ? "text-black" : "text-violet-100"
                  }`}
                >
                  Learners have always expressed their love for Trace Accademy.
                </Text>
              </View>
              <View className="space-y-14 my-2 px-4">
                <View className="flex flex-col gap-3">
                  {feedBackData.map((data, index) => (
                    <View style={styles.reveiew_box} key={index}>
                      <View className="flex flex-row items-center gap-4">
                        <Image
                          source={require("../assets/23.jpeg")}
                          className="w-10 h-10 rounded-full"
                        />
                        <View>
                          <Text
                            className={`${
                              theme === "light"
                                ? "text-black"
                                : "text-violet-100"
                            }`}
                          >
                            {data.Student?.name}
                          </Text>
                          <View className="flex flex-row mt-1">
                            {Array.from({ length: data.rating }, (_, index) => (
                              <FontAwesome
                                key={index}
                                name="star"
                                size={18}
                                color="#FFD700"
                              />
                            ))}
                          </View>
                        </View>
                      </View>
                      <View className="ml-14 mt-2">
                        <Text className="text-white">{data.feedback}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        
        <Footer />
        </ScrollView>
      </View>
      
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  bgDark: {
    backgroundColor: "#1E293B", // bg-slate-900
  },
  bgLight: {
    backgroundColor: "#F9FAFB", // bg-gray-100
  },
  scrollContainer: {
    paddingHorizontal: 1,
  },
  reveiew_box: {
    backgroundColor: "rgb(51, 65, 85)", // background-color
    borderRadius: 8, // border-radius
    paddingVertical: 20, // padding-top and padding-bottom
    paddingHorizontal: 24, // padding-left and padding-right
    boxShadow: "none", // box-shadow: none is not directly supported in React Native
  },
  buttonText: {
    color: "rgb(248, 250, 252)",
    textDecorationLine: "none",
    textAlign: "center",
  },
});

export default WelcomeScreen;
