import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

function getPosition(position) {
  switch (position) {
    case "left":
      return { position: "absolute", left: 20, bottom: 50 };
    default:
      return { position: "absolute", right: 20, bottom: 50 };
  }
}

const CustomActionButton = ({ children, style, onPress, position }) => {
  const floatingActionButton = position ? getPosition(position) : [];
  return (
    <TouchableOpacity style={floatingActionButton} onPress={onPress}>
      <View style={[styles.button, style]}>{children}</View>
    </TouchableOpacity>
  );
};

CustomActionButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  children: PropTypes.element.isRequired,
};

CustomActionButton.defaultProps = {
  style: {},
};

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    backgroundColor: "#deada5",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CustomActionButton;
