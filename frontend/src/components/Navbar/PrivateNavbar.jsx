import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../redux/slice/authSlice";
import { getUserFromStorage } from "../../utils/getUserFromStorage";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PrivateNavbar() {
  const dispatch = useDispatch();
  const user = getUserFromStorage();

  const logoutHandler = () => {
    dispatch(logoutAction());
    localStorage.removeItem("userInfo");
  };

  if (!user) return null;

  return (
    <Disclosure as="nav" className="bg-white shadow-md sticky top-0 z-50">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              {/* Logo */}
              <div className="flex min-w-0 items-center space-x-2">
                <img src="/logo.png" alt="Logo" className="h-10 w-auto sm:h-12" />
                <span className="truncate text-lg font-bold tracking-wide text-teal-600 sm:text-2xl">
                  Expense Tracker
                </span>
              </div>

              {/* Desktop Links */}
              <div className="hidden md:flex md:items-center md:space-x-6">
                <Link
                  to="/"
                  className="text-gray-900 font-medium hover:text-teal-600 transition"
                >
                  Home
                </Link>
                <Link
                  to="/add-transaction"
                  className="text-gray-500 font-medium hover:text-teal-600 transition"
                >
                  Add Transaction
                </Link>
                <Link
                  to="/add-category"
                  className="text-gray-500 font-medium hover:text-teal-600 transition"
                >
                  Add Category
                </Link>
                <Link
                  to="/categories"
                  className="text-gray-500 font-medium hover:text-teal-600 transition"
                >
                  Categories
                </Link>
                <Link
                  to="/profile"
                  className="text-gray-500 font-medium hover:text-teal-600 transition"
                >
                  Profile
                </Link>
                <Link
                  to="/dashboard"
                  className="text-gray-500 font-medium hover:text-teal-600 transition"
                >
                  Dashboard
                </Link>
              </div>

              {/* Right Side */}
              <div className="flex items-center space-x-2">
                {/* Profile Menu */}
                <div className="hidden sm:flex items-center">
                  <Menu as="div" className="relative">
                    <Menu.Button className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-teal-600 text-sm font-bold text-white shadow-md transition duration-200 hover:scale-105 focus:outline-none">
                      {user?.username?.charAt(0)?.toUpperCase() ||
                        user?.email?.charAt(0)?.toUpperCase() ||
                        "U"}
                    </Menu.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95 translate-y-1"
                      enterTo="transform opacity-100 scale-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="transform opacity-100 scale-100 translate-y-0"
                      leaveTo="transform opacity-0 scale-95 translate-y-1"
                    >
                      <Menu.Items className="absolute right-0 mt-3 w-52 overflow-hidden rounded-2xl border border-gray-100 bg-white/95 shadow-xl ring-1 ring-black/5 backdrop-blur-sm z-50">
                        <div className="border-b border-gray-100 bg-gray-50 px-4 py-3">
                          <p className="truncate text-sm font-semibold text-gray-800">
                            {user?.username || "User"}
                          </p>
                          <p className="truncate text-xs text-gray-500">
                            {user?.email}
                          </p>
                        </div>

                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/dashboard"
                              className={classNames(
                                active
                                  ? "bg-teal-50 text-teal-700"
                                  : "text-gray-700",
                                "block px-4 py-3 text-sm font-medium transition"
                              )}
                            >
                              Dashboard
                            </Link>
                          )}
                        </Menu.Item>

                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={logoutHandler}
                              className={classNames(
                                active
                                  ? "bg-red-50 text-red-600"
                                  : "text-gray-700",
                                "block w-full px-4 py-3 text-left text-sm font-medium transition"
                              )}
                            >
                              Sign Out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>

                {/* Mobile Menu Button */}
                <div className="flex md:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-lg p-2 text-gray-500 transition hover:bg-teal-50 hover:text-teal-600 focus:outline-none">
                    {open ? (
                      <XMarkIcon className="h-6 w-6" />
                    ) : (
                      <Bars3Icon className="h-6 w-6" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Panel */}
          <Disclosure.Panel className="border-t border-gray-100 bg-white md:hidden">
            <div className="space-y-2 px-4 py-4">
              <div className="mb-3 rounded-2xl bg-gray-50 px-4 py-3">
                <p className="truncate text-sm font-semibold text-gray-800">
                  {user?.username || "User"}
                </p>
                <p className="truncate text-xs text-gray-500">{user?.email}</p>
              </div>

              <Link
                to="/"
                className="block rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-teal-50 hover:text-teal-600"
              >
                Home
              </Link>

              <Link
                to="/add-transaction"
                className="block rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-teal-50 hover:text-teal-600"
              >
                Add Transaction
              </Link>

              <Link
                to="/add-category"
                className="block rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-teal-50 hover:text-teal-600"
              >
                Add Category
              </Link>

              <Link
                to="/categories"
                className="block rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-teal-50 hover:text-teal-600"
              >
                Categories
              </Link>

              <Link
                to="/profile"
                className="block rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-teal-50 hover:text-teal-600"
              >
                Profile
              </Link>

              <Link
                to="/dashboard"
                className="block rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-teal-50 hover:text-teal-600"
              >
                Dashboard
              </Link>

              <button
                onClick={logoutHandler}
                className="block w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
              >
                Sign Out
              </button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}