import React from "react";
import { StatusBar } from "expo-status-bar";
import { useState, useRef, useEffect } from "react";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import { REACT_APP_BASE_URL } from "@env"; // Import your environment variable

const axiosInstance = axios.create({
  baseURL: REACT_APP_BASE_URL, // Use the imported environment variable
});
function AddCustomer({ navigation }) {
  const [customerData, setCustomerData] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/customer/getAll");
      setCustomerData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  function notifyMessage(msg) {
    if (Platform.OS === "android") {
      ToastAndroid.showWithGravityAndOffset(
        msg,
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        25,
        160
      );
    } else {
      AlertIOS.alert(msg);
    }
  }
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhone = (phone) => {
    const regex = /^\+?\d+$/;
    return regex.test(phone);
  };
  const handleAdd = async (event) => {
    const user = await AsyncStorage.getItem("username");

    if (name === "" && phone === "" && address === "" && email === "") {
      notifyMessage("Please Fillup All Field");
      return;
    }
    if (name === "") {
      notifyMessage("Please Fillup Customer Name");
      return;
    }
    if (phone === "") {
      notifyMessage("Please Fillup Customer Phone Number");
      return;
    }
    if (address === "") {
      notifyMessage("Please Fillup Customer Address");
      return;
    }
    if (email === "") {
      notifyMessage("Please Fillup Customer Email Address");
      return;
    }

    if (!validateEmail(email)) {
      notifyMessage("Please enter a valid email address");
      return;
    }

    if (!validatePhone(phone)) {
      notifyMessage("Please enter a valid phone number");
      return;
    }

    const result = customerData.find(
      (data) => data.Phone_no === phone && data.ByWhom === user
    );
    
    if (result) {
      notifyMessage("Customer is Already added");
      return;
    }

    try {
      const response = await axiosInstance.post(
        `/customer/postCustomer?Name=${name}&Phone_no=${phone}&Email=${email}&Address=${address}&ByWhom=${user}`
      );
      if (response.status === 200) {
        setName("");
        setPhone("");
        setAddress("");
        setEmail("");
        notifyMessage("Customer Added successfully!");
      } else {
        notifyMessage("Failed to Add Customer ");
      }
    } catch (error) {
      console.error("Error Adding Customer :", error);
    }
  };
  //delete

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <View
      style={styles.container}
      className="bg-background  flex-1 justify-center items-center"
    >
      <View
        style={styles.loginContainer}
        className=" p-5 mt-2 pt-3 w-[95vw]  flex justify-center items-center rounded"
      >
        <View className="flex flex-col w-[100%] items-start mb-2">
          <Text className="text-sm  font-bold"> Name</Text>
          <TextInput
            style={styles.input}
            className="mt-2 w-[100%]"
            placeholder="customer name"
            onChangeText={(newText) => setName(newText)}
            value={name}
          ></TextInput>
        </View>
        <View className="flex flex-col items-start mb-2 w-[100%]">
          <Text className="text-sm  font-bold">Phone</Text>
          <TextInput
            style={styles.input}
            className="mt-2 w-[100%]"
            placeholder="customer phone"
            onChangeText={(newText) => setPhone(newText)}
            value={phone}
          ></TextInput>
        </View>
        <View className="flex flex-col items-start mb-2 w-[100%]">
          <Text className="text-sm  font-bold">Email</Text>
          <TextInput
            style={styles.input}
            className="mt-2 w-[100%]"
            placeholder="customer email address"
            onChangeText={(newText) => setEmail(newText)}
            value={email}
          ></TextInput>
        </View>
        <View className="flex flex-col items-Start mb-2 w-[100%]">
          <Text className="text-sm  font-bold">Address</Text>
          <TextInput
            style={styles.input}
            className="mt-2 w-[100%]"
            placeholder="customer address"
            onChangeText={(newText) => setAddress(newText)}
            value={address}
          ></TextInput>
        </View>
        <View className="flex  items-center justify-center flex-col mt-2">
          <TouchableOpacity
            className="p-2 w-[150px] h-[50px]  bg-gradient-to-tl shadow-lg rounded-sm flex items-center justify-center"
            style={styles.loginContainer}
            onPress={() => handleAdd()}
          >
            <Text className="font-semibold text-xl">Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  TableContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    margin: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedRow: {
    backgroundColor: "green",
    color: "white", // Change this color to your preferred highlight color
  },
  loginContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  input: {
    height: 40,

    backgroundColor: "white",
    padding: 10,
    shadowOffset: 2,
    borderRadius: 5,
  },
  head: {
    height: 40,
    backgroundColor: "black",
  },
  text: {
    margin: 6,
    width: 100,
    textAlign: "center",
    color: "#fff",
  },
  td: {
    margin: 6,
    width: 100,
    textAlign: "center",
    color: "black",
  },
  row: {
    flexDirection: "row",

    backgroundColor: "#d8d8d8",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  scrollableContent: {
    maxHeight: 250, // Set the max height for the scrollable content
  },
  selectedRowText: {
    color: "#fff",
  },
});

export default AddCustomer;
