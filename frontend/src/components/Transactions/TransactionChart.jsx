import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { listTransactionsAPI } from "../../services/transactions/transactionService";

ChartJS.register(ArcElement, Tooltip, Legend);

const TransactionChart = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const fetched = await listTransactionsAPI();
        setTransactions(fetched || []);
      } catch (error) {
        console.error("Failed to load transactions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const totals = { income: 0, expense: 0 };
  const incomeCategories = {};
  const expenseCategories = {};

  transactions?.forEach((t) => {
    const amount = Number(t.amount) || 0;
    const category = t.category || "Other";

    if (t.type === "income") {
      totals.income += amount;
      incomeCategories[category] = (incomeCategories[category] || 0) + amount;
    } else if (t.type === "expense") {
      totals.expense += amount;
      expenseCategories[category] = (expenseCategories[category] || 0) + amount;
    }
  });

  const totalAmount = totals.income + totals.expense;

  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Transactions",
        data: [totals.income, totals.expense],
        backgroundColor: ["#14b8a6", "#f87171"],
        borderColor: "#ffffff",
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: {
            size: 13,
          },
          padding: 18,
          boxWidth: 14,
          color: "#374151",
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const index = tooltipItem.dataIndex;
            const isIncome = index === 0;
            const categories = isIncome ? incomeCategories : expenseCategories;

            const details = Object.entries(categories)
              .map(([name, value]) => `${name}: ₹${value}`)
              .join(", ");

            const label = isIncome ? "Income" : "Expense";
            const total = tooltipItem.raw;

            return `${label}: ₹${total}${details ? ` | ${details}` : ""}`;
          },
        },
      },
    },
    cutout: "68%",
  };

  if (isLoading) {
    return (
      <div className="my-8 max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-center text-teal-600 mb-4">
          Transaction Overview
        </h2>
        <p className="text-center text-gray-500">Loading chart...</p>
      </div>
    );
  }

  if (!transactions.length) {
    return (
      <div className="my-8 max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-center text-teal-600 mb-3">
          Transaction Overview
        </h2>
        <p className="text-center text-gray-500">
          No transactions available to show in the chart.
        </p>
      </div>
    );
  }

  return (
    <div className="my-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-teal-600">
            Transaction Overview
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            A simple overview of your income and expenses.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-teal-50 rounded-2xl p-4 text-center border border-teal-100">
            <p className="text-sm text-gray-500">Income</p>
            <h3 className="text-xl font-bold text-teal-600">₹{totals.income}</h3>
          </div>

          <div className="bg-red-50 rounded-2xl p-4 text-center border border-red-100">
            <p className="text-sm text-gray-500">Expense</p>
            <h3 className="text-xl font-bold text-red-500">₹{totals.expense}</h3>
          </div>

          <div className="bg-gray-50 rounded-2xl p-4 text-center border border-gray-200">
            <p className="text-sm text-gray-500">Total</p>
            <h3 className="text-xl font-bold text-gray-800">₹{totalAmount}</h3>
          </div>
        </div>

        <div className="h-[350px] bg-gray-50 rounded-2xl border border-gray-100 p-4">
          <Doughnut data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default TransactionChart;