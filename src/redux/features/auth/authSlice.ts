import axios from "../../../utils/axios";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { NavigateFunction } from "react-router-dom";

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  status: null,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axios.post("auth/signup", {
        email,
        password,
      });
      console.log("registerUser", data);
      if (data.accessToken) {
        window.localStorage.setItem("accessToken", data.accessToken);
      }
      if (data.refreshToken) {
        window.localStorage.setItem("refreshToken", data.refreshToken);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const { data } = await axios.post("auth/signin", {
        email,
        password,
      });
      console.log("loginUser", data);
      if (data.accessToken) {
        window.localStorage.setItem("accessToken", data.accessToken);
      }
      if (data.refreshToken) {
        window.localStorage.setItem("refreshToken", data.refreshToken);
      }
      return data;
    } catch (error) {
      console.error("Error login user:", error);
      throw error;
    }
  },
);

export const logOutUser = createAsyncThunk(
  "auth/logOutUser",
  async ({ navigate }: { navigate: NavigateFunction }) => {
    try {
      await axios.post("auth/signout");
      window.localStorage.setItem("accessToken", "");
      window.localStorage.setItem("refreshToken", "");
      navigate("/login");
    } catch (error) {
      console.error("Error login user:", error);
      throw error;
    }
  },
);

export const getMe = createAsyncThunk("auth/profile", async () => {
  try {
    const { data } = await axios.get("auth/protected");
    console.log("getMe", data);
    return data;
  } catch (error: any) {
    console.error("Error login user:", error);
    throw error;
  }
});

export const refresh = createAsyncThunk("auth/refresh", async () => {
  try {
    const response = await axios.post("auth/refresh", {
      refresh: window.localStorage.getItem("refreshToken"),
    });
    if (!response.data.accessToken) {
      console.error("Error login user:", response.data);
    }
    if (response.data.accessToken) {
      window.localStorage.setItem("accessToken", response.data.accessToken);
    }
    if (response.data.refreshToken) {
      window.localStorage.setItem("refreshToken", response.data.refreshToken);
    }
    return response.data;
  } catch (error) {
    console.error("Refresh error", error);
    throw error;
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Register user
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.status = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      console.log(" fulfilled action", action);
      state.isLoading = false;
      state.status = action.payload?.message;
      state.user = action.payload.user;
      state.token = action.payload.accessToken;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      console.log(" rejected action", action);
      state.isLoading = false;
      state.status = action.payload?.message;
    });
    //Login user
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.status = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.user = action.payload.user;
      state.token = action.payload.accessToken;
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.isLoading = false;
      // state.status = action.payload.message;
    });
    builder.addCase(logOutUser.pending, (state) => {
      state.isLoading = true;
      state.status = null;
    });
    builder.addCase(logOutUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = null;
      state.user = null;
      state.token = null;
    });
    builder.addCase(logOutUser.rejected, (state) => {
      state.isLoading = false;
      // state.status = action.payload.message;
    });

    //Get user info
    builder.addCase(getMe.pending, (state) => {
      state.isLoading = true;
      state.status = null;
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      // state.isLoading = false;
      // state.status = action.payload.message;
      // state.user = action.payload;
    });
    builder.addCase(getMe.rejected, (state, action) => {
      state.isLoading = false;
      state.status = action.payload?.message;
    });
  },
});

export const checkIsAuth = (state: { auth?: { token?: string } }) =>
  console.log("state", state) || Boolean(state.auth?.token);

export const { logout } = authSlice.actions;
export default authSlice.reducer;
