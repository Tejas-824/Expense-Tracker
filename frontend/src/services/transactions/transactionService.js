import axios from "axios";
import { BASE_URL } from "../../utils/url";
import { getUserFromStorage } from "../../utils/getUserFromStorage";

const getAuthHeaders = () => {
  const token = getUserFromStorage();
  if (!token) {
    throw new Error("No token found. User might not be authenticated.");
  }
  return {
    Authorization: `Bearer ${token}`,
  };
};
export const addTransactionAPI = async ({
  type,
  category,
  date,
  description,
  amount,
}) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/transactions/create`,
      { category, date, description, amount, type },
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding transaction:", error);
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
export const listTransactionsAPI = async ({
  category,
  type,
  startDate,
  endDate,
} = {}) => {
  try {
    const response = await axios.get(`${BASE_URL}/transactions/lists`, {
      params: { category, endDate, startDate, type },
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error listing transactions:", error);
    throw error;
  }
};
