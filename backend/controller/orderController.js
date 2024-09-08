import {Product} from '../model/productModel.js'
import { Order, TempOrder } from '../model/orderModels.js';
import axios from 'axios'
import crypto from 'crypto'
import { User } from '../model/userModel.js';
import { v4 as uuidv4 } from 'uuid';     // ES6 syntax
import { redirect } from 'react-router-dom';
import { Cart } from '../model/cartModel.js';



//PAYMENT GATEWAY 
const MERCHANT_ID = `PGTESTPAYUAT86`
const MERCHANT_KEY= "96434309-7796-489d-8924-ab56988a6076"
const MERCHANT_BASE_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay"
const MERCHANT_STATUS_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status"

const redirectUrl = "http://localhost:5000/api/order/status"

const successUrl = "http://localhost:5173/payment-success"
const failureUrl = "http://localhost:5173/payment-failure"
// Order and Payment methods bellowww

export const processOrderAndPayment = async (req, res) => {
  const { products, addressIndex } = req.body;
  const user = req.user; // Extracted from authentication middleware
  // const { name, mobileNumber, amount } = req.body; // You can extract amount based on the cart's total amount
  try {
    // 1. Validate products and address
    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Products array is required and should not be empty" });
    }
    
    if (!user || addressIndex < 0 || addressIndex >= user.address.length) {
      return res.status(400).json({ error: "Invalid user or address index" });
    }

     // Fetch the cart for the user
     const cart = await Cart.findOne({ orderby: user._id });
     if (!cart) {
       return res.status(404).json({ error: "Cart not found" });
     }

     const amount = cart.cartTotal; // Use cartTotal from the cart
    
    const shippingAddress = user.address[addressIndex];

    // 2. Initiate Payment
    const orderId = uuidv4();
    const paymentPayload = {
      merchantId: MERCHANT_ID,
      merchantUserId: `${user?.firstname} ${user?.lastname}`,
      mobileNumber: user?.mobile,
      amount: amount * 100, // PhonePe requires amount in paise
      merchantTransactionId: orderId,
      redirectUrl: `http://localhost:5000/api/order/status?id=${orderId}`,
      redirectMode: 'POST',
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };
    
    const payload = Buffer.from(JSON.stringify(paymentPayload)).toString('base64');
    const checksumString = payload + '/pg/v1/pay' + MERCHANT_KEY;
    const sha256 = crypto.createHash('sha256').update(checksumString).digest('hex');
    const checksum = sha256 + '###' + 1;
    
    const paymentOptions = {
      method: 'POST',
      url: MERCHANT_BASE_URL,
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'X-VERIFY': checksum,
      },
      data: { request: payload },
    };
    
    const paymentResponse = await axios.request(paymentOptions);

    if (paymentResponse.data.success === false) {
      return res.status(500).json({ error: "Failed to initiate payment" });
    }

    const paymentUrl = paymentResponse.data.data.instrumentResponse.redirectInfo.url;

        // 3. Save TempOrder to the database
        const tempOrder = new TempOrder({
          orderId: orderId,
          products: products,
          orderby: user._id,
          addressIndex: addressIndex,
          amount: amount,
        });
    
        await tempOrder.save();
    // 3. Return payment URL for the frontend to redirect the user
    return res.status(200).json({ paymentUrl, orderId });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Status controller: Redirect based on payment status
