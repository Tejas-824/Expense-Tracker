import { FaUserCircle, FaEnvelope } from "react-icons/fa";
import { useFormik } from "formik";
import UpdatePassword from "./UpdatePassword";

const UserProfile = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <>
      <div className="max-w-4xl mx-auto my-10 p-8 bg-white rounded-lg shadow-xl border border-gray-200">
        <h1 className="mb-2 text-2xl text-center font-extrabold text-gray-800">
          Welcome <span className="text-gray-500 text-sm ml-2">ExpenseTracker</span>
        </h1>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Update Profile
        </h3>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="flex items-center space-x-4">
            <FaUserCircle className="text-4xl text-indigo-600" />
            <div className="flex-1">
              <label
                htmlFor="username"
                className="text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                {...formik.getFieldProps("username")}
                type="text"
                id="username"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Your username"
              />
            </div>
            {formik.touched.username && formik.errors.username && (
              <span className="text-xs text-red-500">
                {formik.errors.username}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <FaEnvelope className="text-4xl text-indigo-600" />
            <div className="flex-1">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...formik.getFieldProps("email")}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Your email"
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <span className="text-xs text-red-500">
                {formik.errors.email}
              </span>
            )}
          </div>
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
      <UpdatePassword />
    </>
  );
};

export default UserProfile;
