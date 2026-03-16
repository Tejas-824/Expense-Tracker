import axios from "axios";
import { BASE_URL } from "../../utils/url";
import { getUserFromStorage } from "../../utils/getUserFromStorage";

const getAuthHeaders = () => {
  const user = getUserFromStorage();

  if (!user || !user.token) {
    throw new Error("No token found. User might not be authenticated.");
  }

  return {
    Authorization: `Bearer ${user.token}`,
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
      `${BASE_URL}/api/v1/transactions/create`,
      { type, category, date, description, amount },
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding transaction:", error);
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
    const response = await axios.get(`${BASE_URL}/api/v1/transactions/lists`, {
      params: { category, type, startDate, endDate },
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error listing transactions:", error);
    throw error;
  }
};

export const updateTransactionAPI = async ({
  id,
  type,
  category,
  date,
  description,
  amount,
}) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/api/v1/transactions/update/${id}`,
      { type, category, date, description, amount },
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating transaction:", error);
    throw error;
  }
};

export const deleteTransactionAPI = async (id) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/api/v1/transactions/delete/${id}`,
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting transaction:", error);
    throw error;
  }
};