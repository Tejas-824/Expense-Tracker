import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaPlus, FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  listCategoriesAPI,
  deleteCategoryAPI,
} from "../../services/category/categoryService";
import AlertMessage from "../Alert/AlertMessage";

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const fetchCategories = async () => {
    setIsLoading(true);
    setIsError(false);
    setError(null);

    try {
      const data = await listCategoriesAPI();
      setCategories(data);
    } catch (err) {
      setIsError(true);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async () => {
    if (!categoryToDelete) return;

    setIsDeleting(true);
    setDeleteError(null);
    setSuccessMsg(null);

    try {
      await deleteCategoryAPI(categoryToDelete._id);
      setSuccessMsg("Category deleted successfully");
      setCategoryToDelete(null);
      fetchCategories();
    } catch (err) {
      setDeleteError(
        err?.response?.data?.message || "Failed to delete category"
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-[80vh] bg-gray-50 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-teal-600">Categories</h2>
            <p className="text-sm text-gray-500 mt-1">
              Manage your income and expense categories here.
            </p>
          </div>

          <Link
            to="/add-category"
            className="inline-flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold px-5 py-3 rounded-xl transition"
          >
            <FaPlus className="text-sm" />
            Add Category
          </Link>
        </div>

        {isLoading && (
          <AlertMessage type="loading" message="Loading categories..." />
        )}
        {isError && (
          <AlertMessage
            type="error"
            message={error?.response?.data?.message || "Something went wrong"}
          />
        )}
        {deleteError && <AlertMessage type="error" message={deleteError} />}
        {successMsg && <AlertMessage type="success" message={successMsg} />}

        {!isLoading && !isError && (
          <>
            {categories?.length > 0 ? (
              <div className="space-y-4">
                {categories.map((category) => (
                  <div
                    key={category._id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gray-50 border border-gray-100 rounded-2xl p-4 hover:shadow-md transition"
                  >
                    <div className="flex items-center justify-between sm:justify-start gap-3 flex-wrap">
                      <h3 className="text-base font-semibold text-gray-800">
                        {category.name}
                      </h3>

                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          category.type === "income"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {category.type.charAt(0).toUpperCase() +
                          category.type.slice(1)}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Link to={`/update-category/${category._id}`}>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-teal-200 text-teal-600 hover:bg-teal-50 transition">
                          <FaEdit className="text-sm" />
                          Edit
                        </button>
                      </Link>

                      <button
                        onClick={() => setCategoryToDelete(category)}
                        disabled={isDeleting}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition ${
                          isDeleting ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        <FaTrash className="text-sm" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-14 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <h3 className="text-lg font-semibold text-gray-700">
                  No categories found
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  Add your first income or expense category to get started.
                </p>
                <Link
                  to="/add-category"
                  className="inline-flex items-center gap-2 mt-5 bg-teal-500 hover:bg-teal-600 text-white font-semibold px-5 py-3 rounded-xl transition"
                >
                  <FaPlus className="text-sm" />
                  Add Category
                </Link>
              </div>
            )}
          </>
        )}
      </div>

      {categoryToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 animate-[fadeIn_.2s_ease-in-out]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <FaExclamationTriangle className="text-red-500 text-lg" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  Delete Category
                </h3>
                <p className="text-sm text-gray-500">
                  This action cannot be undone.
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-600 leading-6 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-800">
                {categoryToDelete.name}
              </span>
              ?
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
              <button
                type="button"
                onClick={() => setCategoryToDelete(null)}
                className="px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className={`px-4 py-2.5 rounded-xl text-white font-semibold transition ${
                  isDeleting
                    ? "bg-red-300 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesList;