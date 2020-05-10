import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export default class BookCount extends Component {
  render() {
    const { title, count } = this.props;
    return (
      <View>
        <Text style={{ fontSize: 20 }}>{title}</Text>
        <Text style={{ textAlign: "center" }}>{count}</Text>
      </View>
    );
  }
}
