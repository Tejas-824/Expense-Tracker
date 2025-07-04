import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaWallet } from "react-icons/fa";
import { SiDatabricks } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { addCategoryAPI } from "../../services/category/categoryService";
import AlertMessage from "../Alert/AlertMessage";

const validationSchema = Yup.object({
  name: Yup.string().required("Category name is required"),
  type: Yup.string().oneOf(["income", "expense"]).required("Category type is required"),
});

const AddCategory = () => {
  const navigate = useNavigate();

  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      type: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsPending(true);
      setIsError(false);
      setIsSuccess(false);
      setErrorMsg("");

      try {
        await addCategoryAPI(values);
        setIsSuccess(true);
        setTimeout(() => navigate("/categories"), 1500); 
      } catch (err) {
        setIsError(true);
        setErrorMsg(err?.response?.data?.message || "Something went wrong. Please try again later.");
      } finally {
        setIsPending(false);
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-lg mx-auto my-8 bg-white p-6 rounded-lg shadow-lg space-y-6 border border-teal-200" >
      <div className="text-center">
        <h2 className="text-3xl font-semibold text-teal-600">Add New Category</h2>
        <p className="text-gray-600">Fill in the details below.</p>
      </div>

      {isError && <AlertMessage type="error" message={errorMsg} />}
      {isSuccess && <AlertMessage type="success" message="Category added successfully. Redirecting..." />}

      <div className="space-y-2">
        <label htmlFor="type" className="flex items-center gap-2 text-teal-600 font-medium">
          <FaWallet className="text-teal-500" />
          Type
        </label>
        <select
          id="type"
          {...formik.getFieldProps("type")}
          className="w-full p-3 mt-1 border border-teal-300 rounded-md focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50">
          <option value="">Select transaction type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        {formik.touched.type && formik.errors.type && (
          <p className="text-red-500 text-xs">{formik.errors.type}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="name" className="flex items-center gap-2 text-teal-600 font-medium">
          <SiDatabricks className="text-teal-500" />
          Name
        </label>
        <input
          type="text"
          id="name"
          placeholder="Category Name"
          {...formik.getFieldProps("name")}
          className="w-full p-3 mt-1 border border-teal-300 rounded-md focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
        />
        {formik.touched.name && formik.errors.name && (
          <p className="text-red-500 text-xs italic">{formik.errors.name}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className={`w-full bg-teal-500 text-white font-bold py-3 px-4 rounded-md transition duration-200 ${
          isPending
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50"
        }`}>
        {isPending ? "Adding..." : "Add Category"}
      </button>
    </form>
  );
};

export default AddCategory;
