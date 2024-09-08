import React, { useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import axios from "axios";
import { useEffect } from "react";

const BrandPage = () => {
  const [brands, setBrands] = useState([]);

  const fetchAllBrand = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/brand/getAll`);

      setBrands(res.data);

      console.log(res.data);
    } catch (error) {
      console.log("error in fetching brand", error);
    }
  };

  useEffect(() => {
    fetchAllBrand();
  }, []);

  return (
    <AdminLayout>
      <div>
        <p>brands</p>
        {brands.map((brand) => (
          <ol key={brand._id}>
            <div className="flex ">
              <li>{brand.name} </li>

              <img src={brand.image} width={50} alt="" />
            </div>
            <button type="button" className="bg-red-400 p-4 text-white" onClick={()=>handelDeletePost(brand._id)}>delete</button>
          </ol>
        ))}
      </div>
    </AdminLayout>
  );
};

export default BrandPage;
