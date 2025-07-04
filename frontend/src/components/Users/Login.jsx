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
      const timer = setTimeout(() => navigate("/profile"), 3000);
      return () => clearTimeout(timer);
    }
  }, [status.success, navigate]);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-md mx-auto my-10 bg-white p-8 rounded-2xl shadow-xl border border-gray-200 space-y-6 transition-all"
    >
      <h2 className="text-3xl font-bold text-center text-gray-800 tracking-wide">
        Welcome Back
      </h2>
      {status.loading && <AlertMessage type="loading" message="Logging you in..." />}
      {status.error && <AlertMessage type="error" message={status.error} />}
      {status.success && <AlertMessage type="success" message="Login successful!" />}

      <p className="text-sm text-center text-gray-500 mb-4">
        Sign in to access your dashboard
      </p>
      <div className="relative">
        <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
        <input
          id="email"
          type="email"
          {...formik.getFieldProps("email")}
          placeholder="Email"
          className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 outline-none"
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-xs text-red-500 mt-1">{formik.errors.email}</p>
        )}
      </div>
      <div className="relative">
        <FaLock className="absolute top-3 left-3 text-gray-400" />
        <input
          id="password"
          type="password"
          {...formik.getFieldProps("password")}
          placeholder="Password"
          className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 outline-none"
        />
        {formik.touched.password && formik.errors.password && (
          <p className="text-xs text-red-500 mt-1">{formik.errors.password}</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition-all duration-150 ease-in-out"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
