import { SET_BOOKS, SET_IS_LOADING } from '../constants';

const initialState = {
  isLoading: true,
  items: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_BOOKS:
      return {
        ...state,
        items: payload,
        isLoading: false,
      };
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: payload,
      };
    default:
      return state;
  }
};