export const handlePaymentStatus = async (req, res) => {
  const { id } = req.query;
  // console.log(id,'idd'/)
  const checksumString = `/pg/v1/status/${MERCHANT_ID}/${id}` + MERCHANT_KEY;
  const sha256 = crypto.createHash('sha256').update(checksumString).digest('hex');
  const checksum = sha256 + '###' + 1;
  
  const options = {
    method: 'GET',
    url: `${MERCHANT_STATUS_URL}/${MERCHANT_ID}/${id}`,
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      'X-VERIFY': checksum,
      'X-MERCHANT-ID': MERCHANT_ID,
    },
  };
  
  try {
    const response = await axios.request(options);

    // Payment success
    if (response.data.success === true) {
    // Extract relevant payment information
    const { amount, ...otherPaymentDetails } = response.data.data; // Extract amount from response
    const paymentDetails = {
      ...otherPaymentDetails,
      amountPaid: amount / 100, // Convert from paise to rupees
    };
    const {
      merchantId,  // ID of the transaction
      transactionId,          // Unique payment gateway transaction ID
      paymentAmount,             // Amount paid (usually in paise, convert to rupees)
      userName,               // User's name from payment
      mobileNumber,           // User's mobile number from payment
      paymentStatus,          // Payment status (SUCCESS)
      paymentTime             // Time of payment
    } = paymentDetails;

          // Log payment details for debugging
          console.log('Payment Details:', paymentDetails);

      // Order placement logic here
      const tempOrder = await TempOrder.findOne({ orderId: id });
      if (!tempOrder) {
        return res.status(404).json({ error: "Temporary order not found" });
      }
      const { products, orderby, addressIndex } = tempOrder;

      const user = await User.findById(orderby);
      if (!user) return res.status(404).json({ error: "User not found" });
      
      const shippingAddress = user.address[addressIndex];
      let orderItems = [];

      for (let i = 0; i < products.length; i++) {
        const productData = products[i];
        const product = await Product.findById(productData.product);

        if (!product) return res.status(404).json({ error: "Product not found" });

        const sizeObj = product.quantity.find(q => q.size === productData.size);
        if (!sizeObj || sizeObj.quantity < productData.count) {
          return res.status(400).json({ error: "Insufficient quantity for product: " + product.title });
        }

        sizeObj.quantity -= productData.count;
        product.sold += productData.count;
        await product.save();

        orderItems.push({
          product: product._id,
          size: productData.size,
          color: productData.color,
          quantity: productData.count,
          price: product.price,
        });
      }
      const newOrder = new Order({
        products: orderItems,
        paymentIntent:paymentDetails,
        orderby: orderby,
        shippingAddress: shippingAddress,
      });

      await newOrder.save();
        // Delete the TempOrder after successful payment and order placement
        await TempOrder.deleteOne({ orderId: id });
      return res.redirect(successUrl).json()
    } else {
      // Payment failure
      return res.redirect(failureUrl);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


  export const createOrder = async (req, res) => {
    const { products, paymentIntent, orderby, addressIndex } = req.body;
    const user = req.user
    console.log(user,'user')
    try {
      // Validate the products array
      if (!products || !Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ error: "Products array is required and should not be empty" });
      }
      // Validate the user and address
      const user = await User.findById(orderby);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (addressIndex === undefined || addressIndex < 0 || addressIndex >= user.address.length) {
        return res.status(400).json({ error: "Invalid address index" });
      }

      const shippingAddress = user.address[addressIndex];

      // Array to hold order items
      let orderItems = [];

      // Check product availability and update quantities and sold counts
      for (let i = 0; i < products.length; i++) {
        const productData = products[i];
        if (!productData.product || productData.count === undefined || isNaN(productData.count) || productData.count <= 0) {
          return res.status(400).json({ error: "Product ID and a valid count are required for each product" });
        }

        const count = Number(productData.count);
        console.log('heyy5Count',count) 

        let product = await Product.findById(productData.product);
        if (!product) {
          return res.status(404).json({ error: "Product not found" });
        }

        // Finding correct size of the product
        const sizeObj = product.quantity.find(q => q.size === productData.size);
        if (!sizeObj) {
          return res.status(400).json({ error: "Size not found for the product" });
        }

        if (sizeObj.quantity < count) {
          return res.status(400).json({ error: `Not enough quantity for product: ${product.title}` });
        }

        // Deduct product quantity and update sold count
        sizeObj.quantity -= count;
        product.sold += count;
        await product.save();

        //order item for each size and quantity variation
        const orderItem = {
          product: product._id,
          size: productData.size,
          color: productData.color,
          quantity: count, 
          price: product.price,
        };

        orderItems.push(orderItem);
      }

      // Create the order with all order items
      const newOrder = new Order({
        products: orderItems, 
        paymentIntent,
        orderby,
        shippingAddress,
      });

      await newOrder.save();

      res.status(201).json(newOrder);

    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ error: error.message });
    }
  };

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

