import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
const axiosInstance = axios.create({baseURL:process.env.REACT_APP_API_URL, withCredentials:true})


// LOGIN

export const loginUser = createAsyncThunk(
  "student/login",
  async ({ loginEmail, loginPassword }, { rejectWithValue }) => {
    try { 
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axiosInstance.post(
        `/v1/student/login`,
        { email: loginEmail, password: loginPassword },
        config
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// SIGN UP
export const signUpStudent = createAsyncThunk(
  "student/signUp",
  async (userData, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const { data } = await axiosInstance.post(`/v1/student/register`, userData, config);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

//Update Profile

export const updateStudentFinalInfo = createAsyncThunk(
  "student/update/updateInfo",
  async (userData, { rejectWithValue }) => {
    try {
      console.log(userData);
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const { data } = await axiosInstance.put(`/v1/student/self/update/profile`, userData, config);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


export const loadUser = createAsyncThunk(
  "student/load",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/v1/student/self`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// LOGOUT USER

export const logoutUser = createAsyncThunk(
    "student/logout",
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await axiosInstance.post("/v1/student/logout");
        return data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  //Mentor Detail

  export const getUserDetails = createAsyncThunk(
    "mentor/signleMentor/student",
    async (id, { rejectWithValue }) => {
      try {
        const { data } = await axiosInstance.get(`/v1/student/user/info/${id}`);
        return data.user;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  export const getMentorConnection = createAsyncThunk(
    "mentor/connection/all",
    async (id, { rejectWithValue }) => {
      try {
        const { data } = await axiosInstance.get(`/v1/student/user/info/${id}`);
        return data.user;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  export const getAllConnectionsStu = createAsyncThunk(
    "all/coonection/stu/all",
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await axiosInstance.get(`/v1/student/past/mentorship`);
        return data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  export const newReview = createAsyncThunk(
    "student/review",
    async (reviewData, { rejectWithValue }) => {
      try {
        const config = {
          headers: { "Content-Type": "application/json" },
        };
        const { data } = await axiosInstance.put(`/v1/student/review`, reviewData, config);
        return data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  export const getAllReviews = createAsyncThunk(
    "student/reviews/all",
    async (id, { rejectWithValue }) => {
      try {
        const { data } = await axiosInstance.get(`/v1/student/reviews?mentorId=${id}`);
        return data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  export const deleteReviews  = createAsyncThunk(
    "student/reviews/delete",
    async ({reviewId, reviewUserId, mentorId}, { rejectWithValue }) => {
      try {
        const { data } = await axiosInstance.delete(`/v1/student/reviews?id=${reviewId}&mentorId=${mentorId}&userId=${reviewUserId}`);
        return data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );
  export const updatePasswordStudent = createAsyncThunk(
    "student/mentoring/update/password",
    async (payload, { rejectWithValue }) => {
      try {
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axiosInstance.put(
          `/v1/student/self/update/password`,
          {payload},
          config
        );
        return data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  export const clearError = createAsyncThunk("user/clearError/student", async () => {
    return null;
  });
  export const clearMessage = createAsyncThunk("user/clearMssg/dtudent", async () => {
    return null;
  });
  export const reset = createAsyncThunk("user/reset/student", async () => {
    return null;
  });