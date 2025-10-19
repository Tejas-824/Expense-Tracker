import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { listTransactionsAPI } from "../../services/transactions/transactionService";

ChartJS.register(ArcElement, Tooltip, Legend);

const TransactionChart = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const fetched = await listTransactionsAPI();
        setTransactions(fetched || []);
      } catch (error) {
        console.error("Failed to load transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  const totals = { income: 0, expense: 0 };
  const incomeCategories = {};
  const expenseCategories = {};

  transactions?.forEach((t) => {
    const amount = t.amount;
    const category = t.category || "Other";

    if (t.type === "income") {
      totals.income += amount;
      incomeCategories[category] = (incomeCategories[category] || 0) + amount;
    } else {
      totals.expense += amount;
      expenseCategories[category] = (expenseCategories[category] || 0) + amount;
    }
  });

  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Transactions",
        data: [totals.income, totals.expense],
        backgroundColor: ["#2E8B57", "#C0392B"], // ✅ ORIGINAL COLORS
        borderColor: "#ffffff",
        borderWidth: 1,
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
            size: 14,
          },
          padding: 20,
          boxWidth: 12,
        },
      },
      title: {
        display: true,
        text: "Income vs Expense",
        font: {
          size: 18,
          weight: "bold",
        },
        padding: {
          top: 10,
          bottom: 30,
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

            return `${label} (₹${total}) → ${details}`;
          },
        },
      },
    },
    cutout: "70%",
  };

  return (
    <div className="my-8 p-6 bg-white rounded-xl shadow-md border border-gray-200 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
        Transaction Overview
      </h1>
      <div style={{ height: "350px" }}>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default TransactionChart;
