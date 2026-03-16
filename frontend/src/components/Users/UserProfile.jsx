import React, { useState } from "react";
import { FaUserCircle, FaEnvelope, FaUser } from "react-icons/fa";
import { useFormik } from "formik";
import UpdatePassword from "./UpdatePassword";
import { updateProfileAPI } from "../../services/users/userService";
import AlertMessage from "../../../Templates/Alert/AlertMessage";
import { getUserFromStorage } from "../../utils/getUserFromStorage";

const UserProfile = () => {
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const user = getUserFromStorage();

  const formik = useFormik({
    initialValues: {
      email: user?.email || "",
      username: user?.username || "",
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      setIsPending(true);
      setIsSuccess(false);
      setIsError(false);
      setErrorMsg("");

      try {
        await updateProfileAPI(values);

        const updatedUser = {
          ...user,
          username: values.username,
          email: values.email,
        };

        localStorage.setItem("userInfo", JSON.stringify(updatedUser));
        setIsSuccess(true);
      } catch (err) {
        setIsError(true);
        setErrorMsg(err.response?.data?.message || "Profile update failed");
      } finally {
        setIsPending(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-3xl shadow-lg p-8 text-white mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <FaUserCircle className="text-6xl opacity-95" />
            <div>
              <h1 className="text-3xl font-bold">
                Welcome, {user?.username || "User"}!
              </h1>
              <p className="text-teal-50 mt-1">
                Manage your profile information and password from here.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl shadow-xl p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Profile Information
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Update your username and email.
              </p>
            </div>

            {isPending && <AlertMessage type="loading" message="Saving profile..." />}
            {isError && <AlertMessage type="error" message={errorMsg} />}
            {isSuccess && (
              <AlertMessage type="success" message="Profile updated successfully" />
            )}

            <form onSubmit={formik.handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Username
                </label>
                <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-100 transition">
                  <FaUser className="text-teal-500 mr-3" />
                  <input
                    {...formik.getFieldProps("username")}
                    type="text"
                    id="username"
                    placeholder="Enter your username"
                    className="w-full outline-none bg-transparent text-gray-700 placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </label>
                <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-100 transition">
                  <FaEnvelope className="text-teal-500 mr-3" />
                  <input
                    {...formik.getFieldProps("email")}
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    className="w-full outline-none bg-transparent text-gray-700 placeholder:text-gray-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className={`w-full py-3 rounded-xl font-semibold text-white transition ${
                  isPending
                    ? "bg-teal-300 cursor-not-allowed"
                    : "bg-teal-500 hover:bg-teal-600"
                }`}
              >
                {isPending ? "Saving..." : "Save Profile"}
              </button>
            </form>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Change Password</h2>
              <p className="text-sm text-gray-500 mt-1">
                Keep your account secure by updating your password.
              </p>
            </div>

            <UpdatePassword />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;