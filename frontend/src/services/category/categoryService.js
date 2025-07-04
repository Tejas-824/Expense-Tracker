import axios from "axios";
import { BASE_URL } from "../../utils/url";
import { getUserFromStorage } from "../../utils/getUserFromStorage";

const getAuthHeaders = () => {
  const token = getUserFromStorage();
  if (!token) throw new Error("No token found. User might not be authenticated.");
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const addCategoryAPI = async ({ name, type }) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/categories/create`,
      { name, type },
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding category:", error);
    throw error;
  }
};

export const updateCategoryAPI = async ({ name, type, id }) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/categories/update/${id}`,
      { name, type },
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

export const deleteCategoryAPI = async (id) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/categories/delete/${id}`,
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};

export const listCategoriesAPI = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/categories/lists`,
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
