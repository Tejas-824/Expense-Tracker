import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaUserPlus } from "react-icons/fa";
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
      email: "",
      password: "",
      username: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsPending(true);
      setIsError(false);
      setIsSuccess(false);
      try {
        await registerAPI(values);
        setIsSuccess(true);
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
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-teal-50 flex items-center justify-center px-4">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl border border-gray-200 backdrop-blur-md"
      >
        <div className="flex flex-col items-center mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-teal-500 p-3 rounded-full shadow-md mb-2">
            <FaUserPlus className="text-white text-2xl" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Sign Up</h2>
          <p className="text-sm text-gray-500 mt-1 text-center">
            Create your account and join the fun!
          </p>
        </div>

        {isPending && <AlertMessage type="loading" message="Loading...." />}
        {isError && <AlertMessage type="error" message={errorMsg} />}
        {isSuccess && (
          <AlertMessage type="success" message="Registration success" />
        )}
        <div className="relative mb-4">
          <FaUser className="absolute top-3 left-3 text-gray-400" />
         <input
  id="username"
  name="user_field"
  type="text"
  autoComplete="new-username"    
  inputMode="none"
  spellCheck={false}
  autoCorrect="off"
  form="no-browser-autofill" 
  {...formik.getFieldProps("username")}
  placeholder="Username"
  className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
/>

          {formik.touched.username && formik.errors.username && (
            <span className="text-xs text-red-500">
              {formik.errors.username}
            </span>
          )}
        </div>

        <div className="relative mb-4">
          <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
          <input
            id="email"
            type="email"
            {...formik.getFieldProps("email")}
            placeholder="Email"
            className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          />
          {formik.touched.email && formik.errors.email && (
            <span className="text-xs text-red-500">{formik.errors.email}</span>
          )}
        </div>

        <div className="relative mb-4">
          <FaLock className="absolute top-3 left-3 text-gray-400" />
          <input
            id="password"
            type="password"
            {...formik.getFieldProps("password")}
            placeholder="Password"
            className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          />
          {formik.touched.password && formik.errors.password && (
            <span className="text-xs text-red-500">
              {formik.errors.password}
            </span>
          )}
        </div>

        <div className="relative mb-6">
          <FaLock className="absolute top-3 left-3 text-gray-400" />
          <input
            id="confirmPassword"
            type="password"
            {...formik.getFieldProps("confirmPassword")}
            placeholder="Confirm Password"
            className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          />
          {formik.touched.confirmPassword &&
            formik.errors.confirmPassword && (
              <span className="text-xs text-red-500">
                {formik.errors.confirmPassword}
              </span>
            )}
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-200 ease-in-out transform hover:scale-[1.02]"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
