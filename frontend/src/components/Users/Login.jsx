import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
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
        localStorage.setItem("token", data?.token);
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-teal-50 flex items-center justify-center p-4">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-md bg-white/95 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-gray-200 space-y-6 transition-all duration-300"
      >
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">
            Welcome Back
          </h2>
          <p className="text-sm text-center text-gray-500">
            Sign in to continue to your expense dashboard
          </p>
        </div>

        {status.loading && (
          <AlertMessage type="loading" message="Logging you in..." />
        )}
        {status.error && (
          <AlertMessage type="error" message={status.error} />
        )}
        {status.success && (
          <AlertMessage type="success" message="Login successful!" />
        )}

        {/* Email */}
        <div className="relative">
          <FaEnvelope className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
          <input
            id="email"
            type="email"
            {...formik.getFieldProps("email")}
            placeholder="Enter your email"
            className="pl-11 pr-4 py-3 w-full rounded-xl border border-gray-300 bg-white text-base text-gray-700 placeholder:text-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none transition duration-150 caret-teal-600"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-xs text-red-500 mt-1 ml-1">{formik.errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="relative">
          <FaLock className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
          <input
            id="password"
            type="password"
            {...formik.getFieldProps("password")}
            placeholder="Enter your password"
            className="pl-11 pr-4 py-3 w-full rounded-xl border border-gray-300 bg-white text-base text-gray-700 placeholder:text-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none transition duration-150 caret-teal-600"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-xs text-red-500 mt-1 ml-1">{formik.errors.password}</p>
          )}
        </div>

        {/* Login Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={status.loading}
            className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-300 transition-all duration-200"
          >
            {status.loading ? "Logging In..." : "Login"}
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-2">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="text-teal-600 hover:text-teal-700 hover:underline font-semibold transition"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;