import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import colors from "../assets/colors";

const BookCount = ({ color, type, ...props }) => {
  return (
    <View style={styles.container}>
      <Text style={{ color: color || colors.txtWhite }}>
        {props.books[type].length || 0}
      </Text>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    books: state.books,
  };
};

export default connect(mapStateToProps)(BookCount);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
