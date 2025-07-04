import { FaMoneyBillWave, FaRegCalendarAlt, FaSignInAlt, FaList, FaChartPie, FaQuoteLeft } from "react-icons/fa";
import { IoIosStats } from "react-icons/io";
import { FaFilter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <>
      <div className="bg-gradient-to-r from-indigo-400 to-purple-500 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <h1 className="text-5xl font-bold text-center">
            Handle your expenses, stress-free.
          </h1>
          <p className="mt-4 text-xl text-center">
            A Smarter Way to Manage Your Money
          </p>

          <div className="flex space-x-8 mt-10">
            <div className="flex flex-col items-center">
              <FaMoneyBillWave className="text-3xl" />
              <p className="mt-2">Smart Expense Tracking</p>
            </div>
            <div className="flex flex-col items-center">
              <FaFilter className="text-3xl" />
              <p className="mt-2">Easy Filters for Your Spends</p>
            </div>
            <div className="flex flex-col items-center">
              <IoIosStats className="text-3xl" />
              <p className="mt-2">Clear & Simple Insights</p>
            </div>
            <div className="flex flex-col items-center">
              <FaRegCalendarAlt className="text-3xl" />
              <p className="mt-2">Track Your Spending Over Time</p>
            </div>
            <div className="flex flex-col items-center">
              <FaQuoteLeft className="text-3xl" />
              <p className="mt-2">Quotes & Budgeting Tips</p>
            </div>
          </div>

          <Link to="/register">
            <button className="mt-8 px-6 py-3 bg-white text-pink-500 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition duration-300">
              Get Started
            </button>
          </Link>
        </div>
      </div>
      <div className="py-20 px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Understand the Process
        </h2>
        <div className="mt-10 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="p-4 rounded-full bg-teal-400 text-white mb-4">
              <FaSignInAlt className="text-xl" />
            </div>
            <h3 className="mb-2 font-semibold">Create Your Account</h3>
            <p>Just sign up and you’re ready to track your spending smartly.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="p-4 rounded-full bg-yellow-400 text-white mb-4">
              <FaList className="text-xl" />
            </div>
            <h3 className="mb-2 font-semibold">Add Transactions</h3>
            <p>Note down your income & expenses — it’s super quick and easy!</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="p-4 rounded-full bg-blue-400 text-white mb-4">
              <FaChartPie className="text-xl" />
            </div>
            <h3 className="mb-2 font-semibold">See Your Savings</h3>
            <p>Track your spending with easy-to-understand visuals.</p>
          </div>
        </div>
      </div>

      <div className="bg-purple-500 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold">
            Take Charge of Your Money, One Step at a Time
          </h2>
          <p className="mt-4">
            Start your journey to smarter spending and better savings today — it's simple, free, and made just for you.
          </p>
          <Link to="/register">
            <button className="mt-8 px-6 py-3 bg-white text-purple-500 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition duration-300">
              Join Now – It’s Free!
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
