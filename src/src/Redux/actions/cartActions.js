import { getCurrentBook } from '../../Api/Book/bookApi';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants';

export const add = (data, qty) => ({
  type: CART_ADD_ITEM,
  payload: {
    book: data.id,
    name: data.name,
    image: data.image,
    price: data.price,
    qty,
  },
});

export const remove = (id) => ({
  type: CART_REMOVE_ITEM,
  payload: id,
});

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await getCurrentBook(id);
  dispatch(add(data, qty));
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch(remove(id));
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
