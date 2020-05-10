import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import BookCount from "./components/BookCount";

class App extends React.Component {
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
    <View style={{ height: 50, flexDirection: "row" }}>
      <View style={{ flex: 1, justifyContent: "center", paddingLeft: 5 }}>
        <Text>{item}</Text>
      </View>
      <TouchableOpacity onPress={() => this.markAsRead(item, index)}>
        <View
          style={{
            width: 100,
            height: 50,
            backgroundColor: "#a5deba",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "bold", color: "white" }}>
            Mark as Read
          </Text>
        </View>
      </TouchableOpacity>
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
      <View style={{ flex: 1 }}>
        {/* Header */}
        <View
          style={{
            height: 70,
            borderBottomWidth: 0.5,
            borderBottomColor: "#E9E9E9E9",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 24 }}>Book Worm</Text>
        </View>
        {/* Body */}
        <View style={{ flex: 1 }}>
          {/* Add Book Form */}
          {isAddNewBookVisible && (
            <View style={{ height: 50, flexDirection: "row" }}>
              <TextInput
                style={{ flex: 1, backgroundColor: "#ececec", paddingLeft: 5 }}
                placeholder="Enter Book Name"
                placeholderTextColor="grey"
                onChangeText={(text) => this.setState({ textInputData: text })}
              />
              <TouchableOpacity onPress={() => this.addBook(textInputData)}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: "#a5deba",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons name="ios-checkmark" color="white" size={40} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.hideAddNewBook}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: "#deada5",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons name="ios-close" color="white" size={40} />
                </View>
              </TouchableOpacity>
            </View>
          )}
          {/* Book List */}
          <FlatList
            data={books}
            renderItem={({ item }, index) => this.renderBooks(item, index)}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={
              <View style={{ marginTop: 50, alignItems: "center" }}>
                <Text style={{ fontWeight: "bold" }}>
                  Not Reading Any Books.
                </Text>
              </View>
            }
          />

          {/* Add Button */}
          <TouchableOpacity
            style={{ position: "absolute", bottom: 20, right: 20 }}
            onPress={this.showAddNewBook}
          >
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: "#AAD1E6",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontSize: 30 }}>+</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* Footer */}
        <View
          style={{
            height: 70,
            borderTopWidth: 0.5,
            borderTopColor: "#E9E9E9E9",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <BookCount title="Total" count={totalCount} />
          <BookCount title="Reading" count={readingCount} />
          <BookCount title="Read" count={readCount} />
        </View>
      </View>
    );
  }
}

export default App;
