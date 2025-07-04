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
      className="max-w-lg mx-auto my-10 bg-white p-6 rounded-lg shadow-lg space-y-6"
    >
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-teal-600">
          Update Category
        </h2>
        <p className="text-gray-600">Fill in the details below.</p>
      </div>

      {isPending && <AlertMessage type="loading" message="Updating..." />}
      {isError && <AlertMessage type="error" message={errorMsg} />}
      {isSuccess && (
        <AlertMessage
          type="success"
          message="Category updated successfully, redirecting..."
        />
      )}

      <div className="space-y-2">
        <label
          htmlFor="type"
          className="flex gap-2 items-center text-gray-700 font-medium"
        >
          <FaWallet className="text-teal-500" />
          <span>Type</span>
        </label>
        <select
          id="type"
          {...formik.getFieldProps("type")}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
        >
          <option value="">Select transaction type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        {formik.touched.type && formik.errors.type && (
          <p className="text-red-500 text-xs">{formik.errors.type}</p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="name"
          className="flex gap-2 items-center text-gray-700 font-medium"
        >
          <SiDatabricks className="text-teal-500" />
          <span>Name</span>
        </label>
        <input
          id="name"
          type="text"
          placeholder="Name"
          {...formik.getFieldProps("name")}
          className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
        />
        {formik.touched.name && formik.errors.name && (
          <p className="text-red-500 text-xs italic">{formik.errors.name}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full mt-4 bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded transition-colors"
      >
        Update Category
      </button>
    </form>
  );
};

export default UpdateCategory;
