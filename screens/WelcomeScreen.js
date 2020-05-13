import React, { Component } from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../assets/colors";
import CustomActionButton from "../components/CustomActionButton";

class WelcomeScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons name="ios-bookmarks" size={150} color={colors.bgPrimary} />
          <Text style={{ fontSize: 50, fontWeight: "100" }}>Book Worm</Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          <CustomActionButton
            title="Log in"
            onPress={() => this.props.navigation.navigate("Login")}
            style={{
              width: 200,
              backgroundColor: colors.bgTextInput,
              borderWidth: 1,
              marginBottom: 10,
            }}
          >
            <Text style={{ fontWeight: "100", fontSize: 20 }}>Log In</Text>
          </CustomActionButton>
        </View>
      </View>
    );
  }
}

export default WelcomeScreen;
