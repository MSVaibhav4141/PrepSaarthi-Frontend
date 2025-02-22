import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
const axiosInstance = axios.create({baseURL:import.meta.env.VITE_API_URL, withCredentials:true})


// all activr mentor list 
export const getMentorList = createAsyncThunk(
    "all/mentors/active",
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await axiosInstance.get(`/v1/admin/mentors`);
        return data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );
// all  mentor request  list 
export const getMentorRequest = createAsyncThunk(
    "all/mentors/request",
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await axiosInstance.get(`/v1/admin/users/request`);
        return data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );
  // get all connection count 

export const getSuccessMentorConnection = createAsyncThunk(
    "all/mentors/coonection",
    async (id, { rejectWithValue }) => {
      try {
        const { data } = await axiosInstance.get(`/v1/student/get/successcon/${id}`);
        return data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );


  export const clearError = createAsyncThunk("user/clearError", async () => {
    return null;
  });
  export const clearMessage = createAsyncThunk("user/clearMssg/last", async () => {
    return null;
  });
  export const reset = createAsyncThunk("user/reset", async () => {
    return null;
  });