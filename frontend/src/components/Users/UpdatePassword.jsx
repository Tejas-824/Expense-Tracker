import { useState } from "react";
import { AiOutlineLock } from "react-icons/ai";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsPending(true);
      setIsSuccess(false);
      setIsError(false);
      setErrorMsg("");

      try {
        await changePasswordAPI(values.password);

        dispatch(logoutAction());
        localStorage.removeItem("token");
        localStorage.removeItem("userInfo");

        setIsSuccess(true);
        resetForm();

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } catch (err) {
        setIsError(true);
        setErrorMsg(err?.response?.data?.message || "Password update failed");
      } finally {
        setIsPending(false);
      }
    },
  });

  return (
    <div>
      {isPending && (
        <AlertMessage type="loading" message="Updating password..." />
      )}
      {isError && <AlertMessage type="error" message={errorMsg} />}
      {isSuccess && (
        <AlertMessage
          type="success"
          message="Password updated successfully. Please login again."
        />
      )}

      <form onSubmit={formik.handleSubmit} className="space-y-5">
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="new-password"
          >
            New Password
          </label>

          <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-100 transition">
            <AiOutlineLock className="text-teal-500 mr-3 text-xl" />
            <input
              id="new-password"
              name="password"
              type="password"
              autoComplete="new-password"
              {...formik.getFieldProps("password")}
              className="w-full outline-none bg-transparent text-gray-700 placeholder:text-gray-400"
              placeholder="Enter new password"
            />
          </div>

          {formik.touched.password && formik.errors.password && (
            <span className="text-xs text-red-500 mt-1 block">
              {formik.errors.password}
            </span>
          )}
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
          {isPending ? "Updating..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default UpdatePassword;