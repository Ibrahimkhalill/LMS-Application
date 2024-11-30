import React, { useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import Patterndark from "../assets/pattern-dark.20747baf.svg";
import Content from "../assets/content.svg";
import Content2 from "../assets/peep4.d500693a.svg";
import Content3 from "../assets/peep1.f4841716.svg";
import { Video, ResizeMode } from "expo-av";
import AntDesign from "@expo/vector-icons/AntDesign";
import LottieView from "lottie-react-native";

import {
  Image,
  Text,
  View,
  TouchableOpacity,
  Platform,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import axios from "axios";
import { Button } from "react-native";
import Svg, { Path } from "react-native-svg";
import Footer from "./Footer";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

function Enrollment({ navigation }) {
  const theme = "dark";
  const [visible, setVisible] = useState(false);
  const [visibleButton, setVisibleButton] = useState(false);
  const [status, setStatus] = React.useState({});

  const [Openvisible, setOpenVisible] = useState(false);
  const [videoData, setVideoData] = useState([]);
  const [Course, setCourse] = useState([]);
  const [feedBackData, setFeedBack] = useState([]);
  const [loading, setLoading] = useState(false);
  const [Previewid, setPreviewId] = useState(null);
  const [id, setId] = useState(null);
  const [modal1Open, setModal1Open] = useState(false);
  const [source, setSource] = useState("");
  const containerRef = useRef(null);
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
  });

  // Fetch course data
  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/courses/getAll");
        setCourse(response.data);
      } catch (error) {
        console.error("Error fetching course data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, []);

  // Fetch video data
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axiosInstance.post(
          "/chapters/getVideosByChapters",
          { idCourses: 1 }
        );
        setVideoData(response.data);
      } catch (error) {
        console.error("Error fetching video data:", error);
      }
    };

    fetchContent();
  }, []);

  // Fetch feedback data
  useEffect(() => {
    const fetchReveiw = async () => {
      try {
        const response = await axiosInstance.get("/feedbacks/getAll");
        setFeedBack(response.data);
      } catch (error) {
        console.error("Error fetching feedback data:", error);
      }
    };
    console.log("running");

    fetchReveiw();
  }, []);

  // Filter feedback data based on CourseData

  const handlePreviewReply = (item) => {
    setPreviewId((prev) => (prev === item ? null : item));
    setOpenVisible((prev) => prev !== item);
  };

  const handleOpen = (item) => {
    setModal1Open(true);
    setSource(item.video_url);
  };

  const handleCancel = () => {
    setModal1Open(false);
  };
  const closeModal = () => setModal1Open(false);
  const [animationData, setAnimationData] = useState(null);

  return (
    <View
      style={[
        styles.container,
        theme === "dark" ? styles.bgDark : styles.bgLight,
      ]}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View
          className="w-full max-w-screen-lg px-4 py-2 flex items-start"
          style={styles.overlay}
        >
          <View className="flex flex-col py-4 text-center lg:text-left">
            <View className="flex items-center justify-center">
              <Text className="text-[#31972a] text-4xl font-bold text-center">
                Physics Newtonian Mechanics
              </Text>
              <Text className=" text-base mt-3 text-white text-center lg:text-left">
                পদার্থ অণু এবং পরমাণু দিয়ে গঠিত। বিভিন্ন পরমাণুর মধ্যে ক্রিয়াশীল
                বলের জন্য গঠিত হয় অণু আর বিভিন্ন অণুর মধ্যে ক্রিয়াশীল বলের জন্য
                গঠিত হয় পদার্থ।
              </Text>
              <TouchableOpacity className="bg-[#31972a] mt-5 w-[170px] py-2 px-6 flex flex-row items-center justify-center rounded-2xl">
                <View className="flex flex-row items-center w-[100%] justify-between ">
                  <MaterialIcons name="watch-later" size={20} color="white" />
                  <Text className="text-white text-base font-semibold">
                    6667
                  </Text>
                  <Text className="text-white text-base font-semibold">|</Text>
                  <Text className="text-white text-base font-semibold">
                    Enroll
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View className="bg-coching-nav_color mt-10 rounded-lg p-2">
              <Image
                source={require("../assets/banner.png")}
                className="w-64 h-48 "
              />
            </View>
          </View>
        </View>

        <View className="w-full flex items-center my-4 py-4">
          <View className="my-3">
            <Content width={120} height={100} />
          </View>
          <Text className="text-4xl font-bold text-coching-text_color mb-3">
            Course <Text className="text-white">Content</Text>
          </Text>
          <Text class="subtitle" style={styles.subtitle}>
            101 sections • 636 lectures • 58h 19m total length
          </Text>
          <ScrollView className={`bg-slate-900 h-[500px] w-[90%] mt-10`}>
            <View>
              {videoData.map((data) => (
                <View
                  key={data.idChapters}
                  className={`border-b ${
                    theme === "light"
                      ? "border-neutral-300"
                      : "border-neutral-700"
                  }`}
                >
                  <TouchableOpacity
                    className={`flex flex-row transition  duration-300 ease-in-out pt-4 pl-2 pr-3 pb-4 justify-start cursor-pointer  items-center ${
                      Openvisible && Previewid === data.idChapters
                        ? "bg-[#31972a] text-white"
                        : ""
                    }`}
                    onPress={() => handlePreviewReply(data.idChapters)}
                  >
                    <View className={`lg:ml-0 ml-1`}>
                      {Openvisible && Previewid === data.idChapters ? (
                        <MaterialIcons
                          name="keyboard-arrow-up"
                          size={24}
                          color="white"
                        />
                      ) : (
                        <MaterialIcons
                          name="keyboard-arrow-down"
                          size={24}
                          color="white"
                        />
                      )}
                    </View>
                    <Text className="text-md text-white ml-2">{data.name}</Text>
                    <View className="lg:flex lg:gap-3 hidden ">
                      <Text className="text-white">
                        {data?.Videos?.length} lectures
                      </Text>
                      <Text className="text-white">.1hr 7min</Text>
                    </View>
                  </TouchableOpacity>
                  {Openvisible && Previewid === data.idChapters && (
                    <View
                      className={`p-1 ${
                        theme === "light"
                          ? "bg-slate-50 text-black"
                          : "bg-slate-950 text-slate-400"
                      }`}
                    >
                      {data?.Videos.map((item, index) => (
                        <View
                          key={index}
                          className="flex flex-row items-center   p-2"
                        >
                          <View className="mt-1">
                            {!data.payment ? (
                              <MaterialIcons
                                name="ondemand-video"
                                size={22}
                                color="white"
                              />
                            ) : (
                              <FontAwesome
                                name="lock"
                                size={23}
                                color="white"
                              />
                            )}
                          </View>
                          <View className="w-full ml-2">
                            <TouchableOpacity onPress={() => handleOpen(item)}>
                              <Text className="underline text-sm lg:text-sm text-white">
                                {item?.video_name}
                              </Text>
                            </TouchableOpacity>

                            <Text className="hidden lg:block">3.30</Text>
                          </View>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
        <View className="w-full flex items-center my-4 py-4 border-b border-gray-600">
          <View className="my-3">
            <Content2 width={150} height={100} />
          </View>
          <Text className="text-4xl font-bold text-white mb-3 text-center">
            <Text className="text-coching-text_color text-center">
              How will
            </Text>{" "}
            the Course work?
          </Text>
          <Text class="subtitle" style={styles.subtitle}>
            How we can help you become a skilled in this subject
          </Text>
          <View className="flex flex-col items-center justify-center">
            <View className="relative z-10   w-40 flex items-center place-items-center   ">
              <Text className="relative z-10 text-white font-bold text-3xl mt-8">
                1
              </Text>
              <Svg
                style={styles.svg}
                width={100} // Set fixed width
                height={100} // Set fixed height
                viewBox="0 0 602 473"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M290.806 463.188C374.905 469.353 468.778 492.629 529.757 434.517C597.098 370.239 616.804 266.193 591.202 177.098C566.996 92.3192 491.898 30.0454 407.023 5.07419C335.338 -15.8893 270.48 32.9741 202.363 62.8779C128.971 95.248 31.0635 104.651 6.54775 180.797C-18.899 259.873 34.0116 342.956 93.1287 401.839C144.488 453.014 218.345 457.793 290.806 463.188Z"
                  fill="#FF8731"
                />
              </Svg>
            </View>

            <View className="mt-10 p-2">
              <Text className="text-white font-bold text-xl text-center">
                Step by step project based teaching method
              </Text>
            </View>
            <View className="p-4">
              <Text className="text-white text-center text-base">
                One to two modules will be released every week and each module
                will have 10-12 pre-recorded videos so that you can learn one
                topic at a time step by step. The videos are based on React and
                NextJS documentation. Also, each module has a project tutorial
                to follow the project based learning process. You will have a
                whole week to watch the weekly videos. A live session will be
                held on one day of the week to take your questions. If you can
                watch the videos in a short time, you will have more time during
                the week for assignments.
              </Text>
            </View>
            <View>
              <LottieView
                autoPlay
                style={{
                  width: 300,
                  height: 300,
                }}
                source={require("../assets/Animation - 1723025381811.json")}
              />
            </View>
          </View>
          <View className="flex flex-col items-center justify-center">
            <View className="relative z-10   w-40 flex items-center place-items-center   ">
              <Text className="relative z-10 text-white font-bold text-3xl mt-8">
                2
              </Text>
              <Svg
                style={styles.svg}
                width={100} // Set fixed width
                height={100} // Set fixed height
                viewBox="0 0 602 473"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M290.806 463.188C374.905 469.353 468.778 492.629 529.757 434.517C597.098 370.239 616.804 266.193 591.202 177.098C566.996 92.3192 491.898 30.0454 407.023 5.07419C335.338 -15.8893 270.48 32.9741 202.363 62.8779C128.971 95.248 31.0635 104.651 6.54775 180.797C-18.899 259.873 34.0116 342.956 93.1287 401.839C144.488 453.014 218.345 457.793 290.806 463.188Z"
                  fill="#3FB8A9"
                />
              </Svg>
            </View>

            <View className="mt-10 p-2">
              <Text className="text-white font-bold text-xl text-center">
                A chance to test yourself through exams
              </Text>
            </View>
            <View className="p-4">
              <Text className="text-white text-center text-base">
                There are quizzes with each video and assignments at the end of
                each module to test what you have learned by watching the
                videos. You can answer the quizzes instantly and you will have
                48-72 hours to complete each assignment. We have to submit the
                github link of the source code and the live link of the project
                by assignment. Scores for each quiz and assignment will be
                tallied and final results will be given at the end of the
                course. However, the quiz marks will be added to the leaderboard
                but will not be added to the final result.
              </Text>
            </View>
            <View>
              <LottieView
                autoPlay
                style={{
                  width: 300,
                  height: 300,
                }}
                source={require("../assets/Animation - 1723026292360.json")}
              />
            </View>
          </View>
          <View className="flex flex-col items-center justify-center">
            <View className="relative z-10   w-40 flex items-center place-items-center   ">
              <Text className="relative z-10 text-white font-bold text-3xl mt-8">
                3
              </Text>
              <Svg
                style={styles.svg}
                width={100} // Set fixed width
                height={100} // Set fixed height
                viewBox="0 0 602 473"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M290.806 463.188C374.905 469.353 468.778 492.629 529.757 434.517C597.098 370.239 616.804 266.193 591.202 177.098C566.996 92.3192 491.898 30.0454 407.023 5.07419C335.338 -15.8893 270.48 32.9741 202.363 62.8779C128.971 95.248 31.0635 104.651 6.54775 180.797C-18.899 259.873 34.0116 342.956 93.1287 401.839C144.488 453.014 218.345 457.793 290.806 463.188Z"
                  fill="#0168FB"
                />
              </Svg>
            </View>

            <View className="mt-10 p-2">
              <Text className="text-white font-bold text-xl text-center">
                After the exam there is the correct solution of the question{" "}
              </Text>
            </View>
            <View className="p-4">
              <Text className="text-white text-center text-base">
                At the end of each quiz you can see the correct answer with
                explanation. All assignment solutions will be shared on GitHub
                at the end of the course so that you can check the best
                practices and methods better. We will manually code review your
                submitted assignments and mark them. Once the marksheet is
                generated, you can check it from the personal dashboard on the
                website.
              </Text>
            </View>
            <View>
              <LottieView
                autoPlay
                style={{
                  width: 300,
                  height: 300,
                }}
                source={require("../assets/Animation - 1723026596542.json")}
              />
            </View>
          </View>
          <View className="flex flex-col items-center justify-center">
            <View className="relative z-10   w-40 flex items-center place-items-center   ">
              <Text className="relative z-10 text-white font-bold text-3xl mt-8">
                4
              </Text>
              <Svg
                style={styles.svg}
                width={100} // Set fixed width
                height={100} // Set fixed height
                viewBox="0 0 602 473"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M290.806 463.188C374.905 469.353 468.778 492.629 529.757 434.517C597.098 370.239 616.804 266.193 591.202 177.098C566.996 92.3192 491.898 30.0454 407.023 5.07419C335.338 -15.8893 270.48 32.9741 202.363 62.8779C128.971 95.248 31.0635 104.651 6.54775 180.797C-18.899 259.873 34.0116 342.956 93.1287 401.839C144.488 453.014 218.345 457.793 290.806 463.188Z"
                  fill="#309ee8"
                />
              </Svg>
            </View>

            <View className="mt-10 p-2">
              <Text className="text-white font-bold text-xl text-center">
                There is a Discord support group for help if you get stuck
              </Text>
            </View>
            <View className="p-4">
              <Text className="text-white text-center text-base">
                If you face any problem during the course, get stuck or don't
                understand, you can post your question in our Discord support
                channel. If a critical issue cannot be resolved through the
                Discord Support Channel, a call to the Discord Voice Channel /
                Google Meet will also be attempted. We will be with you
                throughout the course and will try our best to cooperate.
                However, no device related issues will be resolved
              </Text>
            </View>
            <View>
              <LottieView
                autoPlay
                style={{
                  width: 300,
                  height: 300,
                }}
                source={require("../assets/Animation - 1723027616489.json")}
              />
            </View>
          </View>
          <View className="flex flex-col items-center justify-center">
            <View className="relative z-10   w-40 flex items-center place-items-center   ">
              <Text className="relative z-10 text-white font-bold text-3xl mt-8">
                5
              </Text>
              <Svg
                style={styles.svg}
                width={100} // Set fixed width
                height={100} // Set fixed height
                viewBox="0 0 602 473"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M290.806 463.188C374.905 469.353 468.778 492.629 529.757 434.517C597.098 370.239 616.804 266.193 591.202 177.098C566.996 92.3192 491.898 30.0454 407.023 5.07419C335.338 -15.8893 270.48 32.9741 202.363 62.8779C128.971 95.248 31.0635 104.651 6.54775 180.797C-18.899 259.873 34.0116 342.956 93.1287 401.839C144.488 453.014 218.345 457.793 290.806 463.188Z"
                  fill="#F8BD48"
                />
              </Svg>
            </View>

            <View className="mt-10 p-2">
              <Text className="text-white font-bold text-xl text-center">
                There are also weekly live discussions
              </Text>
            </View>
            <View className="p-4">
              <Text className="text-white text-center text-base">
                Every week we will organize at least one live session where we
                will discuss what has been taught throughout the week, explain
                assignment solutions and answer your questions directly. We will
                be notified in advance on the Discord support channel during the
                live session.
              </Text>
            </View>
            <View>
              <LottieView
                autoPlay
                style={{
                  width: 300,
                  height: 300,
                }}
                source={require("../assets/Animation - 1723028959836.json")}
              />
            </View>
          </View>
        </View>
        <View className="wrapper border-b border-gray-600	!bg-primary1 dark:!bg-slate-800 dark:bg-none">
          <View className="my-2">
            <Text className="text-white text-center text-4xl font-semibold ">
              Course Instructor
            </Text>
            <View className="flex flex-col my-10">
              <View className="relative w-full text-center">
                <View className="nextjs-image rounded-lg !shadow-1 relative z-10 mx-auto h-[300px] w-[200px] origin-bottom-right -rotate-6 transform !border-4 border-white ">
                  <Image
                    source={require("../assets/Ibrahim.jpg")}
                    className="w-[100%] h-[100%]"
                    resizeMode="cover"
                  ></Image>
                </View>
                <View className="rounded-lg absolute right-[23%]  -bottom-0 z-0 mx-auto h-[300px] w-[200px] border-4 border-white bg-[#8E6AC8] "></View>
              </View>
              <View className="px-7 my-10">
                <Text className="text-white text-left text-base  ">
                  Md. Mahfuzur Rahman is a technology entrepreneur. In 2008, he
                  founded Merinasoft, the Software Company in Bangladesh, while
                  studying computer science and engineering at BUET. His passion
                  for programming and interest in teaching people led him to
                  establish the Trace Academi platform in 2020, where there are
                  over 350 programming-related video tutorials. Trace Academi's
                  YouTube channel and public Facebook group have attracted more
                  than a million people who are learning programming for free.
                </Text>
                <Text className="text-white text-left text-base mt-2 ">
                  He is also a full-stack web developer and software architect
                  with over 14 years of experience in web development and
                  software professions.
                </Text>
                <Text className="text-white mt-8 text-base font-bold">
                  Mahfuzur Rahman Tusar
                </Text>
                <Text className="text-white mt-1 text-base ">
                  Founder - Trace Academy
                </Text>
                <Text className="text-white mt-1 text-base ">
                  CEO - Merinasoft
                </Text>
                <View className="h-16 w-[60px] flex my-3 ">
                  <Image
                    source={require("../assets/merinasoft.png")}
                    className=" w-[100%] h-[100%]"
                    resizeMode="cover"
                  />
                </View>
                <Text className="text-gray-100 mt-1">ট্রেড লাইসেন্স - </Text>
                <Text className="text-gray-100 mt-1">
                  TRAD/DNCC/009595/2022
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View id="Feedback" className="Viewide-y-4 px-4 Viewide-green-200">
          <View className="flex items-center justify-center mt-10">
            <View className="my-3">
              <Content3 width={120} height={100} />
            </View>
            <View className="col-span-5 my-5 mb-3 flex flex-col items-center justify-center">
              <Text
                className={`${
                  theme === "light" ? "text-black" : "text-violet-100"
                } text-3xl text-center  font-bold sm:mb-3`}
              >
                <Text className="text-coching-text_color"> Learners' </Text>
                opinions about the course
              </Text>
              <Text  style={styles.subtitle}>
                Learners have always expressed their love for Trace Accademy
              </Text>
            </View>
            <View className="space-y-14 my-2">
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
                            theme === "light" ? "text-black" : "text-violet-100"
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
        <Footer/>
      </ScrollView>

      <Modal
        transparent={true}
        animationType="slide"
        visible={modal1Open}
        onRequestClose={() => setModal1Open(false)}
      >
        <TouchableWithoutFeedback>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View className="flex flex-row items-center justify-between mb-2">
                <Text className="text-black text-base">Course Preview</Text>

                <TouchableOpacity onPress={() => setModal1Open(false)}>
                  <AntDesign name="close" size={22} color="black" />
                </TouchableOpacity>
              </View>
              <Text className="text-base">
                100 Days of Code: The Complete Python Pro Bootcamp
              </Text>
              <Video
                source={{
                  uri: "https://drive.google.com/uc?id=1FldqiQaL9_xoLxT4TwGY012kOq-eUPS0",
                }}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                style={styles.video}
                isLooping
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
  bgPattern: {
    // background-image: url(/src/assets/pattern-dark.20747baf.svg);
    // background-color: #0B1120;
    // height: 90vh !important;
  },
  overlay: {
    backgroundColor: "#0B1120",
  },
  subtitle: {
    marginTop: 10,
    color: "rgb(104, 122, 148)",
    textAlign:"center"
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContent: {
    width: 300,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },
  video: {
    width: "100%",
    height: 230,
    marginBottom: 5,
  },
  svg: {
    position: "absolute",
    top: 0,

    zIndex: 0,
    opacity: 0.5, // Adjust opacity as needed
  },
});

export default Enrollment;
