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
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="md:flex">
          {/* Left Section */}
          <div className="md:w-1/2 bg-teal-50 p-8 flex flex-col justify-center items-center space-y-6">
            <FaUserCircle className="text-6xl text-teal-400" />
            <h2 className="text-2xl font-extrabold text-teal-700 text-center">Welcome!</h2>
            <p className="text-gray-600 text-center">
              Update your profile details below.
            </p>
          </div>

          {/* Right Section */}
          <div className="md:w-1/2 p-8">
            {isPending && <AlertMessage type="loading" message="Updating..." />}
            {isError && <AlertMessage type="error" message={errorMsg} />}
            {isSuccess && <AlertMessage type="success" message="Updated successfully" />}

            <form onSubmit={formik.handleSubmit} className="space-y-6">
              {/* Username */}
              <div className="flex items-center space-x-4">
                <FaUserCircle className="text-3xl text-teal-400 flex-shrink-0" />
                <div className="flex-1">
                  <label htmlFor="username" className="text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    {...formik.getFieldProps("username")}
                    type="text"
                    id="username"
                    placeholder="Your username"
                    className="mt-1 block w-full border border-gray-300 rounded-xl shadow-sm py-2 px-4 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-4">
                <FaEnvelope className="text-3xl text-teal-400 flex-shrink-0" />
                <div className="flex-1">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    {...formik.getFieldProps("email")}
                    type="email"
                    id="email"
                    placeholder="Your email"
                    className="mt-1 block w-full border border-gray-300 rounded-xl shadow-sm py-2 px-4 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition"
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="flex justify-center mt-4">
  <button
    type="submit"
    className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50 transition"
  >
    Confirm Changes
  </button>
</div>

            </form>
          </div>
        </div>
      </div>

      {/* Update Password */}
      <div className="mt-8 max-w-4xl mx-auto">
        <UpdatePassword />
      </div>
    </div>
  );
};

export default UserProfile;
