import { useState, useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

const FilterSection = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("/api/transactions"); 
        const data = await response.json();
        setTransactions(data);
      } catch (err) {
        setError("Failed to load transactions");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []); 

  const handleUpdateTransaction = (id) => {
    console.log("Update transaction with id:", id);
  };

  const handleDelete = (id) => {
    console.log("Delete transaction with id:", id);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="my-4 p-4 shadow-lg rounded-lg bg-white">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <input
          type="date"
          name="startDate"
          className="p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
        <input
          type="date"
          name="endDate"
          className="p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
        <div className="relative">
          <select
            name="type"
            className="w-full p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 appearance-none"
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
            className="w-full p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 appearance-none"
          >
            <option value="">Select Category</option>
          </select>
          <ChevronDownIcon className="w-5 h-5 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>
      <div className="my-4 p-4 shadow-lg rounded-lg bg-white">

        <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-inner">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Filtered Transactions</h3>
          <ul className="list-disc pl-5 space-y-2">
            {transactions.map((transaction) => (
              <li
                key={transaction.id}
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
                    {transaction.type.charAt(0).toUpperCase() +
                      transaction.type.slice(1)}
                  </span>
                  <span className="ml-2 text-gray-800">
                    {transaction.category?.name} - $
                    {transaction.amount.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-600 italic ml-2">
                    {transaction.description}
                  </span>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleUpdateTransaction(transaction.id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(transaction.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
