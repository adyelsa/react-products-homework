import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: [],
  },
  reducers: {
    toggleFavorite(state, action) {
      const product = action.payload;
      const index = state.items.findIndex(
        (item) => item.id === product.id
      );

      if (index === -1) {
        state.items.push(product);
      } else {
        state.items.splice(index, 1);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;

export const selectFavoritesCount = (state) =>
  state.favorites.items.length;

export default favoritesSlice.reducer;