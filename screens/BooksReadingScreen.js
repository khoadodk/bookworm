import React from "react";
import { View, Text, StyleSheet } from "react-native";

const BooksReadingScreen = () => {
  return (
    <View style={styles.container}>
      <Text>BooksReadingScreen</Text>
    </View>
  );
};

export default BooksReadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
