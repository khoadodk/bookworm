import React from "react";
import { Text, View, FlatList, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./HomeScreenStyles";
import * as firebase from "firebase/app";
import colors from "../assets/colors";
import { connect } from "react-redux";
import { compose } from "redux";
import { connectActionSheet } from "@expo/react-native-action-sheet";
import Swipeout from "react-native-swipeout";

import { openImageLib, openCam } from "../helpers/imageHelpers";
import { snapshotToArray } from "../helpers/firebaseHelpers";
import CustomActionButton from "../components/CustomActionButton";
import BookList from "../components/BookList";
import CustomHeader from "../components/CustomHeader";
import ListEmpty from "../components/ListEmpty";
import Loading from "../components/Loading";

class HomeScreen extends React.Component {
  state = {
    textInputData: "",
    currentUser: {},
  };

  textInputRef = null;

  componentDidMount = async () => {
    await this.loadUserData();
  };

  componentWillUnmount() {
    const database = firebase.database().ref(this.state.currentUser.uid);
    database.off();
  }

  loadUserData = async () => {
    await firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const currentUserData = await firebase
          .database()
          .ref("users")
          .child(user.uid)
          .once("value");
        const books = await firebase
          .database()
          .ref("books")
          .child(user.uid)
          .once("value");
        const booksArray = snapshotToArray(books);
        this.setState({
          currentUser: currentUserData.val(),
        });

        this.props.loadBooks(booksArray);
        this.props.isLoading(false);
      }
    });
  };

  addBook = async (book) => {
    // Set input empty after adding book
    this.setState({ textInputData: "" });
    this.textInputRef.setNativeProps({ text: "" });
    try {
      this.props.isLoading(true);
      const { currentUser } = this.state;
      // check book exist
      // generate a key to the book (have to do it in order to mark as read)
      // store book in ref of userid
      const snapshot = await firebase
        .database()
        .ref("books")
        .child(currentUser.uid)
        .orderByChild("name")
        .equalTo(book)
        .once("value");
      if (snapshot.exists()) {
        alert(`The book with title of ${book} aleady exists. `);
      } else {
        const key = await firebase
          .database()
          .ref("books")
          .child(currentUser.uid)
          .push().key;

        await firebase
          .database()
          .ref("books")
          .child(currentUser.uid)
          .child(key)
          .set({ name: book, read: false });

        this.props.addBook({ name: book, read: false, key });
        this.props.isLoading(false);
      }
    } catch (error) {
      console.log(error);
      this.props.isLoading(false);
    }
  };

  markAsRead = async (selectedBook) => {
    try {
      this.props.isLoading(true);
      // update book read in firebase
      await firebase
        .database()
        .ref("books")
        .child(this.state.currentUser.uid)
        .child(selectedBook.key)
        .update({ read: true });
      this.props.markBookAsRead(selectedBook);
      this.props.isLoading(false);
    } catch (error) {
      console.log(error);
      this.props.isLoading(false);
    }
  };

  markAsUnread = async (selectedBook) => {
    try {
      this.props.isLoading(true);
      // update book read in firebase
      await firebase
        .database()
        .ref("books")
        .child(this.state.currentUser.uid)
        .child(selectedBook.key)
        .update({ read: false });
      this.props.markBookAsUnRead(selectedBook);
      this.props.isLoading(false);
    } catch (error) {
      console.log(error);
      this.props.isLoading(false);
    }
  };

  deleteBook = async (selectedBook) => {
    try {
      this.props.isLoading(true);
      // update book read in firebase
      await firebase
        .database()
        .ref("books")
        .child(this.state.currentUser.uid)
        .child(selectedBook.key)
        .remove();
      this.props.deleteBook(selectedBook);
      this.props.isLoading(false);
    } catch (error) {
      console.log(error);
      this.props.isLoading(false);
    }
  };

  openImageLibrary = async (selectedBook) => {
    const result = await openImageLib();
    if (result) {
      alert("image picked");
    }
  };

  openCamera = async (selectedBook) => {
    const result = await openCam();
    if (result) {
      alert("image picked");
    }
  };

  addBookImage = (selectedBook) => {
    // Same interface as https://facebook.github.io/react-native/docs/actionsheetios.html
    const options = ["Select from Photos", "Camera", "Cancel"];
    const cancelButtonIndex = 2;

    this.props.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          this.openImageLibrary(selectedBook);
        } else if (buttonIndex === 1) {
          this.openCamera(selectedBook);
        }
      }
    );
  };

  renderBooks = (item) => {
    let swipeoutBtn = [
      {
        text: "Delete",
        component: (
          <View style={styles.center}>
            <Ionicons name="ios-trash" size={24} color={colors.txtWhite} />
          </View>
        ),
        backgroundColor: colors.btnDelete,
        onPress: () => this.deleteBook(item),
      },
    ];
    if (!item.read) {
      swipeoutBtn.unshift({
        text: "Mark Read",
        component: (
          <View style={styles.center}>
            <View style={styles.center}>
              <Text style={{ color: colors.txtWhite, fontSize: 16 }}>Mark</Text>
              <Text style={{ color: colors.txtWhite, fontSize: 16 }}>Read</Text>
            </View>
          </View>
        ),
        backgroundColor: colors.bgSuccess,
        onPress: () => this.markAsRead(item),
      });
    } else {
      swipeoutBtn.unshift({
        text: "Mark Read",
        component: (
          <View style={styles.center}>
            <View style={styles.center}>
              <Text style={{ color: colors.txtWhite, fontSize: 16 }}>Mark</Text>
              <Text style={{ color: colors.txtWhite, fontSize: 16 }}>
                Unread
              </Text>
            </View>
          </View>
        ),
        backgroundColor: colors.bgWarning,
        onPress: () => this.markAsUnread(item),
      });
    }

    return (
      <Swipeout
        autoClose={true}
        backgroundColor={colors.bgPrimary}
        right={swipeoutBtn}
      >
        <BookList
          item={item}
          editable={true}
          onPress={() => this.addBookImage(item)}
        >
          {item.read && (
            <View style={styles.renderBookReadIcon}>
              <Ionicons
                name="ios-checkmark"
                color={colors.bgSuccess}
                size={50}
              />
            </View>
          )}
        </BookList>
      </Swipeout>
    );
  };

  render() {
    const { textInputData } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          {this.props.books.isLoading && <Loading />}

          {/* Header */}
          <CustomHeader navigation={this.props.navigation}>
            <View style={[styles.center, styles.flexRow]}>
              <Ionicons
                name="ios-bookmarks"
                size={50}
                color={colors.txtWhite}
              />
              <Text style={styles.headerTitle}>Book Worm</Text>
            </View>
          </CustomHeader>
          {/* Body */}
          <View style={styles.container}>
            {/* Add Book Form */}
            <View style={styles.bookFormContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Enter Book Name"
                placeholderTextColor="grey"
                onChangeText={(text) => this.setState({ textInputData: text })}
                ref={(component) => {
                  this.textInputRef = component;
                }}
              />
            </View>
            {/* Book List */}
            <FlatList
              data={this.props.books.books}
              renderItem={({ item }, index) => this.renderBooks(item, index)}
              keyExtractor={(item, index) => index.toString()}
              ListEmptyComponent={
                !this.props.books.isLoading && (
                  <ListEmpty text="No Books. Please Add To The List." />
                )
              }
            />

            {/* Add Button */}
            {textInputData.length > 0 && (
              <CustomActionButton
                onPress={() => this.addBook(textInputData)}
                style={styles.showAddNewBookButton}
                position="right"
              >
                <Text style={styles.addNewBookButtonText}>+</Text>
              </CustomActionButton>
            )}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    books: state.books,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadBooks: (books) => dispatch({ type: "LOAD_BOOKS", payload: books }),
    addBook: (book) => dispatch({ type: "ADD_BOOK", payload: book }),
    markBookAsRead: (book) =>
      dispatch({ type: "MARK_BOOK_AS_READ", payload: book }),
    markBookAsUnRead: (book) =>
      dispatch({ type: "MARK_BOOK_AS_UNREAD", payload: book }),
    isLoading: (bool) => dispatch({ type: "IS_LOADING", payload: bool }),
    deleteBook: (book) => dispatch({ type: "DELETE_BOOK", payload: book }),
  };
};

const wrapper = compose(
  connect(mapStateToProps, mapDispatchToProps),
  connectActionSheet
);

export default wrapper(HomeScreen);
