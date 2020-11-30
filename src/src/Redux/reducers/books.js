import { SET_BOOK, ADD_BOOK } from '../constants';

const initialState = {
  books: [{
    id: 250,
    title: 'SomeOne',
  },
  ],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_BOOK:
      return {
        books: payload,
      };
    case ADD_BOOK: {
      return {
        ...state,
        books: [
          ...state.books,
        ],
      };
    }
    default:
      return state;
  }
};
