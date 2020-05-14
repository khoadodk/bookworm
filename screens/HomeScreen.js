import React from "react";
import { Text, View, FlatList, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./HomeScreenStyles";
import * as firebase from "firebase/app";
import colors from "../assets/colors";
import { connect } from "react-redux";

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
      console.log(selectedBook);
      console.log(this.props.books);
      this.props.isLoading(true);
      // update book read in firebase
      await firebase
        .database()
        .ref("books")
        .child(this.state.currentUser.uid)
        .child(selectedBook.key)
        .update({ read: true });
      this.props.markBookAsRead(selectedBook);
      his.props.isLoading(false);
    } catch (error) {
      console.log(error);
      this.props.isLoading(false);
    }
  };

  renderBooks = (item) => (
    <BookList item={item}>
      {item.read ? (
        <View style={styles.renderBookReadIcon}>
          <Ionicons name="ios-checkmark" color={colors.bgSuccess} size={50} />
        </View>
      ) : (
        <CustomActionButton
          onPress={() => this.markAsRead(item)}
          style={styles.markAsReadButton}
        >
          <Text style={styles.renderBooksMarkAsReadText}>Mark as Read</Text>
        </CustomActionButton>
      )}
    </BookList>
  );

  render() {
    const { textInputData } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          {this.props.books.isLoading && <Loading />}

          {/* Header */}
          <CustomHeader navigation={this.props.navigation}>
            <Text style={styles.headerTitle}>Book Worm</Text>
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
    isLoading: (bool) => dispatch({ type: "IS_LOADING", payload: bool }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
