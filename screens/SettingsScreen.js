import React, { Component } from "react";
import { View, Text } from "react-native";
import colors from "../assets/colors";
import CustomActionButton from "../components/CustomActionButton";

class SettingsScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <CustomActionButton
          title="Settings"
          onPress={() => this.props.navigation.navigate("Welcome")}
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