export const addOrSelectAddress = async (req, res) => {
    try {
      const { userId, newAddress, selectAddressIndex } = req.body;
  
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }
  
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      let selectedAddress;
  
      if (newAddress) {
        // Check for duplicate addresses
        const addressExists = user.address.includes(newAddress);
  
        if (addressExists) {
          return res.status(400).json({ message: "Address already exists" });
        }
  
        if (user.address.length >= 10) {
          return res.status(400).json({ message: "You cannot add more than 10 addresses" });
        }
  
        user.address.push(newAddress);
        selectedAddress = newAddress;
      } else if (selectAddressIndex !== undefined) {
        selectedAddress = user.address[selectAddressIndex];
      } else {
        return res.status(400).json({ message: "No address provided" });
      }
  
      await user.save();
  
      res.status(200).json({ message: "Address selected successfully", selectedAddress });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};








// export const processOrderAndPaymentTest = async(req,res)=>{
//   const {name,mobileNumber,amount}=req.body;
//   const orderId = uuidv4()
   
//     const paymentPayload = {
//       merchantId:MERCHANT_ID,
//       merchantUserId:name,
//       mobileNumber: mobileNumber,
//       amount: amount * 100,
//       merchantTransactionId:orderId,
//       redirectUrl: `${redirectUrl}/?id=${orderId}`,
//       redirectMode: 'POST',
//       paymentInstrument:{
//         type:"PAY_PAGE"
//       }
//     }
//     const salt_key = `099eb0cd-02cf-4e2a-8aca-3e6c6aff0399`
//     const payload = Buffer.from(JSON.stringify(paymentPayload)).toString('base64')
//     const keyIndex = 1
//     const string = payload + '/pg/v1/pay' + MERCHANT_KEY ;
//     const sha256 = crypto.createHash('sha256').update(string).digest('hex');
//     const checksum = sha256 + '###' + keyIndex;

//     // const prod_url = https://api.phonepe.com/apis/hermes/pg/v1/pay
//       const option = {
//       method:'POST',
//       url:MERCHANT_BASE_URL,
//       headers:{
//         accept:'application/json',
//         'Content-Type':'application/json',
//         'X-VERIFY':checksum
//       },
//       data:{
//         request:payload
//       }
//     }
//     try{
//     const response = await axios.request(option)
//       console.log(response.data.data.instrumentResponse.redirectInfo.url)
//       res.status(200).json({msg:"ok",url:response.data.data.instrumentResponse.redirectInfo.url})
  
//   }catch(error){
//     console.log(error,'error in payment')
//     res.status(500).json({error:"Failed to initiate payment"})
//   }
// }

// export const handlePaymentStatus =  async (req, res) => {
//   const merchantTransactionId = req.query.id;
//   const keyIndex = 1
//   const string  = `/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}` + MERCHANT_KEY
//   const sha256 = crypto.createHash('sha256').update(string).digest('hex')
//   const checksum = sha256 + '###' + keyIndex

//   const option = {
//     method: 'GET',
//     url:`${MERCHANT_STATUS_URL}/${MERCHANT_ID}/${merchantTransactionId}`,
//     headers: {
//         accept : 'application/json',
//         'Content-Type': 'application/json',
//         'X-VERIFY': checksum,
//         'X-MERCHANT-ID': MERCHANT_ID
//     },
// }

//   axios.request(option).then((response) => {
//       if (response.data.success === true){
//           return res.redirect(successUrl)
//       }else{
//           return res.redirect(failureUrl)
//       }
//   })
// }