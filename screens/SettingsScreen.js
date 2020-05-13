import React, { Component } from "react";
import { View, Text } from "react-native";
import * as firebase from "firebase/app";
import "firebase/auth";

import colors from "../assets/colors";
import CustomActionButton from "../components/CustomActionButton";

class SettingsScreen extends Component {
  signOut = async () => {
    try {
      await firebase.auth().signOut();
      this.props.navigation.navigate("Welcome");
    } catch (error) {
      alert("Unable to sign out!");
    }
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <CustomActionButton
          title="Settings"
          onPress={this.signOut}
          style={{
            width: 200,
            backgroundColor: colors.bgPrimary,
          }}
        >
          <Text style={{ fontWeight: "100", fontSize: 20 }}>Log Out</Text>
        </CustomActionButton>
      </View>
    );
  }
}

export default SettingsScreen;
