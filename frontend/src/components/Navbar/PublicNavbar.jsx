import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { FaRegUser } from "react-icons/fa";
import { RiLoginCircleLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { getUserFromStorage } from "../../utils/getUserFromStorage";

export default function PublicNavbar() {
  const user = getUserFromStorage();

  if (user) return null;

  return (
    <Disclosure as="nav" className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between items-center">

              {/* Left section */}
              <div className="flex items-center space-x-4">

                <div className="flex md:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-lg text-gray-500 hover:text-teal-600 hover:bg-gray-100 transition">
                    {open ? (
                      <XMarkIcon className="h-6 w-6" />
                    ) : (
                      <Bars3Icon className="h-6 w-6" />
                    )}
                  </Disclosure.Button>
                </div>

                <div className="flex items-center space-x-2">
                  <img
                    className="h-11 w-auto object-contain"
                    src="/logo.png"
                    alt="ExpenseTracker Logo"
                  />
                  <span className="text-xl sm:text-2xl font-bold text-teal-600 tracking-wide hidden sm:block">
                    Expense Tracker
                  </span>
                </div>

              </div>

              {/* Right section */}
              <div className="flex items-center space-x-3">

                <Link
                  to="/register"
                  className="inline-flex items-center gap-x-2 rounded-lg bg-blue-600 hover:bg-blue-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition"
                >
                  <FaRegUser className="h-4 w-4" />
                  Register
                </Link>

                <Link
                  to="/login"
                  className="inline-flex items-center gap-x-2 rounded-lg bg-green-600 hover:bg-green-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition"
                >
                  <RiLoginCircleLine className="h-5 w-5" />
                  Login
                </Link>

              </div>

            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}