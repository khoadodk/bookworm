import { StyleSheet } from "react-native";
import colors from "../assets/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: { fontSize: 24, color: colors.txtWhite },
  bookFormContainer: { height: 50, flexDirection: "row", marginBottom: 5 },
  // Book list
  renderBooksMarkAsReadText: { fontWeight: "bold", color: "white" },
  renderBookReadIcon: {
    width: 100,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
  },

  // End of book list
  textInput: {
    flex: 1,
    backgroundColor: colors.bgTextInput,
    paddingLeft: 5,
    fontSize: 20,
  },
  listEmptyComponent: { marginTop: 50, alignItems: "center" },
  listEmptyComponentText: { fontWeight: "bold" },
  addNewBookButtonText: { fontSize: 30, color: colors.bgSuccess },
  footer: {
    height: 70,
    borderTopWidth: 0.5,
    borderTopColor: colors.borderColor,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  // Buttons
  markAsReadButton: { width: 100, backgroundColor: colors.bgSuccess },
  addBookButton: { backgroundColor: colors.bgSuccess },
  hideAdddNewBookButton: { backgroundColor: colors.bgError },
  showAddNewBookButton: {
    backgroundColor: colors.txtWhite,
    borderRadius: 25,
    borderWidth: 0.2,
  },
});
