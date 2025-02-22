import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
const axiosInstance = axios.create({baseURL:import.meta.env.VITE_API_URL, withCredentials:true})

export const paymentInitator = createAsyncThunk(
    "product/checkout/payment",
    async ({amount, duration}, { rejectWithValue }) => {
      try {

        const { data } = await axiosInstance.post(`/v1/checkout`, {amount, duration});
  
        return data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );
export const paymentInitatorSub = createAsyncThunk(
    "product/checkout/subscription",
    async (amount, { rejectWithValue }) => {
      try {

        const { data } = await axiosInstance.post(`/v1/subscribe`, {amount});
  
        return data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

export const paymentCancel = createAsyncThunk(
    "product/checkout/cancel",
    async (_, { rejectWithValue }) => {
      try {

        const { data } = await axiosInstance.post(`/v1/paymentVerification/subscription/cancel`);
  
        return data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  export const reset = createAsyncThunk("reset/payment", async () => {
    return null;
  });
  

  export const clearError = createAsyncThunk("clear/error/payment", async () => {
    return null;
  });
  