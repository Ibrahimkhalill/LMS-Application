import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React from "react";
import { StyleSheet, Platform } from "react-native";
import WelcomeScreen from "./app/screen/WelcomeScreen";
import UserLogin from "./app/screen/authentication/UserLogin";
import AdminLogin from "./app/screen/authentication/AdminLogin";
import { MaterialIcons } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

import Home from "./app/screen/admin/Home";
import AllCustomer from "./app/screen/admin/AllCustomer";
import CreateNewUser from "./app/screen/admin/CreateNewUser";
import Profile from "./app/screen/admin/Profile";
import Glass from "./app/screen/admin/Glass";
import MosquitoNetting from "./app/screen/admin/MosquitoNetting";
import VatInstallation from "./app/screen/admin/VatInstallation";
import MailData from "./app/screen/admin/MailData";
import PhoneData from "./app/screen/admin/PhoneData";
import { AuthProvider, useAuth } from "./app/screen/authentication/Auth";
import Logout from "./app/screen/authentication/Logout";
import UserDashboard from "./app/screen/user/UserDashboard";
import MyCustomer from "./app/screen/user/MyCustomer";
import AddCustomer from "./app/screen/user/AddCustomer";
import NewQuotation from "./app/screen/user/NewQuotation";
import WindowDoor from "./app/screen/user/WindowDoor";
import QuotationReport from "./app/screen/user/QuotationReport";
import CustomDrawerContent from "./app/screen/CustomDrawerContent";
import Language from "./app/screen/Language";
import Course from "./app/screen/Course";
import Enrollment from "./app/screen/Enrollment";
import Footer from "./app/screen/Footer";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function AdminDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "black",
        },
        headerTintColor: "#fff",
      }}
      drawerContent={(props) => <Logout {...props} />}
    >
      <Drawer.Screen
        name="Admin_Dashboard"
        component={Home}
        options={{
          title: "Home",
          drawerIcon: ({ focused }) => (
            <MaterialIcons
              name="home"
              size={focused ? 25 : 25}
              color={focused ? "#7cc" : "#ccc"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="all_customer"
        component={AllCustomer}
        options={{
          title: "All Customer",
          drawerIcon: ({ focused }) => (
            <MaterialIcons
              name="people"
              size={focused ? 25 : 25}
              color={focused ? "#7cc" : "#ccc"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="create_new_user"
        component={CreateNewUser}
        options={{
          title: "User",
          drawerIcon: ({ focused }) => (
            <MaterialIcons
              name="person-add"
              size={focused ? 25 : 25}
              color={focused ? "#7cc" : "#ccc"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="profile"
        component={Profile}
        options={{
          title: "Profile",
          drawerIcon: ({ focused }) => (
            <MaterialIcons
              name="person"
              size={focused ? 25 : 25}
              color={focused ? "#7cc" : "#ccc"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="glass"
        component={Glass}
        options={{
          title: "Glass",
          drawerIcon: ({ focused }) => (
            <MaterialIcons
              name="window"
              size={focused ? 25 : 25}
              color={focused ? "#7cc" : "#ccc"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="mosquito_netting"
        component={MosquitoNetting}
        options={{
          title: "Mosquito Netting",
          drawerIcon: ({ focused }) => (
            <FontAwesome6
              name="mosquito-net"
              size={focused ? 20 : 20}
              color={focused ? "#7cc" : "#ccc"}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="vat_installation"
        component={VatInstallation}
        options={{
          title: "Vat & Installation",
          drawerIcon: ({ focused }) => (
            <MaterialIcons
              name="build"
              size={focused ? 25 : 25}
              color={focused ? "#7cc" : "#ccc"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="mail_data"
        component={MailData}
        options={{
          title: "Mail Data",
          drawerIcon: ({ focused }) => (
            <MaterialIcons
              name="mail"
              size={focused ? 25 : 25}
              color={focused ? "#7cc" : "#ccc"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="phone_data"
        component={PhoneData}
        options={{
          title: "Phone Data",
          drawerIcon: ({ focused }) => (
            <MaterialIcons
              name="phone"
              size={focused ? 25 : 25}
              color={focused ? "#7cc" : "#ccc"}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

function UserDrawer() {
  return (
    <>
      <Drawer.Navigator
        screenOptions={{
          headerShown: true,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "black",
          },
          headerTintColor: "#fff",
        }}
        drawerContent={(props) => <Logout {...props} />}
      >
        <Drawer.Screen
          name="User_Dashboard"
          component={UserDashboard}
          options={{
            title: "User Dashboard",
            drawerIcon: ({ focused }) => (
              <MaterialIcons
                name="dashboard"
                size={focused ? 25 : 25} // Adjust the size here
                color={focused ? "#7cc" : "#ccc"}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="my_customer"
          component={MyCustomer}
          options={{
            title: "My Customer",
            drawerIcon: ({ focused }) => (
              <MaterialIcons
                name="person"
                size={focused ? 25 : 25} // Adjust the size here
                color={focused ? "#7cc" : "#ccc"}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="add_customer"
          component={AddCustomer}
          options={{
            title: "Add Customer",
            drawerIcon: ({ focused }) => (
              <MaterialIcons
                name="person-add"
                size={focused ? 25 : 25} // Adjust the size here
                color={focused ? "#7cc" : "#ccc"}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="new_quotation"
          component={UserStack}
          options={{
            title: "New Quotation",
            drawerIcon: ({ focused }) => (
              <MaterialIcons
                name="description"
                size={focused ? 25 : 25} // Adjust the size here
                color={focused ? "#7cc" : "#ccc"}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="quotation_report"
          component={QuotationReport}
          options={{
            title: "Quotation Report",
            drawerIcon: ({ focused }) => (
              <MaterialIcons
                name="insert-chart"
                size={focused ? 25 : 25} // Adjust the size here
                color={focused ? "#7cc" : "#ccc"}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    </>
  );
}
function UserStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="new_quotation"
    >
      <Stack.Screen name="new_quotation" component={NewQuotation} />
      <Stack.Screen name="WindowDoor" component={WindowDoor} />
    </Stack.Navigator>
  );
}
function AppContent() {
  const { isLoggedIn, role } = useAuth();

  if (isLoggedIn) {
    return role === "admin" ? (
      <>
        <AdminDrawer />
      </>
    ) : (
      <UserDrawer />
    );
  } else {
    return (
      <Drawer.Navigator
        screenOptions={{
          headerShown: true,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#365B6D",
          },
          headerTintColor: "#fff",
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          options={{
            title: "Home",

            headerTitle: "Trace Academy",
            headerTitleAlign: "center",
            headerShown: true,
            drawerIcon: ({ focused, size }) => (
              <MaterialIcons
                name="home"
                size={size}
                color={focused ? "#7cc" : "#ccc"}
              />
            ),
          }}
          name="WELCOME"
          component={WelcomeScreen}
        />
        <Drawer.Screen
          options={{
            title: "Course ",
            drawerIcon: ({ focused, size }) => (
              <MaterialIcons
                name="book"
                size={size}
                color={focused ? "#7cc" : "#ccc"}
              />
            ),
          }}
          name="course"
          component={Course}
        />
        <Drawer.Screen
          options={{
            title: "Course Details",
            drawerIcon: ({ focused, size }) => (
              <MaterialIcons
                name="person"
                size={size}
                color={focused ? "#7cc" : "#ccc"}
              />
            ),
          }}
          name="course-details"
          component={Enrollment}
        />
        <Drawer.Screen
          options={{
            title: "Footer",
            drawerIcon: ({ focused, size }) => (
              <MaterialIcons
                name="person"
                size={size}
                color={focused ? "#7cc" : "#ccc"}
              />
            ),
          }}
          name="footer"
          component={Footer}
        />
        <Drawer.Screen
          options={{
            title: "Language",
            drawerIcon: ({ focused, size }) => (
              <MaterialIcons
                name="language"
                size={size}
                color={focused ? "#7cc" : "#ccc"}
              />
            ),
          }}
          name="language"
          component={Language}
        />
      </Drawer.Navigator>
    );
  }
}

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaProvider style={styles.container}>
        <NavigationContainer>
          <AppContent />
          {/* <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="WindowDoor" component={WindowDoor} />
          </Stack.Navigator> */}
        </NavigationContainer>
        <StatusBar style="light" backgroundColor="gray" />
      </SafeAreaProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: Platform.OS === "white" ? StatusBar.currentHeight : 0,
  },
});
