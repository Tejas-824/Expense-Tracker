import { FaMoneyBillWave, FaRegCalendarAlt, FaSignInAlt, FaList, FaChartPie, FaQuoteLeft } from "react-icons/fa";
import { IoIosStats } from "react-icons/io";
import { FaFilter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const features = [
  { icon: <FaMoneyBillWave />, text: "Smart Expense Tracking", bg: "bg-gradient-to-r from-pink-400 to-red-400" },
  { icon: <FaFilter />, text: "Easy Filters for Your Spends", bg: "bg-gradient-to-r from-green-400 to-teal-400" },
  { icon: <IoIosStats />, text: "Clear & Simple Insights", bg: "bg-gradient-to-r from-yellow-400 to-orange-400" },
  { icon: <FaRegCalendarAlt />, text: "Track Spending Over Time", bg: "bg-gradient-to-r from-purple-400 to-indigo-400" },
  { icon: <FaQuoteLeft />, text: "Quotes & Budgeting Tips", bg: "bg-gradient-to-r from-blue-400 to-cyan-400" },
];

const processSteps = [
  { icon: <FaSignInAlt />, title: "Create Your Account", desc: "Sign up quickly and start tracking your spending." },
  { icon: <FaList />, title: "Add Transactions", desc: "Add income & expenses easily and fast." },
  { icon: <FaChartPie />, title: "See Your Savings", desc: "Visualize your spending with beautiful charts." },
];

const HeroSection = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-24 px-6 overflow-hidden">
        <div className="relative max-w-7xl mx-auto flex flex-col items-center text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold drop-shadow-lg">
            Handle your expenses, stress-free.
          </h1>
          <p className="mt-4 text-lg sm:text-xl md:text-2xl">
            A smarter way to manage your money
          </p>

          {/* Features Section */}
          <div className="mt-12 max-w-7xl mx-auto w-full">
            {/* Mobile: horizontal scroll */}
            <div className="flex sm:hidden gap-6 overflow-x-auto py-4 px-2 scrollbar-hide">
              {features.map((feat, idx) => (
                <div
                  key={idx}
                  className={`flex-shrink-0 w-56 p-5 rounded-xl shadow-lg transform transition hover:-translate-y-2 hover:shadow-2xl ${feat.bg} flex flex-col items-center text-center text-white cursor-pointer`}
                >
                  <div className="p-4 rounded-full bg-white/20 mb-3 text-3xl">{feat.icon}</div>
                  <p className="text-sm font-semibold">{feat.text}</p>
                </div>
              ))}
            </div>

            {/* Tablet & Desktop: grid */}
            <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-5 gap-6">
              {features.map((feat, idx) => (
                <div
                  key={idx}
                  className={`p-5 rounded-xl shadow-lg transform transition hover:-translate-y-2 hover:shadow-2xl ${feat.bg} flex flex-col items-center text-center text-white cursor-pointer`}
                >
                  <div className="p-4 rounded-full bg-white/20 mb-3 text-4xl">{feat.icon}</div>
                  <p className="text-base font-semibold">{feat.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <Link to="/register">
            <button className="mt-10 px-8 py-3 bg-gradient-to-r from-pink-500 to-red-500 hover:from-red-500 hover:to-pink-500 rounded-full text-white font-bold shadow-lg transform transition hover:scale-105">
              Get Started
            </button>
          </Link>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 bg-gray-50">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">
          How It Works
        </h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {processSteps.map((step, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl shadow-lg bg-white transform transition hover:-translate-y-2 hover:shadow-2xl text-center"
            >
              <div className="p-5 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white inline-flex items-center justify-center mb-4 text-3xl">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-r from-purple-600 to-pink-500 text-white py-24 px-6 text-center">
        <div className="relative max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Take Charge of Your Money, One Step at a Time
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-8">
            Start your journey to smarter spending and better savings today — it's simple, free, and made just for you.
          </p>
          <Link to="/register">
            <button className="px-8 py-3 bg-white text-purple-600 font-bold rounded-full shadow-lg transform transition hover:scale-105 hover:bg-gray-100">
              Join Now – It’s Free!
            </button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
