import { Fragment } from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { FaRegUser } from "react-icons/fa";
import { RiLoginCircleLine } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function PublicNavbar() {
  return (
    <Disclosure as="nav" className="bg-white shadow-md sticky top-0 z-50">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between items-center">
              {/* Left side: mobile menu button + logo + name */}
              <div className="flex items-center space-x-4">
                {/* Mobile menu button */}
                <div className="flex md:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500 transition">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>

                {/* Logo + App Name */}
                <div className="flex items-center space-x-2">
                  <img
                    className="h-12 w-auto"
                    src="/logo.png"
                    alt="ExpenseTracker Logo"
                  />
                  <span className="text-2xl font-bold text-teal-600 tracking-wide hidden sm:block">
                    Expense Tracker
                  </span>
                </div>
              </div>

              {/* Right side: Register & Login */}
              <div className="flex items-center space-x-2">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-x-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition"
                >
                  <FaRegUser className="h-5 w-5" />
                  Register
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-x-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-green-700 transition animate-bounce"
                >
                  <RiLoginCircleLine className="h-5 w-5" />
                  Login
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <Disclosure.Panel as={Fragment}>
            <div className="space-y-1 pb-3 pt-2 md:hidden bg-gray-50">
              <Link
                to="/"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-indigo-500 hover:bg-white hover:text-indigo-600 transition"
              >
                Expense Tracker
              </Link>
              <Link
                to="/register"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-blue-600 hover:bg-white hover:text-blue-600 transition"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-green-600 hover:bg-white hover:text-green-600 transition"
              >
                Login
              </Link>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
