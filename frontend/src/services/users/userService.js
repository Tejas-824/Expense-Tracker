import axios from "axios";
import { BASE_URL } from "../../utils/url";
import { getUserFromStorage } from "../../utils/getUserFromStorage";

export const loginAPI = async ({ email, password }) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error; 
  }
};

export const registerAPI = async ({ email, password, username }) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/register`, {
      email,
      password,
      username,
    });
    return response.data;
  } catch (error) {
    console.error("Error registering:", error);
    throw error; 
  }
};

export const changePasswordAPI = async (newPassword) => {
  const token = getUserFromStorage(); 

  if (!token) {
    throw new Error("No token found. User might not be authenticated.");
  }

  try {
    const response = await axios.put(
      `${BASE_URL}/users/change-password`,
      { newPassword },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; 
  } catch (error) {
    console.error("Error changing password:", error);
    throw error; 
  }
};

export const updateProfileAPI = async ({ email, username }) => {
  const token = getUserFromStorage();

  if (!token) {
    throw new Error("No token found. User might not be authenticated.");
  }

  try {
    const response = await axios.put(
      `${BASE_URL}/users/update-profile`,
      { email, username },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; 
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error; 
  }
};
