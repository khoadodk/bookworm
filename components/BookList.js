import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import colors from "../assets/colors";

const BookList = ({ children, item, editable = false, onPress }) => {
  return (
    <View style={styles.renderBooksContainer}>
      <TouchableOpacity onPress={onPress} disabled={!editable}>
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.bookImage} />
        ) : (
          <Image
            source={require("../assets/icon.png")}
            style={styles.bookImage}
          />
        )}
      </TouchableOpacity>
      <Text style={styles.renderBooksTitle}>{item.name}</Text>
      {children}
    </View>
  );
};

export default BookList;

const styles = StyleSheet.create({
  renderBooksContainer: {
    flex: 1,
    minHeight: 60,
    flexDirection: "row",
    backgroundColor: colors.bgPrimary,
    alignItems: "center",
    borderTopWidth: 0.5,
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
