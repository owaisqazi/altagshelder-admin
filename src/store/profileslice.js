import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../basedurl"; // Import your axios instance

// Asynchronous thunk to fetch personal data
export const fetchPersonalData = createAsyncThunk(
  "profile/fetchPersonalData",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`get/user/${id}`);
      const { status, data } = response;
      if (status) {
        return data;
      } else {
        return rejectWithValue("Failed to fetch personal data");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Asynchronous thunk to fetch insurance data
export const fetchInsuranceData = createAsyncThunk(
  "profile/fetchInsuranceData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("get/insurance/data");
      const { status, data } = response;
      if (status) {
        return data;
      } else {
        return rejectWithValue("Failed to fetch insurance data");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  data: null,
  loading: false,
  error: null,
};

// Create slice
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    ProfileData: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPersonalData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPersonalData.fulfilled, (state, action) => {
        state.data = { ...state.data, ...action.payload };
        state.loading = false;
      })
      .addCase(fetchPersonalData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch personal data";
      })
      .addCase(fetchInsuranceData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInsuranceData.fulfilled, (state, action) => {
        state.data = { ...state.data, ...action.payload };
        state.loading = false;
      })
      .addCase(fetchInsuranceData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch insurance data";
      });
  },
});

export const { ProfileData } = profileSlice.actions;

export default profileSlice.reducer;
