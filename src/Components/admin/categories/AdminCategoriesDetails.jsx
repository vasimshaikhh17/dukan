import React, { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";

const AdminCategoriesDetails = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/product/getAll");
        const data = await response.json();
        const menProducts = data.filter(product => product.category === "mens");
        setProducts(menProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <AdminLayout>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <h1 className="text-2xl font-bold mb-4">All Men Products</h1>
          <div className="hidden lg:block">
            <ul className="space-y-4">
              {products.map(product => (
                <li key={product._id} className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <img className="w-24 h-24 object-cover rounded-lg mr-4" src={product.images[0] || "https://via.placeholder.com/150"} alt={product.title} />
                  <div className="flex-grow">
                    <div className="font-bold text-xl">{product.title}</div>
                    <p className="text-gray-700 dark:text-gray-300">{product.description}</p>
                  </div>
                  <button className="ml-4 px-4 py-2 bg-green-500 text-white rounded-lg">View Detail</button>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:hidden gap-4">
            {products.map(product => (
              <div key={product._id} className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white dark:bg-gray-800">
                <img className="w-full h-48 object-cover" src={product.images[0] || "https://via.placeholder.com/150"} alt={product.title} />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{product.title}</div>
                  <p className="text-gray-700 text-base dark:text-gray-300">{product.description}</p>
                </div>
                <button className="mt-2 w-full px-4 py-2 bg-green-500 text-white rounded-lg">View Detail</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCategoriesDetails;
