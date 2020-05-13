import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import colors from "../assets/colors";

const BookList = ({ children, item }) => {
  return (
    <View style={styles.renderBooksContainer}>
      <Image source={require("../assets/icon.png")} style={styles.bookImage} />
      <Text style={styles.renderBooksTitle}>{item.name}</Text>
      {children}
    </View>
  );
};

export default BookList;

const styles = StyleSheet.create({
  renderBooksContainer: {
    flex: 1,
    minHeight: 70,
    flexDirection: "row",
    backgroundColor: colors.bgPrimary,
    alignItems: "center",
    marginVertical: 5,
  },
  renderBooksTitle: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 5,
    fontSize: 22,
    textTransform: "capitalize",
  },
  bookImage: { height: 50, width: 50, margin: 10, borderRadius: 25 },
});
