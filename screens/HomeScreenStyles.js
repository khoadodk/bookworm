import { StyleSheet } from "react-native";
import colors from "../assets/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 70,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderColor,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: { fontSize: 24 },
  bookFormContainer: { height: 50, flexDirection: "row" },
  renderBooksContainer: { height: 50, flexDirection: "row" },
  renderBooksTitle: { flex: 1, justifyContent: "center", paddingLeft: 5 },
  renderBooksMarkAsReadText: { fontWeight: "bold", color: "white" },
  textInput: { flex: 1, backgroundColor: colors.bgTextInput, paddingLeft: 5 },
  listEmptyComponent: { marginTop: 50, alignItems: "center" },
  listEmptyComponentText: { fontWeight: "bold" },
  addNewBookButtonText: { color: "green", fontSize: 30 },
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
  showAddNewBookButton: { backgroundColor: colors.bgPrimary, borderRadius: 25 },
});
