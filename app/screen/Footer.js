import { StatusBar } from "expo-status-bar";
import { FontAwesome } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
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
import Svg, { Path } from "react-native-svg";

function Footer({ navigation }) {
  return (
    <View className="w-full border-t border-gray-700 bg-gray-900">
      <View className="mx-auto max-w-7xl my-8 px-4 sm:px-6 flex items-center lg:px-8">
        <View className="flex flex-row gap-5">
          <View className="w-9 h-9 rounded-full border border-gray-700 flex justify-center items-center hover:border-indigo-600">
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <Path
                id="Vector"
                d="M11.3214 8.93666L16.4919 3.05566H15.2667L10.7772 8.16205L7.1914 3.05566H3.05566L8.47803 10.7774L3.05566 16.9446H4.28097L9.022 11.552L12.8088 16.9446H16.9446L11.3211 8.93666H11.3214ZM9.64322 10.8455L9.09382 10.0765L4.72246 3.95821H6.60445L10.1322 8.8959L10.6816 9.66481L15.2672 16.083H13.3852L9.64322 10.8458V10.8455Z"
                fill="white"
              ></Path>
            </Svg>
          </View>
          <View className="w-9 h-9 rounded-full border border-gray-700 flex justify-center items-center hover:border-indigo-600">
            <AntDesign name="instagram" size={20} color="white" />
          </View>
          <View className="w-9 h-9 rounded-full border border-gray-700 flex justify-center items-center hover:border-indigo-600">
            <FontAwesome6 name="linkedin-in" size={20} color="white" />
          </View>
          <View className="w-9 h-9 rounded-full border border-gray-700 flex justify-center items-center hover:border-indigo-600">
            <Svg
              className="w-[1.25rem] h-[0.875rem] text-white"
              viewBox="0 0 16 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width={20} // Adjust the width if needed
              height={15} // Adjust the height if needed
            >
              <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.9346 1.13529C14.5684 1.30645 15.0665 1.80588 15.2349 2.43896C15.5413 3.58788 15.5413 5.98654 15.5413 5.98654C15.5413 5.98654 15.5413 8.3852 15.2349 9.53412C15.0642 10.1695 14.5661 10.669 13.9346 10.8378C12.7886 11.1449 8.19058 11.1449 8.19058 11.1449C8.19058 11.1449 3.59491 11.1449 2.44657 10.8378C1.81277 10.6666 1.31461 10.1672 1.14622 9.53412C0.839844 8.3852 0.839844 5.98654 0.839844 5.98654C0.839844 5.98654 0.839844 3.58788 1.14622 2.43896C1.31695 1.80353 1.81511 1.30411 2.44657 1.13529C3.59491 0.828125 8.19058 0.828125 8.19058 0.828125C8.19058 0.828125 12.7886 0.828125 13.9346 1.13529ZM10.541 5.98654L6.72178 8.19762V3.77545L10.541 5.98654Z"
                fill="currentColor"
              />
            </Svg>
          </View>
        </View>
        <View className="my-4 flex flex-row  gap-x-4">
          <Text className="text-slate-500">Facebook Group</Text>
          <Text className="text-slate-500">Payment</Text>
          <Text className="text-slate-500">Contact</Text>
        </View>
        <View>
          <Text className="text-white text-2xl font-semibold">
            Trace Academy
          </Text>
        </View>
        <View className="mt-4 mb-4 flex pb-4  items-center justify-center  border-b border-gray-400 ">
          <Image
            source={require("../assets/sslcommerz-banner.png")}
            style={styles.icon}
            resizeMode="cover"
          />
        </View>
        <View className="flex flex-row">
          <Text className="text-slate-300">@Trace Academy</Text>
          <Text className="text-slate-300"> 2024, All rights reserved.</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  icon: {
    width: 300,
    height: 28,
  },
  bgDark: {
    backgroundColor: "#1E293B", // bg-slate-900
  },
  bgLight: {
    backgroundColor: "#F9FAFB", // bg-gray-100
  },
  scrollContainer: {
    paddingHorizontal: 10,
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

export default Footer;
