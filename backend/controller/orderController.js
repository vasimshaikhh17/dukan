import {Product} from '../model/productModel.js'
import { Order } from '../model/orderModels.js';
import axios from 'axios'
import uniqid from 'uniqid'
import sha256 from 'sha256'
import crypto from 'crypto'

export const createOrder = async (req, res) => {
    const { products, paymentIntent, orderby } = req.body;
    try {
      // Validate the products array
      if (!products || !Array.isArray(products)) {
        return res.status(400).json({ error: "Products array is required" });
      }
  
      // Check product availability and update quantities and sold counts
      for (let i = 0; i < products.length; i++) {
        const productData = products[i];
        if (!productData.product || productData.count === undefined) {
          return res.status(400).json({ error: "Product ID and count are required" });
        }
  
        // Convert count to a number and validate it
        const count = Number(productData.count);
        if (isNaN(count) || count <= 0) {
          return res.status(400).json({ error: `Invalid count for product: ${productData.product}` });
        }
  
        let product = await Product.findById(productData.product).select("+quantity +sold");
        if (!product) {
          return res.status(404).json({ error: "Product not found" });
        }
        if (product.quantity < count) {
          return res.status(400).json({ error: `Not enough quantity for product: ${product.title}` });
        }
  
        // Deduct product quantity and update sold count
        product.quantity -= count;
        product.sold += count;
        await product.save();
      }
  
      // Create the order
      const newOrder = new Order({
        products,
        paymentIntent,
        orderby,
      });
  
      await newOrder.save();
      res.status(201).json(newOrder);
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ error: error.message });
    }
};
  

// Function to update product quantity
export const updateProductQuantity = async (req, res) => {
  const { productId, count } = req.body;

  try {
    if (!productId || !count) {
      return res.status(400).json({ error: "Product ID and count are required" });
    }

    // Convert count to a number and validate it
    const countNumber = Number(count);
    if (isNaN(countNumber) || countNumber <= 0) {
      return res.status(400).json({ error: "Invalid count" });
    }

    let product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (product.quantity < countNumber) {
      return res.status(400).json({ error: `Not enough quantity for product: ${product.title}` });
    }

    product.quantity -= countNumber;
    await product.save();

    res.status(200).json(product);
  } catch (error) {
    console.error("Error updating product quantity:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ orderby: req.user._id }).populate('products.product');
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate('products.product');
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ error: error.message });
  }
};

// pending, shipped, delivered
export const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    order.orderStatus = status;  // Change this line to match the schema
    await order.save();
    res.status(200).json(order);
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('products.product')
      .populate('orderby', 'firstname lastname email'); // Populate 'orderby' with 'firstname', 'lastname' and 'email' fields from User model
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({ error: error.message });
  }
};

// export const makePayment = async(req,res)=>{
//   // testing Purpose
//   const PHONE_PAY_HOST_URL = `https://api-preprod.phonepe.com/apis/pg-sandbox`
//   const MERCHANT_ID = `PGTESTPAYUAT`
//   const SALT_INDEX = 1
//   const SALT_KEY = `099eb0cd-02cf-4e2a-8aca-3e6c6aff0399`
//   const PAY_ENDPOINT = `/pg/v1/pay`

//   const merchantTransactionId = uniqid();
//   const userId = 123
//   const payload = {
//     "merchantId": MERCHANT_ID,
//     "merchantTransactionId": merchantTransactionId,
//     "merchantUserId": userId,
//     "amount": 30000, // in paise
//     "redirectUrl": `http://localhost:5000/redirect-url/${merchantTransactionId}`,
//     "redirectMode": "REDIRECT",
//     "mobileNumber": "9999999999",
//     "paymentInstrument": {
//       "type": "PAY_PAGE"
//     }
//   }

//   const bufferObj = Buffer.from(JSON.stringify(payload),'utf-8');
//   const base64EncodedPayload = bufferObj.toString('base64');
//   const xVerify = sha256(base64EncodedPayload + PAY_ENDPOINT + SALT_KEY) + "###" + SALT_INDEX;

//   const options = {
//     method: 'post',
//     url: `${PHONE_PAY_HOST_URL}${PAY_ENDPOINT}`,
//     headers: {
//           accept: 'application/json',
//           'Content-Type': 'application/json',
//           "X-VERIFY":xVerify
//           },
//   data: {
//     request:base64EncodedPayload,
//   },
//   };
//   await axios
//     .request(options)
//         .then(function (response) {
//         console.log(response.data);
//         res.send(response.data)
//     })
//     .catch(function (error) {
//       console.error(error);
//     });

// }



export const makePayment = async(req,res)=>{
  try{
    let merchantTransactionId = req.body.transactionId
      const MERCHANT_ID = `PGTESTPAYUAT`

    const data = {
      merchantId:MERCHANT_ID,
      merchantTransactionId:merchantTransactionId,
      name:req.body.name,
      amount:req.body.amount * 100,
      redirectUrl:`http://localhost:5000/success?id=${merchantTransactionId}`,
      redirectMode:"POST",
      mobileNumber:req.body.phone,
      paymentInstrument:{
        type:"PAY_PAGE"
      }
    }
    const salt_key = `099eb0cd-02cf-4e2a-8aca-3e6c6aff0399`
    const payload = JSON.stringify(data)
    const payloadMain = Buffer.from(payload).toString('base64')
    const keyIndex = 1
    const string = payloadMain + '/pg/v1/pay' + salt_key ;
    const sha256 = crypto.createHash('sha256').update(string).digest('hex');
    const checksum = sha256 + '###' + keyIndex;

    // const prod_url = https://api.phonepe.com/apis/hermes/pg/v1/pay
    const prod_URL = `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay`
    const options = {
      method:'POST',
      url:prod_URL,
      headers:{
        accept:'application/json',
        'Content-Type':'application/json',
        'X-VERIFY':checksum
      },
      data:{
        request:payloadMain
      }
    }
    await axios(options).then(function(response){

      console.log(res.data)
      return res.json(response.data)

    }).catch(function (error){
      console.log(error,'axios Error')
    }) 
  
  }catch(error){
    console.log(error,'functionError')
  }
}
