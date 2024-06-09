import React from 'react'
import axios from 'axios'
const Test = () => {

    let data = {
        name:"Vasim",
        amount:1,
        number:'9999999999',
        MID:'MID'+Date.now(),
        transactionId:'T' + Date.now()
    }
    const HandleClick = async() =>{
        try {
            await axios.post(`http://localhost:5000/api/order/make-payment`,data)
            .then(res=>{
                console.log(res.data)
            }).catch(err=>{
                console.log(err)
            })
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='d-flex justify-items-start h-8 my-0 text-center '>
        <button onClick={HandleClick} className='bg-transparent mt-10x hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>Pay Now</button>
    </div>
  )
}

export default Test