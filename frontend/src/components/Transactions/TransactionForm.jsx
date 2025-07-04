import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { FaRupeeSign, FaCalendarAlt, FaRegCommentDots, FaWallet } from "react-icons/fa";
import { listCategoriesAPI } from "../../services/category/categoryService";
import { addTransactionAPI } from "../../services/transactions/transactionService";
import AlertMessage from "../Alert/AlertMessage";

const validationSchema = Yup.object({
  type: Yup.string()
    .required("Transaction type is required")
    .oneOf(["income", "expense"]),
  amount: Yup.number()
    .required("Amount is required")
    .positive("Amount must be positive"),
  category: Yup.string().required("Category is required"),
  date: Yup.date().required("Date is required"),
});

const TransactionForm = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await listCategoriesAPI();
        setData(res);
        setIsError(false);
      } catch (err) {
        setError(err);
        setIsError(true);
      }
    };

    fetchCategories();
  }, []);

  const formik = useFormik({
    initialValues: {
      type: "",
      amount: "",
      category: "",
      date: "",
      description: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsPending(true);
      setIsSuccess(false);
      setIsError(false);
      try {
        const result = await addTransactionAPI(values);
        console.log(result);
        setIsSuccess(true);
      } catch (err) {
        console.log(err);
        setError(err);
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-lg mx-auto my-10 bg-white p-6 rounded-lg shadow-lg space-y-4"
    >
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-teal-600">
          Transaction Details
        </h2>
        <p className="text-gray-800">Fill in the details below.</p>
      </div>

      {isError && (
        <AlertMessage
          type="error"
          message={
            error?.response?.data?.message ||
            "Something happened. Please try again later."
          }
        />
      )}
      {isSuccess && (
        <AlertMessage type="success" message="Transaction added successfully" />
      )}
      <div className="space-y-1">
        <label htmlFor="type" className="flex gap-2 items-center text-teal-600 font-medium">
          <FaWallet className="text-teal-500" />
          <span>Type</span>
        </label>
        <select
          {...formik.getFieldProps("type")}
          id="type"
          className="block w-full p-2 mt-1 border border-teal-300 rounded-md shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
        >
          <option value="">Select transaction type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        {formik.touched.type && formik.errors.type && (
          <p className="text-red-500 text-xs">{formik.errors.type}</p>
        )}
      </div>
      <div className="flex flex-col space-y-1">
        <label htmlFor="amount" className="text-teal-600 font-medium">
          <FaRupeeSign className="inline mr-2 text-teal-500" />
          Amount
        </label>
        <input
          type="number"
          {...formik.getFieldProps("amount")}
          id="amount"
          placeholder="Amount"
          className="w-full border border-teal-300 rounded-md shadow-sm py-2 px-3 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
        />
        {formik.touched.amount && formik.errors.amount && (
          <p className="text-red-500 text-xs italic">{formik.errors.amount}</p>
        )}
      </div>
      <div className="flex flex-col space-y-1">
        <label htmlFor="category" className="text-teal-600 font-medium">
          <FaRegCommentDots className="inline mr-2 text-teal-500" />
          Category
        </label>
        <select
          {...formik.getFieldProps("category")}
          id="category"
          className="w-full border border-teal-300 rounded-md shadow-sm py-2 px-3 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
        >
          <option value="">Select a category</option>
          {data?.map((category) => {
            return (
              <option key={category?._id} value={category?.name}>
                {category?.name}
              </option>
            );
          })}
        </select>
        {formik.touched.category && formik.errors.category && (
          <p className="text-red-500 text-xs italic">
            {formik.errors.category}
          </p>
        )}
      </div>
      <div className="flex flex-col space-y-1">
        <label htmlFor="date" className="text-teal-600 font-medium">
          <FaCalendarAlt className="inline mr-2 text-teal-500" />
          Date
        </label>
        <input
          type="date"
          {...formik.getFieldProps("date")}
          id="date"
          className="w-full border border-teal-300 rounded-md shadow-sm py-2 px-3 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
        />
        {formik.touched.date && formik.errors.date && (
          <p className="text-red-500 text-xs italic">{formik.errors.date}</p>
        )}
      </div>
      <div className="flex flex-col space-y-1">
        <label htmlFor="description" className="text-teal-600 font-medium">
          <FaRegCommentDots className="inline mr-2 text-teal-500" />
          Description (Optional)
        </label>
        <textarea
          {...formik.getFieldProps("description")}
          id="description"
          placeholder="Description"
          rows="3"
          className="w-full border border-teal-300 rounded-md shadow-sm py-2 px-3 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
        ></textarea>
        {formik.touched.description && formik.errors.description && (
          <p className="text-red-500 text-xs italic">
            {formik.errors.description}
          </p>
        )}
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={isPending}
          className="mt-4 bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
        >
          {isPending ? "Submitting..." : "Submit Transaction"}
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;
