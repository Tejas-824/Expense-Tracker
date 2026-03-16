import { useMemo, useState } from "react";
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

const categorySuggestions = {
  income: [
    "Salary",
    "Freelance",
    "Business",
    "Bonus",
    "Investment",
    "Interest",
    "Rental Income",
    "Pocket Money",
    "Gift",
    "Refund",
  ],
  expense: [
    "Food",
    "Shopping",
    "Travel",
    "Rent",
    "Bills",
    "Entertainment",
    "Health",
    "Education",
    "Groceries",
    "Transport",
    "Mobile Recharge",
    "Subscription",
  ],
};

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
    onSubmit: async (values, { resetForm }) => {
      setIsPending(true);
      setIsError(false);
      setIsSuccess(false);
      setErrorMsg("");

      try {
        const formattedValues = {
          ...values,
          name: values.name
            .trim()
            .split(" ")
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(" "),
        };

        await addCategoryAPI(formattedValues);
        setIsSuccess(true);
        resetForm();

        setTimeout(() => navigate("/categories"), 1000);
      } catch (err) {
        setIsError(true);
        setErrorMsg(
          err?.response?.data?.message ||
            "Something went wrong. Please try again later."
        );
      } finally {
        setIsPending(false);
      }
    },
  });

  const selectedType = formik.values.type;
  const inputValue = formik.values.name.trim().toLowerCase();

  const filteredSuggestions = useMemo(() => {
    if (!selectedType) return [];
    const list = categorySuggestions[selectedType] || [];

    if (!inputValue) return list;

    return list.filter((item) => item.toLowerCase().includes(inputValue));
  }, [selectedType, inputValue]);

  const handleSuggestionClick = (suggestion) => {
    formik.setFieldValue("name", suggestion);
  };

  return (
    <div className="min-h-[80vh] bg-gray-50 px-4 py-10">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-3xl shadow-xl border border-teal-100">
        <div className="text-center space-y-2 mb-6">
          <h2 className="text-3xl font-extrabold text-teal-600">
            Add New Category
          </h2>
          <p className="text-gray-600 text-sm">
            Choose a suggested category or type your own custom category.
          </p>
        </div>

        {isError && <AlertMessage type="error" message={errorMsg} />}
        {isSuccess && (
          <AlertMessage
            type="success"
            message="Category added successfully. Redirecting..."
          />
        )}
        {isPending && <AlertMessage type="loading" message="Adding category..." />}

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="type"
              className="flex items-center gap-2 text-teal-600 font-semibold"
            >
              <FaWallet className="text-teal-500" />
              Type
            </label>
            <select
              id="type"
              {...formik.getFieldProps("type")}
              className="w-full p-3 border border-teal-300 rounded-xl shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition"
            >
              <option value="">Select transaction type</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            {formik.touched.type && formik.errors.type && (
              <p className="text-red-500 text-xs">{formik.errors.type}</p>
            )}
          </div>

          <div className="flex flex-col space-y-2">
            <label
              htmlFor="name"
              className="flex items-center gap-2 text-teal-600 font-semibold"
            >
              <SiDatabricks className="text-teal-500" />
              Category Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Type category name"
              {...formik.getFieldProps("name")}
              className="w-full p-3 border border-teal-300 rounded-xl shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition"
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-xs">{formik.errors.name}</p>
            )}
          </div>

          {selectedType && (
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-700">
                Suggested {selectedType} categories
              </p>

              <div className="flex flex-wrap gap-2">
                {filteredSuggestions.length > 0 ? (
                  filteredSuggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                        formik.values.name === suggestion
                          ? "bg-teal-500 text-white border-teal-500"
                          : "bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100"
                      }`}
                    >
                      {suggestion}
                    </button>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    No matching suggestions. You can still add your own category.
                  </p>
                )}
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className={`w-full py-3 px-6 font-bold text-white rounded-xl shadow-lg transition-all duration-300 ${
              isPending
                ? "bg-teal-400 cursor-not-allowed opacity-60"
                : "bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
            }`}
          >
            {isPending ? "Adding..." : "Add Category"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;