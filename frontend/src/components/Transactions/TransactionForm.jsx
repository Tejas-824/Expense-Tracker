import { useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  FaRupeeSign,
  FaCalendarAlt,
  FaRegCommentDots,
  FaWallet,
  FaLayerGroup,
} from "react-icons/fa";
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

const suggestedCategories = {
  income: [
    "Salary",
    "Freelance",
    "Business",
    "Bonus",
    "Investment",
    "Interest",
    "Gift",
    "Refund",
  ],
  expense: [
    "Food",
    "Shopping",
    "Travel",
    "Rent",
    "Bills",
    "Health",
    "Education",
    "Groceries",
    "Transport",
    "Entertainment",
  ],
};

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
        formik.resetForm();

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } catch (err) {
        console.log(err);
        setError(err);
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    },
  });

  const filteredExistingCategories = useMemo(() => {
    if (!formik.values.type) return [];
    return data.filter((category) => category.type === formik.values.type);
  }, [data, formik.values.type]);

  const currentSuggestions = useMemo(() => {
    if (!formik.values.type) return [];
    return suggestedCategories[formik.values.type] || [];
  }, [formik.values.type]);

  return (
    <div className="min-h-[85vh] bg-gradient-to-br from-gray-50 to-teal-50 px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white/95 backdrop-blur-sm p-6 sm:p-8 rounded-3xl shadow-2xl border border-teal-100 space-y-6"
        >
          <div className="text-center space-y-2 pb-2">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-teal-100 flex items-center justify-center shadow-sm">
              <FaWallet className="text-2xl text-teal-600" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-800">
              Add Transaction
            </h2>
            <p className="text-gray-500 text-sm">
              Record your income or expense by choosing a saved category from the
              dropdown or selecting a suggested one below.
            </p>
          </div>

          {isError && (
            <AlertMessage
              type="error"
              message={
                error?.response?.data?.message ||
                "Something went wrong. Please try again later."
              }
            />
          )}

          {isSuccess && (
            <AlertMessage
              type="success"
              message="Transaction added successfully!"
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label
                htmlFor="type"
                className="flex items-center gap-2 text-sm font-semibold text-gray-700"
              >
                <FaWallet className="text-teal-500" />
                Transaction Type
              </label>
              <select
                {...formik.getFieldProps("type")}
                id="type"
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-700 shadow-sm outline-none transition focus:border-teal-400 focus:bg-white focus:ring-4 focus:ring-teal-100"
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
                htmlFor="amount"
                className="flex items-center gap-2 text-sm font-semibold text-gray-700"
              >
                <FaRupeeSign className="text-teal-500" />
                Amount
              </label>
              <div className="flex items-center rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 shadow-sm transition focus-within:border-teal-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-teal-100">
                <FaRupeeSign className="text-teal-500 mr-2" />
                <input
                  type="number"
                  {...formik.getFieldProps("amount")}
                  id="amount"
                  placeholder="Enter amount"
                  className="w-full bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
                />
              </div>
              {formik.touched.amount && formik.errors.amount && (
                <p className="text-red-500 text-xs">{formik.errors.amount}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="category"
              className="flex items-center gap-2 text-sm font-semibold text-gray-700"
            >
              <FaLayerGroup className="text-teal-500" />
              Category
            </label>
            <select
              {...formik.getFieldProps("category")}
              id="category"
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-700 shadow-sm outline-none transition focus:border-teal-400 focus:bg-white focus:ring-4 focus:ring-teal-100"
            >
              <option value="">Select a category</option>
              {filteredExistingCategories.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            {formik.touched.category && formik.errors.category && (
              <p className="text-red-500 text-xs">{formik.errors.category}</p>
            )}
          </div>

          {formik.values.type && (
            <div className="space-y-3 rounded-2xl bg-teal-50/60 border border-teal-100 p-4">
              <p className="text-sm font-semibold text-gray-700">
                Suggested common categories
              </p>
              <div className="flex flex-wrap gap-2">
                {currentSuggestions.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => formik.setFieldValue("category", item)}
                    className={`px-3 py-2 rounded-full text-sm font-medium border transition ${
                      formik.values.category === item
                        ? "bg-teal-500 text-white border-teal-500"
                        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label
              htmlFor="date"
              className="flex items-center gap-2 text-sm font-semibold text-gray-700"
            >
              <FaCalendarAlt className="text-teal-500" />
              Date
            </label>
            <div className="flex items-center rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 shadow-sm transition focus-within:border-teal-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-teal-100">
              <FaCalendarAlt className="text-teal-500 mr-3" />
              <input
                type="date"
                {...formik.getFieldProps("date")}
                id="date"
                className="w-full bg-transparent outline-none text-gray-700"
              />
            </div>
            {formik.touched.date && formik.errors.date && (
              <p className="text-red-500 text-xs">{formik.errors.date}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="description"
              className="flex items-center gap-2 text-sm font-semibold text-gray-700"
            >
              <FaRegCommentDots className="text-teal-500" />
              Description (Optional)
            </label>
            <textarea
              {...formik.getFieldProps("description")}
              id="description"
              placeholder="Write a short note about this transaction"
              rows="4"
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-700 shadow-sm outline-none transition resize-none focus:border-teal-400 focus:bg-white focus:ring-4 focus:ring-teal-100 placeholder:text-gray-400"
            ></textarea>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isPending}
              className={`w-full rounded-2xl py-3.5 px-6 text-white font-bold shadow-lg transition-all duration-200 ${
                isPending
                  ? "bg-teal-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 active:scale-[0.99]"
              }`}
            >
              {isPending ? "Submitting..." : "Submit Transaction"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;