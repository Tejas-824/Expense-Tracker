import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { registerAPI } from "../../services/users/userService";
import AlertMessage from "../Alert/AlertMessage";

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirming your password is required"),
});

const RegistrationForm = () => {
  const navigate = useNavigate();

  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsPending(true);
      setIsError(false);
      setIsSuccess(false);

      try {
        const { confirmPassword, ...userData } = values;
        await registerAPI(userData);
        setIsSuccess(true);
        formik.resetForm();
      } catch (error) {
        setIsError(true);
        setErrorMsg(error?.response?.data?.message || "Something went wrong");
      } finally {
        setIsPending(false);
      }
    },
  });

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => navigate("/login"), 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-teal-50 flex items-center justify-center p-4">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-md bg-white/95 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-gray-200 space-y-6 transition-all duration-300"
      >
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">
            Create Account
          </h2>
          <p className="text-sm text-center text-gray-500">
            Sign up to start managing your expense dashboard
          </p>
        </div>

        {isPending && (
          <AlertMessage type="loading" message="Registering you..." />
        )}
        {isError && <AlertMessage type="error" message={errorMsg} />}
        {isSuccess && (
          <AlertMessage type="success" message="Registration successful!" />
        )}

        <div className="relative">
          <FaUser className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="off"
            spellCheck={false}
            {...formik.getFieldProps("username")}
            placeholder="Enter your username"
            className="pl-11 pr-4 py-3 w-full rounded-xl border border-gray-300 bg-white text-base text-gray-700 placeholder:text-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none transition duration-150 caret-teal-600"
          />
          {formik.touched.username && formik.errors.username && (
            <p className="text-xs text-red-500 mt-1 ml-1">
              {formik.errors.username}
            </p>
          )}
        </div>

        <div className="relative">
          <FaEnvelope className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="off"
            {...formik.getFieldProps("email")}
            placeholder="Enter your email"
            className="pl-11 pr-4 py-3 w-full rounded-xl border border-gray-300 bg-white text-base text-gray-700 placeholder:text-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none transition duration-150 caret-teal-600"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-xs text-red-500 mt-1 ml-1">
              {formik.errors.email}
            </p>
          )}
        </div>

        <div className="relative">
          <FaLock className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            {...formik.getFieldProps("password")}
            placeholder="Enter your password"
            className="pl-11 pr-4 py-3 w-full rounded-xl border border-gray-300 bg-white text-base text-gray-700 placeholder:text-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none transition duration-150 caret-teal-600"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-xs text-red-500 mt-1 ml-1">
              {formik.errors.password}
            </p>
          )}
        </div>

        <div className="relative">
          <FaLock className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            {...formik.getFieldProps("confirmPassword")}
            placeholder="Confirm your password"
            className="pl-11 pr-4 py-3 w-full rounded-xl border border-gray-300 bg-white text-base text-gray-700 placeholder:text-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none transition duration-150 caret-teal-600"
          />
          {formik.touched.confirmPassword &&
            formik.errors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1 ml-1">
                {formik.errors.confirmPassword}
              </p>
            )}
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-300 transition-all duration-200"
          >
            {isPending ? "Registering..." : "Register"}
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-2">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-teal-600 hover:text-teal-700 hover:underline font-semibold transition"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegistrationForm;