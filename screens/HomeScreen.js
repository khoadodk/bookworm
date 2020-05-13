import React from "react";
import { Text, View, FlatList, TextInput, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./HomeScreenStyles";
import * as firebase from "firebase/app";
import colors from "../assets/colors";

import { snapshotToArray } from "../helpers/firebaseHelpers";
import BookCount from "../components/BookCount";
import CustomActionButton from "../components/CustomActionButton";
import BookList from "../components/BookList";

class HomeScreen extends React.Component {
  state = {
    totalCount: 0,
    isAddNewBookVisible: false,
    textInputData: "",
    books: [],
    booksReading: [],
    booksRead: [],
    currentUser: {},
  };

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
          books: booksArray,
          booksReading: booksArray.filter((book) => !book.read),
          booksRead: booksArray.filter((book) => book.read),
          totalCount: booksArray.length,
        });
      }
    });
  };

  showAddNewBook = () => {
    this.setState({ isAddNewBookVisible: true });
  };

  hideAddNewBook = () => {
    this.setState({ isAddNewBookVisible: false });
  };

  addBook = async (book) => {
    try {
      const { currentUser } = this.state;
      // check book exist
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
        const response = await firebase
          .database()
          .ref("books")
          .child(currentUser.uid)
          .push()
          .set({ name: book, read: false });

        this.setState((prevState) => ({
          books: [...prevState.books, book],
          booksReading: [...prevState.booksReading, book],
          isAddNewBookVisible: false,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  markAsRead = async (selectedBook) => {
    try {
      // update book read in firebase
      await firebase
        .database()
        .ref("books")
        .child(this.state.currentUser.uid)
        .child(selectedBook.key)
        .update({ read: true });
      // update state
      let books = this.state.books.map((book) => {
        if (book.name == selectedBook.name) {
          return { ...book, read: true };
        } else {
          return book;
        }
      });

      let booksReading = this.state.booksReading.filter(
        (book) => book.name !== selectedBook.name
      );
      this.setState((prevState) => ({
        books: books,
        booksReading: booksReading,
        booksRead: [
          ...prevState.booksRead,
          { name: selectedBook.name, read: true },
        ],
      }));
    } catch (error) {
      console.log(error);
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
    const {
      totalCount,
      isAddNewBookVisible,
      textInputData,
      books,
      booksReading,
      booksRead,
    } = this.state;
    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Book Worm</Text>
        </View>
        {/* Body */}
        <View style={styles.container}>
          {/* Add Book Form */}
          {isAddNewBookVisible && (
            <View style={styles.bookFormContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Enter Book Name"
                placeholderTextColor="grey"
                onChangeText={(text) => this.setState({ textInputData: text })}
              />
              <CustomActionButton
                onPress={() => this.addBook(textInputData)}
                style={styles.addBookButton}
              >
                <Ionicons name="ios-checkmark" color="white" size={40} />
              </CustomActionButton>
              <CustomActionButton
                onPress={this.hideAddNewBook}
                style={styles.hideAdddNewBookButton}
              >
                <Ionicons name="ios-close" color="white" size={40} />
              </CustomActionButton>
            </View>
          )}
          {/* Book List */}
          <FlatList
            data={books}
            renderItem={({ item }, index) => this.renderBooks(item, index)}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={
              <View style={styles.listEmptyComponent}>
                <Text style={styles.listEmptyComponentText}>
                  Not Reading Any Books.
                </Text>
              </View>
            }
          />

          {/* Add Button */}
          <CustomActionButton
            onPress={this.showAddNewBook}
            style={styles.showAddNewBookButton}
            position="right"
          >
            <Text style={styles.addNewBookButtonText}>+</Text>
          </CustomActionButton>
        </View>
        {/* Footer */}
        <View style={styles.footer}>
          <BookCount title="Total" count={totalCount} />
          <BookCount
            title="Reading"
            count={booksReading && booksReading.length}
          />
          <BookCount title="Read" count={booksRead && booksRead.length} />
        </View>
      </View>
    );
  }
}

export default HomeScreen;
