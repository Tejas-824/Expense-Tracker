import { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { listCategoriesAPI, deleteCategoryAPI } from "../../services/category/categoryService";
import AlertMessage from "../Alert/AlertMessage";

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

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

  const handleDelete = async (categoryId) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    setIsDeleting(true);
    setDeleteError(null);
    setSuccessMsg(null);
    try {
      await deleteCategoryAPI(categoryId);
      setSuccessMsg("Category deleted successfully");
      fetchCategories();
    } catch (err) {
      setDeleteError(err?.response?.data?.message || "Failed to delete category");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-10 bg-white p-6 md:p-8 rounded-2xl shadow-xl">
      <h2 className="text-3xl font-semibold text-teal-600 mb-6">Categories</h2>

      {/* Loading/Error/Success */}
      {isLoading && <AlertMessage type="loading" message="Loading categories..." />}
      {isError && <AlertMessage type="error" message={error?.response?.data?.message || "Something went wrong"} />}
      {deleteError && <AlertMessage type="error" message={deleteError} />}
      {successMsg && <AlertMessage type="success" message={successMsg} />}

      {/* Categories List */}
      <ul className="space-y-4">
        {categories?.length > 0 ? (
          categories.map((category) => (
            <li
              key={category._id}
              className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                <span className="text-teal-800 font-medium">{category.name}</span>
                <span
                  className={`mt-1 md:mt-0 inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                    category.type === "income"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {category.type.charAt(0).toUpperCase() + category.type.slice(1)}
                </span>
              </div>

              <div className="flex space-x-4 mt-3 md:mt-0">
                <Link to={`/update-category/${category._id}`}>
                  <button className="text-teal-500 hover:text-teal-700 transition">
                    <FaEdit />
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(category._id)}
                  disabled={isDeleting}
                  className={`text-red-500 hover:text-red-700 transition ${
                    isDeleting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-500 italic">No categories found. Add some!</p>
        )}
      </ul>
    </div>
  );
};

export default CategoriesList;
