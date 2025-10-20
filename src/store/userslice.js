import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../basedurl";

// Async thunk for fetching users
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("get/all/users");
      const { status, message, data } = response;
      if (status) {
        return data; // Returning the data to the fulfilled case
      } else {
        return rejectWithValue(message); // Returning the error message to the rejected case
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message); // Handling network or API errors
    }
  }
);

// Slice to manage user data and state
const usersSlice = createSlice({
  name: "users",
  initialState: {
    data: [], // Holds the fetched user data
    loading: false, // Manages the loading state
    error: null, // Holds any error messages
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true; // Set loading to true when the fetch starts
        state.error = null; // Clear previous errors
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.data = action.payload; // Populate data with the fetched users
        state.loading = false; // Set loading to false once the fetch is successful
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.payload || "Failed to fetch users"; // Set the error message on failure
        state.loading = false; // Set loading to false once the fetch fails
      });
  },
});

export default usersSlice.reducer; // Export the reducer for use in the store
