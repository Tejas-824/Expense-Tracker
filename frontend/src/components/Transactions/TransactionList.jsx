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

  // Fetch categories
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

  // Fetch transactions based on filters
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
    <div className="my-6 p-4 md:p-6 rounded-2xl shadow-xl bg-white max-w-7xl mx-auto">
      {/* Filters */}
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-700 mb-3">Filter by Date Range</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
            className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition"
          />
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
            className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition"
          />
          <div className="relative">
            <select
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 appearance-none transition"
            >
              <option value="">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <ChevronDownIcon className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative">
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 appearance-none transition"
            >
              <option value="">All Categories</option>
              {categoriesData?.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="mt-6 bg-gray-50 p-4 md:p-6 rounded-2xl shadow-inner">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Filtered Transactions</h3>
        <ul className="space-y-3">
          {transactions?.length > 0 ? (
            transactions.map((transaction) => (
              <li
                key={transaction._id}
                className="bg-white p-4 md:p-5 rounded-xl shadow border border-gray-200 flex flex-col md:flex-row md:justify-between md:items-center transition hover:shadow-lg"
              >
                <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                  <span className="font-medium text-gray-600">
                    {new Date(transaction.date).toLocaleDateString()}
                  </span>
                  <span
                    className={`mt-2 md:mt-0 inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      transaction.type === "income"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                  </span>
                  <span className="mt-2 md:mt-0 text-gray-800">
                    {transaction.category?.name} -{" "}
                    <FaRupeeSign className="inline mb-1 mr-1" />
                    {transaction.amount.toLocaleString()}
                  </span>
                </div>
                {transaction.description && (
                  <span className="mt-2 md:mt-0 text-gray-500 italic text-sm">
                    {transaction.description}
                  </span>
                )}
              </li>
            ))
          ) : (
            <p className="text-gray-500 italic">No transactions found for selected filters.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TransactionList;
