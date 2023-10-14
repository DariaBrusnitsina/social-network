import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Dispatch } from "redux";


interface User {

}

interface authState {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: authState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    fetchDataSuccess: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    fetchDataFailure: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = false;
      state.user = null;
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
    } catch (error) {
      dispatch(fetchDataFailure("Что-то пошло не так"));
    }
  };
};