import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Dispatch } from "redux";
import { RootState } from "./store";
import localStorageService from "../services/localStorage.service";

interface authState {
  authId: null | {userId: string | null};
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: authState = localStorageService.getAccessToken()
    ? {
        error: null,
        authId: { userId: localStorageService.getUserId() },
        isAuthenticated: true,
      }
    : {
        error: null,
        authId: null,
        isAuthenticated: false,
      };


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    fetchDataSuccess: (state, action: PayloadAction< {userId: string | null}>) => {
      state.authId = action.payload;
      state.isAuthenticated = true;
    },
    fetchDataFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    logout: () => {
      return initialState
    }
  },
});

export const {
  fetchDataSuccess,
  fetchDataFailure,
  logout,
} = authSlice.actions;
export default authSlice.reducer;

export const login = (
  username: string,
  password: string,
) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post('https://dummyjson.com/auth/login', {
        username: username,
        password: password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      })

      dispatch(fetchDataSuccess(response.data));
      localStorageService.setTokens(response.data);

    } catch (error) {
      dispatch(fetchDataFailure("Неверный логин или пароль"));
    }
  };
};


export const getAuthErrors = () => (state: RootState) => state.auth.error;

