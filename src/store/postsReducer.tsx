import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Dispatch } from "redux";
import { IPost } from "../types";
import { RootState } from "./store";

interface postsState {
  entities: IPost[] | null;
  error: string | null;
  loading: boolean;
}

const initialState: postsState = {
  entities: null,
  error: null,
  loading: false
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    fetchDataStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess: (state, action: PayloadAction<IPost[]>) => {
      state.entities = action.payload;
      state.error = null;
    },
    fetchDataFailure: (state, action: PayloadAction<string>) => {
      state.entities = null;
      state.error = action.payload;
    }
  },
});

export const {
  fetchDataStart,
  fetchDataSuccess,
  fetchDataFailure,
} = postsSlice.actions;
export default postsSlice.reducer;

export const getPosts = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(fetchDataStart());
      const response = await axios.get('https://dummyjson.com/posts');
      dispatch(fetchDataSuccess(response.data.posts));
    } catch (error) {
      dispatch(fetchDataFailure("Что-то пошло не так"));
    }
  }
};

export const getPostById = (id: number) => (state: RootState) => {
  if (state.posts.entities) {
      return state.posts.entities.find((p) => p.id === id);
  }
};