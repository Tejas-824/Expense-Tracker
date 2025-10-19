import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";

import { loginAPI } from "../../services/users/userService";
import AlertMessage from "../Alert/AlertMessage";
import { loginAction } from "../../redux/slice/authSlice";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters long")
    .required("Password is required"),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: "",
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setStatus({ loading: true, success: false, error: "" });
      try {
        const data = await loginAPI(values);
        dispatch(loginAction(data));
        localStorage.setItem("userInfo", JSON.stringify(data));
        setStatus({ loading: false, success: true, error: "" });
      } catch (error) {
        setStatus({
          loading: false,
          success: false,
          error: error?.response?.data?.message || "Login failed",
        });
      }
    },
  });

  useEffect(() => {
    if (status.success) {
      const timer = setTimeout(() => navigate("/profile"), 2000);
      return () => clearTimeout(timer);
    }
  }, [status.success, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-teal-50 flex items-center justify-center p-4">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl border border-gray-200 space-y-6 transition-all duration-300 hover:scale-[1.01]"
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-800 tracking-tight">
          Welcome Back
        </h2>

        {status.loading && <AlertMessage type="loading" message="Logging you in..." />}
        {status.error && <AlertMessage type="error" message={status.error} />}
        {status.success && <AlertMessage type="success" message="Login successful!" />}

        <p className="text-sm text-center text-gray-500 mb-4">
          Sign in to access your dashboard
        </p>

        {/* Email */}
        <div className="relative">
          <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
          <input
            id="email"
            type="email"
            {...formik.getFieldProps("email")}
            placeholder="Email"
            className="pl-10 pr-4 py-2 w-full rounded-xl border border-gray-300 text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-150 appearance-none caret-teal-600"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-xs text-red-500 mt-1">{formik.errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="relative">
          <FaLock className="absolute top-3 left-3 text-gray-400" />
          <input
            id="password"
            type="password"
            {...formik.getFieldProps("password")}
            placeholder="Password"
            className="pl-10 pr-4 py-2 w-full rounded-xl border border-gray-300 text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-150 appearance-none caret-teal-600"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-xs text-red-500 mt-1">{formik.errors.password}</p>
          )}
        </div>

        {/* Login Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50 transition-transform duration-150 ease-in-out hover:scale-105"
          >
            {status.loading ? "Logging In..." : "Login"}
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-2">
          Don't have an account?{" "}
          <a href="/register" className="text-teal-500 hover:underline font-semibold">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
