import React, { Component } from "react";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer, TabActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import * as firebase from "firebase/app";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import colors from "./assets/colors";

import { firebaseConfig } from "./config/firebase";
import WelcomeScreen from "./screens/WelcomeScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SettingsScreen from "./screens/SettingsScreen";
import BooksReadingScreen from "./screens/BooksReadingScreen";
import BooksReadScreen from "./screens/BooksReadScreen";

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

const Tab = createBottomTabNavigator();

const drawerOptions = {
  homeScreen: {
    title: "Home",
    drawerIcon: () => <Ionicons name="ios-home" size={24} />,
  },
  settingsScreen: {
    title: "Settings",
    drawerIcon: () => <Ionicons name="ios-settings" size={24} />,
  },
  welcomeScreen: { title: "" },
};

function HomeTabNavigator() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          backgroundColor: colors.tabColor,
        },
        activeTintColor: colors.bgPrimary,
        inactiveTintColor: colors.txtWhite,
        tabStyle: {
          justifyContent: "center",
        },
        labelStyle: { fontSize: 18 },
      }}
    >
      <Tab.Screen
        name="Books"
        component={HomeScreen}
        options={{ tabBarLabel: "Total" }}
      />
      <Tab.Screen
        name="BooksReading"
        component={BooksReadingScreen}
        options={{ tabBarLabel: "Reading" }}
      />
      <Tab.Screen
        name="BooksRead"
        component={BooksReadScreen}
        options={{ tabBarLabel: "Read" }}
      />
    </Tab.Navigator>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Home"
        component={HomeTabNavigator}
        options={drawerOptions.homeScreen}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={drawerOptions.settingsScreen}
      />
      <Drawer.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={drawerOptions.welcomeScreen}
      />
    </Drawer.Navigator>
  );
}

function MyStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}

class App extends React.Component {
  constructor() {
    super();
    this.initializeFirebase();
    this.state = {
      isLoggedIn: false,
    };
  }

  initializeFirebase = () => {
    if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
  };

  componentDidMount() {
    this.checkLoggedInUser();
  }

  checkLoggedInUser = () => {
    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ isLoggedIn: true });
      } else {
        this.setState({ isLoggedIn: false });
      }
    });
  };

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { isLoggedIn } = this.state;
    console.log("isLoggedIn", isLoggedIn);
    return (
      <NavigationContainer>
        {isLoggedIn ? <MyDrawer /> : <MyStack />}
      </NavigationContainer>
    );
  }
}

export default App;
