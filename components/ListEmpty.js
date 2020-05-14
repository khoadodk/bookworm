import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ListEmpty = ({ text = "" }) => {
  return (
    <View style={styles.listEmptyComponent}>
      <Text style={styles.listEmptyComponentText}>{text}</Text>
    </View>
  );
};

export default ListEmpty;

const styles = StyleSheet.create({
  listEmptyComponent: {
    marginTop: "50%",
    alignItems: "center",
  },
  listEmptyComponentText: { fontWeight: "bold" },
});
