import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import colors from "../assets/colors";

import CustomHeader from "../components/CustomHeader";
import BookList from "../components/BookList";
import ListEmpty from "../components/ListEmpty";
import Loading from "../components/Loading";

const BooksReadingScreen = ({ books, navigation }) => {
  renderBooks = (item) => {
    return <BookList item={item} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      {books.isLoading && <Loading />}
      <View style={styles.container}>
        <CustomHeader navigation={navigation}>
          <Text style={styles.headerTitle}>Book Worm</Text>
        </CustomHeader>
        <FlatList
          data={books.booksReading}
          renderItem={({ item }, index) => renderBooks(item)}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={
            !books.isLoading && <ListEmpty text="Not Reading Any Book." />
          }
        />
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {
    books: state.books,
  };
};

export default connect(mapStateToProps)(BooksReadingScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    color: colors.txtWhite,
  },
  listEmptyComponent: { marginTop: 50, alignItems: "center" },
  listEmptyComponentText: { fontWeight: "bold" },
});
