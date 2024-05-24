import React, { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import Spinner from "../others/Spinner";
import { Link, useNavigate } from "react-router-dom";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [msg, setMsg] = useState();
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const categoriesPerPage = 6; // Number of categories per page
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCategories = async () => {
      setMsg(<Spinner/>);
      try {
        const response = await fetch('https://dukaan-ds92.onrender.com/api/category/getAll');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCategories(data);
        setMsg(false);
      } catch (error) {
        setError(error);
        setMsg(false);
      }
    };

    fetchCategories();
  }, []);

  // Calculate the current categories to display based on the currentPage
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);

  // Calculate total number of pages
  const totalPages = Math.ceil(categories.length / categoriesPerPage);

  // Handle page changes
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle next and previous buttons
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (msg) {
    return (
      <AdminLayout>
        <div className="p-4 sm:ml-64">
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
            <h1 className="text-center mb-20">
              {msg}
            </h1>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="p-4 sm:ml-64">
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
            <h1 className="text-center mb-20">Error: {error.message}</h1>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
        <button   onClick={() => navigate(`/admin/add-category`)} class=" bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-full mb-14">
Add Category
</button>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-auto container">
            {currentCategories.map((category, index) => (
              <div key={index} className="rounded-lg shadow-md overflow-hidden">
                <Link to={`/admin/category/${category._id}`} className="block">
                  <img
                    src={category.imageUrl}
                    alt={category.title}
                    className="w-full h-48 object-contain transition-transform duration-300 hover:scale-125"
                  />
                </Link>
                <div className="p-4">
                  <div className="text-gray-800 font-semibold mb-2 flex justify-center">
                    {category.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="mx-1 px-3 py-1 border rounded bg-white"
            >
              Previous
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => paginate(pageNumber)}
                  className={`mx-1 px-3 py-1 border rounded ${
                    pageNumber === currentPage ? 'bg-gray-300' : 'bg-white'
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
            {totalPages > 2 && (
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="mx-1 px-3 py-1 border rounded bg-white"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCategories;
