import { Fragment } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
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
    <Disclosure as="nav" className="sticky top-0 z-50 bg-white shadow-md">
      {({ open, close }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              {/* Logo */}
              <div className="flex min-w-0 items-center gap-2">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="h-10 w-auto sm:h-12"
                />
                <span className="truncate text-lg font-bold tracking-wide text-teal-600 sm:text-2xl">
                  Expense Tracker
                </span>
              </div>

              {/* Desktop Links */}
              <div className="hidden md:flex md:items-center md:space-x-6">
                <Link
                  to="/"
                  className="font-medium text-gray-900 transition hover:text-teal-600"
                >
                  Home
                </Link>
                <Link
                  to="/add-transaction"
                  className="font-medium text-gray-500 transition hover:text-teal-600"
                >
                  Add Transaction
                </Link>
                <Link
                  to="/add-category"
                  className="font-medium text-gray-500 transition hover:text-teal-600"
                >
                  Add Category
                </Link>
                <Link
                  to="/categories"
                  className="font-medium text-gray-500 transition hover:text-teal-600"
                >
                  Categories
                </Link>
                <Link
                  to="/profile"
                  className="font-medium text-gray-500 transition hover:text-teal-600"
                >
                  Profile
                </Link>
                <Link
                  to="/dashboard"
                  className="font-medium text-gray-500 transition hover:text-teal-600"
                >
                  Dashboard
                </Link>
              </div>

              {/* Right side */}
              <div className="flex items-center gap-2">
                {/* Desktop Profile Menu */}
                <div className="hidden sm:block">
                  <Menu as="div" className="relative">
                    <MenuButton className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-teal-600 text-sm font-bold text-white shadow-md transition hover:scale-105 focus:outline-none">
                      {user?.username?.charAt(0)?.toUpperCase() ||
                        user?.email?.charAt(0)?.toUpperCase() ||
                        "U"}
                    </MenuButton>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-150"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <MenuItems className="absolute right-0 z-50 mt-3 w-48 rounded-xl border border-gray-100 bg-white shadow-lg focus:outline-none">
                        <div className="border-b border-gray-100 px-4 py-3">
                          <p className="text-sm font-semibold text-gray-800">
                            {user?.username || "User"}
                          </p>
                          <p className="truncate text-xs text-gray-500">
                            {user?.email}
                          </p>
                        </div>

                        <MenuItem>
                          {({ focus }) => (
                            <Link
                              to="/dashboard"
                              className={classNames(
                                focus
                                  ? "bg-teal-50 text-teal-600"
                                  : "text-gray-700",
                                "block px-4 py-3 text-sm"
                              )}
                            >
                              Dashboard
                            </Link>
                          )}
                        </MenuItem>

                        <MenuItem>
                          {({ focus }) => (
                            <button
                              onClick={logoutHandler}
                              className={classNames(
                                focus
                                  ? "bg-red-50 text-red-600"
                                  : "text-gray-700",
                                "block w-full px-4 py-3 text-left text-sm"
                              )}
                            >
                              Sign Out
                            </button>
                          )}
                        </MenuItem>
                      </MenuItems>
                    </Transition>
                  </Menu>
                </div>

                {/* Mobile Hamburger */}
                <div className="md:hidden">
                  <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 transition hover:bg-gray-100 hover:text-teal-600 focus:outline-none">
                    {open ? (
                      <XMarkIcon className="h-6 w-6" />
                    ) : (
                      <Bars3Icon className="h-6 w-6" />
                    )}
                  </DisclosureButton>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <DisclosurePanel className="border-t border-gray-100 bg-white md:hidden">
            <div className="space-y-2 px-4 py-4">
              <div className="mb-3 rounded-2xl bg-gray-50 px-4 py-3">
                <p className="truncate text-sm font-semibold text-gray-800">
                  {user?.username || "User"}
                </p>
                <p className="truncate text-xs text-gray-500">{user?.email}</p>
              </div>

              <Link
                to="/"
                onClick={() => close()}
                className="block rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-teal-50 hover:text-teal-600"
              >
                Home
              </Link>

              <Link
                to="/add-transaction"
                onClick={() => close()}
                className="block rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-teal-50 hover:text-teal-600"
              >
                Add Transaction
              </Link>

              <Link
                to="/add-category"
                onClick={() => close()}
                className="block rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-teal-50 hover:text-teal-600"
              >
                Add Category
              </Link>

              <Link
                to="/categories"
                onClick={() => close()}
                className="block rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-teal-50 hover:text-teal-600"
              >
                Categories
              </Link>

              <Link
                to="/profile"
                onClick={() => close()}
                className="block rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-teal-50 hover:text-teal-600"
              >
                Profile
              </Link>

              <Link
                to="/dashboard"
                onClick={() => close()}
                className="block rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-teal-50 hover:text-teal-600"
              >
                Dashboard
              </Link>

              <button
                onClick={() => {
                  close();
                  logoutHandler();
                }}
                className="block w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
              >
                Sign Out
              </button>
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}