const initialState = {
  books: [],
  booksReading: [],
  booksRead: [],
  isLoading: true,
};

export const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_BOOKS":
      return {
        ...state,
        books: action.payload,
        booksReading: action.payload.filter((book) => !book.read),
        booksRead: action.payload.filter((book) => book.read),
      };
    case "ADD_BOOK":
      return {
        ...state,
        books: [...state.books, action.payload],
        booksReading: [...state.booksReading, action.payload],
      };
    case "MARK_BOOK_AS_READ":
      return {
        ...state,
        books: state.books.map((book) => {
          if (book.name === action.payload.name) {
            return { ...book, read: true };
          }
          return book;
        }),
        booksRead: [...state.booksRead, action.payload],
        booksReading: state.booksReading.filter(
          (book) => book.name !== action.payload.name
        ),
      };
    case "IS_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};
