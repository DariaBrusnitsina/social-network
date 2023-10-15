import { createSlice } from "@reduxjs/toolkit";
import { IUsers } from "../types";
import { RootState } from "./store";
import { Dispatch } from "redux";
import axios from "axios";

interface userState {
  entities: IUsers | null;
  error: string | null;
  isLoading: boolean;
}

const initialState: userState = {
  entities: null,
  error: null,
  isLoading: false
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true;
        },
        usersReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        usersRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

export const {
  usersRequested,
  usersReceived,
  usersRequestFailed,
} = userSlice.actions;
export default userSlice.reducer;

export const getUserById = (userId: number) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(usersRequested());
      const response = await axios.get(`https://dummyjson.com/users/${userId}`);
      dispatch(usersReceived(response.data));
    } catch (error) {
      dispatch(usersRequestFailed("Что-то пошло не так"));
    }
  }
};

export const getUser = () => (state: RootState) => state.user.entities;
export const getUserLoadingStatus = () => (state: RootState) =>
  state.user.isLoading;
