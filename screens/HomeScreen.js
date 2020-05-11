import React from "react";
import { Text, View, TextInput, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./HomeScreenStyles";

import BookCount from "../components/BookCount";
import CustomActionButton from "../components/CustomActionButton";

class HomeScreen extends React.Component {
  state = {
    totalCount: 0,
    readingCount: 0,
    readCount: 0,
    isAddNewBookVisible: false,
    textInputData: "",
    books: [],
  };

  showAddNewBook = () => {
    this.setState({ isAddNewBookVisible: true });
  };

  hideAddNewBook = () => {
    this.setState({ isAddNewBookVisible: false });
  };

  addBook = (book) => {
    this.setState((prevstate) => ({
      books: [...prevstate.books, book],
      totalCount: prevstate.totalCount + 1,
      readingCount: prevstate.readingCount + 1,
    }));
  };

  markAsRead = (selectedBook, index) => {
    let newList = this.state.books.filter((book) => book !== selectedBook);
    this.setState((prevState) => ({
      books: newList,
      readingCount: prevState.readingCount - 1,
      readCount: prevState.readCount + 1,
    }));
  };

  renderBooks = (item, index) => (
    <View style={styles.renderBooksContainer}>
      <View style={styles.renderBooksTitle}>
        <Text>{item}</Text>
      </View>
      <CustomActionButton
        onPress={() => this.markAsRead(item, index)}
        style={styles.markAsReadButton}
      >
        <Text style={styles.renderBooksMarkAsReadText}>Mark as Read</Text>
      </CustomActionButton>
    </View>
  );

  render() {
    const {
      readCount,
      totalCount,
      readingCount,
      isAddNewBookVisible,
      textInputData,
      books,
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
          <BookCount title="Reading" count={readingCount} />
          <BookCount title="Read" count={readCount} />
        </View>
      </View>
    );
  }
}

export default HomeScreen;
