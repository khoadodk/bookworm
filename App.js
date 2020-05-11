import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import WelcomeScreen from "./screens/AppSwitchNavigator/WelcomeScreen";
import HomeScreen from "./screens/HomeScreen";
import SignUpScreen from "./screens/SignUpScreen";
import SettingsScreen from "./screens/SettingsScreen";

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

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

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
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
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
}

const App = () => {
  const isSignedIn = false;
  return (
    <NavigationContainer>
      {isSignedIn ? <MyStack /> : <MyDrawer />}
    </NavigationContainer>
  );
};

export default App;
