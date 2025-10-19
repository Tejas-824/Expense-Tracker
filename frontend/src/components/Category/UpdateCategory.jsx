import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaWallet } from "react-icons/fa";
import { SiDatabricks } from "react-icons/si";
import { useNavigate, useParams } from "react-router-dom";
import { updateCategoryAPI } from "../../services/category/categoryService";
import AlertMessage from "../Alert/AlertMessage";

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Category name is required")
    .oneOf(["income", "expense"]),
  type: Yup.string()
    .required("Category type is required")
    .oneOf(["income", "expense"]),
});

const UpdateCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      type: "",
      name: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsPending(true);
      setIsError(false);
      setIsSuccess(false);

      try {
        await updateCategoryAPI({ ...values, id });
        setIsSuccess(true);
        setTimeout(() => navigate("/categories"), 1500);
      } catch (err) {
        setIsError(true);
        setErrorMsg(
          err?.response?.data?.message || "Something went wrong. Please try again."
        );
      } finally {
        setIsPending(false);
      }
    },
  });

 return (
  <form
    onSubmit={formik.handleSubmit}
    className="max-w-md mx-auto my-10 bg-white p-8 rounded-2xl shadow-xl space-y-6 border border-teal-100"
  >
    {/* Header */}
    <div className="text-center space-y-2">
      <h2 className="text-3xl font-extrabold text-teal-600">Update Category</h2>
      <p className="text-gray-600 text-sm">Fill in the details below.</p>
    </div>

    {/* Alerts */}
    {isPending && <AlertMessage type="loading" message="Updating..." />}
    {isError && <AlertMessage type="error" message={errorMsg} />}
    {isSuccess && (
      <AlertMessage
        type="success"
        message="Category updated successfully, redirecting..."
      />
    )}

    {/* Type Field */}
    <div className="flex flex-col space-y-2">
      <label htmlFor="type" className="flex gap-2 items-center text-teal-600 font-semibold">
        <FaWallet className="text-teal-500" />
        Type
      </label>
      <select
        id="type"
        {...formik.getFieldProps("type")}
        className="w-full p-3 border border-teal-300 rounded-xl shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50 transition"
      >
        <option value="">Select transaction type</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      {formik.touched.type && formik.errors.type && (
        <p className="text-red-500 text-xs italic">{formik.errors.type}</p>
      )}
    </div>

    {/* Name Field */}
    <div className="flex flex-col space-y-2">
      <label htmlFor="name" className="flex gap-2 items-center text-teal-600 font-semibold">
        <SiDatabricks className="text-teal-500" />
        Name
      </label>
      <input
        id="name"
        type="text"
        placeholder="Category Name"
        {...formik.getFieldProps("name")}
        className="w-full p-3 border border-teal-300 rounded-xl shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50 transition"
      />
      {formik.touched.name && formik.errors.name && (
        <p className="text-red-500 text-xs italic">{formik.errors.name}</p>
      )}
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      className="w-full py-3 font-bold text-white rounded-xl shadow-lg transition-all duration-300 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50"
    >
      Update Category
    </button>
  </form>
);
};

export default UpdateCategory;
