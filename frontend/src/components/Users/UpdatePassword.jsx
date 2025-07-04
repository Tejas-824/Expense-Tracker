import { useState } from "react";
import { AiOutlineLock } from "react-icons/ai";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { changePasswordAPI } from "../../services/users/userService";
import { logoutAction } from "../../redux/slice/authSlice";
import AlertMessage from "../../../Templates/Alert/AlertMessage";

const validationSchema = Yup.object({
  password: Yup.string()
    .min(5, "Password must be at least 5 characters long")
    .required("Password is required"),
});

const UpdatePassword = () => {
  const dispatch = useDispatch();

  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsPending(true);
      setIsSuccess(false);
      setIsError(false);
      setErrorMsg("");

      try {
        await changePasswordAPI(values.password);
        dispatch(logoutAction());
        localStorage.removeItem("userInfo");
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
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Change Your Password</h2>

      <form onSubmit={formik.handleSubmit} className="w-full max-w-xs">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="new-password">
            New Password
          </label>

          {isPending && <AlertMessage type="loading" message="Updating..." />}
          {isError && <AlertMessage type="error" message={errorMsg} />}
          {isSuccess && <AlertMessage type="success" message="Password updated successfully" />}

          <div className="flex items-center border-2 border-gray-300 py-2 px-3 rounded">
            <AiOutlineLock className="text-teal-500 mr-2 text-xl" />
            <input
              id="new-password"
              type="password"
              {...formik.getFieldProps("password")}
              className="outline-none flex-1 bg-transparent text-gray-700"
              placeholder="Enter new password"
            />
          </div>

          {formik.touched.password && formik.errors.password && (
            <span className="text-xs text-red-500">{formik.errors.password}</span>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-teal-300"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default UpdatePassword;
