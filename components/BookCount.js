import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";

const BookCount = ({ title, count }) => {
  return (
    <View>
      <Text style={{ fontSize: 20 }}>{title}</Text>
      <Text style={{ textAlign: "center" }}>{count}</Text>
    </View>
  );
};

BookCount.propTypes = {
  count: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default BookCount;
