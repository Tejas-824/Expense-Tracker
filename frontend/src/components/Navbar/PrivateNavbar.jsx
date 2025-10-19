import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IoLogOutOutline } from "react-icons/io5";
import { logoutAction } from "../../redux/slice/authSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PrivateNavbar() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutAction());
    localStorage.removeItem("userInfo");
  };

  return (
    <Disclosure as="nav" className="bg-white shadow-md">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between items-center">
              {/* Logo + App Name */}
              <div className="flex items-center space-x-2">
                <img src="/logo.png" alt="Logo" className="h-12 w-auto" />
                <span className="text-2xl font-bold text-teal-600 tracking-wide">
                  Expense Tracker
                </span>
              </div>

              {/* Desktop Menu */}
              <div className="hidden md:flex md:space-x-6">
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
              <div className="flex items-center space-x-3">
                <button
                  onClick={logoutHandler}
                  className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg shadow-md text-sm font-semibold transition"
                >
                  <IoLogOutOutline className="w-5 h-5" />
                  Logout
                </button>

                {/* User Menu */}
                <Menu as="div" className="relative">
                  <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
                    <span className="sr-only">Open user menu</span>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/dashboard"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
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
                              active ? "bg-gray-100" : "",
                              "block w-full text-left px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>

              {/* Mobile Menu Button */}
              <div className="-mr-2 flex md:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <Disclosure.Panel as="div" className="md:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-teal-600">
                Home
              </Link>
              <Link to="/add-transaction" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-teal-600">
                Add Transaction
              </Link>
              <Link to="/add-category" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-teal-600">
                Add Category
              </Link>
              <Link to="/categories" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-teal-600">
                Categories
              </Link>
              <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-teal-600">
                Profile
              </Link>
              <Link to="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-teal-600">
                Dashboard
              </Link>
              <button
                onClick={logoutHandler}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-gray-50 hover:text-red-800"
              >
                Sign out
              </button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
