import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import AdminLayout from '../layout/AdminLayout'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from '../others/Spinner';

const user = {
  firstname: "Vasim",
  lastname: "Shaikh",
  email: "vasimn2@gmail.com",
  mobile: "8155918232",
  role: "admin",
  isBlocked: false,
  cart: [
    { id: 1, name: "Product 1", description: "Description of product 1", image: "https://via.placeholder.com/150" },
    { id: 2, name: "Product 2", description: "Description of product 2", image: "https://via.placeholder.com/150" },
    { id: 3, name: "Product 3", description: "Description of product 3", image: "https://via.placeholder.com/150" },
    { id: 4, name: "Product 4", description: "Description of product 4", image: "https://via.placeholder.com/150" },
    { id: 5, name: "Product 5", description: "Description of product 5", image: "https://via.placeholder.com/150" },
  ],
  address: [],
  wishlist: [
    { id: 1, name: "Wishlist Product 1", description: "Description of wishlist product 1", image: "https://via.placeholder.com/150" },
    { id: 2, name: "Wishlist Product 2", description: "Description of wishlist product 2", image: "https://via.placeholder.com/150" },
  ]
}



const UserDetails = ()=>{
  const [data,setData] = useState()
  const bearerToken = JSON.parse(localStorage.getItem('userData'))
  const params = useParams()
  const [msg,setMsg] = useState("")

  // console.log(params)

 


   useEffect(() => {
    getUserData()
  }, [])

  const getUserData = async()=>{
    setMsg(<Spinner/>)
    try{
      const response = await axios.get(`https://dukaan-ds92.onrender.com/api/user/${params.id}`,
      { headers: {
        'Content-Type': 'application/json',
        Authorization:`Bearer ${bearerToken.token}`
      },})
      // console.log(response)
      if(response.data){
        setData(response?.data?.getUser)
        setMsg("")
      }
    }catch(error){
      toast.error("Something went Wrong");
      setMsg("Something went wrong")

    }
  }

  const blockUser = async()=>{
    setMsg(<Spinner/>)

    try{
      const response = await axios.put(`https://dukaan-ds92.onrender.com/api/user/block-user/${params.id}`,
      {},
      { 
        headers: {
        'Content-Type': 'application/json',
        Authorization:`Bearer ${bearerToken.token}`
      },
    }
  )
      if(response.data){
        toast.success("User Blocked Successfully")
        getUserData()
        setMsg("")
      }
    }catch(error){
      toast.error("Something went Wrong");
      setMsg("Something went wrong!")

    }
  }
  const unBlockUser = async()=>{
    setMsg(<Spinner/>)
    try{
      const response = await axios.put(`https://dukaan-ds92.onrender.com/api/user/unblock-user/${params.id}`,
      {},
      { 
        headers: {
        'Content-Type': 'application/json',
        Authorization:`Bearer ${bearerToken.token}`
      },
    }
  )
  if(response.data){
    toast.success("User UnBlocked Successfully")
    getUserData()
    setMsg("")
  }
    }catch(error){
      toast.error("Something went Wrong");
      setMsg("Spmething went wrong")
    }
  }
  

  return (
    <>
    <AdminLayout>
    <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14 grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* User Details Box */}
          {!msg ? 
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-2xl font-semibold text-gray-800">{data?.firstname} {data?.lastname}</h2>
            <p className="text-gray-600 mt-2"><strong>Email:</strong> {data?.email}</p>
            <p className="text-gray-600 mt-2"><strong>Mobile:</strong> {data?.mobile}</p>
            <p className="text-gray-600 mt-2"><strong>Role:</strong> {data?.role}</p>
  
            <button onClick={data?.isBlocked ? unBlockUser : blockUser} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">{data?.isBlocked?"Unblock":"Block"}</button>
          </div>
         :   <div className="bg-white shadow-lg rounded-lg p-4 h-60 flex items-center justify-center">{msg}</div> }
          
          {/* Address Box */}
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h3 className="text-xl font-semibold text-gray-800">Address</h3>
            {user.address.length > 0 ? (
              user.address.map((addr, index) => (
                <p key={index} className="text-gray-600 mt-2">{addr}</p>
              ))
            ) : (
              <p className="text-gray-600 mt-2">No addresses available.</p>
            )}
          </div>
          
          {/* Cart Box */}
          <div className="bg-white shadow-lg rounded-lg p-4 max-h-96 overflow-y-auto">
            <h3 className="text-xl font-semibold text-gray-800">Cart</h3>
            {user.cart.length > 0 ? (
              user.cart.map((item, index) => (
                <div key={index} className="flex items-center mt-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 mr-4" />
                  <div>
                    <p className="text-gray-800 font-semibold">{item.name}</p>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600 mt-2">No items in cart.</p>
            )}
          </div>
          
          {/* Wishlist Box */}
          <div className="bg-white shadow-lg rounded-lg p-4 max-h-96 overflow-y-auto">
            <h3 className="text-xl font-semibold text-gray-800">Wishlist</h3>
            {user.wishlist.length > 0 ? (
              user.wishlist.map((item, index) => (
                <div key={index} className="flex items-center mt-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 mr-4" />
                  <div>
                    <p className="text-gray-800 font-semibold">{item.name}</p>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600 mt-2">No items in wishlist.</p>
            )}
          </div>
        </div>
      </div>
      </AdminLayout>
      <ToastContainer />
</>
          
  )
}


export default UserDetails