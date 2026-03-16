import { useState, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import {
  FaRupeeSign,
  FaFilter,
  FaCalendarAlt,
  FaLayerGroup,
} from "react-icons/fa";

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
    <div className="my-8 px-4">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-teal-600">
            Transaction History
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            View your transactions and filter them by date, type, and category.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 bg-gray-50 border border-gray-100 rounded-2xl p-4 md:p-6">
          <div className="flex items-center gap-2 mb-4">
            <FaFilter className="text-teal-500" />
            <h3 className="text-lg font-semibold text-gray-800">
              Filter Transactions
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <FaCalendarAlt className="text-teal-500" />
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={filters.startDate}
                onChange={handleFilterChange}
                className="w-full p-3 rounded-xl border border-gray-300 bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <FaCalendarAlt className="text-teal-500" />
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={filters.endDate}
                onChange={handleFilterChange}
                className="w-full p-3 rounded-xl border border-gray-300 bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition"
              />
            </div>

            <div className="relative">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <FaFilter className="text-teal-500" />
                Transaction Type
              </label>
              <select
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="w-full p-3 rounded-xl border border-gray-300 bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-100 appearance-none outline-none transition"
              >
                <option value="">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
              <ChevronDownIcon className="w-5 h-5 absolute right-3 top-[46px] text-gray-400 pointer-events-none" />
            </div>

            <div className="relative">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <FaLayerGroup className="text-teal-500" />
                Category
              </label>
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="w-full p-3 rounded-xl border border-gray-300 bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-100 appearance-none outline-none transition"
              >
                <option value="">All Categories</option>
                {categoriesData?.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="w-5 h-5 absolute right-3 top-[46px] text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="bg-gray-50 p-4 md:p-6 rounded-2xl border border-gray-100">
          <h3 className="text-xl font-bold mb-5 text-gray-800">
            Filtered Transactions
          </h3>

          <ul className="space-y-4">
            {transactions?.length > 0 ? (
              transactions.map((transaction) => (
                <li
                  key={transaction._id}
                  className="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 hover:shadow-md transition"
                >
                  <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-4">
                    <span className="font-medium text-gray-500 text-sm">
                      {new Date(transaction.date).toLocaleDateString()}
                    </span>

                    <span
                      className={`inline-flex w-fit px-3 py-1 rounded-full text-xs font-semibold ${
                        transaction.type === "income"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {transaction.type.charAt(0).toUpperCase() +
                        transaction.type.slice(1)}
                    </span>

                    <span className="text-gray-800 font-medium">
                      {transaction.category} -{" "}
                      <FaRupeeSign className="inline mb-1 mr-1" />
                      {Number(transaction.amount).toLocaleString()}
                    </span>
                  </div>

                  {transaction.description && (
                    <span className="text-sm text-gray-500 italic">
                      {transaction.description}
                    </span>
                  )}
                </li>
              ))
            ) : (
              <p className="text-gray-500 italic">
                No transactions found for the selected filters.
              </p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TransactionList;