import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

// ----- User Authentication APIs -----
export const signupUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/signup`, userData);
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/login`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const resetPassword = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/forgotpassword/reset`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const testBackend = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users/test`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ----- SOS APIs -----
export const saveSOSLocation = async (locationData) => {
  try {
    const response = await axios.post(`${BASE_URL}/sos/save`, locationData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSOSLocation = async (phoneNumber) => {
  try {
    const response = await axios.get(`${BASE_URL}/sos/get`, {
      params: { phoneNumber }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteSOSLocation = async (phoneNumber) => {
  try {
    const response = await axios.delete(`${BASE_URL}/sos/delete`, {
      params: { phoneNumber }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ----- Assessment APIs -----
export const fetchAssessmentQuestions = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/assessment/questions`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const submitAssessment = async (scores) => {
  try {
    const response = await axios.post(`${BASE_URL}/assessment/submit`, scores);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAssessmentResponses = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/assessment/responses`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
