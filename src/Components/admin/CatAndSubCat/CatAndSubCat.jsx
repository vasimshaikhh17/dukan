import React from 'react'
import AdminLayout from '../layout/AdminLayout'

const CatAndSubCat = () => {
  return (
    <AdminLayout>
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Box 1 - Categories */}
        <div className="border-2 border-red-500 bg-red-100 p-4">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <ul>
            {/* Map through categories here */}
            <li className="mb-2">Category 1</li>
            <li className="mb-2">Category 2</li>
            <li className="mb-2">Category 3</li>
          </ul>
        </div>

        {/* Box 2 - Subcategories */}
        <div className="border-2 border-green-500 bg-green-100 p-4">
          <h2 className="text-xl font-semibold mb-4">Subcategories</h2>
          <ul>
            {/* Map through subcategories here */}
            <li className="mb-2">Subcategory 1</li>
            <li className="mb-2">Subcategory 2</li>
            <li className="mb-2">Subcategory 3</li>
          </ul>
        </div>

        {/* Box 3 - Brands */}
        <div className="border-2 border-blue-500 bg-blue-100 p-4">
          <h2 className="text-xl font-semibold mb-4">Brands</h2>
          <ul>
            {/* Map through brands here */}
            <li className="mb-2">Brand 1</li>
            <li className="mb-2">Brand 2</li>
            <li className="mb-2">Brand 3</li>
          </ul>
        </div>

       
      </div>
    </AdminLayout>
  )
}

export default CatAndSubCat
