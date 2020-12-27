import { getCurrentBook } from '../../Api/Book/bookApi';
import { FAVORITE_ADD_ITEM, FAVORITE_REMOVE_ITEM } from '../Constants';

export const add = (data) => ({
  type: FAVORITE_ADD_ITEM,
  payload: {
    book: data.id,
    name: data.name,
    image: data.image,
    price: data.price,
    description: data.description,
  },
});

export const remove = (id) => ({
  type: FAVORITE_REMOVE_ITEM,
  payload: id,
});

export const addToFavorite = (id) => async (dispatch, getState) => {
  const { data } = await getCurrentBook(id);
  dispatch(add(data));
  localStorage.setItem('favoriteItems', JSON.stringify(getState().favorite.favoriteItems));
};

export const removeFromFavorite = (id) => async (dispatch, getState) => {
  dispatch(remove(id));
  localStorage.setItem('favoriteItems', JSON.stringify(getState().favorite.favoriteItems));
};
