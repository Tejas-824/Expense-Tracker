import { useState, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { FaRupeeSign } from "react-icons/fa";

import { listTransactionsAPI } from "../../services/transactions/transactionService";
import { listCategoriesAPI } from "../../services/category/categoryService";

const TransactionList = () => {
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    type: "",
    category: "",
  });

  const [categoriesData, setCategoriesData] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await listCategoriesAPI();
        setCategoriesData(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await listTransactionsAPI(filters);
        setTransactions(data);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      }
    };
    fetchTransactions();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="my-4 p-4 shadow-lg rounded-lg bg-white">
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-2">Filter by Date Range</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
            className="p-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
            className="p-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
          <div className="relative">
            <select
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              className="w-full p-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 appearance-none"
            >
              <option value="">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <ChevronDownIcon className="w-5 h-5 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
          <div className="relative">
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="w-full p-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 appearance-none"
            >
              <option value="">All Categories</option>
              {categoriesData?.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="w-5 h-5 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>
      </div>
      <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-inner">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Filtered Transactions</h3>
        <ul className="space-y-2">
          {transactions?.map((transaction) => (
            <li
              key={transaction._id}
              className="bg-white p-3 rounded-md shadow border border-gray-200 flex justify-between items-center"
            >
              <div>
                <span className="font-medium text-gray-600">
                  {new Date(transaction.date).toLocaleDateString()}
                </span>
                <span
                  className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    transaction.type === "income"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                </span>
                <span className="ml-2 text-gray-800">
                  {transaction.category?.name} - <FaRupeeSign className="inline mb-1 mr-1" />
                  {transaction.amount.toLocaleString()}
                </span>
                <span className="text-sm text-gray-600 italic ml-2">
                  {transaction.description}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TransactionList;
