import React, { useState } from "react";
import { FaUserCircle, FaEnvelope } from "react-icons/fa";
import { useFormik } from "formik";
import UpdatePassword from "./UpdatePassword";
import { updateProfileAPI } from "../../services/users/userService";
import AlertMessage from "../../../Templates/Alert/AlertMessage";

const UserProfile = () => {
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
    },

    onSubmit: async (values) => {
      setIsPending(true);
      setIsSuccess(false);
      setIsError(false);
      setErrorMsg("");

      try {
        const data = await updateProfileAPI(values);
        console.log(data);
        setIsSuccess(true);
      } catch (err) {
        setIsError(true);
        setErrorMsg(err.response?.data?.message || "Update failed");
      } finally {
        setIsPending(false);
      }
    },
  });

  return (
    <>
      <div className="max-w-4xl mx-auto my-10 p-8 bg-white rounded-lg shadow-md">
        <h1 className="mb-4 text-3xl text-center font-extrabold text-gray-800">
          Welcome!
        </h1>

        <h3 className="text-xl font-semibold text-gray-700 mb-6">Update Profile</h3>

        {isPending && <AlertMessage type="loading" message="Updating..." />}
        {isError && (
          <AlertMessage type="error" message={errorMsg} />
        )}
        {isSuccess && (
          <AlertMessage type="success" message="Updated successfully" />
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="flex items-center space-x-4">
            <FaUserCircle className="text-3xl text-teal-400" />
            <div className="flex-1">
              <label htmlFor="username" className="text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                {...formik.getFieldProps("username")}
                type="text"
                id="username"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                placeholder="Your username"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <FaEnvelope className="text-3xl text-teal-400" />
            <div className="flex-1">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                {...formik.getFieldProps("email")}
                type="email"
                id="email"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                placeholder="Your email"
              />
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
            >
              Confirm Changes
            </button>
          </div>
        </form>
      </div>

      <UpdatePassword />
    </>
  );
};

export default UserProfile;
