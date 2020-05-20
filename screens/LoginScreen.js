import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TextInput,
} from "react-native";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import colors from "../assets/colors";
import CustomActionButton from "../components/CustomActionButton";

class LoginScreen extends Component {
  state = {
    email: "",
    password: "",
    isLoading: false,
  };

  handleLogIn = async () => {
    const { email, password } = this.state;
    if (email && password) {
      this.setState({ isLoading: true });
      try {
        const response = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
        if (response) {
          this.setState({ isLoading: false });
          // navigate user
          this.props.navigation.navigate("Home", {
            user: response.user,
          });
        }
      } catch (error) {
        console.log(error);
        this.setState({ isLoading: false });
        switch (error.code) {
          case "auth/user-not-found":
            alert("User with that email does not exist. Please sign up!");
            break;
          case "auth/invalid-email":
            alert("Please enter an valid email address");
        }
      }
    } else {
      this.setState({ isLoading: false });
      alert("Please enter email and password");
    }
  };

  handleSignUp = async () => {
    const { email, password } = this.state;
    if (email && password) {
      this.setState({ isLoading: true });
      try {
        const response = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        // sign in user
        if (response) {
          this.setState({ isLoading: false });
          const user = await firebase
            .database()
            .ref("users/")
            .child(response.user.uid)
            .set({ email: response.user.email, uid: response.user.uid });
          console.log(user);
          this.props.navigation.navigate("Home", { user });
        }
      } catch (error) {
        console.log(error);
        this.setState({ isLoading: false });
        if (error.code == "auth/email-already-in-use") {
          alert("User already exists. Please sign in!");
        }
      }
    } else {
      this.setState({ isLoading: false });
      alert("Please enter email and password!");
    }
  };

  render() {
    const { isLoading } = this.state;
    return (
      <View style={styles.container}>
        {/* show Loading */}
        {isLoading && (
          <View
            style={[
              StyleSheet.absoluteFill,
              {
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000,
                elevation: 1000,
              },
            ]}
          >
            <ActivityIndicator size="large" color={colors.bgPrimary} />
          </View>
        )}

        <TextInput
          style={styles.textInput}
          placeholder="Enter your email"
          keyboardType="email-address"
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Enter your password"
          secureTextEntry
          onChangeText={(password) => this.setState({ password })}
        />
        <CustomActionButton
          style={[styles.loginButtons, { borderColor: colors.bgPrimary }]}
          onPress={this.handleLogIn}
        >
          <Text style={styles.buttonText}>Log In</Text>
        </CustomActionButton>
        <CustomActionButton
          style={[styles.loginButtons, { borderColor: colors.bgError }]}
          onPress={this.handleSignUp}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </CustomActionButton>
      </View>
    );
  }
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    height: 50,
    borderWidth: 0.7,
    marginBottom: 10,
    width: "60%",
    paddingHorizontal: 10,
  },
  loginButtons: {
    borderWidth: 0.7,
    backgroundColor: colors.bgTextInput,
    marginTop: 10,
    width: 150,
  },
  buttonText: {
    color: colors.txtBlack,
    fontWeight: "bold",
  },
});
