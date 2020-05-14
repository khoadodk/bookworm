import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import colors from "../assets/colors";

const Loading = () => {
  return (
    <View
      style={{
        ...StyleSheet.absoluteFill,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        elevation: 1000,
      }}
    >
      <ActivityIndicator size="large" color={colors.bgPrimary} />
    </View>
  );
};

export default Loading;
