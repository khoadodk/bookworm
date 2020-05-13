import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../assets/colors";

const CustomHeader = ({ navigation, children }) => {
  return (
    <View style={styles.header}>
      <Ionicons
        name="ios-menu"
        size={40}
        color={colors.txtWhite}
        onPress={() => navigation.openDrawer()}
        style={styles.headerIcon}
      />
      <View style={styles.headerTitle}>{children}</View>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  header: {
    height: 70,
    flexDirection: "row",
    backgroundColor: colors.tabColor,
    alignItems: "center",
  },
  headerIcon: {
    marginLeft: 10,
  },
  headerTitle: {
    flex: 1,
    alignItems: "center",
  },
});
