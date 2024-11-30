import React, { useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { FontAwesome } from "@expo/vector-icons";
import Carousel from "react-native-reanimated-carousel";

import {
  Image,
  Text,
  View,
  TouchableOpacity,
  Platform,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import axios from "axios";
import { TextInput } from "react-native-gesture-handler";
import RatingStars from "./RatingStar";
import Footer from "./Footer";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

function Course({ navigation }) {
  const theme = "dark";
  const { width: screenWidth } = Dimensions.get("window");

  const [Subject, setSubject] = useState([]);
  const [course, setCourse] = useState([]);
  const [feedback, setFeedBack] = useState([]);
  //   const { theme } = useTheme();

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const response = await axiosInstance.get("/subjects/getAll");
        setSubject(response.data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    const fetchCourse = async () => {
      try {
        const response = await axiosInstance.get("/courses/getAll");
        setCourse(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    const fetchReview = async () => {
      try {
        const response = await axiosInstance.get("/feedbacks/getAll");
        setFeedBack(response.data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    fetchSubject();
    fetchCourse();
    fetchReview();
    
    
  }, []);

  function countRatings(ratingsArray) {
    const counts = {};
    for (let i = 1; i <= 5; i++) {
      counts[i] = 0;
    }
    ratingsArray.forEach((item) => {
      const rating = parseInt(item.rating, 10);
      if (counts[rating] !== undefined) {
        counts[rating]++;
      }
    });
    return counts;
  }

  function calculateAverageRating(ratings) {
    let totalRating = 0;
    let totalRatingsCount = 0;
    for (const [star, count] of Object.entries(ratings)) {
      totalRating += star * count;
      totalRatingsCount += count;
    }
    const averageRating =
      totalRatingsCount === 0 ? 0 : totalRating / totalRatingsCount;
    return {
      average: averageRating.toFixed(1),
      count: totalRatingsCount,
    };
  }

  const filter = (item) => {
    const result = feedback.filter((data) => data.idCourses === item.idCourses);
    const ratingCounts = countRatings(result);
    return calculateAverageRating(ratingCounts);
  };
  return (
    <View
      style={[
        styles.container,
        theme === "dark" ? styles.bgDark : styles.bgLight,
      ]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        nestedScrollEnabled
      >
        <View className="container px-5 md:px-0 m-auto pb-4">
          <View className="flex  items-center mt-3 justify-center border-b border-gray-500">
            <View className="bg-coching-text_color md:w-[40vw] w-[100%] mb-4 px-2 flex h-10 p-1  flex-row items-center rounded">
              <TextInput
                type="text"
                placeholder="Search Course..."
                className="flex grow bg-coching-nav_color items-center p-2 h-[100%] outline-none text-white"
              />
              <TouchableOpacity className="w-10 flex items-center">
                <FontAwesome name="search" size={25} color={"black"} />
              </TouchableOpacity>
            </View>
          </View>
          {Subject.map((data, index) => (
            <View key={index} style={styles.subjectContainer}>
              <Text style={styles.subjectTitle}>{data.name}</Text>

              <View style={styles.reveiew_box}>
                <Carousel
                  loop
                  width={screenWidth}
                  height={330}
                  scrollAnimationDuration={1000}
                  autoPlay
                  data={course.filter((d) => d.Subject?.name === data?.name)}
                  renderItem={({ item }) => {
                    const { average, count } = filter(item);
                    return (
                      <View style={styles.carouselItem}>
                        <View style={styles.imageContainer}>
                          <Image
                            source={{
                              uri:
                                item.Image?.image_url ||
                                "https://via.placeholder.com/150",
                            }}
                            style={styles.image}
                            resizeMode="cover"
                          />
                        </View>
                        <View style={styles.infoContainer}>
                          <Text style={styles.courseName}>
                            {item.course_name}
                          </Text>
                          {count > 0 && (
                            <View className="flex flex-row items-center ">
                              <Text className="text-base font-semibold mr-1">
                                {average}
                              </Text>
                              <RatingStars rating={average} />
                              <Text className="text-base ml-2">({count})</Text>
                            </View>
                          )}
                          <Text style={styles.price}>{item.price} BDT</Text>
                        </View>
                      </View>
                    );
                  }}
                />
              </View>
            </View>
          ))}
        </View>
        <Footer />
      </ScrollView>
    </View>
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
    paddingHorizontal: 3,
  },
  containerContent: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#999",
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    backgroundColor: "#1E293B",
    color: "#fff",
    borderRadius: 4,
  },
  searchButton: {
    padding: 10,
  },
  subjectContainer: {
    marginTop: 14,
    flex: 1,
  },
  subjectTitle: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
  },
  reveiew_box: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderRadius: 8,
    marginTop: 4,
  },
  carouselItem: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    padding: 10,
    width: "84%",
  },
  imageContainer: {
    height: 200,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  infoContainer: {
    paddingHorizontal: 10,
  },
  courseName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: "#000",
    marginTop: 3,
  },
});

export default Course;
