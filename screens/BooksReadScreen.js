import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

export class BooksReadScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> BooksReadScreen </Text>
      </View>
    );
  }
}

export default BooksReadScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
