const initialState = {
  books: [],
  booksReading: [],
  booksRead: [],
  isLoading: true,
  image: null,
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
    case "MARK_BOOK_AS_UNREAD":
      return {
        ...state,
        books: state.books.map((book) => {
          if (book.name === action.payload.name) {
            return { ...book, read: false };
          }
          return book;
        }),
        booksRead: state.booksRead.filter(
          (book) => book.name !== action.payload.name
        ),
        booksReading: [...state.booksReading, action.payload],
      };
    case "DELETE_BOOK":
      return {
        ...state,
        books: state.books.filter((book) => book.name !== action.payload.name),
        booksReading: state.booksReading.filter(
          (book) => book.name !== action.payload.name
        ),
        booksRead: state.booksRead.filter(
          (book) => book.name !== action.payload.name
        ),
      };
    case "UPDATE_BOOK_IMAGE":
      return {
        ...state,
        books: state.books.map((book) => {
          if (book.name === action.payload.name) {
            return { ...book, image: action.payload.uri };
          }
          return book;
        }),
        booksReading: state.booksReading.map((book) => {
          if (book.name === action.payload.name) {
            return { ...book, image: action.payload.uri };
          }
          return book;
        }),
        booksRead: state.booksRead.map((book) => {
          if (book.name === action.payload.name) {
            return { ...book, image: action.payload.uri };
          }
          return book;
        }),
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
