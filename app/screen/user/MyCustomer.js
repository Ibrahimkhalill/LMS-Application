import React from "react";
import { StatusBar } from "expo-status-bar";
import { useState, useRef, useEffect } from "react";
import { Table, TableWrapper, Row, Rows } from "react-native-table-component";
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
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { REACT_APP_BASE_URL } from "@env"; // Import your environment variable

const axiosInstance = axios.create({
  baseURL: REACT_APP_BASE_URL, // Use the imported environment variable
});
function MyCustomer({ navigation }) {
  const [customerData, setCustomerData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(false);
    const user = await AsyncStorage.getItem("username");

    try {
      const response = await axiosInstance.get(
        `/customer/getAllByWhom?ByWhom=${user}`
      );
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

  const tableHead = ["ID", "Name", "Phone", "Email", "Address"];
  const tableData = customerData.map((item) => [
    item.id,
    item.Name,
    item.Phone_no,
    item.Email,
    item.Address,
  ]);

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
      className="bg-background w-[100vw] flex-1 justify-start items-center"
    >
      <View style={styles.container} className=" mt-3 w-[97%]">
        <ScrollView horizontal>
          <View>
            <Table borderStyle={{ borderWidth: 1, borderColor: "#ccc" }}>
              <Row
                data={tableHead}
                style={styles.head}
                textStyle={styles.text}
              />
            </Table>
            <ScrollView style={styles.scrollableContent}>
              <Table borderStyle={{ borderWidth: 1, borderColor: "#ccc" }}>
                <TableWrapper>
                  {tableData.map((rowData, index) => (
                    <TouchableOpacity key={index} style={styles.row}>
                      <Row data={rowData} textStyle={styles.td} />
                    </TouchableOpacity>
                  ))}
                </TableWrapper>
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
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
    width: "70%",
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
    maxHeight: 500, // Set the max height for the scrollable content
  },
  selectedRowText: {
    color: "#fff",
  },
});

export default MyCustomer;
