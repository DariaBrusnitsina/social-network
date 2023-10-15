import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Dispatch } from "redux";
import { IComment } from "../types";
import { RootState } from "./store";

interface commentsState {
  entities: IComment[] | null;
  error: string | null;
  isLoading: boolean;
}

const initialState: commentsState = {
  entities: null,
  error: null,
  isLoading: false
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    commentsRequested: (state) => {
      state.isLoading = true;
    },
    commentsReceived: (state, action: PayloadAction<IComment[]>) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    commentsRequestFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  },
});

export const {
  commentsRequested,
  commentsReceived,
  commentsRequestFailed,
} = commentsSlice.actions;
export default commentsSlice.reducer;

export const getCommentsById = (postId: number) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(commentsRequested());
      const response = await axios.get(`https://dummyjson.com/posts/${postId}/comments`);
      dispatch(commentsReceived(response.data.comments));
    } catch (error) {
      dispatch(commentsRequestFailed("Что-то пошло не так"));
    }
  }
};

export const getComments = () => (state: RootState) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state: RootState) =>
  state.comments.isLoading;