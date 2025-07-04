import { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { listCategoriesAPI, deleteCategoryAPI } from "../../services/category/categoryService";
import AlertMessage from "../Alert/AlertMessage";

const CategoriesList = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [setIsDeleting] = useState(false);
  const [setDeleteError] = useState(null);

  const fetchCategories = async () => {
    setIsLoading(true);
    setIsError(false);
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
    setIsDeleting(true);
    setDeleteError(null);
    try {
      await deleteCategoryAPI(categoryId);
      fetchCategories();
    } catch (err) {
      setDeleteError(err);
      console.log("Delete failed:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-teal-600 mb-4">Categories</h2>

      {isLoading && <AlertMessage type="loading" message="Loading..." />}
      {isError && (
        <AlertMessage
          type="error"
          message={error?.response?.data?.message || "Something went wrong"}
        />
      )}

      <ul className="space-y-4">
        {categories?.map((category) => (
          <li
            key={category._id}
            className="flex justify-between items-center bg-gray-50 p-3 rounded-md"
          >
            <div>
              <span className="text-teal-800">{category.name}</span>
              <span
                className={`ml-2 px-2 inline-flex text-xs font-semibold rounded-full ${
                  category.type === "income"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {category.type.charAt(0).toUpperCase() + category.type.slice(1)}
              </span>
            </div>
            <div className="flex space-x-3">
              <Link to={`/update-category/${category._id}`}>
                <button className="text-teal-500 hover:text-teal-700">
                  <FaEdit />
                </button>
              </Link>
              <button
                onClick={() => handleDelete(category._id)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesList;
